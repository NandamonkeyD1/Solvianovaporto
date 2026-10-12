"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCw, Sparkles, Box, Maximize2 } from "lucide-react";

interface Model3DViewerProps {
  modelPath?: string;
  className?: string;
}

export default function Model3DViewer({
  modelPath = "/assets/3D/Meshy_AI_Azure_Invitation_1012015755_texture.glb",
  className = "",
}: Model3DViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 4.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 4. Lighting setup (studio lighting with azure & blue accents)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x7ebbff, 0x0a1936, 1.6);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.2);
    dirLight2.position.set(-5, 3, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x60a5fa, 3.5, 20);
    pointLight.position.set(0, -2, 3);
    scene.add(pointLight);

    // 5. Holographic Pedestal / Grid ring
    const gridGroup = new THREE.Group();
    scene.add(gridGroup);

    const ringGeometry = new THREE.RingGeometry(1.6, 1.7, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -1.2;
    gridGroup.add(ringMesh);

    const ringInnerGeometry = new THREE.RingGeometry(1.1, 1.15, 64);
    const ringInnerMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringInnerMesh = new THREE.Mesh(ringInnerGeometry, ringInnerMaterial);
    ringInnerMesh.rotation.x = -Math.PI / 2;
    ringInnerMesh.position.y = -1.2;
    gridGroup.add(ringInnerMesh);

    // 6. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.8;
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't flip below ground
    controlsRef.current = controls;

    // 7. Load GLB Model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const object = gltf.scene;

        // Auto-center and normalize model size
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 2.2 / (maxDim || 1);
        object.scale.setScalar(targetScale);

        // Center on origin
        object.position.x = -center.x * targetScale;
        object.position.y = -center.y * targetScale;
        object.position.z = -center.z * targetScale;

        // Enable shadows & refine materials
        object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.min(mat.roughness ?? 0.4, 0.6);
              mat.metalness = Math.max(mat.metalness ?? 0.2, 0.3);
            }
          }
        });

        modelGroup.add(object);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(percent);
        }
      },
      (err) => {
        console.error("Error loading 3D model:", err);
        setError("Gagal memuat model 3D");
        setLoading(false);
      }
    );

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow floating effect for model group
      if (modelGroup) {
        modelGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
      }

      // Rotate pedestal rings slowly
      gridGroup.rotation.y = elapsed * 0.2;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, [modelPath]);

  // Sync autoRotate state
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      setAutoRotate(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#03091e]/80 via-[#020611]/90 to-[#020611] border border-blue-400/30 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing z-10"
      />

      {/* Header Info Tag */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-400/30 backdrop-blur-md">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[11px] font-bold text-white tracking-wide uppercase">
          Live 3D Model Solvia
        </span>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all active:scale-95 text-xs font-semibold flex items-center gap-1.5 ${
            autoRotate
              ? "bg-blue-600/40 border-blue-400/60 text-white shadow-md shadow-blue-500/30"
              : "bg-blue-950/40 border-blue-500/20 text-slate-300 hover:text-white"
          }`}
          title="Putar Otomatis"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline text-[10px]">Putar</span>
        </button>

        <button
          onClick={handleResetCamera}
          className="p-2 rounded-xl bg-blue-950/40 border border-blue-500/20 text-slate-300 hover:text-white backdrop-blur-md transition-all active:scale-95 text-xs"
          title="Reset Sudut Pandang"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#020611]/85 backdrop-blur-md space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-t-[#38bdf8] border-r-transparent animate-spin" />
            <div className="w-full h-full flex items-center justify-center">
              <Box className="w-6 h-6 text-[#38bdf8] animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-xs font-bold text-white tracking-wide">
              Memuat Aset 3D...
            </div>
            {loadProgress > 0 && (
              <div className="text-[11px] font-mono text-blue-300">
                {loadProgress}%
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#020611]/90 p-6 text-center space-y-2">
          <div className="text-red-400 text-xs font-bold">{error}</div>
          <div className="text-[11px] text-slate-400">
            Periksa file di public/assets/3D
          </div>
        </div>
      )}

      {/* Bottom Floating Footer / Hint */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] text-blue-200/80 bg-blue-950/40 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-400/20">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium">Sentuh / Geser mouse untuk rotasi 360°</span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] text-blue-400">
          GLTF 2.0 • 3D Render
        </span>
      </div>
    </div>
  );
}
