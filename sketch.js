var Canvas;

var subdivisionsX = 60;
var subdivisionsY = 40;
var subdivisionWidth;
var subdivisionHeight;
var noiseIntensity;
var colorBG;
var colorFG1;
var colorFG2;
var hatchingNum = 5;

var parametersContainer;
var showParametersButton, hideParametersButton;
var pErrors;
var xSubdivisionsSlider, ySUbdivisionsSlider;
var bgInputR, bgInputG, bgInputB;
var redrawButton;
var saveImageButton;

function setup() {
  Canvas = createCanvas(windowWidth, windowHeight);
  colorFG1 = color(46, 137, 132);
  colorFG2 = color(114, 71, 48);
  colorBG = color(245, 234, 209);
  makeControls();
  makeGrid();
}

function draw() {
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  makeGrid();
}

function makeGrid(){
  pErrors.html("");
  var tempColorBG = [red(colorBG), green(colorBG), blue(colorBG)];
  var BGtempR = int(bgInputR.value());
  if(BGtempR >= 0 && BGtempR <= 255){
    tempColorBG[0] = BGtempR;
  } else{
    pErrors.html("invalid background R value");
  }
  var BGtempG = int(bgInputG.value());
  if(BGtempG >= 0 && BGtempG <= 255){
    tempColorBG[1] = BGtempG;
  } else{
    pErrors.html("invalid background G value");
  }
  var BGtempB = int(bgInputB.value());
  if(BGtempB >= 0 && BGtempB <= 255){
    tempColorBG[2] = BGtempB;
  } else{
    pErrors.html("invalid background B value");
  }
  colorBG = color(tempColorBG[0], tempColorBG[1], tempColorBG[2]);

  var tempColorFG1 = [red(colorFG1), green(colorFG1), blue(colorFG1)];
  var FG1tempR = int(fg1InputR.value());
  if(FG1tempR >= 0 && FG1tempR <= 255){
    tempColorFG1[0] = FG1tempR;
  } else{
    pErrors.html("invalid foreground 1 R value");
  }
  var FG1tempG = int(fg1InputG.value());
  if(FG1tempG >= 0 && FG1tempG <= 255){
    tempColorFG1[1] = FG1tempG;
  } else{
    pErrors.html("invalid foreground 1 G value");
  }
  var FG1tempB = int(fg1InputB.value());
  if(FG1tempB >= 0 && FG1tempB <= 255){
    tempColorFG1[2] = FG1tempB;
  } else{
    pErrors.html("invalid foreground 1 B value");
  }
  colorFG1 = color(tempColorFG1[0], tempColorFG1[1], tempColorFG1[2]);

  var tempColorFG2 = [red(colorFG2), green(colorFG2), blue(colorFG2)];
  var FG2tempR = int(fg2InputR.value());
  if(FG2tempR >= 0 && FG2tempR <= 255){
    tempColorFG2[0] = FG2tempR;
  } else{
    pErrors.html("invalid foreground 2 R value");
  }
  var FG2tempG = int(fg2InputG.value());
  if(FG2tempG >= 0 && FG2tempG <= 255){
    tempColorFG2[1] = FG2tempG;
  } else{
    pErrors.html("invalid foreground 2 G value");
  }
  var FG2tempB = int(fg2InputB.value());
  if(FG2tempB >= 0 && FG2tempB <= 255){
    tempColorFG2[2] = FG2tempB;
  } else{
    pErrors.html("invalid foreground 2 B value");
  }
  colorFG2 = color(tempColorFG2[0], tempColorFG2[1], tempColorFG2[2]);

  subdivisionsX = xSubdivisionsSlider.value();
  subdivisionsY = ySubdivisionsSlider.value();
  subdivisionWidth = width/subdivisionsX;
  subdivisionHeight = height/subdivisionsY;

  noiseIntensity = subdivisionWidth;
  noiseSeed(millis());

  background(255);
  for(var i = -subdivisionWidth; i <= width + subdivisionWidth; i += subdivisionWidth){
    hatchingNum = round(map(noise(i), 0, 1, 2, 9));
    for(var j = -subdivisionHeight; j <= height + subdivisionHeight; j += subdivisionHeight){
      fill(colorBG);
      stroke(lerpColor(colorFG1, colorFG2, noise(j)));
      var x1 = i + map(noise(j), 0, 1, -noiseIntensity, noiseIntensity); 
      var y1 = j + map(noise(i), 0, 1, -noiseIntensity, noiseIntensity); 
      var x2 = i + subdivisionWidth + map(noise(j), 0, 1, -noiseIntensity, noiseIntensity);
      var y2 = j + map(noise(i + subdivisionWidth), 0, 1, -noiseIntensity, noiseIntensity);
      var x3 = i + map(noise(j + subdivisionHeight), 0, 1, -noiseIntensity, noiseIntensity); 
      var y3 = j + subdivisionHeight + map(noise(i), 0, 1, -noiseIntensity, noiseIntensity); 
      var x4 = i + subdivisionWidth + map(noise(j + subdivisionHeight), 0, 1, -noiseIntensity, noiseIntensity);
      var y4 = j + subdivisionHeight + map(noise(i + subdivisionWidth), 0, 1, -noiseIntensity, noiseIntensity);
      quad(x1, y1, x2, y2, x4, y4, x3, y3);
      var hatchingIterations = [random(), random(), random(), random()];
      for(var k = 1/hatchingNum; k < 1; k += 1/hatchingNum){
        var horizontalX1 = lerp(x1, x2, k);
        var horizontalY1 = lerp(y1, y2, k);
        var horizontalX2 = lerp(x3, x4, k);
        var horizontalY2 = lerp(y3, y4, k);
        var verticalX1 = lerp(x1, x3, k);
        var verticalY1 = lerp(y1, y3, k);
        var verticalX2 = lerp(x2, x4, k);
        var verticalY2 = lerp(y2, y4, k);
        if(hatchingIterations[0] > 0.5){
          line(horizontalX1, horizontalY1, horizontalX2, horizontalY2);
        }
        if(hatchingIterations[1] > 0.5){
          line(verticalX1, verticalY1, verticalX2, verticalY2);
        }
        //diagonal from lower left to upper right
        if(hatchingIterations[2] > 0.5){
          line(horizontalX1, horizontalY1, verticalX1, verticalY1);
          line(x3, y3, x2, y2);
          line(horizontalX2, horizontalY2, verticalX2, verticalY2);
        }
        //diagonal from upper left to lower right
        if(hatchingIterations[3] > 0.5){
          line(horizontalX1, horizontalY1, lerp(x4, x2, k), lerp(y4, y2, k));
          line(x1, y1, x4, y4);
          line(horizontalX2, horizontalY2, lerp(x3, x1, k), lerp(y3, y1, k));
        }
      }
    }
  }
}

function makeControls(){
  var controlsContainer = createDiv("");
  controlsContainer.style("position", "fixed");
  controlsContainer.style("left", "0em");
  controlsContainer.style("top", "0px");
  controlsContainer.style("margin", "0.5em");
  controlsContainer.style("font-family", "sans-serif");

  parametersContainer = createDiv("");
  parametersContainer.style("background-color", "white");
  parametersContainer.style("padding", "1em");
  controlsContainer.child(parametersContainer);

  hideParametersButton = createButton("HIDE PARAMETERS");
  hideParametersButton.style("display", "block");
  hideParametersButton.style("margin", "0 auto");
  hideParametersButton.mousePressed(hideControls);
  parametersContainer.child(hideParametersButton);

  showParametersButton = createButton("SHOW PARAMETERS");
  showParametersButton.style("display", "block");
  showParametersButton.style("margin", "0.5em auto");
  showParametersButton.mousePressed(showControls);
  controlsContainer.child(showParametersButton);

  pErrors = createP("error");
  pErrors.style("color", "red");
  pErrors.style("margin-top", "1.2em");
  pErrors.style("font-size", "80%");
  parametersContainer.child(pErrors);

  var xSubdivisionsLabel = createP("Subdivisions X");
  xSubdivisionsLabel.style("display", "block");
  parametersContainer.child(xSubdivisionsLabel);

  xSubdivisionsSlider = createSlider(10, 80, 60);
  xSubdivisionsSlider.style("display", "block");
  parametersContainer.child(xSubdivisionsSlider);
  
  var ySubdivisionsLabel = createP("Subdivisions Y");
  ySubdivisionsLabel.style("display", "block");
  parametersContainer.child(ySubdivisionsLabel);

  ySubdivisionsSlider = createSlider(10, 80, 40);
  ySubdivisionsSlider.style("display", "block");
  parametersContainer.child(ySubdivisionsSlider);

  var bgColorLabel = createP("Background Color (RGB)");
  bgColorLabel.style("display", "block");
  parametersContainer.child(bgColorLabel);
  
  bgInputR = createInput(red(colorBG));
  bgInputR.style("width", "3em");
  bgInputR.style("margin", "0 0.5em");
  parametersContainer.child(bgInputR);

  bgInputG = createInput(green(colorBG));
  bgInputG.style("width", "3em");
  bgInputG.style("margin", "0 0.5em");
  parametersContainer.child(bgInputG);

  bgInputB = createInput(blue(colorBG));
  bgInputB.style("width", "3em");
  bgInputB.style("margin", "0 0.5em");
  parametersContainer.child(bgInputB);

  var fg1ColorLabel = createP("Foreground Color 1 (RGB)");
  fg1ColorLabel.style("display", "block");
  parametersContainer.child(fg1ColorLabel);
  
  fg1InputR = createInput(red(colorFG1));
  fg1InputR.style("width", "3em");
  fg1InputR.style("margin", "0 0.5em");
  parametersContainer.child(fg1InputR);

  fg1InputG = createInput(green(colorFG1));
  fg1InputG.style("width", "3em");
  fg1InputG.style("margin", "0 0.5em");
  parametersContainer.child(fg1InputG);

  fg1InputB = createInput(blue(colorFG1));
  fg1InputB.style("width", "3em");
  fg1InputB.style("margin", "0 0.5em");
  parametersContainer.child(fg1InputB);

  var fg2ColorLabel = createP("Foreground Color 2 (RGB)");
  fg2ColorLabel.style("display", "block");
  parametersContainer.child(fg2ColorLabel);
  
  fg2InputR = createInput(red(colorFG2));
  fg2InputR.style("width", "3em");
  fg2InputR.style("margin", "0 0.5em");
  parametersContainer.child(fg2InputR);

  fg2InputG = createInput(green(colorFG2));
  fg2InputG.style("width", "3em");
  fg2InputG.style("margin", "0 0.5em");
  parametersContainer.child(fg2InputG);

  fg2InputB = createInput(blue(colorFG2));
  fg2InputB.style("width", "3em");
  fg2InputB.style("margin", "0 0.5em");
  parametersContainer.child(fg2InputB);

  redrawButton = createButton("REDRAW");
  redrawButton.style("display", "block");
  redrawButton.style("margin", "1em auto 0.5em");
  redrawButton.mousePressed(makeGrid);
  controlsContainer.child(redrawButton);
  
  saveImageButton = createButton("SAVE IMAGE");
  saveImageButton.style("display", "block");
  saveImageButton.style("margin", "1em auto 0.5em");
  saveImageButton.mousePressed(saveImage);
  controlsContainer.child(saveImageButton);
 
  parametersContainer.hide();
}

function hideControls(){
  parametersContainer.hide();
  showParametersButton.show();
}

function showControls(){
  parametersContainer.show();
  showParametersButton.hide();
}

function saveImage(){
  saveCanvas(Canvas, "Quad_Hatching_" + hour() + "-" + minute() + "-" + second(), "png");
}
