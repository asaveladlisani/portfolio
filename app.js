document.addEventListener("DOMContentLoaded", () => {
    // ===============================
    // HAMBURGER MENU TOGGLE
    // ===============================
    const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
    const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
    const header = document.querySelector('#header .header');
    const hero = document.querySelector('#hero');

    if (hamburger && mobile_menu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobile_menu.classList.toggle('active');
        });
    }

    // ===============================
    // HEADER BACKGROUND ON SCROLL
    // ===============================
    if (header) {
        if (hero) {
            const onScroll = () => {
                const scrollY = window.scrollY;
                header.style.backgroundColor = scrollY > hero.offsetHeight ? '#29323c' : 'transparent';
            };
            window.addEventListener('scroll', onScroll);
            onScroll(); // Set initial state
        } else {
            header.style.backgroundColor = '#29323c';
        }
    }

    // ===============================
    // PROJECTS PAGINATION
    // ===============================
    const projects = document.querySelectorAll(".all-projects .project-card");
    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");
    const pageNumbersContainer = document.getElementById("page-numbers");

    if (projects.length && prevBtn && nextBtn && pageNumbersContainer) {
        let currentPage = 1;
        let itemsPerPage = getItemsPerPage();
        let totalPages = Math.ceil(projects.length / itemsPerPage);

        function getItemsPerPage() {
            return window.innerWidth < 768 ? 1 : 2;
        }

        function showProjects(page) {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            projects.forEach((project, index) => {
                project.style.display = index >= start && index < end ? "flex" : "none";
            });
        }

        function renderPageNumbers(page) {
            pageNumbersContainer.innerHTML = "";

            if (totalPages <= 6) {
                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement("button");
                    btn.innerText = i;
                    btn.className = "page-number";
                    if (i === page) btn.classList.add("active");
                    btn.addEventListener("click", () => {
                        currentPage = i;
                        updatePagination();
                    });
                    pageNumbersContainer.appendChild(btn);
                }
                return;
            }

            let startPage = Math.max(1, page - 2);
            let endPage = Math.min(totalPages, page + 2);

            if (startPage === 1) endPage = Math.min(totalPages, 5);
            if (endPage === totalPages) startPage = Math.max(1, totalPages - 4);

            for (let i = startPage; i <= endPage; i++) {
                const btn = document.createElement("button");
                btn.innerText = i;
                btn.className = "page-number";
                if (i === page) btn.classList.add("active");
                btn.addEventListener("click", () => {
                    currentPage = i;
                    updatePagination();
                });
                pageNumbersContainer.appendChild(btn);
            }
        }

        function updatePagination() {
            totalPages = Math.ceil(projects.length / itemsPerPage);
            if (currentPage > totalPages) currentPage = totalPages;
            showProjects(currentPage);
            renderPageNumbers(currentPage);
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
        }

        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });

        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
            }
        });

        window.addEventListener("resize", () => {
            itemsPerPage = getItemsPerPage();
            updatePagination();
        });

        updatePagination();
    }

    // ===============================
    // ABOUT SECTION TABS
    // ===============================
    const tablinks = document.querySelectorAll(".tab-links");
    const tabcontents = document.querySelectorAll(".tab-contents");

    if (tablinks.length && tabcontents.length) {
        tablinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const tabname = e.currentTarget.dataset.tab;

                tablinks.forEach(link => link.classList.remove("active-link"));
                tabcontents.forEach(content => content.classList.remove("active-tab"));

                const activeTab = document.getElementById(tabname);
                if (activeTab) activeTab.classList.add("active-tab");
                e.currentTarget.classList.add("active-link");
            });
        });
    }

    // ===============================
    // SCROLL-TO-TOP BUTTON
    // ===============================
    const scrollBtn = document.getElementById('scrollTop');
    function toggleScrollBtn(){
        if (!scrollBtn) return;
        if (window.scrollY > 360) scrollBtn.classList.add('show');
        else scrollBtn.classList.remove('show');
    }
    window.addEventListener('scroll', toggleScrollBtn);
    toggleScrollBtn();
    if (scrollBtn){
        scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ===============================
    // HERO TEXT ANIMATION
    // ===============================
    const lines = ["Hello,", "My Name is", "Asavela"];
    const heroContainer = document.querySelector('.hero-content');

    async function typeText(element, text, delay = 100) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await new Promise(r => setTimeout(r, delay));
        }
    }

    async function animateHero() {
        const h1s = heroContainer.querySelectorAll('h1');
        for (let i = 0; i < lines.length; i++) {
            h1s[i].classList.add('typing');
            await typeText(h1s[i], lines[i], 150);
            h1s[i].classList.remove('typing');
            await new Promise(r => setTimeout(r, 500));
        }
    }
    if (heroContainer) animateHero();

    const heroH1 = document.querySelectorAll('#hero h1');
    heroH1.forEach((h1, i) => {
        setTimeout(() => {
            const span = h1.querySelector('span');
            if (span) span.style.width = '100%';
        }, i * 1000);
    });

    // ===============================
    // CERTIFICATIONS CAROUSEL
    // ===============================
    const certSection = document.querySelector('#certifications');
    if (certSection) {
        const viewport = certSection.querySelector('.cert-viewport');
        const track = certSection.querySelector('.cert-track');
        const cards = Array.from(track.querySelectorAll('.cert-card'));
        let index = 0;
        if (viewport && track && cards.length) {
            const SLIDE_INTERVAL = 3000;
            const TRANSITION_MS = 3000;

            certSection.style.setProperty('--cert-transition-duration', `${TRANSITION_MS}ms`);
            track.style.transitionDuration = `${TRANSITION_MS}ms`;

            function getVisibleCount() {
                const w = window.innerWidth;
                if (w < 600) return 1;
                if (w < 900) return 2;
                return 3;
            }

            let visible = getVisibleCount();
            let intervalId = null;

            function refreshSizes() {
                visible = getVisibleCount();
                const gap = parseFloat(getComputedStyle(track).gap) || 24;
                const vw = viewport.clientWidth;
                const cardWidth = Math.floor((vw - gap * (visible - 1)) / visible);
                track.querySelectorAll('.cert-card').forEach(card => {
                    card.style.flex = `0 0 ${cardWidth}px`;
                    card.style.maxWidth = `${cardWidth}px`;
                });
                track.style.transition = 'none';
                track.style.transform = `translateX(0)`;
                void track.offsetWidth;
                track.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.22,.9,.36,1)`;
            }

            function next() {
                visible = getVisibleCount();
                const gap = parseFloat(getComputedStyle(track).gap) || 24;
                const vw = viewport.clientWidth;
                const cardWidth = Math.floor((vw - gap * (visible - 1)) / visible);
                const totalCards = track.querySelectorAll('.cert-card').length;
                if (totalCards <= visible) return;

                track.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.22,.9,.36,1)`;
                track.style.transform = `translateX(-${cardWidth + gap}px)`;

                const onTransitionEnd = () => {
                    track.removeEventListener('transitionend', onTransitionEnd);
                    const first = track.firstElementChild;
                    if (first) track.appendChild(first);
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0)';
                    void track.offsetWidth;
                    track.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.22,.9,.36,1)`;
                };

                track.addEventListener('transitionend', onTransitionEnd);
            }

            function startAutoPlay() {
                const totalCards = track.querySelectorAll('.cert-card').length;
                if (totalCards > visible && !intervalId) intervalId = setInterval(next, SLIDE_INTERVAL);
            }

            function stopAutoPlay() {
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }

            refreshSizes();
            startAutoPlay();

            viewport.addEventListener('mouseenter', stopAutoPlay);
            viewport.addEventListener('mouseleave', startAutoPlay);

            window.addEventListener('resize', () => {
                clearTimeout(window.__certResizeTimeout);
                window.__certResizeTimeout = setTimeout(() => {
                    visible = getVisibleCount();
                    index = 0;
                    refreshSizes();
                    stopAutoPlay();
                    startAutoPlay();
                }, 120);
            });
        }
    }

    // ===============================
    // SPEECH-TO-TEXT & GEMINI CHAT
    // ===============================
    function startListening() {
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) {
            console.warn("SpeechRecognition not supported in this browser");
            return;
        }

        const recognition = new Recognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            sendToBackend(transcript);
        };

        recognition.onerror = e => console.error(e);
        recognition.start();
    }

    async function sendToBackend(text) {
        try {
            const backendUrl = window.location.hostname === 'localhost' ? 'http://localhost:3009' : 'https://your-deployed-backend-url.com'; // REPLACE WITH YOUR ACTUAL DEPLOYED BACKEND URL
            const res = await fetch(`${backendUrl}/chat`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            const { reply, emotion } = data;

            const utter = new SpeechSynthesisUtterance(reply);
            utter.onstart = () => avatar.lipSync(1);
            utter.onend = () => avatar.lipSync(0);
            speechSynthesis.speak(utter);

            avatar.playGesture(emotion);
        } catch(err) {
            console.error(err);
        }
    }

    const heroEl = document.getElementById('hero');
    if (heroEl) heroEl.addEventListener('click', startListening);
});

// ============================
// THREE.JS AVATAR SETUP
// ============================

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AnimationMixer, Clock } from 'three';

class Avatar3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.mixer = null;
        this.clock = new Clock();
        this.initThree();
        this.loadAvatar();
        this.animate();
        window.addEventListener('resize', () => this.onResize());
    }

    initThree() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(20, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.set(0, -2.5, 15.5);

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
        this.scene.add(light);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI / 2;
    }

    loadAvatar() {
        const loader = new GLTFLoader();
        loader.load('/models/avatar.glb', gltf => {
            this.avatar = gltf.scene;
            this.avatar.scale.set(1.5, 1.5, 1.5);
            this.avatar.position.set(-0.10, -2.5, 0);
            this.scene.add(this.avatar);

            this.morphs = {};
            this.avatar.traverse(obj => {
                if (obj.morphTargetDictionary) {
                    this.morphs = obj.morphTargetDictionary;
                    this.mesh = obj;
                }
            });

            if (gltf.animations && gltf.animations.length) {
                this.mixer = new AnimationMixer(this.avatar);

                const idleClip = gltf.animations.find(clip => clip.name === 'mixamo.com');
                if (idleClip) {
                    const action = this.mixer.clipAction(idleClip);
                    action.loop = THREE.LoopRepeat;
                    action.play();
                } else if (gltf.animations.length > 0) {
                    const firstAction = this.mixer.clipAction(gltf.animations[0]);
                    firstAction.loop = THREE.LoopRepeat;
                    firstAction.play();
                }
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta);
        if (this.controls) this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    lipSync(value = 0) {
        if (this.mesh && this.morphs['mouthOpen'] !== undefined) {
            this.mesh.morphTargetInfluences[this.morphs['mouthOpen']] = value;
        }
    }

    playGesture(emotion) {
        if (!this.avatar) return;
        switch(emotion) {
            case 'happy':
                this.avatar.rotation.y = Math.sin(Date.now() * 0.005) * 0.2;
                break;
            case 'sad':
                this.avatar.rotation.x = Math.sin(Date.now() * 0.005) * 0.1;
                break;
            default:
                this.avatar.rotation.y = 0;
                this.avatar.rotation.x = 0;
        }
    }
}

const avatar = new Avatar3D('avatar-container');
