'use strict';

var NUMBER_OF_WIZARDS = 4;

/**
 * @typedef {Object} WizardParams
 * @property {Array.<string>} NAMES
 * @property {Array.<string>} SURNAMES
 * @property {Array.<string>} COAT_COLORS
 * @property {Array.<string>} EYES_COLORS
 */
var wizardParams = {
  NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  SURNAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  COAT_COLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  EYES_COLORS: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

var wizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardList = document.querySelector('.setup-similar-list');

/**
 * Генерирует случайное число в заданном диапазоне
 * @param {number} min - минимальное значение генерируемого числа
 * @param {number} max - максимальное значение генерируемого числа
 * @return {number}
 */
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * @typedef {Object} Wizard
 * @property {string} name
 * @property {string} coatColor
 * @property {string} eyesColor
 */

/**
 * Создает похожего персонажа
 * @return {Wizard}
 */
var getWizard = function () {
  return {
    name: wizardParams.NAMES[getRandomNumber(0, wizardParams.NAMES.length)] + ' ' + wizardParams.SURNAMES[getRandomNumber(0, wizardParams.SURNAMES.length)],
    coatColor: wizardParams.COAT_COLORS[getRandomNumber(0, wizardParams.COAT_COLORS.length)],
    eyesColor: wizardParams.EYES_COLORS[getRandomNumber(0, wizardParams.EYES_COLORS.length)]
  };
};

/**
 * Создает массив похожих персонажей
 * @param {number} arrayLength - количество записываемых в массив персонажей
 * @return {Array.<Wizard>}
 */
var getWizards = function (arrayLength) {
  var similarWizards = [];

  for (var i = 0; i < arrayLength; i++) {
    similarWizards.push(getWizard());
  }

  return similarWizards;
};

/**
 * Создает DOM-элемент волшебника
 * @param {Wizard} dataObject - объект с исходными данными
 * @return {Node}
 */
var createWizard = function (dataObject) {
  var element = wizard.cloneNode(true);
  element.querySelector('.setup-similar-label').textContent = dataObject.name;
  element.querySelector('.wizard-coat').style.fill = dataObject.coatColor;
  element.querySelector('.wizard-eyes').style.fill = dataObject.eyesColor;

  return element;
};

/**
 * Создает спискок DOM-элементов волшебников
 * @param {Array.<Wizard>} array - массив объектов с исходными данными
 * @return {Node}
 */
var createWizardCards = function (array) {
  var fragment = document.createDocumentFragment();

  array.forEach(function (item) {
    fragment.appendChild(createWizard(item));
  });

  return fragment;
};

/**
 * Активирует настройки на странице
 */
var initSetup = function () {
  document.querySelector('.setup').classList.remove('hidden');
  wizardList.appendChild(createWizardCards(getWizards(NUMBER_OF_WIZARDS)));
  document.querySelector('.setup-similar').classList.remove('hidden');
};

initSetup();
