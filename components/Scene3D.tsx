"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020611);

    const camera = new THREE.PerspectiveCamera(
      46,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 27);

    const system = new THREE.Group();
    scene.add(system);

    // Helpers
    function canvasTexture(
      draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
      w = 1024,
      h = 512
    ) {
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const x = c.getContext("2d");
      if (x) draw(x, w, h);
      return new THREE.CanvasTexture(c);
    }

    function glowTex() {
      return canvasTexture(
        (x, w, h) => {
          const g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
          g.addColorStop(0, "#ffffff");
          g.addColorStop(0.08, "#b9ddff");
          g.addColorStop(0.22, "#5ca4ff99");
          g.addColorStop(0.55, "#2676ff28");
          g.addColorStop(1, "transparent");
          x.fillStyle = g;
          x.fillRect(0, 0, w, h);
        },
        256,
        256
      );
    }

    const blueGlow = glowTex();

    // Star field
    const starCount = 10500;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    const starSize = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const r = 35 + Math.random() * 115;
      const a = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const q = Math.sqrt(1 - u * u);
      starPos[i * 3] = Math.cos(a) * q * r;
      starPos[i * 3 + 1] = u * r;
      starPos[i * 3 + 2] = Math.sin(a) * q * r;

      const warm = Math.random() < 0.12;
      const b = 0.55 + Math.random() * 0.45;
      starCol[i * 3] = warm ? b : 0.45 + b * 0.35;
      starCol[i * 3 + 1] = warm ? 0.75 + b * 0.2 : 0.65 + b * 0.3;
      starCol[i * 3 + 2] = warm ? 1 : 1;

      starSize[i] = Math.random() < 0.04 ? 2.5 + Math.random() * 3.5 : 0.65 + Math.random() * 1.5;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starCol, 3));
    starGeo.setAttribute("aSize", new THREE.BufferAttribute(starSize, 1));

    const starMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      uniforms: { pixelRatio: { value: Math.min(window.devicePixelRatio, 2) } },
      vertexShader: `attribute float aSize;varying vec3 vColor;void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=aSize*pixelRatio*(180./-mv.z);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 vColor;void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,.02,d);float sparkle=1.-smoothstep(.05,.5,d);gl_FragColor=vec4(vColor,a*(.72+sparkle*.28));}`,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Sparkle group
    const sparkleGroup = new THREE.Group();
    scene.add(sparkleGroup);
    for (let i = 0; i < 70; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 16 + Math.random() * 75;
      const u = Math.random() * 2 - 1;
      const q = Math.sqrt(1 - u * u);
      const s = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: blueGlow,
          transparent: true,
          opacity: 0.45 + Math.random() * 0.45,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      const sc = 0.08 + Math.random() * 0.22;
      s.scale.set(sc, sc, 1);
      s.position.set(Math.cos(a) * q * r, u * r, Math.sin(a) * q * r);
      s.userData = { phase: Math.random() * 6.28, base: sc };
      sparkleGroup.add(s);
    }

    // Twinkle group
    const twinkleGroup = new THREE.Group();
    scene.add(twinkleGroup);
    for (let i = 0; i < 90; i++) {
      const s = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: blueGlow,
          color: 0xcfe7ff,
          transparent: true,
          opacity: 0.2 + Math.random() * 0.7,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      const r = 24 + Math.random() * 90;
      const a = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const q = Math.sqrt(1 - u * u);
      s.position.set(Math.cos(a) * q * r, u * r, Math.sin(a) * q * r);
      const base = 0.025 + Math.random() * 0.07;
      s.scale.set(base, base, 1);
      s.userData = { phase: Math.random() * Math.PI * 2, speed: 0.7 + Math.random() * 2.2, base };
      twinkleGroup.add(s);
    }

    // Galaxy spiral
    const N = 70000;
    const p = new Float32Array(N * 3);
    const c = new Float32Array(N * 3);
    const cBlue = new THREE.Color(0x5799ff);
    const cPale = new THREE.Color(0xc8e3ff);
    const cDeep = new THREE.Color(0x245ed0);

    for (let i = 0; i < N; i++) {
      const r = Math.pow(Math.random(), 0.68) * 13.5;
      const arm = i % 5;
      const a = (arm * Math.PI * 2) / 5 + r * 0.58 + (Math.random() - 0.5) * (0.12 + 0.035 * r);
      const spread = (Math.random() - 0.5) * (0.14 + 0.045 * r);
      p[i * 3] = Math.cos(a) * r + Math.cos(a + Math.PI / 2) * spread;
      p[i * 3 + 1] = (Math.random() - 0.5) * (0.15 + 0.035 * r);
      p[i * 3 + 2] = Math.sin(a) * r + Math.sin(a + Math.PI / 2) * spread;
      const z = Math.random();
      const cc = z < 0.12 ? cPale : z < 0.66 ? cBlue : cDeep;
      c[i * 3] = cc.r;
      c[i * 3 + 1] = cc.g;
      c[i * 3 + 2] = cc.b;
    }

    const gg = new THREE.BufferGeometry();
    gg.setAttribute("position", new THREE.BufferAttribute(p, 3));
    gg.setAttribute("color", new THREE.BufferAttribute(c, 3));
    system.add(
      new THREE.Points(
        gg,
        new THREE.PointsMaterial({
          size: 0.045,
          vertexColors: true,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      )
    );

    // Central Solvia Core
    const coreGroup = new THREE.Group();
    system.add(coreGroup);
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 64, 64),
      new THREE.MeshPhysicalMaterial({
        color: 0x0b2d70,
        emissive: 0x1260d9,
        emissiveIntensity: 2,
        metalness: 0.15,
        roughness: 0.2,
        clearcoat: 1,
      })
    );
    coreGroup.add(core);

    const coreHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: blueGlow,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    coreHalo.scale.set(5.2, 5.2, 1);
    coreGroup.add(coreHalo);

    const coreLight = new THREE.PointLight(0x4c9aff, 20, 30, 2);
    coreGroup.add(coreLight);

    const orbitGuide = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: blueGlow,
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    orbitGuide.scale.set(3.0, 3.0, 1);
    system.add(orbitGuide);

    // 9 Planets
    const data: [string, string, number, number, number][] = [
      ["VISION", "STRATEGY", 3.0, 0.46, 0x6aaeff],
      ["BRAND", "IDENTITY", 4.15, 0.5, 0x82bdff],
      ["WEB", "EXPERIENCE", 5.35, 0.43, 0x4f91ff],
      ["SOFTWARE", "ENGINEERING", 6.65, 0.55, 0x73b2ff],
      ["AI", "INTELLIGENCE", 8.0, 0.46, 0x5f9eff],
      ["AUTOMATION", "WORKFLOW", 9.35, 0.52, 0x3978e8],
      ["DATA", "ANALYTICS", 10.8, 0.44, 0x79b8ff],
      ["CLOUD", "INFRASTRUCTURE", 12.2, 0.56, 0x4b8df5],
      ["FUTURE", "INNOVATION", 13.7, 0.47, 0x8ac5ff],
    ];

    // Ultra Crisp & High-Contrast 3D Planet Text Label Canvas Texture
    function makeLabel(a: string, b: string) {
      return canvasTexture(
        (x, w, h) => {
          x.clearRect(0, 0, w, h);

          // Subtle dark glow background behind label text for extreme contrast
          const bgGlow = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
          bgGlow.addColorStop(0, "rgba(2, 6, 17, 0.85)");
          bgGlow.addColorStop(0.6, "rgba(2, 6, 17, 0.5)");
          bgGlow.addColorStop(1, "rgba(2, 6, 17, 0)");
          x.fillStyle = bgGlow;
          x.fillRect(0, 0, w, h);

          x.textAlign = "center";
          x.textBaseline = "middle";

          // Title text with bright blue glow
          x.shadowColor = "#4c91ff";
          x.shadowBlur = 24;
          x.font = "900 68px Inter, system-ui, -apple-system, sans-serif";
          x.fillStyle = "#ffffff";
          x.fillText(a, w / 2, 110);

          // Subtitle text with electric blue glow
          x.shadowColor = "#61adff";
          x.shadowBlur = 16;
          x.font = "700 40px Inter, system-ui, -apple-system, sans-serif";
          x.fillStyle = "#82bdff";
          x.fillText(b, w / 2, 195);
        },
        1024,
        320
      );
    }

    interface PlanetItem {
      orbit: THREE.Group;
      pivot: THREE.Group;
      planet: THREE.Mesh;
      halo: THREE.Sprite;
      orbitalSpeed: number;
      selfSpeed: number;
    }

    const planets: PlanetItem[] = [];

    data.forEach((d, i) => {
      const [title, sub, radius, size, color] = d;

      const orbit = new THREE.Group();
      system.add(orbit);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.01, 8, 384),
        new THREE.MeshBasicMaterial({
          color: 0x6aaaff,
          transparent: true,
          opacity: 0.38,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      orbit.add(ring);

      const ringGlow = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.028, 8, 384),
        new THREE.MeshBasicMaterial({
          color: 0x3d82ff,
          transparent: true,
          opacity: 0.055,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      orbit.add(ringGlow);

      const pivot = new THREE.Group();
      pivot.rotation.y = i * 0.73;
      orbit.add(pivot);

      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(size, 32, 32),
        new THREE.MeshPhysicalMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.55,
          roughness: 0.25,
          metalness: 0.2,
          clearcoat: 1,
        })
      );
      planet.position.set(radius, 0, 0);
      planet.userData = { isPlanet: true, title };
      pivot.add(planet);

      const haloP = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: blueGlow,
          transparent: true,
          opacity: 0.46,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      haloP.scale.set(size * 3.2, size * 3.2, 1);
      planet.add(haloP);

      // Planet Label Sprite - Significantly Larger & Crisp
      const label = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: makeLabel(title, sub),
          transparent: true,
          depthWrite: false,
          depthTest: false,
        })
      );
      label.scale.set(4.2, 1.3, 1);
      label.position.set(0, size + 0.85, 0);
      planet.add(label);

      planets.push({
        orbit,
        pivot,
        planet,
        halo: haloP,
        orbitalSpeed: 0.0008 + (9 - i) * 0.00011,
        selfSpeed: 0.006 + (i % 3) * 0.001,
      });
    });

    // Global Interaction Controls (Drag, Zoom, Tilt, Pulse)
    let rx = 0.28,
      ry = 0,
      zoom = 27,
      drag = false,
      lx = 0,
      ly = 0,
      auto = true,
      pulse = 0;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button"))
      ) {
        return;
      }
      drag = true;
      auto = false;
      lx = e.clientX;
      ly = e.clientY;
    };

    const handlePointerUp = () => {
      drag = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!drag) return;
      ry += (e.clientX - lx) * 0.004;
      rx += (e.clientY - ly) * 0.003;
      rx = Math.max(-0.65, Math.min(0.85, rx));
      lx = e.clientX;
      ly = e.clientY;
    };

    const handleWheel = (e: WheelEvent) => {
      zoom = Math.max(12, Math.min(50, zoom + e.deltaY * 0.015));
      auto = false;
    };

    const handleDblClick = () => {
      auto = true;
    };

    const ray = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      ray.setFromCamera(mouse, camera);
      if (ray.intersectObject(core, true).length) {
        pulse = 1;
        auto = false;
      }
    };

    let mx = 0,
      my = 0;
    const handleMouseMoveTilt = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("dblclick", handleDblClick);
    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMoveTilt);
    window.addEventListener("resize", handleResize);

    // Meteors
    const meteorGroup = new THREE.Group();
    scene.add(meteorGroup);

    interface MeteorItem {
      head: THREE.Sprite;
      line: THREE.Line;
      life: number;
      active: boolean;
      duration: number;
      velocity: THREE.Vector3;
    }

    const meteors: MeteorItem[] = [];
    const meteorTexture = blueGlow;

    function makeMeteor(): MeteorItem {
      const head = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: meteorTexture,
          color: 0xbfe3ff,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      head.scale.set(0.34, 0.34, 1);

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
      const line = new THREE.Line(
        lineGeo,
        new THREE.LineBasicMaterial({
          color: 0x73b7ff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );

      meteorGroup.add(line);
      meteorGroup.add(head);

      const m: MeteorItem = {
        head,
        line,
        life: 0,
        active: false,
        duration: 1.15,
        velocity: new THREE.Vector3(),
      };
      meteors.push(m);
      return m;
    }

    for (let i = 0; i < 8; i++) makeMeteor();

    function launchMeteor() {
      const m = meteors.find((x) => !x.active) || meteors[0];
      const start = new THREE.Vector3(
        -17 + Math.random() * 10,
        8 + Math.random() * 8,
        8 + Math.random() * 7
      );
      const velocity = new THREE.Vector3(
        10 + Math.random() * 5,
        -8 - Math.random() * 5,
        -1 - Math.random() * 2
      );

      m.head.position.copy(start);
      m.velocity.copy(velocity);
      m.life = 0;
      m.duration = 1.15;
      m.active = true;
      (m.head.material as THREE.SpriteMaterial).opacity = 1;
      (m.line.material as THREE.LineBasicMaterial).opacity = 0.9;
    }

    let meteorTimer = 10;
    function updateMeteors(dt: number) {
      meteorTimer -= dt;
      if (meteorTimer <= 0) {
        launchMeteor();
        meteorTimer = 10;
      }

      meteors.forEach((m) => {
        if (!m.active) return;

        m.life += dt;
        m.head.position.addScaledVector(m.velocity, dt);

        const dir = m.velocity.clone().normalize();
        const tail = m.head.position.clone().addScaledVector(dir, -4.8);

        const arr = (m.line.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        arr[0] = m.head.position.x;
        arr[1] = m.head.position.y;
        arr[2] = m.head.position.z;
        arr[3] = tail.x;
        arr[4] = tail.y;
        arr[5] = tail.z;
        m.line.geometry.attributes.position.needsUpdate = true;

        const progress = m.life / m.duration;
        const fade = progress < 0.15 ? progress / 0.15 : 1 - progress;

        (m.head.material as THREE.SpriteMaterial).opacity = Math.max(0, fade);
        (m.line.material as THREE.LineBasicMaterial).opacity = Math.max(0, 0.9 * fade);

        if (progress >= 1) {
          m.active = false;
          (m.head.material as THREE.SpriteMaterial).opacity = 0;
          (m.line.material as THREE.LineBasicMaterial).opacity = 0;
        }
      });
    }

    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      updateMeteors(dt);

      if (auto) ry += 0.00055;

      system.rotation.x += (rx - system.rotation.x) * 0.035;
      system.rotation.y += (ry - system.rotation.y) * 0.035;
      system.rotation.z = Math.sin(t * 0.1) * 0.01;

      planets.forEach((p, i) => {
        p.pivot.rotation.y += p.orbitalSpeed;
        p.planet.rotation.y += p.selfSpeed;
        (p.halo.material as THREE.SpriteMaterial).opacity = 0.34 + Math.sin(t * 1.25 + i) * 0.08;
      });

      starMat.opacity = 0.78 + Math.sin(t * 0.8) * 0.08;

      twinkleGroup.children.forEach((s) => {
        const sprite = s as THREE.Sprite;
        const q = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * sprite.userData.speed + sprite.userData.phase));
        (sprite.material as THREE.SpriteMaterial).opacity = q;
        sprite.scale.setScalar(sprite.userData.base * (0.65 + q * 1.6));
      });

      sparkleGroup.children.forEach((s, i) => {
        const sprite = s as THREE.Sprite;
        const q = 0.72 + Math.sin(t * (1.2 + (i % 4) * 0.23) + sprite.userData.phase) * 0.28;
        (sprite.material as THREE.SpriteMaterial).opacity = q;
        sprite.scale.setScalar(sprite.userData.base * (0.85 + q * 0.5));
      });

      core.rotation.y += 0.0014;

      if (pulse > 0) {
        pulse *= 0.91;
        core.scale.setScalar(1 + pulse * 0.3);
        coreLight.intensity = 20 + pulse * 75;
        coreHalo.scale.setScalar(5.2 + pulse * 4);
      } else {
        core.scale.setScalar(1 + Math.sin(t * 1.5) * 0.018);
        coreLight.intensity = 20 + Math.sin(t) * 2;
        coreHalo.scale.setScalar(5.2 + Math.sin(t * 0.8) * 0.15);
      }

      camera.position.z += (zoom - camera.position.z) * 0.045;
      camera.position.x += (mx * 0.7 - camera.position.x) * 0.018;
      camera.position.y += (-my * 0.5 - camera.position.y) * 0.018;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("dblclick", handleDblClick);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMoveTilt);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="space"
        className="fixed inset-0 w-full h-full block z-0 cursor-grab active:cursor-grabbing"
      />
      <div className="overlay-3d" />
    </>
  );
}
