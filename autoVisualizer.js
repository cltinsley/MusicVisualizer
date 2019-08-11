var song;
var startbutton;
var playing
var mic;
var time;
var option;
//var jumpbutton;

var pastvols = [];

function setup() {
  // put setup code here
  var w = window.innerWidth; // get the size of the browser, match the size of the display
  var h = window.innerHeight;
  createCanvas(w, h);

  time = 0;
  setInterval(increaseTime, 500);
  option = 0;
  
  playing = false;
  //startbutton = createButton("Start");
  //startbutton.mousePressed(startmic);

  
  //amp = new p5.Amplitude();   // Amplitude object measures the volume of the song that is playing
}

function increaseTime() {
  this.time += 1;
}

function keyPressed() {
  if(keyCode == ENTER && playing == false) {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();   // FFT object gives frequency of song through fast fourier transform
    fft.setInput(mic);
    playing = true;
  }
  else if(keyCode == ENTER && playing == true) {
    playing = false;
  }
}


function draw() {
  // put drawing code here
  //background(255);
  if(playing) {
    var spectrum = fft.analyze();
    translate(width/2, height/2);

    if(this.time%30 == 0) {
      option = 1;
    }
    if(this.time%60 == 0) {
      option = 2;
    }
    if(this.time%90 == 0) {
      option = 0;
    }

    beginShape();
    for(var i=0; i<1000; i++) {  // iterate through the top 1000 frequencies
      var fre = spectrum[i];
      var r = map(fre, 0, 255, 0, height/2);  // fre is between 0 and 255, scale it to half the screen at max
      var x = r*cos((2*Math.PI/1000)*i);
      var y = r*sin((2*Math.PI/1000)*i);   // translate degrees to radians
     vertex(x, y);
     var shade = map(mic.getLevel(), 0, 1, 0, 255);  // translate the current volume to a shade we can use as a color
      var shade2 = (this.time)%255;    // make another shade that varies with current song time
     var shade3 = 255 - map(mic.getLevel(), 0, 1, 0, 255);

      if(option == 0) {
        fill(shade3, shade2, 40);   // fill the inside shape color
        background(shade, 160, shade2);    // fill the background color
      }
      else if(option == 1) {
        fill(200, shade2, shade);
       background(shade2, shade3, 90);
      }
      else if(option == 2) {
        fill(shade2, 100, shade3);
       background(75, shade2, shade);
     }


     stroke(255);   // color of the line used to draw the shape
   }
   endShape();

   translate(-width/2, -height/2);
   fill(255);
   textSize(18);
   textAlign(LEFT, TOP);
   text('Press Enter to Pause Display', 0, 0);
  }
  else {
    background(255);
    fill(0);
    stroke(0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text('Press Enter to Start Display', width/2, height/2);

  }


}
