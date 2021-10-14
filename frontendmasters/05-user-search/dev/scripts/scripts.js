// Theme Toggler

// Detect if user is in dark mode or not
const themeChoice = window.matchMedia('(prefers-color-scheme: dark)').matches;
const pageBody = document.body;
const themeToggle = document.querySelector('.toggle');
const toggleText = document.querySelector('.text');
function initTheme() {
	if(themeChoice) {
		pageBody.classList.add('dark');
		toggleText.textContent = 'Light';
	}
}
initTheme();
function toggleTheme() {
	if (pageBody.classList.contains('dark')) {
		pageBody.classList.remove('dark');
		pageBody.classList.add('light');
		toggleText.textContent = 'Dark';
	} else {
		pageBody.classList.remove('light');
		pageBody.classList.add('dark');
		toggleText.textContent = 'Light';
	}
}
themeToggle.addEventListener('click', toggleTheme);

// The API stuff
const endpoint = 'https://api.github.com/users/';
const startSearch = document.querySelector('.search-form');


startSearch.addEventListener('submit', (e) => {
	const userName = document.getElementById('username').value;
	const fullString = `${endpoint}${userName}`;
	fetch(fullString)
		.then(response => response.json())
		.then(json => console.table(json));
	console.log(fullString);
	e.preventDefault();
});
// function displayRepo() {
// 	const repoData = 
// }

