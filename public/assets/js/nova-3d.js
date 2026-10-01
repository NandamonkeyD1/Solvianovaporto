import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('scene');
  if (!canvas) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06132f, 0.055);

  const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.1, 15);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.75, 0.8, 0.18);
  composer.addPass(bloom);

  scene.add(new THREE.HemisphereLight(0x8fb5ff, 0x06132f, 2.1));
  const key = new THREE.PointLight(0xffde59, 45, 25); key.position.set(2, 5, 5); scene.add(key);
  const blue = new THREE.PointLight(0x2775ff, 38, 28); blue.position.set(-7, -1, 4); scene.add(blue);

  // Soft luminous orb behind the composition
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(4.4, 64, 64),
    new THREE.MeshBasicMaterial({ color: 0x174b9d, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  orb.position.set(3.5, 1.0, -3.8); scene.add(orb);

  // Grid floor
  const grid = new THREE.GridHelper(32, 32, 0x1b4f9c, 0x0d2a5c);
  grid.position.y = -3.7; grid.rotation.x = 0; grid.material.transparent = true; grid.material.opacity = 0.22; scene.add(grid);

  // Particle field
  const count = 1500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 34;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 22 - 2;
    const c = Math.random() > 0.72 ? new THREE.Color(0xffde59) : new THREE.Color(0x5d8fff);
    colors[i3] = c.r; colors[i3 + 1] = c.g; colors[i3 + 2] = c.b;
  }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(positions, 3)); pg.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending, depthWrite: false })); scene.add(pts);

  // Materials
  const yellow = new THREE.MeshPhysicalMaterial({ color: 0xffde59, metalness: 0.25, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.12, emissive: 0x6b4f00, emissiveIntensity: 0.12 });
  const navy = new THREE.MeshPhysicalMaterial({ color: 0x102b60, metalness: 0.65, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.12 });
  const white = new THREE.MeshPhysicalMaterial({ color: 0xf2f6ff, metalness: 0.12, roughness: 0.2, clearcoat: 1 });
  const blueMat = new THREE.MeshPhysicalMaterial({ color: 0x246bff, metalness: 0.45, roughness: 0.18, clearcoat: 1, emissive: 0x082e7a, emissiveIntensity: 0.16 });

  const group = new THREE.Group(); scene.add(group);

  function roundedBox(w, h, d, mat, r = 0.16) {
    const shape = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    shape.moveTo(x + r, y); shape.lineTo(x + w - r, y); shape.quadraticCurveTo(x + w, y, x + w, y + r); shape.lineTo(x + w, y + h - r); shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h); shape.lineTo(x + r, y + h); shape.quadraticCurveTo(x, y + h, x, y + h - r); shape.lineTo(x, y + r); shape.quadraticCurveTo(x, y, x + r, y);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.06, bevelThickness: 0.06 });
    geo.center(); return new THREE.Mesh(geo, mat);
  }

  // Floating glass/UI cards
  const cards = [];
  for (let i = 0; i < 9; i++) {
    const m = i % 3 === 0 ? yellow : (i % 3 === 1 ? blueMat : white);
    const card = roundedBox(1.15 + Math.random() * 0.45, 0.78, 0.18, m, 0.12);
    card.position.set(3.8 + (Math.random() - 0.5) * 5, -0.5 + (Math.random() - 0.5) * 5, -1.5 + (Math.random() - 0.5) * 5);
    card.rotation.set(Math.random() * 0.7, Math.random() * 1.1, Math.random() * 0.7);
    group.add(card); cards.push(card);
  }

  // Central abstract "Nova" core
  const core = new THREE.Group(); core.position.set(4.2, 1.1, -1.3); group.add(core);
  const coreSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55, 4), new THREE.MeshPhysicalMaterial({ color: 0x0d2a60, metalness: 0.72, roughness: 0.16, clearcoat: 1, emissive: 0x081b48, emissiveIntensity: 0.45 })); core.add(coreSphere);
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.035, 12, 160), new THREE.MeshBasicMaterial({ color: 0xffde59, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })); ring1.rotation.x = Math.PI / 2.7; core.add(ring1);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.022, 12, 160), new THREE.MeshBasicMaterial({ color: 0x3d80ff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending })); ring2.rotation.y = Math.PI / 3; core.add(ring2);

  // Tiny orbiting nodes
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2;
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 20), i % 2 ? yellow : blueMat);
    node.position.set(Math.cos(a) * 2.45, Math.sin(a) * 2.45, 0);
    core.add(node);
  }

  // Stylized S monograms as 3D blocks
  function makeS() {
    const s = new THREE.Group();
    const bars = [
      [0, 0.52, 0.12, 0.72], [-0.28, 0.25, 0.55, 0.12], [0, -0.02, 0.12, 0.55], [0.28, -0.25, 0.55, 0.12], [0, -0.52, 0.12, 0.72]
    ];
    bars.forEach(([x, y, w, h], i) => { const q = roundedBox(w, h, 0.18, i === 1 || i === 3 ? navy : yellow, 0.06); q.position.set(x, y, 0); s.add(q); });
    return s;
  }
  const logo = makeS(); logo.scale.setScalar(0.85); logo.position.set(4.25, 1.1, 0.45); logo.rotation.z = -0.12; core.add(logo);

  // Floating geometric accents
  for (let i = 0; i < 18; i++) {
    const geo = [new THREE.IcosahedronGeometry(0.18, 1), new THREE.BoxGeometry(0.28, 0.28, 0.28), new THREE.TetrahedronGeometry(0.24, 0)][i % 3];
    const mesh = new THREE.Mesh(geo, i % 3 === 0 ? yellow : (i % 3 === 1 ? blueMat : navy));
    mesh.position.set((Math.random() - 0.5) * 13, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6 - 1);
    mesh.userData.speed = 0.2 + Math.random() * 0.7; mesh.userData.phase = Math.random() * Math.PI * 2; group.add(mesh);
  }

  let mx = 0, my = 0, tx = 0, ty = 0;
  window.addEventListener('pointermove', e => { tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2; });
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); composer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    mx += (tx - mx) * 0.035; my += (ty - my) * 0.035;
    camera.position.x = mx * 0.7; camera.position.y = 1.1 - my * 0.35; camera.lookAt(1.4, 0.1, -1.2);
    core.rotation.y = t * 0.22; core.rotation.x = Math.sin(t * 0.5) * 0.08;
    ring1.rotation.z = t * 0.38; ring2.rotation.x = t * 0.27;
    orb.scale.setScalar(1 + Math.sin(t * 0.55) * 0.035);
    pts.rotation.y = t * 0.008; pts.rotation.x = Math.sin(t * 0.12) * 0.02;
    cards.forEach((c, i) => { c.position.y += Math.sin(t * 0.65 + i) * 0.0015; c.rotation.y += 0.0015 * (i % 2 ? 1 : -1); });
    group.children.forEach(o => { if (o.userData.speed) { o.rotation.x += 0.003 * o.userData.speed; o.rotation.y += 0.004 * o.userData.speed; o.position.y += Math.sin(t * o.userData.speed + o.userData.phase) * 0.0015; } });
    composer.render();
  }
  animate();
});
