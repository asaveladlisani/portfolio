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
            // For other pages
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
            let startPage = page - 1;
            let endPage = page + 1;

            if (startPage < 1) {
                startPage = 1;
                endPage = Math.min(3, totalPages);
            }

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, totalPages - 2);
            }

            for (let i = startPage; i <= endPage; i++) {
                const btn = document.createElement("button");
                btn.innerText = i;
                if (i === page) btn.classList.add("active-page");
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
});

// ===============================
// CERTIFICATIONS CAROUSEL
// Auto-slide horizontal carousel that shows up to 3 cards depending on screen size
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const certSection = document.querySelector('#certifications');
    if (!certSection) return;

    const viewport = certSection.querySelector('.cert-viewport');
    const track = certSection.querySelector('.cert-track');
    if (!viewport || !track) return;

    const cards = Array.from(track.querySelectorAll('.cert-card'));
    if (!cards.length) return;

    function getVisibleCount() {
        const w = window.innerWidth;
        if (w < 600) return 1;
        if (w < 900) return 2;
        return 3;
    }

    // Tunable timing values (ms)
    const SLIDE_INTERVAL = 3000; // time between auto slides
    const TRANSITION_MS = 3000; // animation duration for slide transition

    let visible = getVisibleCount();
    let intervalId = null;

    // apply transition duration to CSS variable so animation matches JS timing
    certSection.style.setProperty('--cert-transition-duration', `${TRANSITION_MS}ms`);
    track.style.transitionDuration = `${TRANSITION_MS}ms`;

    function refreshSizes() {
        visible = getVisibleCount();
        const gap = parseFloat(getComputedStyle(track).gap) || 24;
        const vw = viewport.clientWidth;
        // Calculate pixel width for each card so 1/2/3 fit exactly
        const cardWidth = Math.floor((vw - gap * (visible - 1)) / visible);
        // update all card sizes (query to include any new cards)
        const currentCards = Array.from(track.querySelectorAll('.cert-card'));
        currentCards.forEach(card => {
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.maxWidth = `${cardWidth}px`;
        });
        // Always reset transform to zero (we maintain order by moving nodes)
        track.style.transition = 'none';
        track.style.transform = `translateX(0)`;
        // force reflow then restore transition
        void track.offsetWidth;
        track.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.22,.9,.36,1)`;
    }

    function next() {
        visible = getVisibleCount();
        const gap = parseFloat(getComputedStyle(track).gap) || 24;
        const vw = viewport.clientWidth;
        const cardWidth = Math.floor((vw - gap * (visible - 1)) / visible);
        const totalCards = track.querySelectorAll('.cert-card').length;
        if (totalCards <= visible) return; // nothing to slide

        // Animate one card-width to the left
        track.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.22,.9,.36,1)`;
        track.style.transform = `translateX(-${cardWidth + gap}px)`;

        // After transition, move the first card to the end and reset transform
        const onTransitionEnd = () => {
            track.removeEventListener('transitionend', onTransitionEnd);
            const first = track.firstElementChild;
            if (first) track.appendChild(first);
            // reset transform without animation
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';
            // force reflow then restore transition
            void track.offsetWidth;
            track.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.22,.9,.36,1)`;
        };

        track.addEventListener('transitionend', onTransitionEnd);
    }

    // Start auto-play only if there are more cards than visible
        function startAutoPlay() {
            const totalCards = track.querySelectorAll('.cert-card').length;
            if (totalCards > visible && !intervalId) {
                intervalId = setInterval(next, SLIDE_INTERVAL);
            }
        }

    function stopAutoPlay() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // Init
    refreshSizes();
    startAutoPlay();

    // Pause on hover
    viewport.addEventListener('mouseenter', stopAutoPlay);
    viewport.addEventListener('mouseleave', startAutoPlay);

    // Recalculate on resize
    window.addEventListener('resize', () => {
        // small debounce
        clearTimeout(window.__certResizeTimeout);
        window.__certResizeTimeout = setTimeout(() => {
            // Reset index if necessary to avoid blank space
            visible = getVisibleCount();
            if (index > Math.max(0, cards.length - visible)) index = 0;
            refreshSizes();
            stopAutoPlay();
            startAutoPlay();
        }, 120);
    });
});

