// ============================================================
// Oregon Clock with Animated Wagon Wheels
// ============================================================

const storage = require('Storage');
const locale = require("locale");

// ============================================================
// CUSTOM FONTS
// ============================================================

(function(graphics) {
  graphics.prototype.setFont4x5NumPretty = function() {
    this.setFontCustom(atob("IQAQDJgH4/An4QXr0Fa/BwnwdrcH63BCHwfr8Ha/"),45,atob("AwIEBAQEBAQEBAQEBA=="),5);
  };
})(Graphics);

(function(graphics) {
  graphics.prototype.setFontDoW = function() {
    this.setFontCustom(atob("///////ADgB//////+AHAD//////gAAAH//////4D8B+A///////4AcAOAH//////4AcAOAAAAAB//////wA4AcAP//////wAAAAAAAA//////4AcAP//////wA4Af//////gAAAH//////5z85+c/OfnOAA4AcAOAH//////4AcAOAAAAAB//////wcAOAHB//////wAAAAAAAA///////ODnBzg5wc4AAAAD//////84OcH//8/+fAAAAAAAAAAAAA/z/5/8/OfnPz/5/8/wAAAD//////84OcH//////AAAAAAAAAAAAA/z/5/8/OfnPz/5/8/wAAAD//////gBwA///////AAAAAAAAAAAAA"),48,24,13);
  };
})(Graphics);

// ============================================================
// 🔄 WHEEL ANIMATION SECTION (NEW)
// ============================================================

// Load cropped wheel frame 1 
var wheelFrame1 = require("heatshrink").decompress(atob("n8SxH+/0CvADBAHUCu5BDAQoACvAGBAIpYEARYTEAgQCFHxAbCIIUCDIIdEDYd3AYIgDCAQCN4A5DAYgADHwoHCIIp6EHIRmEvF3aiQ5HBYyAIPQIMEPQaPEQ4a/QHogdGOwg/Hfwp8EJopfIRYgCEHwm/OxYVCfYwkEGwS6BC4gGFGQgfHXQybHD5J6HDBJ9GHIgkEM4r0HIwYCEeApdCWYgGCCQYBDTw4fHPo41GABDCFPpAeDXIJGILw59GG46cMA5IGBQoheJSoi8DWowmFA44WGQAjzGNwoWGD5AAGDAwfHQpAtHXAQeDAoicKD5CFGC4o9PCIYSDC4zCDD5ydLHqJfDDYQkHD6IbEAAY9VX4g3CAYZ7RH4wbEf45AVDzQAGDqoAwA="));

// Load cropped wheel frame 2
var wheelFrame2 = require("heatshrink").decompress(atob("n8UxH+ABF4ACASMD6QTBAAUCAogAJB4MCu8CCRoALDoI4HFw13IIYCFHgwfCBgYWIAQoTDHgoEDNpJBEOAISDHoYZDEYYQDARo4ILwrzGIIx7GC4wgJXBSWGBIq/JNIK5KaY6/PXIijEBQgzBfxoUDQYQXFf4wvDYoTZFOIjVDJAh+GLQoUDKIREFXQxIHLYoPHK4hMHPRLvITAd4QwSnHLYoPIYYpNILoYsDXg4FDJ4oFILww2HMopdHIgJ9MPYZtGC4jZGB472FHIo1FHxAnDPYTdDZZQ+CWox3De4ofDCozFHew44JaYwAHPApIGHxSEHPQinLD5r1IH4oeQOw4IGaZA/KWBILJH6wfSfQqIMECECXIrHGP6A4DIxAgTIIQmDDy4gDHq4iHDrIfEDzYAq"));

// Store frames in array for easy toggling
var wheelFrames = [wheelFrame1, wheelFrame2];

// Track which frame is currently displayed
var wheelFrameIndex = 0;

// Store interval reference so we can stop/start animation
var wheelInterval;

// Define wheel drawing region
var wheelX = 78;          // X position of wheel image
var wheelY = 127;         // Y position of wheel image
var wheelWidth = 60;      // Width of cropped wheel image
var wheelHeight = 40;     // Height of cropped wheel image

// ============================================================
// Function: drawWheels()
// Only redraws the wheel area
// ============================================================

function drawWheels() {

  // Restrict drawing ONLY to the wheel rectangle
  g.setClipRect(
    wheelX,
    wheelY,
    wheelX + wheelWidth,
    wheelY + wheelHeight
  );

  // Clear just the wheel area before drawing next frame
  g.clearRect(
    wheelX,
    wheelY,
    wheelX + wheelWidth,
    wheelY + wheelHeight
  );

  // Draw current wheel frame
  g.drawImage(
    wheelFrames[wheelFrameIndex],
    wheelX,
    wheelY
  );

  // Toggle frame index (0 <-> 1)
  wheelFrameIndex = 1 - wheelFrameIndex;

  // Reset clipping to full screen
  g.setClipRect(0, 0, g.getWidth()-1, g.getHeight()-1);
}

// ============================================================
// Animation Control
// ============================================================

// Start wheel animation
function startWheelAnimation() {
  if (!wheelInterval) {
    wheelInterval = setInterval(drawWheels, 300); // 300ms animation speed
  }
}

// Stop wheel animation
function stopWheelAnimation() {
  if (wheelInterval) {
    clearInterval(wheelInterval);
    wheelInterval = undefined;
  }
}

// Pause animation when LCD is off to save battery
Bangle.on('lcdPower', function(on) {
  if (on) {
    startWheelAnimation();
  } else {
    stopWheelAnimation();
  }
});

// ============================================================
// WEATHER + ORIGINAL CLOCK CODE (unchanged logic)
// ============================================================
// add font for days of the week

(function(graphics) {
  graphics.prototype.setFontDoW = function() {
    this.setFontCustom(atob("///////ADgB//////+AHAD//////gAAAH//////4D8B+A///////4AcAOAH//////4AcAOAAAAAB//////wA4AcAP//////wAAAAAAAA//////4AcAP//////wA4Af//////gAAAH//////5z85+c/OfnOAA4AcAOAH//////4AcAOAAAAAB//////wcAOAHB//////wAAAAAAAA///////ODnBzg5wc4AAAAD//////84OcH//8/+fAAAAAAAAAAAAA/z/5/8/OfnPz/5/8/wAAAD//////84OcH//////AAAAAAAAAAAAA/z/5/8/OfnPz/5/8/wAAAD//////gBwA///////AAAAAAAAAAAAA"),48,24,13);
  };
})(Graphics);


const SUN = 1;
const PART_SUN = 2;
const CLOUD = 3;
const SNOW = 4;
const RAIN = 5;
const STORM = 6;
const ERR = 7;

/**
Choose weather icon based on weather const
Weather icons from https://icons8.com/icon/set/weather/ios-glyphs
Error icon from https://icons8.com/icon/set/error-cloud/ios-glyphs
**/
function weatherIcon(weather) {
  switch (weather) {
    case SUN:
      return atob("Hh4BAAAAAAAMAAAAMAAAAMAAAAMAABgMBgBwADgA4AHAAY/GAAB/gAAD/wAAH/4AAP/8AAP/8AfP/8+fP/8+AP/8AAP/8AAH/4AAD/wAAB/gAAY/GAA4AHABwADgBgMBgAAMAAAAMAAAAMAAAAMAAAAAAAA=");
    case PART_SUN:
      return atob("Hh4BAAAAAAAAAAAMAAAAMAAAEMIAAOAcAAGAYAAAeAAAA/AAAB/gAA5/gAA5/g+AB+D/gA4H/wAR//wGD//4OD//4EH//4AH//4Af//+Af//+A////A////A////A///+Af//+AH//4AAAAAAAAAAAAAAAA=");
    case CLOUD:
      return atob("Hh4BAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAAf+AAA//AAB//gAf//gB///wB///wD///wD///wP///8f///+f///+////////////////////f///+f///+P///8D///wAAAAAAAAAAAAAAAAAAAAAAAAAA=");
    case SNOW:
      return atob("Hh4BAAAAAAAAAAAAAAAAAHwAAAf8AAA/+AAH/+AAf//AAf8/AA/8/AB/gHgH/wP4H/wP4P/gH8P/8/8P/8/8P///4H///4B///gAAAAAAMAAAAMAAAB/gGAA/AfgA/AfgB/gfgAMAfgAMAGAAAAAAAAAAAA=");
    case RAIN:
      return atob("Hh4BAAAAAAAAAAAAAAAAAHwAAAf8AAA/+AAH/+AAf//AAf//AA///AB///gH///4H///4P///8P///8P///8P///4H///4B///gAAAAAAAAAABgBgABgBgABhhhgABgBgABgBgAAAAAAAAAAAAAAAAAAAAA=");
    case STORM:
      return atob("Hh4BAAAAAAAAAAAAAAAAAHwAAAf8AAA/+AAH/+AAf//AAf//AA///AB///gH///4H/x/4P/g/8P/k/8P/E/8P/M/4H+MP4B+cHgAAfgAAA/gABg/AABgHAABgGBgAAGBgAAEBgAAEAAAAAAAAAAAAAAAAAA=");
    case ERR:
    default:
      return atob("Hh4BAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAAf+AAA//AAB//gAf//gB///wB/z/wD/z/wD/z/wP/z/8f/z/+f/z/+//z//////////////z//f/z/+f///+P///8D///wAAAAAAAAAAAAAAAAAAAAAAAAAA=");
    }
}


/**
Choose weather icon to display based on condition.
Based on function from the Bangle weather app so it should handle all of the conditions
sent from gadget bridge.
*/
function chooseIcon(condition) {
  condition = condition.toLowerCase();
  if (condition.includes("thunderstorm")) return weatherIcon(STORM);
  if (condition.includes("freezing")||condition.includes("snow")||
    condition.includes("sleet")) {
    return weatherIcon(SNOW);
  }
  if (condition.includes("drizzle")||
    condition.includes("shower")) {
    return weatherIcon(RAIN);
  }
  if (condition.includes("rain")) return weatherIcon(RAIN);
  if (condition.includes("clear")) return weatherIcon(SUN);
  if (condition.includes("few clouds")) return weatherIcon(PART_SUN);
  if (condition.includes("scattered clouds")) return weatherIcon(CLOUD);
  if (condition.includes("clouds")) return weatherIcon(CLOUD);
  if (condition.includes("mist") ||
    condition.includes("smoke") ||
    condition.includes("haze") ||
    condition.includes("sand") ||
    condition.includes("dust") ||
    condition.includes("fog") ||
    condition.includes("ash") ||
    condition.includes("squalls") ||
    condition.includes("tornado")) {
    return weatherIcon(CLOUD);
  }
  return weatherIcon(CLOUD);
}

/*
* Choose weather icon to display based on weather conditition code
* https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
*/
function chooseIconByCode(code) {
  const codeGroup = Math.round(code / 100);
  switch (codeGroup) {
    case 2: return weatherIcon(STORM);
    case 3: return weatherIcon(RAIN);
    case 5: return weatherIcon(RAIN);
    case 6: return weatherIcon(SNOW);
    case 7: return weatherIcon(CLOUD);
    case 8:
      switch (code) {
        case 800: return weatherIcon(SUN);
        case 801: return weatherIcon(PART_SUN);
        default: return weatherIcon(CLOUD);
      }
    default: return weatherIcon(CLOUD);
  }
}

/**
Get weather stored in json file by weather app.
*/
function getWeather() {
  let jsonWeather = storage.readJSON('weather.json');
  return jsonWeather;
}
// ============================================================
// BACKGROUND DRAW
// ============================================================

function drawBg() {

  // Decompress and draw static wagon background
  var bgImg = require("heatshrink").decompress(atob("vErxH+AH4A/AH4AgmAAJIP5HrGGBzeJr4qqO+5QRUVp3+BSR3/JQ5RZDBh3/O57JaO/53/O/53/O353MPDR3/eEBTWO/53hKip3kO2Z3JKqh3jO2hLFO/533PDB3/PT536O3BOEPCx3hXqh3/O8JEREop3/O9BHKFZR4gO/4/NBZB3/O9wAZO/5HTO0QwQO/530HDJ3pChcCPF4A6O9B4/O7QAdNP593Mf53XvB9dgQBCAQkCNn7ztO/533mBf/O2x3/PWt4Lf53/AH53gCJh2/O9zu/O9MCNYiILAoh3/dsIGFO/53wMAR3/O2cCNhAUKO/53iOAZ3/AH4A/ADg"));

  g.reset();
  g.drawImage(bgImg, 25, 101);

  // Draw initial wheel frame ONCE
  g.drawImage(wheelFrames[wheelFrameIndex], wheelX, wheelY);
}

// ============================================================
// TIME DRAW FUNCTION (unchanged structure)
// ============================================================

var drawTimeout;

function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw();
  }, 60000 - (Date.now() % 60000));
}

function draw() {

  var d = new Date();

  var h = ("0"+d.getHours()).substr(-2);
  var m = ("0"+d.getMinutes()).substr(-2);

  var day = ("0"+d.getDate()).substr(-2);
  var mon = ("0"+(d.getMonth()+1)).substr(-2);
  var dow = ((d.getDay()+6)%7).toString();

  var date = day+"."+mon;
  
  var weatherJson = getWeather();
  var wIcon;
  var temp;
  if(weatherJson && weatherJson.weather){
      var currentWeather = weatherJson.weather;
      temp = locale.temp(currentWeather.temp-273.15).match(/^(\D*\d*)(.*)$/);
      const code = currentWeather.code||-1;
      if (code > 0) {
        wIcon = chooseIconByCode(code);
      } else {
        wIcon = chooseIcon(currentWeather.txt);
      }
  }else{
      temp = "";
      wIcon = weatherIcon(ERR);
  }

  g.reset();

  // Clear only time region
  g.clearRect(22,35,153,75);

  g.setFont("4x5NumPretty",8);

  g.fillRect(84,42,92,49);
  g.fillRect(84,60,92,67);

  g.drawString(h,22,35);
  g.drawString(m,98,35);

  // Date
  g.clearRect(22,95,22+4*2*4+2*4,95+2*5);
  g.setFont("4x5NumPretty",2);
  g.drawString(date,22,95);

  // Day of week
  g.clearRect(22,79,22+24,79+13);
  g.setFont("DoW");
  g.drawString(dow,22,79);

  g.drawImage(wIcon,126,81);
  
  queueDraw();
}

// ============================================================
// INITIALIZATION
// ============================================================

g.clear();

drawBg();                // Draw static background
draw();                  // Draw time
startWheelAnimation();   // Start animation if LCD is on

Bangle.setUI("clock");
Bangle.loadWidgets();
Bangle.drawWidgets();
