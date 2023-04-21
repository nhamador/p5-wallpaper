let img;
let originalImg;
let brightColors = [];

function preload() {
  img = loadImage("hylics.jpg");
}

function setup() {
  imageMode(CENTER);
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  background("pink");

  originalImg = img.get();
  img.resize(100, 0); // resize image to 100px width (height is automatically calculated)
  findBrightColors(10); // find 10 brightest colors
  noStroke();
  
  
}

function draw() {
  colorMode(HSB, 360, 100, 100, 1);
  fill("green");
  rect(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  image(originalImg, windowWidth / 2, windowHeight / 2, originalImg.width, originalImg.height);
  drawPallete();
 
}

function findBrightColors(n) {
  brightColors = [];

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let c = img.get(x, y);
      let hsb = RGBtoHSB(c);

      if (brightColors.length < n) {
        brightColors.push({ color: c, brightness: hsb[2] });
        brightColors.sort((a, b) => b.brightness - a.brightness);
      } else if (hsb[2] > brightColors[brightColors.length - 1].brightness) {
        brightColors.pop();
        brightColors.push({ color: c, brightness: hsb[2] });
        brightColors.sort((a, b) => b.brightness - a.brightness);
      }
    }
  }
}

function RGBtoHSB(c) {
  let r = red(c) / 255;
  let g = green(c) / 255;
  let b = blue(c) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h, s, v;

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = (60 * ((g - b) / (max - min))) % 360;
  } else if (max === g) {
    h = 60 * ((b - r) / (max - min)) + 120;
  } else if (max === b) {
    h = 60 * ((r - g) / (max - min)) + 240;
  }

  if (h < 0) {
    h = h + 360;
  }

  if (max === 0) {
    s = 0;
  } else {
    s = (max - min) / max;
  }

  v = max;

  return [h * 360, s * 100, v * 100];
}

function drawPallete(){
  let index = 0;
  rectMode(CORNER);
  colorMode(RGB, 255);
  for(let i = 0; i < brightColors.length; i ++)
  {
    let col = brightColors[i].color;
    // Access the individual color components (red, green, and blue)
    fill(red(col), green(col), blue(col));
    
    console.log(brightColors[i]);
    //really need to find a way to scale these better later on 
    rect(index, 0, windowWidth/23, windowWidth/23);
    index = index + windowWidth/23;

  }
  colorMode(HSB, 360, 100, 100, 1); // Switch back to HSB mode
  rectMode(CENTER);
}