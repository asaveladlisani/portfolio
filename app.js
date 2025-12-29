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
});
