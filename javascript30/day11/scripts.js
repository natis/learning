// Get elements
const video = document.querySelector('.viewer');
const playButton = document.querySelector('.toggle');
const scrubBar = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
let scrubbing = false;

// Build Functions
// Play Pause
function playPause() {
	if(video.paused) {
		video.play();
	} else {
		video.pause();
	}
	// Alternative approach
	// const method = video.paused ? 'play' : 'pause';
	// video[method]();
}
// Listen for the event of the video playing rather than the click action in case some external element pauses the video
function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	playButton.textContent = icon;
}
// Skip buttons
function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}
// Range sliders
function handleRangeUpdate() {
	video[this.name] = this.value;
}
//Progress Bar
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
	if (!scrubbing) return;
	const scrubTime = (e.offsetX / scrubBar.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}


// Hook up event listeners
// Play/Pause
playButton.addEventListener('click', playPause);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('click', playPause);

// Skip time
skipButtons.forEach(button => button.addEventListener('click', skip));

// ranges
ranges.forEach(input => input.addEventListener('change', handleRangeUpdate));
ranges.forEach(input => input.addEventListener('mousemove', handleRangeUpdate));

// Update timer bar
video.addEventListener('timeupdate', handleProgress);

// Clickable scrub Bar
scrubBar.addEventListener('click', scrub);
scrubBar.addEventListener('mousemove', (e) => scrubbing && scrub(e));
scrubBar.addEventListener('mousedown', () => scrubbing = true);
scrubBar.addEventListener('mouseup', () => scrubbing = false);


