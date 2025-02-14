

// Cache DOM elements
const goreElements = document.getElementById("gore").children;
const doleElements = document.getElementById("dole").children;
const image = document.getElementById("image");
let cardWidth = image.width / 13;
let cardHeight = image.height / 5;


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
  const tocno = document.getElementById("tocno");
  const netocno = document.getElementById("netocno");
  tocno.style.display = sum === expectedSum ? "inline" : "none";
  netocno.style.display = sum !== expectedSum ? "inline" : "none";
  if (sum === expectedSum) {
    displayNumbers();
  }
}

// Optimize goreNumbers function
function goreNumbers() {
  let [x, y, z] = [
    Math.ceil(Math.random() * 13),
    Math.ceil(Math.random() * 13),
    Math.ceil(Math.random() * 13),
  ];

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
  const y = Math.floor(Math.random() * 4);
  const number = numbers[index];
  if (number > 1 && number <= 10) {
    ctx.drawImage(image, (cardWidth * (number - 1)), (cardHeight * y), 100, 150, 0, 0, 300, 150);
  } else if (number > 11) {
    ctx.drawImage(image, (cardWidth * (number - 2)), (cardHeight * y), 100, 150, 0, 0, 300, 150);
  } else if (number === 11) {
    ctx.drawImage(image, 0, (cardHeight * y), 100, 150, 0, 0, 300, 150);
  }
}

function drawGore(elements, numbers, index) {
  const ctx = elements[index + 1].getContext("2d");
  const y = Math.floor(Math.random() * 4);
  const number = numbers[index / 2];
  if (index === 0 && number === 0) {
    ctx.drawImage(image, cardWidth * 2, cardHeight * 4, 100, 150, 0, 0, 300, 150);
  } else if (number === 0) {
    ctx.drawImage(image, cardWidth * 2, cardHeight * 4, 100, 150, 0, 0, 300, 150);
  } else if (number > 0 && number <= 10) {
    ctx.drawImage(image, (cardWidth * (number - 1)), (cardHeight * y), 100, 150, 0, 0, 300, 150);
  } else if (number > 10) {
    ctx.drawImage(image, (cardWidth * (number - 2)), (cardHeight * y), 100, 150, 0, 0, 300, 150);
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

image.onload = () => {
  cardWidth = image.width / 13;
  cardHeight = image.height / 5;
  displayNumbers(); // Call displayNumbers *after* the image loads
};

// In case the image is already cached
if (image.complete) {
  cardWidth = image.width / 13;
  cardHeight = image.height / 5;
  displayNumbers(); // Call displayNumbers if image is already loaded
}
