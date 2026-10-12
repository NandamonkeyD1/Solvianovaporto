"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speedFactor = prefersReducedMotion ? 0.2 : 1.0;

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020611); // Dark futuristic Solvia canvas

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 22);

    const ribbonGroup = new THREE.Group();
    scene.add(ribbonGroup);

    // 3. Shaders for "Slendang 3D" (Fluid Silk Waves with Gold Accents #FFDE59)
    const silkVertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uWaveSpeed;
      uniform float uWaveFreq;
      uniform float uWaveAmp;
      uniform float uRibbonOffset;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Multi-frequency harmonic wave (Silk ribbon ripple)
        float t = uTime * uWaveSpeed + uRibbonOffset;
        
        float w1 = sin(pos.x * uWaveFreq + t) * uWaveAmp;
        float w2 = cos(pos.x * (uWaveFreq * 1.6) + pos.y * 0.4 + t * 0.8) * (uWaveAmp * 0.55);
        float w3 = sin(pos.y * 0.7 + t * 0.5) * (uWaveAmp * 0.35);

        pos.z += w1 + w2;
        pos.y += w3 + sin(pos.x * 0.12 + t * 0.6) * 1.2;

        // Interactive mouse sway
        pos.z += sin(pos.x * 0.12) * (uMouse.x * 2.2);
        pos.y += cos(pos.x * 0.12) * (uMouse.y * 1.5);

        vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
        vNormal = normalMatrix * normal;

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;
      }
    `;

    const silkFragmentShader = `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColorGold;
      uniform float uTime;
      uniform float uOpacity;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;

      void main() {
        // Fluid silk gradient interpolation
        float grad = vUv.x + sin(vUv.y * 5.0 + uTime * 0.4) * 0.18;
        
        vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 0.45, grad));
        col = mix(col, uColor3, smoothstep(0.4, 0.85, grad));

        // Solvia Nova Golden Yellow (#FFDE59) accents along the waving folds
        float goldHighlight = pow(smoothstep(0.55, 0.95, sin(vUv.x * 12.0 + vUv.y * 3.5 - uTime * 0.7)), 3.2);
        col = mix(col, uColorGold, goldHighlight * 0.5);

        // Silk Sheen / Highlights along the folds
        float sheen = pow(abs(sin(vUv.y * 3.14159265)), 1.6);
        col += mix(vec3(0.5, 0.85, 1.0), uColorGold, 0.35) * sheen * 0.45;

        // Smooth fade at the edges for ethereal ribbon aesthetic
        float edgeFadeX = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
        float edgeFadeY = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);
        float alpha = edgeFadeX * edgeFadeY * uOpacity;

        gl_FragColor = vec4(col, alpha);
      }
    `;

    // 4. Create Multiple Woven 3D Silk Ribbons (Slendang)
    interface RibbonMesh {
      mesh: THREE.Mesh;
      material: THREE.ShaderMaterial;
    }

    const ribbons: RibbonMesh[] = [];

    // Ribbon 1: Slendang Utama (Large Primary Silk Wave)
    const geo1 = new THREE.PlaneGeometry(54, 11, 180, 40);
    const mat1 = new THREE.ShaderMaterial({
      vertexShader: silkVertexShader,
      fragmentShader: silkFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uWaveSpeed: { value: 0.75 * speedFactor },
        uWaveFreq: { value: 0.16 },
        uWaveAmp: { value: 2.8 },
        uRibbonOffset: { value: 0.0 },
        uColor1: { value: new THREE.Color(0x0a2d75) }, // Deep Royal Blue
        uColor2: { value: new THREE.Color(0x1e6bff) }, // Solvia Blue
        uColor3: { value: new THREE.Color(0x38bdf8) }, // Electric Cyan
        uColorGold: { value: new THREE.Color(0xffde59) }, // Solvia Gold #FFDE59
        uOpacity: { value: 0.72 },
      },
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    mesh1.position.set(-2, 0, -2);
    mesh1.rotation.set(-0.25, 0.15, -0.18);
    ribbonGroup.add(mesh1);
    ribbons.push({ mesh: mesh1, material: mat1 });

    // Ribbon 2: Slendang Luminous (Twisting Secondary Neon Ribbon with Gold Trims)
    const geo2 = new THREE.PlaneGeometry(48, 6.5, 150, 30);
    const mat2 = new THREE.ShaderMaterial({
      vertexShader: silkVertexShader,
      fragmentShader: silkFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uWaveSpeed: { value: 0.9 * speedFactor },
        uWaveFreq: { value: 0.22 },
        uWaveAmp: { value: 2.2 },
        uRibbonOffset: { value: 2.4 },
        uColor1: { value: new THREE.Color(0x0c4a6e) }, // Azure
        uColor2: { value: new THREE.Color(0x06b6d4) }, // Neon Cyan
        uColor3: { value: new THREE.Color(0x60a5fa) }, // Sky Light
        uColorGold: { value: new THREE.Color(0xffde59) }, // Gold Accent
        uOpacity: { value: 0.65 },
      },
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.position.set(3, -1.8, 0.5);
    mesh2.rotation.set(-0.18, -0.2, 0.14);
    ribbonGroup.add(mesh2);
    ribbons.push({ mesh: mesh2, material: mat2 });

    // Ribbon 3: Slendang Translucent Horizon (Ethereal Background Silk Trail)
    const geo3 = new THREE.PlaneGeometry(62, 8, 160, 32);
    const mat3 = new THREE.ShaderMaterial({
      vertexShader: silkVertexShader,
      fragmentShader: silkFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uWaveSpeed: { value: 0.6 * speedFactor },
        uWaveFreq: { value: 0.13 },
        uWaveAmp: { value: 2.4 },
        uRibbonOffset: { value: 4.5 },
        uColor1: { value: new THREE.Color(0x051a4a) },
        uColor2: { value: new THREE.Color(0x1d4ed8) },
        uColor3: { value: new THREE.Color(0x38bdf8) },
        uColorGold: { value: new THREE.Color(0xffde59) },
        uOpacity: { value: 0.45 },
      },
    });
    const mesh3 = new THREE.Mesh(geo3, mat3);
    mesh3.position.set(-4, 2.5, -4);
    mesh3.rotation.set(-0.35, 0.1, -0.08);
    ribbonGroup.add(mesh3);
    ribbons.push({ mesh: mesh3, material: mat3 });

    // 5. Ambient Floating Silk Dust / Sparkle Particles (Gold & Cyan)
    const particleCount = 1600;
    const particlePos = new Float32Array(particleCount * 3);
    const particleCol = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x38bdf8);
    const cBlue = new THREE.Color(0x60a5fa);
    const cGold = new THREE.Color(0xffde59);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 48;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;

      const pick = Math.random();
      const col = pick < 0.4 ? cCyan : pick < 0.75 ? cBlue : cGold;
      particleCol[i * 3] = col.r;
      particleCol[i * 3 + 1] = col.g;
      particleCol[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleCol, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Scroll Integration & Resize (Autonomous Motion, No Pointer/Mouse Sway)
    let targetScrollY = 0;
    let currentScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // 7. Fully Autonomous Animation Loop
    const clock = new THREE.Clock();
    let animId: number;
    const staticMouse = new THREE.Vector2(0, 0);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth scroll interpolation
      currentScrollY += (targetScrollY - currentScrollY) * 0.05;

      // Update Ribbon Shaders (Pure Autonomous Time Waves)
      ribbons.forEach((r) => {
        r.material.uniforms.uTime.value = elapsed;
        r.material.uniforms.uMouse.value.copy(staticMouse);
      });

      // Subtle group sway & scroll parallax
      ribbonGroup.rotation.y = Math.sin(elapsed * 0.2) * 0.04;
      ribbonGroup.rotation.x = Math.cos(elapsed * 0.18) * 0.03;
      ribbonGroup.position.y = -currentScrollY * 0.003;
      ribbonGroup.rotation.z = Math.sin(currentScrollY * 0.0008) * 0.04;

      // Particles slow drift
      particles.rotation.y = elapsed * 0.012;
      particles.rotation.x = Math.sin(elapsed * 0.08) * 0.01;

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      // Memory cleanup
      geo1.dispose();
      mat1.dispose();
      geo2.dispose();
      mat2.dispose();
      geo3.dispose();
      mat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="scene3d"
        className="fixed inset-0 w-full h-full block z-0 pointer-events-none"
      />
      {/* Subtle radial ambient light layer */}
      <div className="overlay-3d" />
    </>
  );
}
