'use strict';

var GAP = 10;
var HISTOGRAM_HEIGHT = 150;
var TEXT_WIDTH = 200;

var cloudParams = {
  WIDTH: 420,
  HEIGHT: 270,
  CURVE: 20,
  X: 100,
  Y: 10
};

var barParams = {
  WIDTH: 40,
  GAP: 50
};

var fontParams = {
  size: 16,
  family: 'PT Mono',
  baseline: 'hanging',
};

var lineHeight = fontParams.size * 1.4;
var contentCordX = cloudParams.X + cloudParams.CURVE + GAP;
var contentCordY = cloudParams.Y + cloudParams.CURVE + GAP;
var barMaxHeight = HISTOGRAM_HEIGHT - lineHeight;
var shadowColor = 'rgba(0, 0, 0, 0.7)';
var cloudColor = 'rgba(255, 255, 255, 1)';
var textColor = 'rgba(0, 0, 0, 1)';
var barPlayerColor = 'rgba(255, 0, 0, 1)';

var buildCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + cloudParams.WIDTH / 2, y + cloudParams.CURVE);
  ctx.lineTo(x + cloudParams.WIDTH, y);
  ctx.lineTo(x + cloudParams.WIDTH - cloudParams.CURVE, y + cloudParams.HEIGHT / 2);
  ctx.lineTo(x + cloudParams.WIDTH, y + cloudParams.HEIGHT);
  ctx.lineTo(x + cloudParams.WIDTH / 2, y + cloudParams.HEIGHT - cloudParams.CURVE);
  ctx.lineTo(x, y + cloudParams.HEIGHT);
  ctx.lineTo(x + cloudParams.CURVE, y + cloudParams.HEIGHT / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (array) {
  return Math.max.apply(null, array);
};

var generateColor = function () {
  var color = Math.ceil(Math.random() * 100) / 100;
  if (color < 0.1) {
    color = color += 0.08;
  }

  return 'rgba(0, 0, 255, ' + color + ')';
};

var writeText = function (ctx, text, maxWidth, textCordX, textCordY) {
  var words = text.split(' ');
  var line = '';

  ctx.font = fontParams.size + 'px ' + fontParams.family;
  ctx.textBaseline = fontParams.baseline;
  ctx.fillStyle = textColor;

  for (var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + ' ';
    var testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth) {
      ctx.fillText(line, textCordX, textCordY);
      line = words[i] + ' ';
      textCordY += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, textCordX, textCordY);
};

var buildHistogram = function (ctx, x, y, width, height, color, name, nameY) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  writeText(ctx, name, width + barParams.GAP / 2, x, nameY);
};

window.renderStatistics = function (ctx, names, times) {
  buildCloud(ctx, cloudParams.X + GAP, cloudParams.Y + GAP, shadowColor);
  buildCloud(ctx, cloudParams.X, cloudParams.Y, cloudColor);

  writeText(ctx, 'Ура вы победили! Список результатов:', TEXT_WIDTH, contentCordX, contentCordY);

  var maxElement = getMaxElement(times);
  var histogramCordX = cloudParams.X + (cloudParams.WIDTH - (barParams.WIDTH * times.length + barParams.GAP * (times.length - 1))) / 2;

  for (var i = 0; i < times.length; i++) {
    var barHeight = Math.round(times[i]) * barMaxHeight / maxElement;
    var barCordX = histogramCordX + (barParams.WIDTH + barParams.GAP) * i;
    var barCordY = contentCordY + lineHeight * 2 + barMaxHeight - barHeight;
    var playerCordY = barCordY + barHeight + GAP;
    var barColor = generateColor();

    if (names[i] === 'Вы') {
      barColor = barPlayerColor;
    }

    buildHistogram(ctx, barCordX, barCordY, barParams.WIDTH, barHeight, barColor, names[i], playerCordY);
  }
};
