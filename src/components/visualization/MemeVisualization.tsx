'use client';

import * as THREE from 'three';

import React, { useEffect, useRef } from 'react';

import { Meme } from '@/types/meme';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { conceptNodes } from '@/data/foundational-memes';

interface MemeVisualizationProps {
  memes: Meme[];
  selectedMeme?: Meme | null;
  onSelectMeme?: (meme: Meme) => void;
}

export function MemeVisualization({ 
  memes, 
  selectedMeme, 
  onSelectMeme 
}: MemeVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const memeObjectsRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  // Initialize the scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Add grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
    scene.add(gridHelper);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Handle mouse click for selecting memes
    const handleMouseClick = (event: MouseEvent) => {
      if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;

      // Calculate mouse position in normalized device coordinates
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;

      // Raycasting to detect intersections
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children);

      if (intersects.length > 0) {
        const object = intersects[0].object;
        const memeId = object.userData.memeId;
        
        if (memeId) {
          const clickedMeme = memes.find(m => m.id === memeId);
          if (clickedMeme && onSelectMeme) {
            onSelectMeme(clickedMeme);
          }
        }
      }
    };

    containerRef.current.addEventListener('click', handleMouseClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && cameraRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleMouseClick);
        if (rendererRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [memes, onSelectMeme]);

  // Update the scene with memes
  useEffect(() => {
    if (!sceneRef.current) return;

    // Clear previous meme objects
    memeObjectsRef.current.forEach((object) => {
      sceneRef.current?.remove(object);
    });
    memeObjectsRef.current.clear();

    console.log("Adding memes to scene:", memes.length);

    // Add meme spheres
    memes.forEach((meme) => {
      const geometry = new THREE.SphereGeometry(meme.size, 32, 32);
      const material = new THREE.MeshStandardMaterial({ 
        color: meme.color,
        roughness: 0.7,
        metalness: 0.2,
        transparent: true,
        opacity: selectedMeme && selectedMeme.id === meme.id ? 1.0 : 0.7
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(meme.position.x, meme.position.y, meme.position.z);
      sphere.userData.memeId = meme.id;
      
      sceneRef.current?.add(sphere);
      memeObjectsRef.current.set(meme.id, sphere);
    });

    console.log("Adding concept nodes to scene:", conceptNodes.length);
    
    // Add concept nodes
    conceptNodes.forEach((node) => {
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0x888888,
        roughness: 0.5,
        metalness: 0.5
      });
      
      const box = new THREE.Mesh(geometry, material);
      box.position.set(node.position.x, node.position.y, node.position.z);
      
      sceneRef.current?.add(box);
    });

    // Add connection lines between memes and concepts
    memes.forEach((meme) => {
      meme.influences.forEach((influence) => {
        const targetNode = conceptNodes.find(node => node.id === influence.targetConceptId);
        
        if (targetNode) {
          const points = [
            new THREE.Vector3(meme.position.x, meme.position.y, meme.position.z),
            new THREE.Vector3(targetNode.position.x, targetNode.position.y, targetNode.position.z)
          ];
          
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ 
            color: influence.influenceType === 'positive' ? 0x00ff00 : 
                  influence.influenceType === 'negative' ? 0xff0000 : 0x0000ff,
            opacity: 0.6,
            transparent: true
          });
          
          const line = new THREE.Line(geometry, material);
          sceneRef.current?.add(line);
        }
      });
    });

  }, [memes, selectedMeme]);

  return (
    <div>
      <div 
        ref={containerRef} 
        className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-200"
      />
      <div className="mt-2 text-xs text-gray-500">
        {memes.length} memes and {conceptNodes.length} concept nodes in scene
      </div>
    </div>
  );
}
