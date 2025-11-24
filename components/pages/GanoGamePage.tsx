
import React from 'react';

const GAME_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Gano Shakh mushroom vs bacteria</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --bio-red: #ff3333;
            --bio-green: #33ff33;
            --bio-purple: #bd00ff;
            --neon-yellow: #ffff00;
            --neon-blue: #00ffff;
        }
        body {
            margin: 0;
            overflow: hidden;
            background-color: #000000;
            font-family: 'Orbitron', sans-serif;
            touch-action: none;
            user-select: none;
            cursor: crosshair;
        }
        #canvas-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        #ui-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            pointer-events: none;
        }
        /* HUD */
        #score-board {
            position: absolute;
            top: 20px;
            left: 20px;
            color: var(--bio-green);
            font-size: 24px;
            text-shadow: 0 0 10px var(--bio-green);
            font-weight: 700;
        }
        .label { font-size: 14px; color: #fff; opacity: 0.7; }
        
        #auto-status {
            position: absolute;
            bottom: 20px;
            right: 20px;
            color: #00ffff;
            font-size: 12px;
            border: 1px solid #00ffff;
            padding: 5px 10px;
            background: rgba(0, 50, 50, 0.5);
            text-shadow: 0 0 5px #00ffff;
        }

        /* Boss HUD */
        #boss-hud {
            display: none;
            position: absolute;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            width: 50%;
            max-width: 600px;
            text-align: center;
        }
        #boss-name {
            color: var(--bio-red);
            font-size: 18px;
            margin-bottom: 5px;
            text-shadow: 0 0 10px var(--bio-red);
            letter-spacing: 2px;
        }
        #boss-health-bar {
            width: 100%;
            height: 12px;
            background: rgba(50, 0, 0, 0.5);
            border: 1px solid var(--bio-red);
            position: relative;
            border-radius: 6px;
            overflow: hidden;
        }
        #boss-health-fill {
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #ff0000, #ff6666);
            box-shadow: 0 0 15px var(--bio-red);
            transition: width 0.2s;
        }

        /* Floating Text */
        .float-text {
            position: absolute;
            color: var(--neon-yellow);
            font-weight: 900;
            font-size: 16px;
            text-shadow: 0 0 10px var(--neon-yellow);
            pointer-events: none;
            animation: floatUp 2s forwards;
            white-space: nowrap;
            transform: translate(-50%, -50%);
        }
        @keyframes floatUp {
            0% { opacity: 0; transform: translate(-50%, 0) scale(0.5); }
            10% { opacity: 1; transform: translate(-50%, -20px) scale(1.2); }
            100% { opacity: 0; transform: translate(-50%, -100px) scale(1); }
        }

        /* Game Over Screen */
        #game-over {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: auto;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(15px);
            z-index: 20;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        
        .go-content {
            max-width: 800px;
            width: 90%;
            padding: 40px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 30px;
            background: linear-gradient(180deg, rgba(20, 0, 0, 0.9), rgba(0, 0, 20, 0.9));
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.1);
        }

        h1 {
            color: var(--bio-red);
            font-size: 42px;
            margin: 0 0 10px 0;
            text-transform: uppercase;
            text-shadow: 0 0 30px var(--bio-red);
            letter-spacing: 4px;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 30px 0;
        }
        
        .stat-box {
            background: rgba(255, 255, 255, 0.05);
            padding: 15px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .stat-val {
            font-size: 28px;
            color: #fff;
            font-weight: 900;
            margin-bottom: 5px;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .stat-label {
            font-size: 12px;
            color: #aaa;
            text-transform: uppercase;
        }

        #advice-text {
            font-size: 18px;
            line-height: 1.6;
            margin: 30px 0;
            min-height: 100px;
            color: var(--neon-yellow);
            text-shadow: 0 0 15px var(--neon-yellow);
            animation: pulseText 2s infinite alternate;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @keyframes pulseText {
            0% { text-shadow: 0 0 10px var(--neon-yellow); color: #ffffaa; }
            100% { text-shadow: 0 0 25px var(--neon-yellow), 0 0 5px #fff; color: #ffffff; }
        }

        button {
            background: transparent;
            border: 2px solid var(--bio-green);
            color: var(--bio-green);
            padding: 15px 50px;
            font-size: 20px;
            font-family: 'Orbitron', sans-serif;
            font-weight: 900;
            cursor: pointer;
            text-transform: uppercase;
            box-shadow: 0 0 15px var(--bio-green);
            transition: all 0.2s;
            border-radius: 50px;
            margin-top: 10px;
        }
        button:hover {
            background: var(--bio-green);
            color: #000;
            box-shadow: 0 0 40px var(--bio-green);
            transform: scale(1.05);
        }
        
        /* Mobile Controls */
        #mobile-controls {
            display: none; /* We use full screen touch now */
        }
    </style>
    
    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
                "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
            }
        }
    </script>
</head>
<body>

    <div id="canvas-container"></div>

    <div id="ui-layer">
        <div id="score-board">
            <div class="label">IMMUNITY LEVEL</div>
            <div id="score-val">0</div>
        </div>
        
        <div id="auto-status">SYSTEMS: AUTO-ENGAGED</div>

        <div id="boss-hud">
            <div id="boss-name">MEGA-PATHOGEN DETECTED</div>
            <div id="boss-health-bar"><div id="boss-health-fill"></div></div>
        </div>

        <div id="game-over">
            <div class="go-content">
                <h1>Gano Shakh<br>Retry Immunity War</h1>
                
                <div class="stats-grid">
                    <div class="stat-box">
                        <div class="stat-val" id="stat-score">0</div>
                        <div class="stat-label">Infection Spread</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-val" id="stat-kills">0</div>
                        <div class="stat-label">Pathogens Purged</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-val" id="stat-time">0s</div>
                        <div class="stat-label">Survival Time</div>
                    </div>
                </div>

                <div id="advice-text">
                    ما به شما توصیه می‌کنیم روزانه ۱ چای گانو بنوشید تا تمام عوامل بیماری‌زای ناخواسته را نابود کنید و بدن خود را به کشتی قدرتمند سلامتی و طول عمر تبدیل کنید.
                </div>

                <button id="restart-btn">REINFORCE IMMUNITY</button>
            </div>
        </div>
    </div>

    <script type="module">
        import * as THREE from 'three';
        import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
        import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
        import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

        // --- GAME CONFIGURATION ---
        const CONFIG = {
            speed: 50,
            shipSpeed: 0.8,
            shipBoundX: 25,
            shipBoundY: 14,
            colors: {
                bg: 0x000000,
                spore: 0xffff00,
                plasma: 0x00ffff,
                missile: 0xff3300,
                virus: 0x00ff00, 
                bacteria: 0x9900ff,
                boss: 0xff0000,
                shield: 0x0088ff
            },
            bossSpawnTime: 120, // Seconds until boss
            maxLevel: 5
        };

        const WEAPONS = [
            { name: "SPORE STREAM", delay: 0.15, type: 'standard' },
            { name: "DUAL LAZER", delay: 0.12, type: 'dual' },
            { name: "TRIPLE SPRAY", delay: 0.12, type: 'triple' },
            { name: "PLASMA SPORES", delay: 0.08, type: 'plasma' },
            { name: "HOMING MISSILES", delay: 0.3, type: 'homing' },
            { name: "BIO-PULSE", delay: 0.5, type: 'pulse' }
        ];

        const TRANSLATIONS = [
            "ما به شما توصیه می‌کنیم روزانه ۱ چای گانو بنوشید تا تمام عوامل بیماری‌زای ناخواسته را نابود کنید و بدن خود را به کشتی قدرتمند سلامتی و طول عمر تبدیل کنید.", // Farsi (Persian)
            "We advise you to drink 1 Gano to destroy all unwanted pathogens in order to transform your body into a mighty ship of health and longevity.", // English
            "Le recomendamos beber 1 té Gano al día para destruir todos los patógenos no deseados y transformar su cuerpo en una poderosa nave de salud y longevidad.", // Spanish
            "Nous vous conseillons de boire 1 thé Gano par jour pour détruire tous les agents pathogènes indésirables afin de transformer votre corps en un puissant vaisseau de santé et de longévité.", // French
            "Wir empfehlen Ihnen, 1 Gano-Tee pro Tag zu trinken, um alle unerwünschten Krankheitserreger zu zerstören und Ihren Körper in ein mächtiges Schiff der Gesundheit und Langlebigkeit zu verwandeln.", // German
            "建议您每天喝 1 杯灵芝茶以消灭所有不需要的病原体，从而将您的身体转变为健康长寿的强大飞船。", // Chinese
            "望ましくない病原体をすべて破壊し、あなたの体を健康と長寿の強力な船に変えるために、1日1杯のガノティーを飲むことをお勧めします。", // Japanese
            "원하지 않는 모든 병원체를 파괴하여 신체를 건강과 장수의 강력한 배로 변화시키기 위해 하루에 가노 차 1잔을 마시는 것을 권장합니다.", // Korean
            "Мы советуем вам пить 1 чай Гано в день, чтобы уничтожить все нежелательные патогены и превратить ваше тело в мощный корабль здоровья и долголетия.", // Russian
            "ننصحك بشرب 1 شاي جانو يوميًا لتدمير جميع مسببات الأمراض غير المرغوب فيها من أجل تحويل جسمك إلى سفينة عظيمة للصحة وطول العمر.", // Arabic
            "हम आपको सलाह देते हैं कि सभी अवांछित रोगजनकों को नष्ट करने के लिए 1 गानो चाय प्रतिदिन पियें ताकि आपका शरीर स्वास्थ्य और दीर्घायु के एक शक्तिशाली जहाज में बदल सके।" // Hindi
        ];

        // --- STATE ---
        let state = {
            score: 0,
            kills: 0,
            startTime: 0,
            isRunning: true,
            isPaused: false,
            lastShot: 0,
            gameTime: 0,
            weaponLevel: 0,
            shieldActive: false,
            shieldTimer: 0,
            bossMode: false,
            targetPos: new THREE.Vector2(0,0),
            usingMouse: false
        };
        
        let langInterval;

        window.addEventListener('message', (e) => {
             if (e.data && e.data.type === 'PAUSE_GAME') {
                 state.isPaused = e.data.payload;
                 if (!state.isPaused) clock.getDelta();
             }
        });

        // --- SETUP SCENE ---
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(CONFIG.colors.bg);
        scene.fog = new THREE.Fog(CONFIG.colors.bg, 30, 200);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300);
        camera.position.set(0, 4, 18);
        camera.lookAt(0, 0, -10);

        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        // --- LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0x222222); 
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
        dirLight.position.set(10, 20, 10);
        scene.add(dirLight);
        const blueLight = new THREE.PointLight(0x0044ff, 1, 50);
        blueLight.position.set(-10, -5, 0);
        scene.add(blueLight);
        
        // --- POST PROCESSING ---
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0.1;
        bloomPass.strength = 1.5;
        bloomPass.radius = 0.5;

        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // --- STARS ---
        const starGeo = new THREE.BufferGeometry();
        const starCount = 1000;
        const starPos = new Float32Array(starCount * 3);
        for(let i=0; i<starCount*3; i++) starPos[i] = (Math.random() - 0.5) * 500;
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({color: 0x888888, size: 0.6, transparent: true, opacity: 0.6});
        const starField = new THREE.Points(starGeo, starMat);
        scene.add(starField);

        // --- PLAYER SHIP ---
        const playerGroup = new THREE.Group();
        scene.add(playerGroup);

        // Mushroom Visuals
        const mushroomCapMat = new THREE.MeshPhysicalMaterial({ 
            color: 0x8b0000, roughness: 0.2, metalness: 0.1, clearcoat: 1.0, emissive: 0x220000
        });
        const mushroomStalkMat = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.8 });

        const cap = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.6), mushroomCapMat);
        cap.scale.set(1.5, 1.2, 0.5);
        cap.rotation.x = Math.PI / 2;
        cap.position.z = -0.3;
        playerGroup.add(cap);
        
        const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 1.2, 16).rotateX(Math.PI/2), mushroomStalkMat);
        stalk.position.z = 0.5;
        playerGroup.add(stalk);
        playerGroup.add(new THREE.PointLight(0xffff00, 1, 5));

        // Shield Visual
        const shieldGeo = new THREE.SphereGeometry(2.5, 32, 32);
        const shieldMat = new THREE.MeshPhysicalMaterial({
            color: CONFIG.colors.shield,
            transparent: true,
            opacity: 0.2,
            transmission: 0.5,
            roughness: 0,
            metalness: 0.5,
            emissive: CONFIG.colors.shield,
            emissiveIntensity: 0.5,
            side: THREE.DoubleSide
        });
        const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
        shieldMesh.visible = false;
        playerGroup.add(shieldMesh);

        // --- OBJECT POOLS ---
        class Pool {
            constructor(createFn, count) {
                this.pool = [];
                this.active = [];
                for (let i = 0; i < count; i++) {
                    const obj = createFn();
                    obj.visible = false;
                    scene.add(obj);
                    this.pool.push(obj);
                }
            }
            get() {
                if (this.pool.length === 0) return null;
                const obj = this.pool.pop();
                obj.visible = true;
                this.active.push(obj);
                return obj;
            }
            release(obj) {
                const index = this.active.indexOf(obj);
                if (index > -1) {
                    this.active.splice(index, 1);
                    obj.visible = false;
                    this.pool.push(obj);
                }
            }
            reset() { [...this.active].forEach(obj => this.release(obj)); }
        }

        // Projectiles
        const projectilePool = new Pool(() => {
            const geo = new THREE.CapsuleGeometry(0.15, 0.8, 4, 8);
            geo.rotateX(Math.PI / 2);
            const mat = new THREE.MeshBasicMaterial({ color: CONFIG.colors.spore });
            const m = new THREE.Mesh(geo, mat);
            m.userData = { type: 'standard', velocity: new THREE.Vector3(0,0,-1) };
            return m;
        }, 80);
        
        const missilePool = new Pool(() => {
            const group = new THREE.Group();
            const body = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.8, 8).rotateX(-Math.PI/2), new THREE.MeshBasicMaterial({ color: CONFIG.colors.missile }));
            group.add(body);
            group.userData = { type: 'missile', velocity: new THREE.Vector3(), target: null };
            return group;
        }, 20);

        const pulsePool = new Pool(() => {
            const geo = new THREE.RingGeometry(0.5, 0.8, 32);
            const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true });
            const m = new THREE.Mesh(geo, mat);
            m.userData = { type: 'pulse', velocity: new THREE.Vector3(0,0,-1), scaleRate: 1.05 };
            return m;
        }, 10);

        // Enemies
        const virusPool = new Pool(() => {
            const group = new THREE.Group();
            const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 0), new THREE.MeshStandardMaterial({ color: CONFIG.colors.virus, roughness: 0.3, emissive: 0x003300 }));
            group.add(core);
            const spikeGeo = new THREE.ConeGeometry(0.1, 0.5, 4);
            spikeGeo.translate(0, 0.8, 0);
            const posAttr = core.geometry.getAttribute('position');
            for(let i=0; i<posAttr.count; i+=3) {
                const s = new THREE.Mesh(spikeGeo, core.material);
                s.lookAt(new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i)));
                group.add(s);
            }
            group.userData = { type: 'virus', hp: 1, velocity: new THREE.Vector3(), rotateSpeed: new THREE.Vector3() };
            return group;
        }, 20);

        const bacteriaPool = new Pool(() => {
            const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 1.5, 4, 8), new THREE.MeshPhysicalMaterial({ color: CONFIG.colors.bacteria, roughness: 0.4, clearcoat: 0.5, emissive: 0x220044 }));
            mesh.userData = { type: 'bacteria', hp: 2, velocity: new THREE.Vector3(), rotateSpeed: new THREE.Vector3() };
            return mesh;
        }, 20);

        // Gift Boxes
        const giftPool = new Pool(() => {
            const group = new THREE.Group();
            const geo = new THREE.BoxGeometry(1, 1, 1);
            const mat = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
            const coreMat = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.5 });
            group.add(new THREE.Mesh(geo, mat));
            group.add(new THREE.Mesh(new THREE.BoxGeometry(0.6,0.6,0.6), coreMat));
            group.userData = { type: 'weapon', velocity: new THREE.Vector3() };
            return group;
        }, 5);

        // Particles
        const particlePool = new Pool(() => {
            return new THREE.Mesh(new THREE.DodecahedronGeometry(0.2, 0), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        }, 400);

        // Boss
        let boss = null;
        function createBoss() {
            const group = new THREE.Group();
            // Core
            const core = new THREE.Mesh(new THREE.IcosahedronGeometry(4, 2), new THREE.MeshStandardMaterial({ 
                color: CONFIG.colors.boss, roughness: 0.4, metalness: 0.8, emissive: 0x550000 
            }));
            group.add(core);
            // Rings
            const ringGeo = new THREE.TorusGeometry(6, 0.2, 16, 100);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.6 });
            const ring1 = new THREE.Mesh(ringGeo, ringMat);
            const ring2 = new THREE.Mesh(ringGeo, ringMat);
            ring2.rotation.x = Math.PI/2;
            group.add(ring1);
            group.add(ring2);

            group.userData = { hp: 5000, maxHp: 5000, phase: 'spawn' };
            group.visible = false;
            scene.add(group);
            return group;
        }
        boss = createBoss();

        // --- GAMEPLAY LOGIC ---

        function spawnUI(text, position) {
            const div = document.createElement('div');
            div.className = 'float-text';
            div.textContent = text;
            
            // Project 3D position to 2D
            const vec = position.clone();
            vec.project(camera);
            const x = (vec.x * .5 + .5) * window.innerWidth;
            const y = (-(vec.y * .5) + .5) * window.innerHeight;
            
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            document.getElementById('ui-layer').appendChild(div);
            
            setTimeout(() => div.remove(), 2000);
        }

        function createExplosion(pos, color, scale = 1) {
            for(let i=0; i<12 * scale; i++) {
                const p = particlePool.get();
                if(p) {
                    p.position.copy(pos);
                    p.material.color.setHex(color);
                    p.userData.velocity = new THREE.Vector3((Math.random()-.5)*15, (Math.random()-.5)*15, (Math.random()-.5)*15);
                    p.userData.life = 1.0;
                    p.scale.setScalar((1 + Math.random()) * scale);
                }
            }
        }

        function spawnEnemy() {
            if (state.bossMode) return;
            const useVirus = Math.random() > 0.4;
            const enemy = useVirus ? virusPool.get() : bacteriaPool.get();
            if (!enemy) return;

            enemy.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, -120);
            enemy.userData.rotateSpeed.set((Math.random()-.5)*2, (Math.random()-.5)*2, (Math.random()-.5)*2);
            enemy.userData.velocity.set(0, 0, CONFIG.speed * (1 + state.gameTime/200)); // Speed up over time
        }

        function spawnGift() {
            if (state.bossMode) return;
            const gift = giftPool.get();
            if (!gift) return;
            gift.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20, -120);
            gift.userData.velocity.set(0, 0, 30);
            gift.userData.type = Math.random() > 0.7 ? 'shield' : 'weapon';
            gift.children[0].material.color.setHex(gift.userData.type === 'shield' ? CONFIG.colors.shield : 0xffff00);
        }

        function findClosestEnemy(pos) {
            let closest = null;
            let minDist = Infinity;
            [...virusPool.active, ...bacteriaPool.active].forEach(e => {
                const d = pos.distanceTo(e.position);
                if (d < minDist) { minDist = d; closest = e; }
            });
            if (boss.visible) {
                 const d = pos.distanceTo(boss.position);
                 if (d < minDist) closest = boss;
            }
            return closest;
        }

        function fireWeapons() {
            const level = WEAPONS[Math.min(state.weaponLevel, WEAPONS.length-1)];
            
            // Auto-target logic helpers
            const spawnProj = (offset, angleY = 0, color = CONFIG.colors.spore) => {
                const p = projectilePool.get();
                if(!p) return;
                p.position.copy(playerGroup.position).add(offset);
                p.material.color.setHex(color);
                p.rotation.y = angleY;
                p.userData.velocity.set(Math.sin(angleY) * 20, 0, -100); // High speed
            };

            // Pattern Logic
            if (level.type === 'standard') {
                spawnProj(new THREE.Vector3(0, 0, -1));
            } else if (level.type === 'dual') {
                spawnProj(new THREE.Vector3(-0.8, 0, -0.5));
                spawnProj(new THREE.Vector3(0.8, 0, -0.5));
            } else if (level.type === 'triple') {
                spawnProj(new THREE.Vector3(0, 0, -1));
                spawnProj(new THREE.Vector3(-0.5, 0, -0.5), 0.2);
                spawnProj(new THREE.Vector3(0.5, 0, -0.5), -0.2);
            } else if (level.type === 'plasma') {
                 spawnProj(new THREE.Vector3(0,0,-1), 0, CONFIG.colors.plasma);
            } else if (level.type === 'homing') {
                const m = missilePool.get();
                if(m) {
                    m.position.copy(playerGroup.position);
                    m.userData.velocity.set(0,0,10); // Start slow
                    m.userData.target = findClosestEnemy(m.position);
                }
            } else if (level.type === 'pulse') {
                const p = pulsePool.get();
                if(p) {
                    p.position.copy(playerGroup.position);
                    p.position.z -= 2;
                }
            }
        }

        function activateShield() {
            state.shieldActive = true;
            state.shieldTimer = 10.0; // 10 seconds
            shieldMesh.visible = true;
            spawnUI("SHIELD ACTIVE", playerGroup.position);
        }

        function upgradeWeapon() {
            if (state.weaponLevel < CONFIG.maxLevel) {
                state.weaponLevel++;
                spawnUI(WEAPONS[state.weaponLevel].name + " UNLOCKED", playerGroup.position);
            } else {
                state.score += 500;
                spawnUI("MAX POWER +500 PTS", playerGroup.position);
            }
        }

        function hitBoss(damage) {
            if (!boss.visible || boss.userData.phase === 'spawn') return;
            boss.userData.hp -= damage;
            const pct = Math.max(0, (boss.userData.hp / boss.userData.maxHp) * 100);
            document.getElementById('boss-health-fill').style.width = pct + '%';
            
            // Flash boss
            boss.children[0].material.emissive.setHex(0xffffff);
            setTimeout(() => boss.children[0].material.emissive.setHex(0x550000), 50);

            if (boss.userData.hp <= 0) {
                createExplosion(boss.position, CONFIG.colors.boss, 10);
                boss.visible = false;
                state.bossMode = false;
                document.getElementById('boss-hud').style.display = 'none';
                state.score += 5000;
                spawnUI("BOSS DEFEATED", boss.position);
                state.gameTime = 0; 
                state.weaponLevel = CONFIG.maxLevel;
            }
        }

        function gameOver() {
            state.isRunning = false;
            
            document.getElementById('stat-score').innerText = state.score;
            document.getElementById('stat-kills').innerText = state.kills;
            document.getElementById('stat-time').innerText = Math.floor(state.gameTime) + 's';
            
            document.getElementById('game-over').style.display = 'flex';
            
            // Start Translation Cycle
            let idx = 0;
            const el = document.getElementById('advice-text');
            if (langInterval) clearInterval(langInterval);
            
            const setText = (i) => {
                el.innerText = TRANSLATIONS[i];
                // Check for Farsi (0) or Arabic (9) to set RTL and Font
                if (i === 0 || i === 9) { 
                    el.style.direction = 'rtl';
                    el.style.fontFamily = 'Tahoma, "Arial", sans-serif';
                    el.style.fontSize = '22px'; 
                } else {
                    el.style.direction = 'ltr';
                    el.style.fontFamily = "'Orbitron', sans-serif";
                    el.style.fontSize = '18px';
                }
            };

            setText(0); // Initial set to Farsi

            langInterval = setInterval(() => {
                idx = (idx + 1) % TRANSLATIONS.length;
                el.style.opacity = 0;
                setTimeout(() => {
                    setText(idx);
                    el.style.opacity = 1;
                }, 200);
            }, 3500);
        }

        function restartGame() {
            state.score = 0;
            state.kills = 0;
            state.isRunning = true;
            state.gameTime = 0;
            state.weaponLevel = 0;
            state.shieldActive = false;
            state.bossMode = false;
            
            if (langInterval) clearInterval(langInterval);
            
            document.getElementById('score-val').innerText = '0';
            document.getElementById('game-over').style.display = 'none';
            document.getElementById('boss-hud').style.display = 'none';

            playerGroup.position.set(0, 0, 0);
            state.targetPos.set(0,0);
            
            projectilePool.reset();
            missilePool.reset();
            pulsePool.reset();
            virusPool.reset();
            bacteriaPool.reset();
            giftPool.reset();
            particlePool.reset();
            
            boss.visible = false;
            boss.userData.hp = boss.userData.maxHp;
        }

        document.getElementById('restart-btn').addEventListener('click', restartGame);

        // --- CONTROLS ---
        
        // 1. Mouse Movement (Desktop)
        window.addEventListener('mousemove', (e) => {
             if (state.isPaused || !state.isRunning) return;
             state.usingMouse = true;
             
             // Normalize -1 to 1
             const nX = (e.clientX / window.innerWidth) * 2 - 1;
             const nY = -(e.clientY / window.innerHeight) * 2 + 1;
             
             state.targetPos.x = nX * CONFIG.shipBoundX;
             state.targetPos.y = nY * CONFIG.shipBoundY;
        });

        // 2. Touch Movement (Hover/Follow)
        window.addEventListener('touchmove', (e) => {
             if (state.isPaused || !state.isRunning) return;
             e.preventDefault();
             state.usingMouse = true;
             
             const t = e.touches[0];
             const nX = (t.clientX / window.innerWidth) * 2 - 1;
             const nY = -(t.clientY / window.innerHeight) * 2 + 1;
             
             state.targetPos.x = nX * CONFIG.shipBoundX;
             state.targetPos.y = nY * CONFIG.shipBoundY;
        }, { passive: false });
        
        window.addEventListener('touchstart', (e) => {
             // Just capture initial touch to prevent jumping if needed, 
             // but strictly following finger is standard for "hover"
             state.usingMouse = true;
        });

        // 3. Keyboard (WASD/Arrow)
        const keys = { w: false, a: false, s: false, d: false };
        window.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowUp' || e.code === 'KeyW') keys.w = true;
            if (e.code === 'ArrowDown' || e.code === 'KeyS') keys.s = true;
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.a = true;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.d = true;
            // Key press overrides mouse tracking temporarily
            if(keys.w || keys.s || keys.a || keys.d) state.usingMouse = false;
        });
        window.addEventListener('keyup', (e) => {
            if (['ArrowUp', 'KeyW'].includes(e.code)) keys.w = false;
            if (['ArrowDown', 'KeyS'].includes(e.code)) keys.s = false;
            if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.a = false;
            if (['ArrowRight', 'KeyD'].includes(e.code)) keys.d = false;
        });

        // --- ANIMATION LOOP ---
        const clock = new THREE.Clock();
        const box1 = new THREE.Box3();
        const box2 = new THREE.Box3();

        function animate() {
            requestAnimationFrame(animate);
            if (state.isPaused) return;

            const delta = clock.getDelta();
            const now = clock.getElapsedTime();

            if (state.isRunning) {
                state.gameTime += delta;

                // 1. Boss Spawn Logic
                if (!state.bossMode && state.gameTime > CONFIG.bossSpawnTime) {
                    state.bossMode = true;
                    boss.visible = true;
                    boss.position.set(0, 50, -100); // Start high
                    boss.userData.phase = 'spawn';
                    document.getElementById('boss-hud').style.display = 'block';
                    spawnUI("WARNING: GIANT BACTERIA", new THREE.Vector3(0,0,0));
                }

                // 2. Stars
                const positions = starField.geometry.attributes.position.array;
                for(let i=2; i<positions.length; i+=3) {
                    positions[i] += CONFIG.speed * (state.bossMode ? 0.5 : 1.5) * delta;
                    if(positions[i] > 20) positions[i] = -480;
                }
                starField.geometry.attributes.position.needsUpdate = true;

                // 3. Player Movement (Hybrid: Mouse Target or Keyboard Velocity)
                if (!state.usingMouse) {
                    // Update targetPos based on keys
                    if (keys.w) state.targetPos.y += CONFIG.shipSpeed * 40 * delta;
                    if (keys.s) state.targetPos.y -= CONFIG.shipSpeed * 40 * delta;
                    if (keys.a) state.targetPos.x -= CONFIG.shipSpeed * 40 * delta;
                    if (keys.d) state.targetPos.x += CONFIG.shipSpeed * 40 * delta;
                    
                    // Clamp target
                    state.targetPos.x = THREE.MathUtils.clamp(state.targetPos.x, -CONFIG.shipBoundX, CONFIG.shipBoundX);
                    state.targetPos.y = THREE.MathUtils.clamp(state.targetPos.y, -CONFIG.shipBoundY, CONFIG.shipBoundY);
                }
                
                // Smooth Lerp to Target (Provides fluid feeling for both inputs)
                playerGroup.position.lerp(new THREE.Vector3(state.targetPos.x, state.targetPos.y, 0), 0.1);

                // Bank rotation based on movement
                const moveX = playerGroup.position.x - (playerGroup.userData.prevX || 0);
                const moveY = playerGroup.position.y - (playerGroup.userData.prevY || 0);
                playerGroup.rotation.z = THREE.MathUtils.lerp(playerGroup.rotation.z, -moveX * 2.0, 0.1);
                playerGroup.rotation.x = THREE.MathUtils.lerp(playerGroup.rotation.x, moveY * 1.5, 0.1);
                
                playerGroup.userData.prevX = playerGroup.position.x;
                playerGroup.userData.prevY = playerGroup.position.y;
                
                // Shield Logic
                if (state.shieldActive) {
                    state.shieldTimer -= delta;
                    shieldMesh.rotation.y += delta;
                    shieldMesh.material.opacity = 0.2 + Math.sin(now * 10) * 0.1;
                    if (state.shieldTimer <= 0) {
                        state.shieldActive = false;
                        shieldMesh.visible = false;
                    }
                }

                // 4. Auto Fire
                if (now - state.lastShot > WEAPONS[Math.min(state.weaponLevel, WEAPONS.length-1)].delay) {
                    fireWeapons();
                    state.lastShot = now;
                }

                // 5. Spawn Logic
                if (!state.bossMode) {
                    if (Math.random() < (0.04 + state.gameTime * 0.0005)) spawnEnemy();
                    if (Math.random() < 0.005) spawnGift(); // Rare gifts
                }

                // 6. Update Projectiles
                for (let p of projectilePool.active) {
                    p.position.addScaledVector(p.userData.velocity, delta);
                    if (p.position.z < -200) projectilePool.release(p);
                }
                for (let m of missilePool.active) {
                    if (m.userData.target && m.userData.target.visible) {
                        const dir = new THREE.Vector3().subVectors(m.userData.target.position, m.position).normalize();
                        m.userData.velocity.lerp(dir.multiplyScalar(60), 0.05);
                        m.lookAt(m.position.clone().add(m.userData.velocity));
                    } else {
                         m.userData.velocity.z = -60;
                    }
                    m.position.addScaledVector(m.userData.velocity, delta);
                    if (m.position.z < -200 || m.position.z > 50) missilePool.release(m);
                }
                for (let p of pulsePool.active) {
                    p.scale.multiplyScalar(1 + (2 * delta));
                    p.position.z -= 40 * delta;
                    if (p.scale.x > 30) pulsePool.release(p);
                }

                // 7. Entities & Collisions
                const enemies = [...virusPool.active, ...bacteriaPool.active, ...giftPool.active];
                if (state.bossMode && boss.visible) enemies.push(boss);

                box1.setFromObject(playerGroup); 

                for (const enemy of enemies) {
                    const isGift = enemy.userData.type === 'weapon' || enemy.userData.type === 'shield';
                    const isBoss = enemy === boss;

                    // Move Logic
                    if (isBoss) {
                        if (enemy.userData.phase === 'spawn') {
                            enemy.position.lerp(new THREE.Vector3(0, 0, -50), 0.02);
                            if (enemy.position.z > -60) enemy.userData.phase = 'attack';
                        } else {
                            enemy.position.x = Math.sin(now * 0.5) * 20;
                            enemy.position.y = Math.cos(now * 0.8) * 10;
                            enemy.children[1].rotation.z += delta; 
                            enemy.children[2].rotation.z -= delta;
                            
                            if (Math.random() < 0.05) {
                                const p = particlePool.get();
                                if(p) {
                                    p.position.copy(enemy.position);
                                    p.material.color.setHex(0xff0000);
                                    p.userData.velocity.set((Math.random()-.5)*20, (Math.random()-.5)*20, 20);
                                    p.userData.life = 2.0;
                                }
                            }
                        }
                    } else {
                        enemy.position.addScaledVector(enemy.userData.velocity, delta);
                        if (isGift) {
                            enemy.rotation.x += delta;
                            enemy.rotation.y += delta;
                        }
                    }

                    if (enemy.position.z > 20) {
                        if (isGift) giftPool.release(enemy);
                        else if (enemy.userData.type === 'virus') virusPool.release(enemy);
                        else if (enemy.userData.type === 'bacteria') bacteriaPool.release(enemy);
                        continue;
                    }

                    // Collision: Player vs Enemy/Gift
                    const dist = enemy.position.distanceTo(playerGroup.position);
                    const hitDist = isBoss ? 6 : (isGift ? 2 : 2.5);

                    if (dist < hitDist) {
                        if (isGift) {
                            if (enemy.userData.type === 'shield') activateShield();
                            else upgradeWeapon();
                            giftPool.release(enemy);
                            createExplosion(enemy.position, 0xffff00);
                        } else if (!state.shieldActive) {
                            createExplosion(playerGroup.position, 0xff0000);
                            gameOver();
                        } else if (state.shieldActive && !isBoss) {
                             state.kills++;
                             if (enemy.userData.type === 'virus') virusPool.release(enemy);
                             else if (enemy.userData.type === 'bacteria') bacteriaPool.release(enemy);
                             createExplosion(enemy.position, 0x0088ff);
                        }
                    }

                    // Collision: Player Projectiles vs Enemy
                    box2.setFromObject(enemy);
                    const projectiles = [...projectilePool.active, ...missilePool.active, ...pulsePool.active];
                    
                    for (const proj of projectiles) {
                        if (box2.containsPoint(proj.position) || (proj.userData.type === 'pulse' && proj.position.distanceTo(enemy.position) < (proj.scale.x/2 + 2))) {
                            
                            if (isGift) {
                                if (enemy.userData.type === 'shield') activateShield();
                                else upgradeWeapon();
                                giftPool.release(enemy);
                                createExplosion(enemy.position, 0xffff00);
                            } else if (isBoss) {
                                hitBoss(10);
                                createExplosion(proj.position, 0xffaa00, 0.5);
                            } else {
                                enemy.userData.hp--;
                                if (enemy.userData.hp <= 0) {
                                    createExplosion(enemy.position, enemy.userData.type === 'virus' ? CONFIG.colors.virus : CONFIG.colors.bacteria);
                                    if (enemy.userData.type === 'virus') virusPool.release(enemy);
                                    else bacteriaPool.release(enemy);
                                    state.score += 100;
                                    state.kills++;
                                    document.getElementById('score-val').innerText = state.score;
                                } else {
                                    createExplosion(proj.position, 0xffffff, 0.2);
                                }
                            }

                            if (proj.userData.type !== 'pulse') {
                                if (proj.userData.type === 'missile') missilePool.release(proj);
                                else projectilePool.release(proj);
                            }
                            break; 
                        }
                    }
                }

                // 8. Particles
                for (let p of particlePool.active) {
                    p.userData.life -= delta * 1.5;
                    if (p.userData.life <= 0) particlePool.release(p);
                    else {
                        p.position.addScaledVector(p.userData.velocity, delta);
                        p.scale.setScalar(p.userData.life);
                    }
                }
            }

            composer.render();
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();

    </script>
</body>
</html>
`;

const GanoGamePage: React.FC = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] bg-black overflow-hidden">
      <iframe
        title="Gano Game"
        srcDoc={GAME_HTML}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default GanoGamePage;
