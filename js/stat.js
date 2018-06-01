'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_CURVE = 20;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var LINE_HEIGHT = 30;
var HISTOGRAM_HEIGHT = 150;
var BAR_WIDHT = 40;
var BAR_SPACE_BETWEEN = 50;
var contentCordX = CLOUD_X + CLOUD_CURVE + GAP;
var contentCordY = CLOUD_Y + CLOUD_CURVE + GAP;
var barMaxHeight = HISTOGRAM_HEIGHT - LINE_HEIGHT;

var cloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_CURVE);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_CURVE, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - CLOUD_CURVE);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_CURVE, y + CLOUD_HEIGHT / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var buildingHistogram = function (ctx, x, y, width, height, color, name, nameY) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.fillText(name, x, nameY);
};

window.renderStatistics = function (ctx, names, times) {
  cloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  cloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', contentCordX, contentCordY);
  ctx.fillText('Список результатов:', contentCordX, contentCordY + LINE_HEIGHT);

  var maxElement = getMaxElement(times);

  for (var i = 0; i < times.length; i++) {
    var histogramCordX = CLOUD_X + (CLOUD_WIDTH - (BAR_WIDHT * times.length + BAR_SPACE_BETWEEN * (times.length - 1))) / 2;
    var barHeight = Math.round(times[i]) * barMaxHeight / maxElement;
    var barCordX = histogramCordX + (BAR_WIDHT + BAR_SPACE_BETWEEN) * i;
    var barCordY = contentCordY + LINE_HEIGHT * 2 + barMaxHeight - barHeight;
    var playerName = names[i];
    var playerCordY = barCordY + barHeight + GAP;
    var barColor = 'rgb(0, 0, ' + Math.round(Math.random() * 255) + ')';

    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    }

    buildingHistogram(ctx, barCordX, barCordY, BAR_WIDHT, barHeight, barColor, playerName, playerCordY);
  }
};
