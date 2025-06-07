import React, {useRef, useEffect, useState} from 'react';
import * as THREE from 'three';

const TreeGrowthPhases = ({userScore}) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const treeElementsRef = useRef([]);
    const animationIdRef = useRef(null);
    const [score, setScore] = useState(0);
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        if (userScore) {
            setScore(userScore);
        }
    }, [userScore])

    // Define 15 growth phases (0-150 score)
    const getPhaseConfig = (currentPhase) => {
        const phases = [
            // Phase 0 (0-9): Seed
            {trunk: {height: 0, radiusTop: 0, radiusBottom: 0}, foliage: []},

            // Phase 1 (10-19): Tiny sprout
            {trunk: {height: 0.2, radiusTop: 0.05, radiusBottom: 0.05}, foliage: []},

            // Phase 2 (20-29): Small sprout with first leaves
            {
                trunk: {height: 0.4, radiusTop: 0.08, radiusBottom: 0.1},
                foliage: [{radius: 0.3, height: 0.3, y: 0.5}]
            },

            // Phase 3 (30-39): Growing sapling
            {
                trunk: {height: 0.8, radiusTop: 0.1, radiusBottom: 0.15},
                foliage: [{radius: 0.5, height: 0.5, y: 0.9}]
            },

            // Phase 4 (40-49): Young tree
            {
                trunk: {height: 1.2, radiusTop: 0.15, radiusBottom: 0.2},
                foliage: [{radius: 0.8, height: 0.8, y: 1.4}]
            },

            // Phase 5 (50-59): Developing tree
            {
                trunk: {height: 1.6, radiusTop: 0.18, radiusBottom: 0.25},
                foliage: [
                    {radius: 1.0, height: 1.0, y: 1.8},
                    {radius: 0.7, height: 0.8, y: 2.3}
                ]
            },

            // Phase 6 (60-69): Growing tree
            {
                trunk: {height: 2.0, radiusTop: 0.2, radiusBottom: 0.3},
                foliage: [
                    {radius: 1.3, height: 1.3, y: 2.3},
                    {radius: 1.0, height: 1.0, y: 2.8},
                    {radius: 0.7, height: 0.8, y: 3.3}
                ]
            },

            // Phase 7 (70-79): Maturing tree
            {
                trunk: {height: 2.4, radiusTop: 0.22, radiusBottom: 0.35},
                foliage: [
                    {radius: 1.5, height: 1.5, y: 2.7},
                    {radius: 1.2, height: 1.2, y: 3.3},
                    {radius: 0.9, height: 1.0, y: 3.8}
                ]
            },

            // Phase 8 (80-89): Strong tree
            {
                trunk: {height: 2.8, radiusTop: 0.25, radiusBottom: 0.4},
                foliage: [
                    {radius: 1.7, height: 1.7, y: 3.2},
                    {radius: 1.4, height: 1.4, y: 3.8},
                    {radius: 1.1, height: 1.2, y: 4.4}
                ]
            },

            // Phase 9 (90-99): Robust tree
            {
                trunk: {height: 3.2, radiusTop: 0.28, radiusBottom: 0.45},
                foliage: [
                    {radius: 1.9, height: 1.9, y: 3.6},
                    {radius: 1.6, height: 1.6, y: 4.3},
                    {radius: 1.3, height: 1.4, y: 5.0}
                ]
            },

            // Phase 10 (100-109): Large tree
            {
                trunk: {height: 3.6, radiusTop: 0.3, radiusBottom: 0.5},
                foliage: [
                    {radius: 2.1, height: 2.1, y: 4.0},
                    {radius: 1.8, height: 1.8, y: 4.8},
                    {radius: 1.5, height: 1.6, y: 5.5}
                ]
            },

            // Phase 11 (110-119): Magnificent tree
            {
                trunk: {height: 4.0, radiusTop: 0.32, radiusBottom: 0.55},
                foliage: [
                    {radius: 2.3, height: 2.3, y: 4.4},
                    {radius: 2.0, height: 2.0, y: 5.2},
                    {radius: 1.7, height: 1.8, y: 6.0}
                ]
            },

            // Phase 12 (120-129): Towering tree
            {
                trunk: {height: 4.4, radiusTop: 0.35, radiusBottom: 0.6},
                foliage: [
                    {radius: 2.5, height: 2.5, y: 4.8},
                    {radius: 2.2, height: 2.2, y: 5.7},
                    {radius: 1.9, height: 2.0, y: 6.5}
                ]
            },

            // Phase 13 (130-139): Majestic tree
            {
                trunk: {height: 4.8, radiusTop: 0.38, radiusBottom: 0.65},
                foliage: [
                    {radius: 2.7, height: 2.7, y: 5.2},
                    {radius: 2.4, height: 2.4, y: 6.2},
                    {radius: 2.1, height: 2.2, y: 7.0}
                ]
            },

            // Phase 14 (140-150): Ancient tree
            {
                trunk: {height: 5.2, radiusTop: 0.4, radiusBottom: 0.7},
                foliage: [
                    {radius: 3.0, height: 3.0, y: 5.6},
                    {radius: 2.6, height: 2.6, y: 6.7},
                    {radius: 2.3, height: 2.4, y: 7.6}
                ]
            }
        ];

        return phases[currentPhase] || phases[0];
    };

    const updateTree = (newPhase) => {
        if (!sceneRef.current) return;

        const config = getPhaseConfig(newPhase);

        // Clear existing tree elements
        treeElementsRef.current.forEach(element => {
            sceneRef.current.remove(element);
        });
        treeElementsRef.current = [];

        // Create trunk if it has size
        if (config.trunk.height > 0) {
            const trunkGeometry = new THREE.CylinderGeometry(
                config.trunk.radiusTop,
                config.trunk.radiusBottom,
                config.trunk.height,
                8
            );
            const trunkMaterial = new THREE.MeshLambertMaterial({color: 0x8B4513});
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.y = config.trunk.height / 2;
            trunk.castShadow = true;
            sceneRef.current.add(trunk);
            treeElementsRef.current.push(trunk);
        }

        // Create foliage layers
        const leafMaterial = new THREE.MeshLambertMaterial({color: 0x228B22});
        config.foliage.forEach(layer => {
            const foliage = new THREE.Mesh(
                new THREE.ConeGeometry(layer.radius, layer.height, 8),
                leafMaterial
            );
            foliage.position.y = layer.y;
            foliage.castShadow = true;
            sceneRef.current.add(foliage);
            treeElementsRef.current.push(foliage);
        });

        // Add seed visualization for phase 0
        if (newPhase === 0) {
            const seedGeometry = new THREE.SphereGeometry(0.1, 8, 8);
            const seedMaterial = new THREE.MeshLambertMaterial({color: 0x8B4513});
            const seed = new THREE.Mesh(seedGeometry, seedMaterial);
            seed.position.y = 0.1;
            seed.castShadow = true;
            sceneRef.current.add(seed);
            treeElementsRef.current.push(seed);
        }
    };

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, (mountRef.current.clientWidth / mountRef.current.clientHeight), 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({antialias: true});

        const containerWidth = mountRef.current.clientWidth;
        const containerHeight = mountRef.current.clientHeight;
        renderer.setSize(containerWidth, containerHeight);
        renderer.setClearColor(0x87CEEB);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);

        // Ground
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshLambertMaterial({color: 0x90EE90});
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // Camera position
        camera.position.set(5, 4, 8);
        camera.lookAt(0, 3, 0);

        // Store references
        sceneRef.current = scene;
        rendererRef.current = renderer;
        cameraRef.current = camera;

        // Mouse controls
        let mouseX = 0;
        let mouseY = 0;
        let isMouseDown = false;

        const handleMouseDown = () => isMouseDown = true;
        const handleMouseUp = () => isMouseDown = false;
        const handleMouseMove = (event) => {
            if (isMouseDown) {
                const rect = mountRef.current.getBoundingClientRect();
                mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            }
        };

        const handleWheel = (event) => {
            camera.position.multiplyScalar(event.deltaY > 0 ? 1.1 : 0.9);
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('wheel', handleWheel);

        // Animation loop
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);

            if (isMouseDown) {
                const radius = 8;
                camera.position.x = Math.cos(mouseX * Math.PI) * radius;
                camera.position.z = Math.sin(mouseX * Math.PI) * radius;
                camera.position.y = 4 + mouseY * 3;
                camera.lookAt(0, 3, 0);
            }

            // Gentle swaying animation for foliage
            const time = Date.now() * 0.001;
            treeElementsRef.current.forEach((element, index) => {
                if (element.geometry && element.geometry.type === 'ConeGeometry') {
                    element.rotation.z = Math.sin(time + index * 0.1) * 0.02;
                }
            });

            renderer.render(scene, camera);
        };

        animate();

        // Window resize handler
        const handleResize = () => {
            if (!mountRef.current) return;
            const containerWidth = mountRef.current.clientWidth;
            const containerHeight = mountRef.current.clientHeight;
            camera.aspect = containerWidth / containerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerWidth, containerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Initial tree creation
        updateTree(0);

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('wheel', handleWheel);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    // Update tree when phase changes
    useEffect(() => {
        updateTree(phase);
    }, [phase]);

    // Calculate phase based on score
    useEffect(() => {
        const newPhase = Math.min(Math.floor(score / 10), 14);
        setPhase(newPhase);
    }, [score]);

    const handleScoreChange = (event) => {
        const newScore = parseInt(event.target.value);
        setScore(newScore);
    };

    const getPhaseDescription = (currentPhase) => {
        const descriptions = [
            "Seed - The beginning of life",
            "Sprout - First signs of growth",
            "Seedling - Tiny leaves emerge",
            "Young Sapling - Growing stronger",
            "Small Tree - Establishing roots",
            "Developing Tree - Multiple branches",
            "Growing Tree - Gaining height",
            "Maturing Tree - Strong structure",
            "Strong Tree - Robust growth",
            "Robust Tree - Impressive size",
            "Large Tree - Commanding presence",
            "Magnificent Tree - Natural beauty",
            "Towering Tree - Reaching skyward",
            "Majestic Tree - Awe-inspiring",
            "Ancient Tree - Timeless wisdom"
        ];
        return descriptions[currentPhase] || descriptions[0];
    };

    return (
        <div style={{position: 'relative', width: '50vw', height: '60vh', overflow: 'hidden'}}>
            <div ref={mountRef} style={{width: '100%', height: '100%'}}/>

            {/* Controls */}
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '15px',
                borderRadius: '8px',
                fontFamily: 'Arial, sans-serif',
                minWidth: '250px'
            }}>
                <h3 style={{margin: '0 0 10px 0', fontSize: '16px'}}>🌳 Tree Growth</h3>

                <div style={{marginBottom: '10px'}}>
                    <label style={{display: 'block', marginBottom: '3px', fontSize: '13px'}}>
                        Score: {score} / 150
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="150"
                        value={score}
                        onChange={handleScoreChange}
                        style={{
                            width: '100%',
                            height: '5px',
                            borderRadius: '3px',
                            background: '#ddd',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{fontSize: '13px', lineHeight: '1.3'}}>
                    <div><strong>Phase {phase + 1}/15:</strong> {getPhaseDescription(phase)}</div>
                    <div style={{marginTop: '6px', fontSize: '11px', opacity: '0.8'}}>
                        Mouse: Rotate | Scroll: Zoom
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreeGrowthPhases;