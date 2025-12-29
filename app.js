const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('#header .header');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

// ===============================
// PROJECTS PAGINATION
// ===============================
const projects = document.querySelectorAll(".all-projects .project-card");
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");
const pageNumbersContainer = document.getElementById("page-numbers");

let currentPage = 1;
let itemsPerPage = getItemsPerPage();
let totalPages = Math.ceil(projects.length / itemsPerPage);

// Determine number of projects per page based on screen width
function getItemsPerPage() {
  return window.innerWidth < 768 ? 1 : 2; // 1 for mobile, 2 for tablet+
}

// Display projects based on page
function showProjects(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  projects.forEach((project, index) => {
    project.style.display = index >= start && index < end ? "flex" : "none";
  });
}

// Render page numbers (max 3 visible at a time)
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

// Update both projects and pagination numbers
function updatePagination() {
  showProjects(currentPage);
  renderPageNumbers(currentPage);
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Prev/Next buttons
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

// Update pagination on window resize
window.addEventListener("resize", () => {
  itemsPerPage = getItemsPerPage();
  totalPages = Math.ceil(projects.length / itemsPerPage);
  currentPage = 1; // Reset to first page on resize
  updatePagination();
});

// Initial display
updatePagination();



// Tab functionality for About section
const tablinks = document.querySelectorAll(".tab-links");
const tabcontents = document.querySelectorAll(".tab-contents");

tablinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const tabname = e.currentTarget.dataset.tab;

        tablinks.forEach(link => {
            link.classList.remove("active-link");
        });
        tabcontents.forEach(content => {
            content.classList.remove("active-tab");
        });

        const activeTab = document.getElementById(tabname);
        if (activeTab) {
            activeTab.classList.add("active-tab");
        }
        e.currentTarget.classList.add("active-link");
    });
});
