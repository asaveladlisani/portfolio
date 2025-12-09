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

// Pagination for Projects
const projectCards = document.querySelectorAll('#projects .project-card');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');
const pageNumbersDiv = document.getElementById('page-numbers');

if (projectCards.length > 0) {
	const itemsPerPage = 2;
	let currentPage = 1;

	function displayProjects(page) {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;

		projectCards.forEach((card, index) => {
			card.style.display = (index >= startIndex && index < endIndex) ? 'flex' : 'none';
		});
	}

	function setupPagination() {
		const pageCount = Math.ceil(projectCards.length / itemsPerPage);
		if (pageNumbersDiv) {
			pageNumbersDiv.innerHTML = '';

			for (let i = 1; i <= pageCount; i++) {
				const pageNumberButton = document.createElement('button');
				pageNumberButton.classList.add('page-number');
				pageNumberButton.textContent = i;
				pageNumberButton.addEventListener('click', () => {
					currentPage = i;
					displayProjects(currentPage);
					updatePaginationControls();
				});
				pageNumbersDiv.appendChild(pageNumberButton);
			}
		}
	}

	function updatePaginationControls() {
		const pageNumbers = document.querySelectorAll('.page-number');
		pageNumbers.forEach((button, index) => {
			button.classList.toggle('active', index + 1 === currentPage);
		});

		if (prevButton) prevButton.disabled = currentPage === 1;
		if (nextButton) nextButton.disabled = currentPage === Math.ceil(projectCards.length / itemsPerPage);
	}

	if (prevButton) {
		prevButton.addEventListener('click', () => {
			if (currentPage > 1) {
				currentPage--;
				displayProjects(currentPage);
				updatePaginationControls();
			}
		});
	}

	if (nextButton) {
		nextButton.addEventListener('click', () => {
			if (currentPage < Math.ceil(projectCards.length / itemsPerPage)) {
				currentPage++;
				displayProjects(currentPage);
				updatePaginationControls();
			}
		});
	}

	displayProjects(currentPage);
	setupPagination();
	updatePaginationControls();
}

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
