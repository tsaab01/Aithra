import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Bot } from 'lucide-react';
// @ts-ignore
import * as THREE from 'three';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Three.js Setup ---
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;

    // Renderer - Optimized for Performance
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    // Cap pixel ratio at 2 to avoid huge performance hits on Retina/4K screens
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- Objects ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Outer Wireframe Sphere (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.6, 1);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x8B5CF6, // Neon Violet
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const sphere = new THREE.Mesh(geometry, material);
    coreGroup.add(sphere);

    // 2. Inner Solid Core
    const innerGeo = new THREE.IcosahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshNormalMaterial({
      flatShading: true,
      transparent: true,
      opacity: 0.8
    });
    const core = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(core);

    // 3. Floating Particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 6; // Spread
    }
    
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x10B981, // Laser Emerald
      transparent: true,
      opacity: 0.6
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(particlesMesh);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x8B5CF6, 2);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // --- Mouse Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position relative to window center
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth Rotation based on mouse
      targetRotationX = mouseY * 2;
      targetRotationY = mouseX * 2;

      coreGroup.rotation.y += 0.005 + (targetRotationY - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += 0.002 + (targetRotationX - coreGroup.rotation.x) * 0.05;

      // Pulse Effect for Core
      const time = Date.now() * 0.001;
      core.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
      sphere.rotation.y -= 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section 
      id={SectionId.HERO} 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-nexus-dark"
    >
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <div className="space-y-8 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-card border border-white/10 text-nexus-accent text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-nexus-glow"></span>
              </span>
              AITHRA SYSTEM ONLINE
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-4">
              Scale Faster With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-accent to-nexus-glow">
                Intelligent AI
              </span>
            </h1>
            <p className="text-2xl text-gray-200 font-medium tracking-tight">
              Transforming businesses with intelligent automation.
            </p>
          </motion.div>

          <motion.p 
            className="text-gray-400 text-lg max-w-lg mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            We build custom AI agents, workflow automations, and intelligent systems that save you 40+ hours a week. Stop doing busy work.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button 
              onClick={() => document.getElementById(SectionId.AUDIT)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 via-emerald-500 to-violet-600 bg-[length:200%_auto] animate-gradient-x text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] flex items-center gap-2 border border-white/10"
            >
              Get Free Audit <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
               onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
               className="px-8 py-4 bg-nexus-card border border-nexus-accent text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-nexus-accent hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center gap-2"
            >
              Book a Free Consultation
            </button>

            <button 
               onClick={() => document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' })}
               className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 hover:border-nexus-accent/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              View Services
            </button>
          </motion.div>
        </div>

        {/* 3D Visual Area */}
        <div className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center">
          
          {/* Three.js Canvas Container */}
          <div ref={mountRef} className="absolute inset-0 z-10 cursor-move active:cursor-grabbing" title="Interactive 3D Model"></div>

          {/* Floating UI Elements (Overlay on top of Canvas) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute top-10 right-0 lg:right-10 z-20 pointer-events-none"
          >
            <div className="p-4 glass-card rounded-2xl flex items-center gap-3 shadow-2xl animate-float">
              <Zap className="w-6 h-6 text-yellow-400 fill-current" />
              <div>
                <div className="text-xs text-gray-400">Efficiency</div>
                <div className="font-bold text-white text-lg">+850%</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-20 left-0 lg:left-10 z-20 pointer-events-none"
          >
             <div className="p-4 glass-card rounded-2xl flex items-center gap-3 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
              <Globe className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-xs text-gray-400">Reach</div>
                <div className="font-bold text-white text-lg">Global</div>
              </div>
            </div>
          </motion.div>

           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute -bottom-4 right-20 z-20 pointer-events-none hidden lg:block"
          >
             <div className="px-4 py-2 glass-card rounded-full flex items-center gap-2 border border-nexus-accent/30">
              <div className="w-2 h-2 bg-nexus-glow rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-nexus-accent">AITHRA SYSTEM ONLINE</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;