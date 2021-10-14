// Highlight search box when user clicks in general area
const searchBar = document.querySelector('.search-form');
function addFocus() {
	document.getElementById('username').focus();
}
searchBar.addEventListener('click', addFocus);

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
const errorMsg = document.querySelector('.error');
const userAvatar = document.querySelector('.user-avatar');
const userName = document.querySelector('.username');
const userJoinDate = document.querySelector('.join-date');
const userHandle = document.querySelector('.handle');
const userBio = document.querySelector('.bio');
const userRepos = document.querySelector('.repos');
const userFollowers = document.querySelector('.followers');
const userFollowing = document.querySelector('.following');
const userCity = document.querySelector('.city');
const userTwitter = document.querySelector('.twitter');
const userSite = document.querySelector('.site-link');
const userLink = document.querySelector('.github-link');

async function getUser(user) {
	const userSearch = document.getElementById('username').value;
	const fullString = `${endpoint}${userSearch}`;
	const theSearch = await fetch(fullString);
	const data = await theSearch.json();
	userData(data);
}
function userData(user) {

		userName.innerText = `${user.login}`;

}

startSearch.addEventListener('submit', (e) => {
	e.preventDefault();
	getUser(userName);
});
// function displayRepo() {
// 	const repoData = 
// }

// Call the functions on load
initTheme();