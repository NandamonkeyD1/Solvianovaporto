"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Sparkles, Box } from "lucide-react";

export interface ModelShowcaseItem {
  id: "azure" | "ribbon";
  name: string;
  badge: string;
  path: string;
  description: string;
  details: string;
}

export const SHOWCASE_MODELS: ModelShowcaseItem[] = [
  {
    id: "azure",
    name: "Solvia Azure Emblem",
    badge: "Solvia Digital Solution",
    path: "/assets/3D/Meshy_AI_Azure_Invitation_1012015755_texture.glb",
    description: "Emblem utama Solvia Nova — Simbol Inovasi Solusi Digital Modern",
    details: "14.5 MB • GLTF 2.0 • Solusi Digital",
  },
  {
    id: "ribbon",
    name: "Radiant Ribbon Runner",
    badge: "Selendang 3D Dinamis",
    path: "/assets/3D/Meshy_AI_Radiant_Ribbon_Runner_1012035542_texture.glb",
    description: "Selendang 3D Dinamis — Aliran Energi & Kreativitas Digital",
    details: "Dynamic Mesh • High Detail • Visual Imersif",
  },
];

interface Model3DViewerProps {
  className?: string;
}

// Module-level cache for loaded GLTF objects
const gltfObjectCache = new Map<string, THREE.Group>();

export default function Model3DViewer({ className = "" }: Model3DViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const currentModel = SHOWCASE_MODELS[activeIndex];

  // Autonomous automation: Automatically rotate/alternate between 3D assets every 9 seconds
  useEffect(() => {
    const autoTimer = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 9000);

    return () => clearInterval(autoTimer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL availability
    const isWebGLAvailable = () => {
      try {
        const testCanvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    };

    if (!isWebGLAvailable()) {
      setError("WebGL tidak didukung pada browser ini");
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadProgress(0);
    setError(null);

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Fixed ideal viewing angle, non-interactive)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.8);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer (Lightweight & optimized pixel ratio)
    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.35));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 4. Studio Lighting with Solvia Nova Palette (Royal Blue & Golden Yellow #FFDE59)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x7ebbff, 0x0a1936, 1.8);
    scene.add(hemiLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    // Fill Light (Solvia Electric Blue)
    const blueFill = new THREE.DirectionalLight(0x38bdf8, 2.2);
    blueFill.position.set(-6, 3, -4);
    scene.add(blueFill);

    // Rim Accent Light (Golden Yellow #FFDE59)
    const goldRim = new THREE.PointLight(0xffde59, 4.2, 18);
    goldRim.position.set(3, -1.5, 3);
    scene.add(goldRim);

    // Cyan Bottom Uplight
    const cyanUplight = new THREE.PointLight(0x2563eb, 3.2, 16);
    cyanUplight.position.set(-3, -2, 2);
    scene.add(cyanUplight);

    // 5. Model Root Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const loader = new GLTFLoader();

    // Helper to normalize and center GLTF object
    const normalizeModel = (object: THREE.Group, targetScaleFactor: number) => {
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const targetScale = targetScaleFactor / (maxDim || 1);
      object.scale.setScalar(targetScale);

      object.position.x = -center.x * targetScale;
      object.position.y = -center.y * targetScale;
      object.position.z = -center.z * targetScale;

      object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.roughness = Math.min(mat.roughness ?? 0.35, 0.55);
            mat.metalness = Math.max(mat.metalness ?? 0.2, 0.35);
          }
        }
      });
      return object;
    };

    const targetUrl = currentModel.path;

    if (gltfObjectCache.has(targetUrl)) {
      const cached = gltfObjectCache.get(targetUrl)!.clone(true);
      normalizeModel(cached, 2.3);
      modelGroup.add(cached);
      setLoading(false);
    } else {
      loader.load(
        targetUrl,
        (gltf) => {
          const raw = gltf.scene;
          gltfObjectCache.set(targetUrl, raw.clone(true));
          normalizeModel(raw, 2.3);
          modelGroup.add(raw);
          setLoading(false);
        },
        (xhr) => {
          if (xhr.total > 0) {
            setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },
        (err) => {
          console.error("Failed to load 3D model:", err);
          setError("Model 3D otomatis dialihkan ke mode fallback");
          setLoading(false);
        }
      );
    }

    // 6. Dynamic Procedural Silk Ribbons (Swirling Ambient Accents)
    const ribbonContainer = new THREE.Group();
    scene.add(ribbonContainer);

    // Ribbon Path 1: Primary Flowing Blue Ribbon
    const ribbonPoints1: THREE.Vector3[] = [];
    const pointsCount1 = 120;
    for (let i = 0; i <= pointsCount1; i++) {
      const t = i / pointsCount1;
      const angle = t * Math.PI * 4.2;
      const radius = 1.7 + Math.sin(t * Math.PI * 3) * 0.45;
      const y = -1.3 + t * 2.8 + Math.cos(angle * 1.5) * 0.25;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      ribbonPoints1.push(new THREE.Vector3(x, y, z));
    }
    const curve1 = new THREE.CatmullRomCurve3(ribbonPoints1);
    const tubeGeo1 = new THREE.TubeGeometry(curve1, 80, 0.07, 10, false);

    const ribbonVertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const ribbonFragmentShader = `
      uniform vec3 uColorBlue;
      uniform vec3 uColorCyan;
      uniform vec3 uColorGold;
      uniform float uTime;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);
        float wave = sin(vUv.x * 24.0 - uTime * 2.5);
        vec3 col = mix(uColorBlue, uColorCyan, smoothstep(-0.6, 0.6, wave));

        float goldTrim = pow(smoothstep(0.4, 0.95, sin(vUv.x * 12.0 + uTime * 1.2)), 3.0);
        col = mix(col, uColorGold, goldTrim * 0.65);

        col += mix(uColorCyan, uColorGold, 0.5) * fresnel * 0.75;
        float tipFade = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);
        float alpha = (0.75 + fresnel * 0.25) * tipFade;

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const ribbonMat1 = new THREE.ShaderMaterial({
      vertexShader: ribbonVertexShader,
      fragmentShader: ribbonFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uColorBlue: { value: new THREE.Color(0x1d4ed8) },
        uColorCyan: { value: new THREE.Color(0x38bdf8) },
        uColorGold: { value: new THREE.Color(0xffde59) },
        uTime: { value: 0 },
      },
    });

    const ribbonMesh1 = new THREE.Mesh(tubeGeo1, ribbonMat1);
    ribbonContainer.add(ribbonMesh1);

    // Ribbon Path 2: Golden Accent Silk Ribbon (Counter-Twisting)
    const ribbonPoints2: THREE.Vector3[] = [];
    const pointsCount2 = 100;
    for (let i = 0; i <= pointsCount2; i++) {
      const t = i / pointsCount2;
      const angle = -t * Math.PI * 3.8 + 1.2;
      const radius = 1.95 + Math.cos(t * Math.PI * 2.5) * 0.35;
      const y = -1.1 + t * 2.5 + Math.sin(angle * 1.8) * 0.3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      ribbonPoints2.push(new THREE.Vector3(x, y, z));
    }
    const curve2 = new THREE.CatmullRomCurve3(ribbonPoints2);
    const tubeGeo2 = new THREE.TubeGeometry(curve2, 70, 0.04, 10, false);

    const ribbonMat2 = new THREE.ShaderMaterial({
      vertexShader: ribbonVertexShader,
      fragmentShader: ribbonFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uColorBlue: { value: new THREE.Color(0xffde59) },
        uColorCyan: { value: new THREE.Color(0xfff3a1) },
        uColorGold: { value: new THREE.Color(0x38bdf8) },
        uTime: { value: 1.5 },
      },
    });

    const ribbonMesh2 = new THREE.Mesh(tubeGeo2, ribbonMat2);
    ribbonContainer.add(ribbonMesh2);

    // 7. Holographic Base Rings (Pedestal)
    const baseGroup = new THREE.Group();
    scene.add(baseGroup);

    const ringOuterGeo = new THREE.RingGeometry(1.7, 1.76, 48);
    const ringOuterMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringOuter = new THREE.Mesh(ringOuterGeo, ringOuterMat);
    ringOuter.rotation.x = -Math.PI / 2;
    ringOuter.position.y = -1.35;
    baseGroup.add(ringOuter);

    const ringInnerGeo = new THREE.RingGeometry(1.2, 1.24, 48);
    const ringInnerMat = new THREE.MeshBasicMaterial({
      color: 0xffde59,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ringInner = new THREE.Mesh(ringInnerGeo, ringInnerMat);
    ringInner.rotation.x = -Math.PI / 2;
    ringInner.position.y = -1.35;
    baseGroup.add(ringInner);

    // Floating Stardust Particles
    const dustCount = 100;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const cGold = new THREE.Color(0xffde59);
    const cCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < dustCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.3 + Math.random() * 1.5;
      dustPositions[i * 3] = Math.cos(a) * r;
      dustPositions[i * 3 + 1] = -1.4 + Math.random() * 3.0;
      dustPositions[i * 3 + 2] = Math.sin(a) * r;

      const c = Math.random() < 0.45 ? cGold : cCyan;
      dustColors[i * 3] = c.r;
      dustColors[i * 3 + 1] = c.g;
      dustColors[i * 3 + 2] = c.b;
    }

    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Visibility Check (Performance Optimization)
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 9. Fully Autonomous Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Update Ribbon Shaders
      ribbonMat1.uniforms.uTime.value = elapsed;
      ribbonMat2.uniforms.uTime.value = elapsed;

      // Pure Autonomous Rotation: Smooth auto-rotation & floating bob
      modelGroup.rotation.y = elapsed * 0.4;
      modelGroup.position.y = Math.sin(elapsed * 1.4) * 0.08;

      // Counter-rotating flowing 3D Ribbon Selendang
      ribbonContainer.rotation.y = -elapsed * 0.3;
      ribbonContainer.rotation.x = Math.sin(elapsed * 0.5) * 0.07;
      ribbonContainer.position.y = Math.sin(elapsed * 1.2) * 0.05;

      // Base ring rotation
      baseGroup.rotation.y = elapsed * 0.18;

      // Dust slow float
      dust.rotation.y = elapsed * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      // Memory cleanup
      tubeGeo1.dispose();
      ribbonMat1.dispose();
      tubeGeo2.dispose();
      ribbonMat2.dispose();
      ringOuterGeo.dispose();
      ringOuterMat.dispose();
      ringInnerGeo.dispose();
      ringInnerMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[420px] sm:h-[480px] lg:h-[510px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#03091e]/85 via-[#020611]/90 to-[#020611] border border-blue-400/30 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {/* 3D Canvas (Non-interactive, pure ambient visual) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none z-10"
      />

      {/* Top Automated Presentation Status Bar (No manual buttons) */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
        {/* Left Badge with pulse */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#020611]/90 border border-blue-400/40 backdrop-blur-md shadow-lg">
          <div className="w-2 h-2 rounded-full bg-[#ffde59] shadow-[0_0_10px_#ffde59] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-extrabold text-white tracking-wide uppercase">
            {currentModel.badge}
          </span>
        </div>

        {/* Right Automated Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#020611]/85 border border-blue-400/30 backdrop-blur-md shadow-lg">
          <span className="text-[10px] font-mono text-blue-300 font-bold">
            Auto-Showcase {activeIndex + 1}/{SHOWCASE_MODELS.length}
          </span>
          <div className="flex gap-1 items-center">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === 0 ? "bg-[#ffde59] w-3" : "bg-blue-600"
              }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === 1 ? "bg-[#ffde59] w-3" : "bg-blue-600"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#020611]/90 backdrop-blur-md space-y-4 pointer-events-none">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-t-[#ffde59] border-r-transparent animate-spin" />
            <div className="w-full h-full flex items-center justify-center">
              <Box className="w-6 h-6 text-[#38bdf8] animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-xs font-bold text-white tracking-wide">
              Menyiapkan {currentModel.name}...
            </div>
            {loadProgress > 0 && (
              <div className="text-[11px] font-mono text-[#ffde59] font-bold">
                {loadProgress}%
              </div>
            )}
            <div className="text-[10px] text-blue-300">Solvia Nova Digital Solution</div>
          </div>
        </div>
      )}

      {/* Error Fallback Card */}
      {error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#020611]/90 p-6 text-center space-y-3 pointer-events-none">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[#ffde59]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="text-white font-bold text-sm">Solvia Nova Digital Solution</div>
          <p className="text-slate-400 text-xs max-w-xs">
            Solusi digital 3D modern dengan performa tinggi untuk bisnis Anda.
          </p>
        </div>
      )}

      {/* Bottom Automated Presentation Tag */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px] text-blue-200/90 bg-[#020611]/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-blue-400/30 shadow-lg pointer-events-none">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="w-3.5 h-3.5 text-[#ffde59] shrink-0" />
          <span className="font-semibold text-white truncate text-[11px] sm:text-xs">
            {currentModel.description}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#ffde59] font-bold shrink-0">
          <span>{currentModel.details}</span>
          <span className="text-blue-400">• Rotasi Otomatis</span>
        </div>
      </div>
    </div>
  );
}
