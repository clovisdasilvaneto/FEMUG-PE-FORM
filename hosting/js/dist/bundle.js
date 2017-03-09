/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
	function Utils() {
		_classCallCheck(this, Utils);
	}

	_createClass(Utils, null, [{
		key: 'checkField',
		value: function checkField(activePanel) {
			var input = activePanel.querySelector('input'),
			    err = void 0;

			if (input.value.trim()) {
				activePanel.classList.remove('we-input-error');
				activePanel.classList.remove('we--panel--active');
			} else {
				activePanel.classList.add('we-input-error');
				err = true;
			}

			if (input.value.trim() && activePanel.classList.contains('form--we--panel')) {
				activePanel.classList.add('we--prev--panel');
			}

			return err;
		}
	}, {
		key: 'addIptClass',
		value: function addIptClass(e) {
			var element = this;
			element.classList.add('we--input--focused');
		}
	}, {
		key: 'changeIptClass',
		value: function changeIptClass(e) {
			var element = this;

			if (document.querySelector('.form--we--panel') && !element.value) {
				element.classList.remove('we--input--focused');
			} else if (document.querySelector('.we-input-error')) {
				document.querySelector('.we-input-error').classList.remove('we-input-error');
			}
		}
	}]);

	return Utils;
}();

exports.default = Utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Utils = __webpack_require__(0);

var _Utils2 = _interopRequireDefault(_Utils);

var _FormActions = __webpack_require__(2);

var _FormActions2 = _interopRequireDefault(_FormActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = WeDeploy.data('http://data.femug-search.wedeploy.io/'),
    myForm = new _FormActions2.default(connect),
    nodes = myForm.nodes,
    btn = myForm.btn;

Array.prototype.forEach.call(nodes, function (ipt, index) {
	ipt.addEventListener('focus', _Utils2.default.addIptClass);
	ipt.addEventListener('blur', _Utils2.default.changeIptClass);
});

btn.addEventListener('click', myForm.nextQuestion.bind(myForm));

document.querySelector('.we--answers').addEventListener('click', myForm.getAnswers.bind(myForm));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = __webpack_require__(0);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormActions = function () {
	function FormActions(data) {
		_classCallCheck(this, FormActions);

		this.data = data;
		this.nodes = document.querySelectorAll("input");
		this.btn = document.querySelector('.fm--we--button--panels');
	}

	_createClass(FormActions, [{
		key: "nextQuestion",
		value: function nextQuestion(e) {
			var instance = this,
			    activePanel = document.querySelector('.we--panel--active');

			e.preventDefault();

			if (activePanel) {
				var steps = document.querySelector('.we--steps').dataset.steps,
				    nextStep = activePanel.nextElementSibling.nextElementSibling;

				if (!_Utils2.default.checkField(activePanel)) {
					document.querySelector('.we--steps').dataset.steps = parseInt(steps) + 1;
					document.querySelector('.form--we--steps--container span').innerHTML = parseInt(steps) + 1;

					if (nextStep) {
						activePanel.nextElementSibling.classList.add('we--panel--active');
					} else {
						return instance.reviewQuestion();
					}
				}
			} else {
				return instance.checkData();
			}
		}
	}, {
		key: "reviewQuestion",
		value: function reviewQuestion() {
			var instance = this,
			    nodes = instance.nodes,
			    node = void 0;

			Array.prototype.forEach.call(nodes, function (ipt, index) {
				node = document.querySelector('.form--we--panel:nth-child(' + (index + 1) + ')');

				node.classList.remove('form--we--panel');
				node.classList.remove('we--prev--panel');
				node.classList.add('we--revision--panel');
			});

			document.querySelector('.form--we').classList.add('form--we--revision');
			document.querySelector('.fm--we--button--panels').innerHTML = "Submit";
		}
	}, {
		key: "checkData",
		value: function checkData() {
			var instance = this,
			    nodes = instance.nodes,
			    err = void 0,
			    panel = void 0;

			Array.prototype.forEach.call(nodes, function (ipt, index) {
				panel = document.querySelector('.we--revision--panel:nth-child(' + (index + 1) + ')');

				if (_Utils2.default.checkField(panel)) {
					err = true;
				}
			});

			if (!err) {
				return instance.saveData();
			}
		}
	}, {
		key: "saveData",
		value: function saveData() {
			var instance = this,
			    nodes = instance.nodes,
			    data = instance.data,
			    panel = void 0,
			    weData = void 0;

			document.querySelector('.form--we .form--we--steps--container p').innerHTML = "Sending opinion...";
			document.querySelector('.form--we').classList.add('we--loading');

			Array.prototype.forEach.call(nodes, function (ipt, index) {
				panel = document.querySelector('.we--revision--panel:nth-child(' + (index + 1) + ')');;
				panel.classList.add('we--hide--fields');
			});

			weData = {
				name: document.querySelector('#we-name').value,
				occupation: document.querySelector('#we-occupation').value,
				work_place: document.querySelector('#we-work-place').value
			};

			data.create('answers', weData).then(function (movie) {
				document.querySelector('.form--we').classList.add('we--hide');
				document.querySelector('.we--feedback').classList.add('we--show');
			});
		}
	}, {
		key: "getAnswers",
		value: function getAnswers(e) {
			var instance = this,
			    opnions = document.querySelector('.we--opnions'),
			    data = instance.data;

			opnions.classList.add('loading');
			opnions.classList.add('show-content-opnions');

			e.preventDefault();

			data.get('answers').then(instance.showAnswers);
		}
	}, {
		key: "showAnswers",
		value: function showAnswers(answers) {
			var opnions = document.querySelector('.we--opnions'),
			    list = opnions.querySelector('ul'),
			    html = void 0;

			answers.forEach(function (answer) {
				html = document.createElement('li');
				html.innerHTML = "\n\t\t\t\t<h4>" + answer.name + "</h4> \n\t\t\t\t<h5>" + answer.occupation + "</h5> \n\t\t\t\t<h6>" + answer.work_place + "</h6>\n\t\t\t";

				list.insertBefore(html, list.firstChild);
			});

			opnions.classList.remove('loading');
			opnions.classList.add('active-opnions');
		}
	}]);

	return FormActions;
}();

exports.default = FormActions;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);