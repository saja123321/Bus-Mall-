
'use strict';
let imgesSrcArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let counter = 0;
let numberOfRound = 5;
let r1, r2, r3;
const imageSection = document.getElementById('imageSection');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let result = document.getElementById('Result');
let resultUl = document.getElementById('resultsUl');
function BusMall(imageName, imageSrc) {

  this.imageName = imageName;
  this.imageSrc = imageSrc;
  this.numOfClick = 0;
  this.numOfShown = 0;
  BusMall.images.push(this);
}

BusMall.images = [];

//---------------------------------------------------------------------

for (let i = 0; i < imgesSrcArr.length; i++) {
  new BusMall(imgesSrcArr[i].split('.')[0], imgesSrcArr[i]);
}
//---------------------------------------------------------------------
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function render() {
  r1 = getRandom(0, imgesSrcArr.length - 1);
  r2 = getRandom(0, imgesSrcArr.length - 1);
  r3 = getRandom(0, imgesSrcArr.length - 1);
  img1.src = './img/' + BusMall.images[r1].imageSrc;
  img2.src = './img/' + BusMall.images[r2].imageSrc;
  img3.src = './img/' + BusMall.images[r3].imageSrc;

  BusMall.images[r1].numOfShown++;
  BusMall.images[r2].numOfShown++;
  BusMall.images[r3].numOfShown++;

  // console.log(busmall.images[r1]);
}
render();

imageSection.addEventListener('click', showImage);

function showImage(event) {

  if ((event.target.id === 'img1' || event.target.id === 'img2' || event.target.id === 'img3') && counter < numberOfRound) {
    // event.preventDefault();
    if (event.target.id === 'img1') {
      BusMall.images[r1].numOfClick++;
    } else if (event.target.id === 'img2') {
      BusMall.images[r2].numOfClick++;
    } else if (event.target.id === 'img3') {
      BusMall.images[r3].numOfClick++;
    }
    console.log(counter, numberOfRound);
    counter++;
    render();
  } else {
    result.style.visibility = 'visible';

  }
}
function showResult() {
  if (result.textContent === 'reset') {
    window.location.reload();
  }
  else {
    imageSection.removeEventListener('click', showImage);

    for (let ii = 0; ii < BusMall.images.length; ii++) {
      let liE = document.createElement('li');
      liE.textContent = `${BusMall.images[ii].imageName} had ${BusMall.images[ii].numOfClick} votes, and was seen  ${BusMall.images[ii].numOfShown} times.`;
      resultUl.appendChild(liE);
    }

    result.textContent = 'reset';
  }



}
