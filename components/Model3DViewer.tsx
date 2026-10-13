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

// Module-level cache for loaded GLTF objects to avoid re-parsing
const gltfObjectCache = new Map<string, THREE.Group>();

export default function Model3DViewer({ className = "" }: Model3DViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // References to switch visible models smoothly without tearing down the WebGL context
  const activeIndexRef = useRef(0);
  const azureSubGroupRef = useRef<THREE.Group | null>(null);
  const ribbonSubGroupRef = useRef<THREE.Group | null>(null);

  const currentModel = SHOWCASE_MODELS[activeIndex];

  // Rotate between showcase models every 9s
  useEffect(() => {
    const autoTimer = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 9000);

    return () => clearInterval(autoTimer);
  }, []);

  // Update visibility ref and sub-groups smoothly without re-initializing Three.js
  useEffect(() => {
    activeIndexRef.current = activeIndex;
    if (azureSubGroupRef.current) {
      azureSubGroupRef.current.visible = activeIndex === 0;
    }
    if (ribbonSubGroupRef.current) {
      ribbonSubGroupRef.current.visible = activeIndex === 1;
    }
  }, [activeIndex]);

  // Main Three.js Scene Lifecycle (Initialized ONCE on mount)
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
    const isMobile = window.innerWidth < 768;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Adjusted framing for mobile vs desktop)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, isMobile ? 1.0 : 1.2, isMobile ? 5.4 : 4.8);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer (Ultra-optimized pixel ratio & memory limits)
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

    // 4. Lighting with Solvia Palette (Royal Blue & Golden Yellow #FFDE59)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x7ebbff, 0x0a1936, 1.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const blueFill = new THREE.DirectionalLight(0x38bdf8, 2.2);
    blueFill.position.set(-6, 3, -4);
    scene.add(blueFill);

    const goldRim = new THREE.PointLight(0xffde59, 4.2, 18);
    goldRim.position.set(3, -1.5, 3);
    scene.add(goldRim);

    const cyanUplight = new THREE.PointLight(0x2563eb, 3.2, 16);
    cyanUplight.position.set(-3, -2, 2);
    scene.add(cyanUplight);

    // 5. Model Groups (Persistent containers for model switching)
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const azureSubGroup = new THREE.Group();
    const ribbonSubGroup = new THREE.Group();
    modelGroup.add(azureSubGroup);
    modelGroup.add(ribbonSubGroup);

    azureSubGroupRef.current = azureSubGroup;
    ribbonSubGroupRef.current = ribbonSubGroup;

    azureSubGroup.visible = activeIndexRef.current === 0;
    ribbonSubGroup.visible = activeIndexRef.current === 1;

    const loader = new GLTFLoader();

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
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.roughness = Math.min(mat.roughness ?? 0.35, 0.55);
            mat.metalness = Math.max(mat.metalness ?? 0.2, 0.35);
          }
        }
      });
      return object;
    };

    // Load Model 0 (Azure Emblem - 14.5 MB) immediately
    const azureUrl = SHOWCASE_MODELS[0].path;
    if (gltfObjectCache.has(azureUrl)) {
      const cached = gltfObjectCache.get(azureUrl)!.clone(true);
      normalizeModel(cached, 2.3);
      azureSubGroup.add(cached);
      setLoading(false);
    } else {
      loader.load(
        azureUrl,
        (gltf) => {
          const raw = gltf.scene;
          gltfObjectCache.set(azureUrl, raw.clone(true));
          normalizeModel(raw, 2.3);
          azureSubGroup.add(raw);
          setLoading(false);
        },
        (xhr) => {
          if (xhr.total > 0) {
            setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },
        (err) => {
          console.error("Failed to load 3D Azure model:", err);
          setError("Model 3D otomatis dialihkan ke mode fallback");
          setLoading(false);
        }
      );
    }

    // Load Model 1 (Radiant Ribbon Runner):
    // On desktop, load in background after initial render so it never blocks page load.
    // On mobile, keep it super light using the procedural glowing ribbon mesh to save 101 MB data and GPU RAM.
    const ribbonUrl = SHOWCASE_MODELS[1].path;
    if (!isMobile) {
      setTimeout(() => {
        if (gltfObjectCache.has(ribbonUrl)) {
          const cached = gltfObjectCache.get(ribbonUrl)!.clone(true);
          normalizeModel(cached, 2.3);
          ribbonSubGroup.add(cached);
        } else {
          loader.load(
            ribbonUrl,
            (gltf) => {
              const raw = gltf.scene;
              gltfObjectCache.set(ribbonUrl, raw.clone(true));
              normalizeModel(raw, 2.3);
              ribbonSubGroup.add(raw);
            },
            undefined,
            (err) => {
              console.warn("Background load of heavy 3D ribbon runner bypassed:", err);
            }
          );
        }
      }, 1200);
    }

    // 6. Dynamic Procedural Silk Ribbons (Swirling Ambient Accents)
    const ribbonContainer = new THREE.Group();
    scene.add(ribbonContainer);

    // Primary Flowing Blue Ribbon
    const ribbonPoints1: THREE.Vector3[] = [];
    const pointsCount1 = isMobile ? 60 : 100;
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
    const tubeGeo1 = new THREE.TubeGeometry(curve1, isMobile ? 40 : 70, 0.07, isMobile ? 6 : 8, false);

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

    // Secondary Accent Ribbon (Counter-Twisting)
    const ribbonPoints2: THREE.Vector3[] = [];
    const pointsCount2 = isMobile ? 50 : 80;
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
    const tubeGeo2 = new THREE.TubeGeometry(curve2, isMobile ? 35 : 60, 0.04, isMobile ? 6 : 8, false);

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

    // 7. Holographic Base Rings
    const baseGroup = new THREE.Group();
    scene.add(baseGroup);

    const ringOuterGeo = new THREE.RingGeometry(1.7, 1.76, isMobile ? 32 : 48);
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

    const ringInnerGeo = new THREE.RingGeometry(1.2, 1.24, isMobile ? 32 : 48);
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

    // Lightweight Floating Dust Particles (60 points instead of 100)
    const dustCount = isMobile ? 40 : 60;
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

    // 8. Resize & Visibility Handlers
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let isVisible = true;
    let isTabVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 9. Fully Autonomous Animation Loop with Smart FPS Capping
    let animId: number;
    const clock = new THREE.Clock();
    const targetInterval = isMobile ? 1000 / 32 : 1000 / 60;
    let lastRenderTime = 0;

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);

      // Skip render completely if off-screen or tab in background
      if (!isVisible || !isTabVisible) return;

      // Frame rate limiter (prevents high refresh rate GPU heating)
      if (currentTime - lastRenderTime < targetInterval) return;
      lastRenderTime = currentTime;

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

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

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
  }, []); // Run ONCE on mount! No context tearing!

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[360px] sm:h-[480px] lg:h-[510px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#03091e]/85 via-[#020611]/90 to-[#020611] border border-blue-400/30 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {/* 3D Canvas (Non-interactive, pure ambient visual) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none z-10"
      />

      {/* Top Automated Presentation Status Bar */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#020611]/90 border border-blue-400/40 backdrop-blur-md shadow-lg">
          <div className="w-2 h-2 rounded-full bg-[#ffde59] shadow-[0_0_10px_#ffde59] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-extrabold text-white tracking-wide uppercase">
            {currentModel.badge}
          </span>
        </div>

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
