import playList from './playList.js';
//import lang from './lang.js';

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

const greeting = document.querySelector('.greeting');
const inputName = document.querySelector('.name');
const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const source = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const playAndStop = document.querySelector('.play');
const playAudioPrev = document.querySelector('.play-prev');
const playAudioNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const select = document.querySelector('select');
const openPopUp = document.querySelector('.open-pop-up');
const popUp = document.querySelector('.pop-up-player');
const closePopUp = document.querySelector('main');
const closePopUpFooter = document.querySelector('footer');
const settings = document.querySelector('.settings');
const settingButton = document.querySelector('.setting-btn');
const navClose = document.querySelector('.nav-close');

let randomNum = getRandomNum(); 
let isPlay = false;
let playNum = 0;
let hash = window.location.hash.slice(1);
console.log(hash);
const allLang = ['en', 'ru'];

const langArr = {
  "unit": {
    "en": "momentum",
    "ru": "????????????????",
  },
  "cityWeather": {
    "en": "Minsk",
    "ru": "??????????",
  },
  "speed": {
    "en": "Wind speed",
    "ru": "???????????????? ??????????",
  },
  "ms": {
    "en": "m/s",
    "ru": "??/??",
  },
  "humidity": {
    "en": "Humidity",
    "ru": "??????????????????",
  },
  "myLocal": {
    "en": "en-US",
    "ru": "ru-RU",
  },
  "eng": {
    "en": "English",
    "ru": "????????????????????",
  },
  "rus": {
    "en": "Russian",
    "ru": "??????????????",
  },
  "user": {
    "en": "User",
    "ru": "????????????????????????",
  },
  "click": {
    "en": "Click",
    "ru": "????????????",
  },
  "task": {
    "en": "Task to be done..",
    "ru": "????????????, ?????????????? ?????????? ??????????????????..",
  },
  "person": {
    "en": "Piotr Bausiuk",
    "ru": "???????? ????????????",
  },
  "set": {
    "en": "Settings",
    "ru": "??????????????????",
  },
  "setLang": {
    "en": "Language:",
    "ru": "????????:",
  },
  "setSource": {
    "en": "Photo Source:",
    "ru": "???????????????? ????????:",
  },
  "photoTag": {
    "en": "enter a photo category",
    "ru": "?????????????? ?????????????????? ????????????????????",
  },
  "hideBl": {
    "en": "Hide Blocks:",
    "ru": "???????????? ????????:",
  },
  "setTime": {
    "en": "Time",
    "ru": "B????????",
  },
  "setdate": {
    "en": "Date",
    "ru": "????????",
  },
  "setgreet": {
    "en": "Greeting",
    "ru": "??????????????????????",
  },
  "setquote": {
    "en": "Quote of the Day",
    "ru": "???????????? ??????",
  },
  "setweat": {
    "en": "Weather",
    "ru": "????????????",
  },
  "setaudio": {
    "en": "Audio Player",
    "ru": "????????????????????",
  },
  "setToDo": {
    "en": "To Do List",
    "ru": "???????????? ??????",
  },
}

//Part 1-2
//Storage
function setLocalStorage() {
    localStorage.setItem('name', inputName.value);
    localStorage.setItem('city', city.value);
  }
  window.addEventListener('beforeunload', setLocalStorage);

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
        inputName.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    }

    getWeather();
  }
  window.addEventListener('load', getLocalStorage); 

//Date
function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString(langArr['myLocal'][hash], options);
  localDate.textContent = currentDate;
}

//Time of Day
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 18) {
    return 'evening';
  } else if (hours >= 12) {
    return 'afternoon';
  } else if (hours >= 6) {
    return 'morning';
  } else {
    return 'night';
  }
}

// main function show Time update
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  let myTimeOfDay = getTimeOfDay();
  let greetingText;
  if (myTimeOfDay === 'evening' && hash === 'ru') {
      greetingText = `???????????? ??????????`;
  } else if (myTimeOfDay === 'afternoon' && hash === 'ru') {
      greetingText = `???????????? ????????`;
  } else if (myTimeOfDay === 'night' && hash === 'ru') {
      greetingText = `?????????????????? ????????`;
  } else if (myTimeOfDay === 'morning' && hash === 'ru') {
      greetingText = `???????????? ????????`;
  } else {
    greetingText = `Good ${myTimeOfDay}`;
  }
  greeting.textContent = greetingText;
  setTimeout(showTime, 1000);
}

//Part 3
//Slider image
function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

function setBg() {  
  const timeOfDay = getTimeOfDay();
  const bgNum = String(randomNum).padStart(2, '0');
  const img = new Image();
  //img.src = `https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTQzODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcxODMxMzU&ixlib=rb-4.0.3&q=80&w=1080`;
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => { 
  //body.style.background = `url(https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTQzODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcxODMxMzU&ixlib=rb-4.0.3&q=80&w=1080)`
  body.style.background = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg)`;
  }; 
}

function getSlideNext() {
  if (randomNum < 20) {
    randomNum = randomNum + 1;
  } else {
    randomNum = 1;
  }
  setBg();
}

function getSlidePrev() {
  if (randomNum > 1) {
    randomNum = randomNum - 1;
  } else {
    randomNum = 20;
  }
  setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


//Part 4
//Weather
async function getWeather() {
 try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${hash}&appid=172f498f14ceb7c0f76c3704cf7c4f3d&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}??C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${langArr['speed'][hash]}: ${Math.round(data.wind.speed)} ${langArr['ms'][hash]}`;
    humidity.textContent = `${langArr['humidity'][hash]}: ${Math.round(data.main.humidity)}%`;
    weatherError.textContent = '';
  } catch {
     weatherError.textContent = `Error! city not found for '${city.value}'!`;
     weatherIcon.className = 'weather-icon owf';
     temperature.textContent = '';
     weatherDescription.textContent = '';
     wind.textContent = '';
     humidity.textContent = '';
  }
}

city.addEventListener('change', getWeather);


//Part5
//Quotes
async function getQuotes() {  
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  let randomData = data[Math.floor(Math.random() * data.length)];
  quote.textContent = `???${randomData.quote[hash]}.???`;
  source.textContent = randomData.source[hash];
}

changeQuote.addEventListener("click", getQuotes);


//Part6
//audio
const audio = new Audio();

function playAudio() {
  if (!isPlay) {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
//
  audio.onended = function() {
    if (playNum < 3) {
      playNum = playNum + 1;
    } else {
      playNum = 0;
    }
    audio.src = playList[playNum].src;
    audio.play();
    for (let i = 0; i < playliItems.length; i++) {
      if (i === playNum) {
        playliItems[i].classList.add('item-active');
      } else {
        playliItems[i].classList.remove('item-active');
      }
    }
  }
//
  audio.play();
  isPlay = true;
  for (let i = 0; i < playliItems.length; i++) {
    if (i === playNum) {
      playliItems[i].classList.add('item-active');
    } else {
      playliItems[i].classList.remove('item-active');
    }
  }
  } else {
    audio.pause();
    isPlay = false;
  }
  playAndStop.classList.toggle('pause');
}

function playNext() {
  if (playNum < 3) {
    playNum = playNum + 1;
  } else {
    playNum = 0;
  }
  isPlay = false;
  playAudio();
  playAndStop.classList.add('pause');
}

function playPrev() {
  if (playNum > 0) {
    playNum = playNum - 1;
  } else {
    playNum = 3;
  }
  isPlay = false;
  playAudio();
  playAndStop.classList.add('pause');
}

playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title[hash];
  playListContainer.append(li);
});

const playliItems = document.querySelectorAll('.play-item');

playAudioNext.addEventListener('click', playNext);
playAudioPrev.addEventListener('click', playPrev);

playAndStop.addEventListener('click', playAudio);



//Part8
//internationalization

select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
  let lang = select.value;
  location.href = window.location.pathname + "#" + lang;
  location.reload();
}

function changeLanguage() {
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#en';
    location.reload();
  }
  select.value = hash;
  document.querySelector('title').innerHTML = langArr['unit'][hash];
  document.querySelector('.city').value = langArr['cityWeather'][hash];
  document.querySelectorAll('option')[0].textContent = langArr['eng'][hash];
  document.querySelectorAll('option')[1].textContent = langArr['rus'][hash];
  document.querySelector('.name').placeholder = langArr['user'][hash];
  document.querySelector('.task-placeholder').placeholder = langArr['task'][hash];
  document.querySelector('.footer-time').innerHTML = `&copy; 2022 ${langArr['person'][hash]}`;
  document.querySelector('.settings h2').textContent = `${langArr['set'][hash]}`;
  document.querySelector('.lang-container label').textContent = `${langArr['setLang'][hash]}`;
  document.querySelector('.photo-source-container label').textContent = `${langArr['setSource'][hash]}`;
  document.querySelector('.hide-block-container h4').textContent = `${langArr['hideBl'][hash]}`;
  document.getElementById('photo-tags-input').placeholder = langArr['photoTag'][hash];
  document.querySelector('#hide-time + label').textContent = `${langArr['setTime'][hash]}`;
  document.querySelector('#hide-date + label').textContent = `${langArr['setdate'][hash]}`;
  document.querySelector('#hide-greeting + label').textContent = `${langArr['setgreet'][hash]}`;
  document.querySelector('#hide-quote + label').textContent = `${langArr['setquote'][hash]}`;
  document.querySelector('#hide-weather + label').textContent = `${langArr['setweat'][hash]}`;
  document.querySelector('#hide-audio + label').textContent = `${langArr['setaudio'][hash]}`;
  document.querySelector('#hide-todolist + label').textContent = `${langArr['setToDo'][hash]}`;
}



showTime();
setBg();
getWeather();
getQuotes();
changeLanguage();

//castomaudioplayer
openPopUp.addEventListener('click', function() {
  popUp.classList.add('pop-up-active');
})

closePopUp.addEventListener('click', () => {
    popUp.classList.remove('pop-up-active');
})

closePopUpFooter.addEventListener('click', () => {
  popUp.classList.remove('pop-up-active');
})

//Part10
//Background image
async function getLinkToImage() {
  const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=HZDf3L6wj0Na9etvR_AWdZw1LRHtz7YAjtIPAMXxeTE';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.urls.regular);
 }
  getLinkToImage();

  settingButton.addEventListener('click', function() {
    settings.classList.add('settings-active');
  })

  navClose.addEventListener('click', function() {
    settings.classList.remove('settings-active');
  })
 

  //hide
  hideTime.addEventListener('click', function() {
    if (hideTime.checked != true ) {
      time.classList.add('hide-time-active');
    } else {
      time.classList.remove('hide-time-active');
    }
  })
    
  hideDate.addEventListener('click', function() {
    if (hideDate.checked != true ) {
      localDate.classList.add('hide-date-active');
    } else {
      localDate.classList.remove('hide-date-active');
    }
  })  

  hideGreeting.addEventListener('click', function() {
    if (hideGreeting.checked != true ) {
      greetingContainer.classList.add('greeting-container-hide-active');
    } else {
      greetingContainer.classList.remove('greeting-container-hide-active');
    }
  })  

  hideQuote.addEventListener('click', function() {
    if (hideQuote.checked != true ) {
      quoteAuthor.classList.add('quote-author-hide-active');
    } else {
      quoteAuthor.classList.remove('quote-author-hide-active');
    }
  })  

  hideWeather.addEventListener('click', function() {
    if (hideWeather.checked != true ) {
      weather.classList.add('weather-hide-active');
    } else {
      weather.classList.remove('weather-hide-active');
    }
  })   

  hideAudio.addEventListener('click', function() {
    if (hideAudio.checked != true ) {
      playerContainer.classList.add('player-hide-active');
    } else {
      playerContainer.classList.remove('player-hide-active');
    }
  })   
  
  hideTodolist.addEventListener('click', function() {
    if (hideTodolist.checked != true ) {
      myTaskContainer.classList.add('icon-task-container-hide-active');
    } else {
      myTaskContainer.classList.remove('icon-task-container-hide-active');
    }
  })   