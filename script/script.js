
'use strict';
let imgesSrcArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let counter = 0;
let numberOfRound = 25;
let r1, r2, r3;
const imageSection = document.getElementById('imageSection');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let p1 = document.getElementById('p1');
let p2 = document.getElementById('p2');
let p3 = document.getElementById('p3');
let result = document.getElementById('Result');
let resetData = document.getElementById('Result2');

let resultUl = document.getElementById('resultsUl');

let ctx = document.getElementById('showData').getContext('2d');


function BusMall(imageName, imageSrc , numOfClick = 0 , numOfShown = 0 ) {

  this.imageName = imageName;
  this.imageSrc = imageSrc;
  this.numOfClick = numOfClick;
  this.numOfShown = numOfShown;
  BusMall.images.push(this);
}

BusMall.images = [];
checkDataExist();

//---------------------------------------------------------------------
// for (let i = 0; i < imgesSrcArr.length; i++) {
//   new BusMall(imgesSrcArr[i].split('.')[0], imgesSrcArr[i]);
// }
//---------------------------------------------------------------------
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function render() {
  do {
    r1 = getRandom(0, imgesSrcArr.length - 1);
    r2 = getRandom(0, imgesSrcArr.length - 1);
    r3 = getRandom(0, imgesSrcArr.length - 1);
  }
  while (r1 === r2 || r1 === r3 || r3 === r2);

  //console.log(r1, r2, r3);
  img1.src = './img/' + BusMall.images[r1].imageSrc;
  img2.src = './img/' + BusMall.images[r2].imageSrc;
  img3.src = './img/' + BusMall.images[r3].imageSrc;

  p1.textContent = BusMall.images[r1].imageName;
  p2.textContent = BusMall.images[r2].imageName;
  p3.textContent = BusMall.images[r3].imageName;



  BusMall.images[r1].numOfShown++;
  BusMall.images[r2].numOfShown++;
  BusMall.images[r3].numOfShown++;
  localStorage.localBusMall = JSON.stringify( BusMall.images );

}
render();

imageSection.addEventListener('click', showImage);

function showImage(event) {

  let arr1 = [r1, r2, r3];
  let arr2 = [];
  if ((event.target.id === 'img1' || event.target.id === 'img2' || event.target.id === 'img3') && counter < numberOfRound) {
    event.preventDefault();
    if (event.target.id === 'img1') {
      BusMall.images[r1].numOfClick++;
    } else if (event.target.id === 'img2') {
      BusMall.images[r2].numOfClick++;
    } else if (event.target.id === 'img3') {
      BusMall.images[r3].numOfClick++;
    }
    //console.log(counter, numberOfRound);
    counter++;

    do {
      render();
      arr2 = [r1, r2, r3];
    } while (!checkDublicate(arr1 , arr2));

  } else if (counter >= numberOfRound) {
    result.style.visibility = 'visible';
    resetData.style.visibility = 'visible';

  }
}
function resetMallData(){
  localStorage.removeItem('localBusMall');
  window.location.reload();
}

function showResult() {
  if (result.textContent === 'vote again') {
    window.location.reload();
  }
  else {
    imageSection.removeEventListener('click', showImage);
    createMyChart(getName(), getShowData(), getClickData());

    for (let ii = 0; ii < BusMall.images.length; ii++) {
      let liE = document.createElement('li');
      liE.textContent = `${BusMall.images[ii].imageName} had ${BusMall.images[ii].numOfClick} votes, and was seen  ${BusMall.images[ii].numOfShown} times.`;
      resultUl.appendChild(liE);
    }
    result.textContent = 'vote again';
  }
}


function checkDublicate(list1, list2) {
  for (let index = 0; index < list1.length; index++) {
    for (let index2 = 0; index2 < list2.length; index2++) {
      if (list1[index] === list2[index2]) {
        return false;
      }
    }
  }
  return true;
}

function createMyChart(names, clikData, showData) {

  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: showData,
        backgroundColor: [
          'rgba(255, 159, 64, 0.9)'
        ],
      },
      {
        label: '# of Click time',
        data: clikData,
        backgroundColor: [
          '#986D8E'
        ],
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function getName() {
  let arrayName = [];
  for (let index = 0; index < BusMall.images.length - 1; index++) {
    arrayName.push(BusMall.images[index].imageName);
  }
  return arrayName;
}


function getShowData() {
  let arrayShown = [];
  for (let index = 0; index < BusMall.images.length - 1; index++) {
    arrayShown.push(BusMall.images[index].numOfShown);
  }
  return arrayShown;
}

function getClickData() {
  let arrayClick = [];

  for (let index = 0; index < BusMall.images.length - 1; index++) {
    arrayClick.push(BusMall.images[index].numOfClick);
  }
  return arrayClick;
}

function checkDataExist(){
  if(localStorage.localBusMall){
    let localBusMallObj = JSON.parse(localStorage.localBusMall) ;
    for( let x = 0; x < localBusMallObj.length; x++ ) {
      new BusMall( localBusMallObj[x].imageName, localBusMallObj[x].imageSrc , localBusMallObj[x].numOfClick , localBusMallObj[x].numOfShown);
    }
  }else{
    for (let i = 0; i < imgesSrcArr.length; i++) {
      new BusMall(imgesSrcArr[i].split('.')[0], imgesSrcArr[i]);
    }

  }
}
