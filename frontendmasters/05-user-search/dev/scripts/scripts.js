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
let endpoint = 'https://api.github.com/users/';
let startSearch = document.querySelector('.search-form');
let errorMsg = document.querySelector('.error');
let userAvatar = document.querySelector('.user-avatar');
let userName = document.querySelector('.username');
let userJoinDate = document.querySelector('.join-date');
let userHandle = document.querySelector('.handle');
let userBio = document.querySelector('.bio');
let userRepos = document.querySelector('.repos');
let userFollowers = document.querySelector('.followers');
let userFollowing = document.querySelector('.following');
let userCity = document.querySelector('.city');
let userTwitter = document.querySelector('.twitter');
let userSite = document.querySelector('.site-link');
let userCompany = document.querySelector('.company');
let notAvail = 'Not available';

async function getUser(user) {
	let userSearch = document.getElementById('username').value;
	let fullString = `${endpoint}${userSearch}`;
	let theSearch = await fetch(fullString);
	let data = await theSearch.json();
	console.table(data);
	userData(data);
}
function userData(user) {
	userName.innerText = `${user.login}`;
	userHandle.innerText = `@${user.name}`;
	userHandle.href = `${user.html_url}`;
	userRepos.innerText = `${user.public_repos}`;
	userFollowers.innerText = `${user.followers}`;
	userFollowing.innerText = `${user.following}`;
	// get to understand how the slice works in this case
	let userJoin = new Date(user.created_at).toUTCString().split(' ').slice(1,4,5,6).join(' ');
	userJoinDate.innerText = `${userJoin}`;
	console.log(userJoin);
	if (`${user.bio}` === 'null') {
		userBio.innerHTML = `<p>No bio provided.</p>`;
	} else {
		userBio.innerHTML = `<p>${user.bio}</p>`;
	}
	if (`${user.location}` === 'null' || `${user.location}` === 'undefined') {
		userCity.innerHTML = `${notAvail}`;
	} else {
		userCity.innerHTML = `${user.location}`;
	}
	if (`${user.twitter_username}` === 'null' || `${user.twitter_username}` === 'undefined') {
		userTwitter.innerHTML = `${notAvail}`;
	} else {
		userTwitter.innerHTML = `${user.twitter_username}`;
	}
	if (`${user.blog}` === 'null' || `${user.blog}` === 'undefined' || `${user.blog}` === '') {
		userSite.innerHTML = `${notAvail}`;
	} else {
		userSite.innerHTML = `${user.blog}`;
	}
	if (`${user.company}` === 'null' || `${user.company}` === 'undefined' || `${user.company}` === '') {
		userCompany.innerHTML = `${notAvail}`;
	} else {
		userCompany.innerHTML = `${user.company}`;
	}
	

	
	
}

startSearch.addEventListener('submit', (e) => {
	e.preventDefault();
	getUser(userName);
});


// Call the functions on load
initTheme();