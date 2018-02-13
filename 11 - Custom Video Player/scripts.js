// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.goFullscreen');
const timeDisplay = player.querySelector('.timeDisplay');

// Build functions
function togglePlay(){
  video[video.paused ? 'play' : 'pause']();
}

function updateButton(){
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name] = this.value;
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;

}

function updateTimeDisplay(){
  let totalSeconds = Math.round(video.duration);
  let totalMinutes = Math.floor(totalSeconds / 60);
  totalMinutes = (totalMinutes >= 10) ? totalMinutes : "0" + totalMinutes;
  totalSeconds = Math.floor(totalSeconds % 60);
  totalSeconds = (totalSeconds >= 10) ? totalSeconds : "0" + totalSeconds;

  let elapsedSeconds = Math.round(video.currentTime);
  let elapsedMinutes = Math.floor(elapsedSeconds/60);
  elapsedMinutes = (elapsedMinutes >= 10) ? elapsedMinutes : "0" + elapsedMinutes;
  elapsedSeconds = Math.floor(elapsedSeconds % 60);
  elapsedSeconds = (elapsedSeconds >= 10) ? elapsedSeconds : "0" + elapsedSeconds;

  let elapsedTime = `${elapsedMinutes}:${elapsedSeconds}`;
  let totalTime = `${totalMinutes}:${totalSeconds}`;

  timeDisplay.textContent = `${elapsedTime}/${totalTime}`;
}

function scrub(event){
  const scrubTime = event.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

function goFullscreen(){
  if (document.mozFullScreenElement) {
    document.mozCancelFullScreen();
  } else {
    player.mozRequestFullScreen();
  }
}

// Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', () => {
  handleProgress(); 
  updateTimeDisplay();
});

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', goFullscreen);

video.addEventListener('loadedmetadata', updateTimeDisplay);






