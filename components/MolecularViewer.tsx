
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { Theme } from '../types';
import { GANODERIC_ACID_DATA, BETA_GLUCAN_DATA } from './MolecularData';

interface MolecularViewerProps {
    type?: 'ganoderic' | 'betaglucan';
    theme?: Theme;
}

// Simplified types for our JSON data structure
interface AtomData {
    aid: number[];
    element: number[];
}

interface BondData {
    aid1: number[];
    aid2: number[];
    order: number[];
}

interface ConformerData {
    x: number[];
    y: number[];
    z: number[];
}

const MolecularViewer: React.FC<MolecularViewerProps> = ({ type = 'ganoderic', theme = 'dark' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null; 

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Adjust camera distance based on molecule size. Beta-glucan polymer is usually larger.
    camera.position.z = type === 'betaglucan' ? 25 : 20;
    camera.position.y = 0;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // --- Lights Adaptation ---
    const isDark = theme === 'dark';
    const ambientIntensity = isDark ? 0.4 : 0.8;
    const mainLightColor = 0xffffff;
    const rimLightColor = isDark ? 0x00f3ff : 0x0077ff; 
    
    const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(mainLightColor, 1.5);
    mainLight.position.set(10, 10, 15);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const rimLight = new THREE.SpotLight(rimLightColor, isDark ? 4 : 2);
    rimLight.position.set(-15, 5, -10);
    scene.add(rimLight);

    const bottomLight = new THREE.PointLight(isDark ? 0xffd700 : 0xffa500, 0.8);
    bottomLight.position.set(0, -15, 5);
    scene.add(bottomLight);

    // --- Molecule Construction from JSON ---
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // Select Data Source
    const sourceData = type === 'ganoderic' ? GANODERIC_ACID_DATA : BETA_GLUCAN_DATA;
    const compound = sourceData.PC_Compounds[0];
    const atomData = compound.atoms as AtomData;
    const bondData = compound.bonds as BondData;
    // @ts-ignore - Typescript might not infer deep JSON structure perfectly without strict types
    const conformer = compound.coords[0].conformers[0] as ConformerData;

    // Materials
    const atomMaterialCarbon = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x222222 : 0x444444, 
        metalness: 0.3,
        roughness: 0.3,
        clearcoat: 1.0,
    });

    const atomMaterialOxygen = new THREE.MeshPhysicalMaterial({
        color: 0xff0000,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 1.0,
        emissive: 0x550000,
        emissiveIntensity: 0.2
    });

    const atomMaterialHydrogen = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.0,
        roughness: 0.1,
        transparent: true,
        opacity: isDark ? 0.8 : 0.5
    });

    const atomMaterialOther = new THREE.MeshPhysicalMaterial({
        color: 0x00ff00, // Default for other elements
        metalness: 0.2,
        roughness: 0.5
    });

    const bondMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        roughness: 0.4,
        metalness: 0.6
    });

    // Helper to create atoms
    const atomMeshes = new Map<number, THREE.Vector3>(); // Map AID to Position

    const createAtomMesh = (pos: THREE.Vector3, element: number) => {
        let geo;
        let mat;
        
        if (element === 6) { // Carbon
            geo = new THREE.SphereGeometry(0.4, 32, 32);
            mat = atomMaterialCarbon;
        } else if (element === 8) { // Oxygen
            geo = new THREE.SphereGeometry(0.38, 32, 32);
            mat = atomMaterialOxygen;
        } else if (element === 1) { // Hydrogen
            geo = new THREE.SphereGeometry(0.25, 16, 16);
            mat = atomMaterialHydrogen;
        } else {
            geo = new THREE.SphereGeometry(0.4, 32, 32);
            mat = atomMaterialOther;
        }

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        moleculeGroup.add(mesh);
    };

    // 1. Place Atoms
    for (let i = 0; i < atomData.aid.length; i++) {
        const aid = atomData.aid[i];
        const element = atomData.element[i];
        const x = conformer.x[i];
        const y = conformer.y[i];
        const z = conformer.z[i];
        
        const pos = new THREE.Vector3(x, y, z);
        atomMeshes.set(aid, pos);
        createAtomMesh(pos, element);
    }

    // 2. Place Bonds
    if (bondData && bondData.aid1) {
        for (let i = 0; i < bondData.aid1.length; i++) {
            const id1 = bondData.aid1[i];
            const id2 = bondData.aid2[i];
            const order = bondData.order[i]; // 1=single, 2=double

            const pos1 = atomMeshes.get(id1);
            const pos2 = atomMeshes.get(id2);

            if (pos1 && pos2) {
                const direction = new THREE.Vector3().subVectors(pos2, pos1);
                const length = direction.length();
                
                // Double bond visualization (two thinner cylinders) vs Single bond
                if (order === 2) {
                    const offset = 0.1;
                    const axis = new THREE.Vector3(0, 1, 0); // Cylinder default axis
                    const orientation = new THREE.Quaternion();
                    orientation.setFromUnitVectors(axis, direction.clone().normalize());

                    // Calculate an offset vector perpendicular to the bond
                    // We can take cross product with an arbitrary vector (e.g. Y or Z)
                    let perp = new THREE.Vector3(0,0,1).cross(direction).normalize().multiplyScalar(offset);
                    if (perp.lengthSq() < 0.001) perp = new THREE.Vector3(1,0,0).cross(direction).normalize().multiplyScalar(offset);

                    const p1_a = pos1.clone().add(perp);
                    const p2_a = pos2.clone().add(perp);
                    const p1_b = pos1.clone().sub(perp);
                    const p2_b = pos2.clone().sub(perp);

                    const geo = new THREE.CylinderGeometry(0.05, 0.05, length, 8, 1);
                    
                    const meshA = new THREE.Mesh(geo, bondMaterial);
                    meshA.position.copy(p1_a).add(new THREE.Vector3().subVectors(p2_a, p1_a).multiplyScalar(0.5));
                    meshA.setRotationFromQuaternion(orientation);
                    moleculeGroup.add(meshA);

                    const meshB = new THREE.Mesh(geo, bondMaterial);
                    meshB.position.copy(p1_b).add(new THREE.Vector3().subVectors(p2_b, p1_b).multiplyScalar(0.5));
                    meshB.setRotationFromQuaternion(orientation);
                    moleculeGroup.add(meshB);

                } else {
                    // Single Bond
                    const geometry = new THREE.CylinderGeometry(0.1, 0.1, length, 8, 1);
                    const mesh = new THREE.Mesh(geometry, bondMaterial);
                    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
                    mesh.position.copy(pos1).add(direction.multiplyScalar(0.5));
                    mesh.castShadow = true;
                    moleculeGroup.add(mesh);
                }
            }
        }
    }

    // Center the group
    const box = new THREE.Box3().setFromObject(moleculeGroup);
    const center = box.getCenter(new THREE.Vector3());
    moleculeGroup.position.sub(center);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.enableZoom = true;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
        if (mountRef.current) {
            const w = mountRef.current.clientWidth;
            const h = mountRef.current.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type, theme]);

  return <div ref={mountRef} className="w-full h-full cursor-move" title="Drag to rotate, Scroll to zoom" />;
};

export default MolecularViewer;
