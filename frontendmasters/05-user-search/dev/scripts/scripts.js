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
let theTheme = localStorage.getItem('theTheme');
function initTheme() {
	if (theTheme === 'dark') {
		pageBody.classList.add('dark');
		toggleText.textContent = 'Light';
	} else if (theTheme === 'light') {
		pageBody.classList.add('light');
		toggleText.textContent = 'Dark';
	} else if(themeChoice) {
		pageBody.classList.add('dark');
		toggleText.textContent = 'Light';
		localStorage.setItem('theTheme', 'dark');
	}
}
function toggleTheme() {
	if (pageBody.classList.contains('dark')) {
		pageBody.classList.remove('dark');
		pageBody.classList.add('light');
		toggleText.textContent = 'Dark';
		localStorage.setItem('theTheme', 'light');
	} else {
		pageBody.classList.remove('light');
		pageBody.classList.add('dark');
		toggleText.textContent = 'Light';
		localStorage.setItem('theTheme', 'dark');
	}
}
themeToggle.addEventListener('click', toggleTheme);

// The API stuff
const endpoint = 'https://api.github.com/users/';
const startSearch = document.querySelector('.search-form');
const errorMsg = document.querySelector('.error');
const userAvatar = document.querySelector('.user-avatar');
const userLogin = document.querySelector('.username');
const userJoinDate = document.querySelector('.join-date');
const userHandle = document.querySelector('.handle');
const userBio = document.querySelector('.bio');
const userRepos = document.querySelector('.repos');
const userFollowers = document.querySelector('.followers');
const userFollowing = document.querySelector('.following');
const userCity = document.querySelector('.city');
const userTwitter = document.querySelector('.twitter');
const userSite = document.querySelector('.site-link');
const userCompany = document.querySelector('.company');
const notAvail = 'Not available';
const gitName = document.querySelector('#username')

async function getUser(user) {
	let userSearch = document.getElementById('username').value;
	let fullString = `${endpoint}${userSearch}`;
	let theSearch = await fetch(fullString);
	let data = await theSearch.json();
	userData(data);
}
function userData(user) {
	document.querySelector('main').classList.remove('visuallyhidden');
	userLogin.innerText = `${user.login}`;
	userHandle.innerText = `@${user.name}`;
	userHandle.href = `${user.html_url}`;
	userRepos.innerText = `${user.public_repos}`;
	userFollowers.innerText = `${user.followers}`;
	userFollowing.innerText = `${user.following}`;
	userAvatar.src=`${user.avatar_url}`;
	// get to understand how the slice works in this case
	let userJoin = new Date(user.created_at).toUTCString().split(' ').slice(1,4,5,6).join(' ');
	userJoinDate.innerText = `${userJoin}`;
	if (`${user.bio}` === 'null') {
		userBio.innerHTML = `<p>No bio provided.</p>`;
	} else {
		userBio.innerHTML = `<p>${user.bio}</p>`;
	}
	if (`${user.location}` === 'null' || `${user.location}` === 'undefined') {
		userCity.innerHTML = `${notAvail}`;
		userCity.closest('li').classList.add('na');
	} else {
		userCity.innerHTML = `${user.location}`;
		userCity.closest('li').classList.remove('na');
	}
	if (`${user.twitter_username}` === 'null' || `${user.twitter_username}` === 'undefined') {
		userTwitter.innerHTML = `${notAvail}`;
		userTwitter.closest('li').classList.add('na');
	} else {
		userTwitter.innerHTML = `${user.twitter_username}`;
		userTwitter.closest('li').classList.remove('na');
	}
	if (`${user.blog}` === 'null' || `${user.blog}` === 'undefined' || `${user.blog}` === '') {
		userSite.innerHTML = `${notAvail}`;
		userSite.closest('li').classList.add('na');
	} else {
		userSite.innerHTML = `${user.blog}`;
		userSite.closest('li').classList.remove('na');
	}
	if (`${user.company}` === 'null' || `${user.company}` === 'undefined' || `${user.company}` === '') {
		userCompany.innerHTML = `${notAvail}`;
		userCompany.closest('li').classList.add('na');
	} else {
		userCompany.innerHTML = `${user.company}`;
		userCompany.closest('li').classList.remove('na');
	}
}
startSearch.addEventListener('submit', (e) => {
	e.preventDefault();
	getUser();
});
// Call the functions on load
initTheme();