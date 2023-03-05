const hideTime = document.getElementById('hide-time');
const hideDate = document.getElementById('hide-date');
const hideGreeting = document.getElementById('hide-greeting');
const hideQuote = document.getElementById('hide-quote');
const hideWeather = document.getElementById('hide-weather');
const hideAudio = document.getElementById('hide-audio');
const hideTodolist = document.getElementById('hide-todolist');

const time = document.querySelector('.time');
const localDate = document.querySelector('.date');
const greetingContainer = document.querySelector('.greeting-container');
const quoteAuthor = document.querySelector('.quote-author');
const weather = document.querySelector('.weather');
const myTaskContainer = document.querySelector('.icon-task-container');
const playerContainer = document.querySelector('.player');

hideTime.addEventListener('click', function() {
  if (hideTime.checked != true ) {
    time.classList.add('hide-time-active');
  } else {
    time.classList.remove('hide-time-active');
  }
})
  
hideQuote.addEventListener('click', function() {
  if (hideQuote.checked != true ) {
    localDate.classList.add('hide-time-active');
  } else {
    localDate.classList.remove('hide-time-active');
  }
})  