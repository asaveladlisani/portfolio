console.log('app.js loaded');
if (document.querySelector('.fa-brands')) {
  console.log('Font Awesome brand icons detected.');
} else {
  console.log('Font Awesome brand icons NOT detected.');
}

const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const headerContainer = document.querySelector('.header.container');
const mainHeader = document.querySelector('#header');

const servicesSection = document.querySelector('#services');
const contactSection = document.querySelector('#contact');

let lastScrollY = 0;

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const mainHeaderHeight = mainHeader.offsetHeight;
    const servicesOffsetTop = servicesSection.offsetTop;
    const contactOffsetTop = contactSection.offsetTop;

    console.log('Current Scroll Y:', currentScrollY);
    console.log('Services Section Offset Top:', servicesOffsetTop);
    console.log('Contact Section Offset Top:', contactOffsetTop);
    console.log('Main Header Height:', mainHeaderHeight);

    if (currentScrollY > 250) {
        headerContainer.style.backgroundColor = '#29323c';
    } else {
        headerContainer.style.backgroundColor = 'transparent';
    }

    if (currentScrollY > lastScrollY) {
        if (currentScrollY > servicesOffsetTop - mainHeaderHeight) {
            mainHeader.classList.add('hide-header');
        }
    } else {
        if (currentScrollY < servicesOffsetTop - mainHeaderHeight) {
            mainHeader.classList.remove('hide-header');
        }
    }

    if (currentScrollY >= contactOffsetTop - mainHeaderHeight) {
        mainHeader.classList.add('hide-header');
    }

    lastScrollY = currentScrollY;
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
	

	const projectCards = document.querySelectorAll('#projects .project-card');
	const prevButton = document.getElementById('prev-page');
	const nextButton = document.getElementById('next-page');
	const pageNumbersDiv = document.getElementById('page-numbers');
	
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
	
	function updatePaginationControls() {
	  const pageNumbers = document.querySelectorAll('.page-number');
	  pageNumbers.forEach((button, index) => {
	    button.classList.toggle('active', index + 1 === currentPage);
	  });
	
	  prevButton.disabled = currentPage === 1;
	  nextButton.disabled = currentPage === Math.ceil(projectCards.length / itemsPerPage);
	}
	
	prevButton.addEventListener('click', () => {
	  if (currentPage > 1) {
	    currentPage--;
	    displayProjects(currentPage);
	    updatePaginationControls();
	  }
	});
	
	nextButton.addEventListener('click', () => {
	  if (currentPage < Math.ceil(projectCards.length / itemsPerPage)) {
	    currentPage++;
	    displayProjects(currentPage);
	    updatePaginationControls();
	  }
	});
	
	displayProjects(currentPage);
	setupPagination();
	updatePaginationControls();

const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

Array.from(tablinks).forEach(link => {
    link.addEventListener('click', (e) => {
        const tabname = e.currentTarget.dataset.tab;

        for (var tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (var tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }
        document.getElementById(tabname).classList.add("active-tab");
        e.currentTarget.classList.add("active-link");
    });
});
});
