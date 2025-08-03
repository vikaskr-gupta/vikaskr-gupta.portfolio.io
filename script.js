import { projectsData, skills } from './data.js';


const body = document.body

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
	body.classList.add(bodyClass)
	btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

	addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)


// Skills =========================================================================================
const skillsList = document.getElementById("skillsList");

skills.forEach(skill => {
	const li = document.createElement("li");
	li.className = "skills__list-item";
	li.innerHTML = `<i class="${skill.icon}"></i> ${skill.name}`;
	skillsList.appendChild(li);
});


// Skills =========================================================================================


// Project ==============================================================================================
const container = document.getElementById("projectsContainer");
const viewMoreBtn = document.getElementById("viewMoreBtn");

let currentIndex = 0;
const batchSize = 6;

// Create cards in batches
function showProjects(batch) {
	const slice = projectsData.slice(currentIndex, currentIndex + batch);
	slice.forEach((project) => {
		const card = document.createElement("div");
		card.classList.add("project-card");
		card.innerHTML = `
      <img src="${project.image}" alt="${project.title} Screenshot" class="project-image" />
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
		<div class="project-skills">
			${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join("")}
		</div>
		<div class="project_show">
			<button class="link view-btn" data-title="${project.title}" data-description="${project.description}" data-image="${project.image}">View</button>
			<a href="${project.link}" target="_blank" class="link">Visit Site</a>
		</div>
      </div>
    `;
		container.appendChild(card);
	});
	currentIndex += batch;
	if (currentIndex >= projectsData.length) {
		viewMoreBtn.style.display = "none";
	}
}


// Initial load
showProjects(batchSize);

// Load more on button click
viewMoreBtn.addEventListener("click", () => {
	showProjects(6); // load 6 more
});



// Modal Logic
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.querySelector(".modal .close");

// Event delegation
container.addEventListener("click", function (e) {
	if (e.target.classList.contains("view-btn")) {
		const title = e.target.dataset.title;
		const description = e.target.dataset.description;
		const image = e.target.dataset.image;

		modalTitle.textContent = title;
		modalDescription.textContent = description;
		modalImage.src = image;
		modal.style.display = "block";
	}
});

closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
	if (e.target === modal) modal.style.display = "none";
};

// Project - End ==========================================================================================