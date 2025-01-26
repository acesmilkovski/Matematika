// Cache DOM elements
const goreElements = document.getElementById("gore").children;
const doleElements = document.getElementById("dole").children;
const cardWidth = 640 / 13;
const cardHeight = 383 / 5;
const image = document.getElementById("image");

// Optimize kalkulacija function
function kalkulacija() {
  let sum = 0;
  for (let i = 0; i < goreElements.length; i += 2) {
    sum += Number(goreElements[i].textContent);
  }
  return sum;
}

// Optimize test function
function test(event) {
  const sum = kalkulacija();
  const expectedSum = Number(event.target.previousElementSibling.textContent);
  if (sum === expectedSum) {
    netocno.style.display = "none";
    tocno.style.display = "inline";
    displayNumbers();
  }else{
    tocno.style.display = "none";
    netocno.style.display = "inline";
  }
}

// Optimize goreNumbers function
function goreNumbers() {
  let [x, y, z] = [
    Math.ceil(Math.random() * 13),
    Math.ceil(Math.random() * 13),
    Math.ceil(Math.random() * 13),
  ];

  // Adjust x and y if they are greater than 10
  if (x > 10) x++;
  if (y > 10) y++;

  // Adjust x and y if their sum is greater than 14
  if (x + y > 14) {
    x = Math.ceil(x / 2);
    y = Math.ceil(y / 2);
  }

  // Set z to 0 if the sum of x, y, and z is greater than 14
  if (x + y + z > 14) z = 0;

  return [x, y, z];
}

function displayNumbers() {
  const goreNums = goreNumbers();
  const goreElementsLength = goreElements.length;

  for (let i = 0; i < goreElementsLength; i += 2) {
    const currentIndex = i;
    const currentGoreNum = goreNums[currentIndex / 2];
    goreElements[currentIndex].textContent = currentGoreNum;
    drawGore(goreElements, goreNums, currentIndex);
  }

  const doleNums = doleNumbers();
  const doleElementsLength = doleElements.length;

  for (let i = 0; i < doleElementsLength; i++) {
    doleElements[i].children[0].textContent = doleNums[i];
    drawDole(doleElements, doleNums, i);
  }
}

function drawDole(elements, numbers, index) {
  const ctx = elements[index].children[1].getContext("2d");
  if(numbers[index] > 1 && numbers[index] <= 10){
    ctx.drawImage(image, (cardWidth * (numbers[index] - 1)), cardHeight, 50, 75, 0, 0, 300, 150);
  } else if(numbers[index] > 11){
    ctx.drawImage(image, (cardWidth * (numbers[index] - 2)), cardHeight, 50, 75, 0, 0, 300, 150);
  } else if(numbers[index] === 11){
    ctx.drawImage(image, 0, cardHeight, 50, 75, 0, 0, 300, 150);
  }
}

function drawGore(elements, numbers, index) {
  const ctx = elements[index + 1].getContext("2d");
  if (index === 0 && numbers[index] === 0) {
    ctx.drawImage(image, cardWidth * 2, cardHeight * 4, 50, 75, 0, 0, 300, 150);
  } else if (numbers[index / 2] === 0) {
    ctx.drawImage(image, cardWidth * 2, cardHeight * 4, 50, 75, 0, 0, 300, 150);
  } else if(numbers[index / 2] > 0 && numbers[index / 2] <= 10){
    ctx.drawImage(image, (cardWidth * (numbers[index / 2] - 1)), cardHeight, 50, 75, 0, 0, 300, 150);
  } else if(numbers[index / 2] > 10){
    ctx.drawImage(image, (cardWidth * (numbers[index / 2] - 2)), cardHeight, 50, 75, 0, 0, 300, 150);
  } 
}

// Optimize doleNumbers function
function doleNumbers() {
  const numbers = [
    Math.ceil(Math.random() * 13) + 1,
    Math.ceil(Math.random() * 13) + 1,
    Math.ceil(Math.random() * 13) + 1,
    Math.ceil(Math.random() * 13) + 1,
  ];
  const replaceIndex = Math.floor(Math.random() * 4);
  numbers[replaceIndex] = kalkulacija();
  return numbers;
}

displayNumbers();