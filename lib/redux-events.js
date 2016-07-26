(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.composeListeners = undefined;
	
	var _composeListeners = __webpack_require__(1);
	
	var _composeListeners2 = _interopRequireDefault(_composeListeners);
	
	var _eventsMiddleware = __webpack_require__(2);
	
	var _eventsMiddleware2 = _interopRequireDefault(_eventsMiddleware);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.composeListeners = _composeListeners2.default;
	exports.default = _eventsMiddleware2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = composeListeners;
	function composeListeners(handlers) {
	  return function (action) {
	    var actions = handlers.map(function (h) {
	      return h(action);
	    });
	    return [].concat.apply([], actions);
	  };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = eventsMiddleware;
	function eventsMiddleware(eventsHandler) {
	  return function (store) {
	    return function (next) {
	      return function (action) {
	        if (!action) {
	          return;
	        }
	
	        var result = next(action);
	        var actions = [];
	
	        if (typeof action !== 'function') {
	          actions = actions.concat(eventsHandler(action));
	        }
	
	        if (!result || !result.then) {
	          result = Promise.resolve(result);
	        }
	
	        actions.forEach(function (a) {
	          result = result.then(function () {
	            return store.dispatch(a);
	          });
	        });
	
	        return result;
	      };
	    };
	  };
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redux-events.js.map