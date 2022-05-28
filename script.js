// import data from json file

fetch("./data.json")
  .then((result) => {
    const json = result.json();
    return json;
  })
  .then((data) => {
    getData(data);
  });

// set clicked frame

let clickedTime = "daily";
let controlTimeFrames = document.querySelector(".control-flow");

// get data

function getData(data) {
  data.forEach((card) => {
    setData(card.title, card.timeframes[clickedTime]);
  });

  [...controlTimeFrames.children].forEach((frame) => {
    frame.addEventListener("click", function () {
      clickedTime = frame.dataset.time;
      [...controlTimeFrames.children].forEach((time) => {
        time.classList.remove("active");
      });
      frame.classList.add("active");
      [...document.querySelector(".report").children].forEach((element) => {
        if (element.classList.contains("card")) {
          element.remove();
        }
      });
      data.forEach((card) => {
        setData(card.title, card.timeframes[clickedTime]);
      });
    });
  });
}

// set data in DOM
function setData(cardTitle, activeFrame) {
  // create card container

  let card = document.createElement("section");

  if (cardTitle === "Self Care") {
    cardTitle = cardTitle.split(" ").join("-");
  }

  card.className = `card ${cardTitle.toLowerCase()}`;

  // Set icon
  let iconHolder = document.createElement("div");
  iconHolder.className = "icon-holder";
  let icon = document.createElement("img");
  icon.className = "icon";
  let timer = document.createElement('div');
  timer.className = "timer"
  //----
  let ppp = document.createElement('p');

  // let spanTens = document.createElement('span');
  // spanTens.className = "tens";

  let spanDotFirst = document.createElement('span');
  spanDotFirst.className = "dots";
  spanDotFirst.innerHTML = ":" ;

  let spanDotSec = document.createElement('span');
  spanDotSec.className = "dots";
  spanDotSec.innerHTML = ":" ;
  
  let spanSeconds = document.createElement('span');
  spanSeconds.className = "seconds";
  spanSeconds.innerHTML = "00";

  let spanMinutes = document.createElement('span');
  spanMinutes.className = "minutes";
  spanMinutes.innerHTML = "00";

  let spanHours = document.createElement('span');
  spanHours.className = "hours";
  spanHours.innerHTML = "00";




  //-----
  ppp.appendChild(spanHours);
  ppp.appendChild(spanDotFirst);
  ppp.appendChild(spanMinutes);
  ppp.appendChild(spanDotSec);
  ppp.appendChild(spanSeconds);
  // ppp.appendChild(spanDots);
  // ppp.appendChild(spanTens);
  // -------
  timer.appendChild(ppp)

  icon.src = `./images/icon-${cardTitle.toLowerCase()}.svg`;
  icon.alt = cardTitle;
  iconHolder.appendChild(timer);
  iconHolder.appendChild(icon);
  card.appendChild(iconHolder);

  //   Set statics

  let statics = document.createElement("div");
  statics.className = "statics";

  // Set info

  let info = document.createElement("div");
  info.className = "info";
  let title = document.createElement("h5");
  title.innerHTML = cardTitle;
  info.appendChild(title);
  let currentTime = document.createElement("p");
  currentTime.className = "current-time";
  currentTime.innerHTML = activeFrame.current + "hrs";
  info.appendChild(currentTime);
  let lastTime = document.createElement("p");
  lastTime.className = "last-time";
  switch (clickedTime) {
    case "daily":
      lastTime.innerHTML = `Last Day - ${activeFrame.previous}hrs`;
      break;
    case "weekly":
      lastTime.innerHTML = `Last Week - ${activeFrame.previous}hrs`;
      break;
    case "monthly":
      lastTime.innerHTML = `Last Month - ${activeFrame.previous}hrs`;
      break;
    default:
      break;
  }
  info.appendChild(lastTime);

  statics.appendChild(info);

  let ellipsis = document.createElement("img");
  ellipsis.src = "./images/reset.png";
  ellipsis.alt = "ellipsis";
  ellipsis.className = "reset";
  statics.appendChild(ellipsis);

  card.appendChild(statics);

  document.querySelector(".report").append(card);
  // --------------------------------------------------------
  // first things first
  // tap the icon to start counting 
  var tens = 00;
  var seconds = 00;
  var minutes = 00;
  var hours = 00;
  // var appendTens = document.querySelector('.tens');
  var appendSeconds = document.querySelector('.seconds');
  var appendMinutes = document.querySelector('.minutes');
  var appendhours = document.querySelector('.hours');

  var interval ;
  function startTimer(){
    tens++;
    if(tens>99){
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
    } if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    } if (seconds > 59) {
      tens = 0;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
      minutes++;
      appendMinutes.innerHTML = minutes;
    } if (minutes > 9) {
      appendMinutes.innerHTML = minutes;
    } if  (minutes < 9) {
      appendMinutes.innerHTML = "0" + minutes;
    } if (minutes > 59) {
      hours++;
      tens = 0;
      seconds = 0;
      appendSeconds.innerHTML = "0" + seconds;
      minutes = 0;
      appendMinutes.innerHTML = "0" + minutes;
    } if (hours < 9) {
      appendhours.innerHTML = "0" + hours;
    } if(hours > 23){
      tens = 0;
      seconds = 0;
      appendSeconds.innerHTML = "0" + seconds;
      minutes = 0;
      appendMinutes.innerHTML = "0" + minutes;
      appendhours.innerHTML = hours;
    }
  }
  // add click event to the statics
  statics.addEventListener("click",function(){
    // statics.classList.toggle('blank');
    statics.classList.toggle('counting');

    if (statics.classList.contains("counting")){
      interval = setInterval(startTimer);
    } else {
      clearInterval(interval);
    }
  })

  let reset = document.querySelector('.reset');
  reset.addEventListener("click", function(){
    clearInterval(interval);
    tens = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    appendSeconds.innerHTML = "0" + seconds;
    appendMinutes.innerHTML = "0" + minutes;
    appendhours.innerHTML = "0" + hours;
  })

}




// onclick function



