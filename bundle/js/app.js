/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// Entry file for js scripts

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleNotFoundError: Module not found: Error: Can't resolve '../src/fonts/Bello-Script.ttf' in 'D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\style\\scss'\n    at factoryCallback (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\webpack\\lib\\Compilation.js:276:40)\n    at factory (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\webpack\\lib\\NormalModuleFactory.js:235:20)\n    at resolver (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\webpack\\lib\\NormalModuleFactory.js:60:20)\n    at asyncLib.parallel.e (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\webpack\\lib\\NormalModuleFactory.js:127:20)\n    at D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\async\\dist\\async.js:3874:9\n    at D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\async\\dist\\async.js:473:16\n    at iteratorCallback (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\async\\dist\\async.js:1048:13)\n    at D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\async\\dist\\async.js:958:16\n    at D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\async\\dist\\async.js:3871:13\n    at resolvers.normal.resolve (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\webpack\\lib\\NormalModuleFactory.js:119:22)\n    at onError (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\Resolver.js:65:10)\n    at loggingCallbackWrapper (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at runAfter (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\Resolver.js:158:4)\n    at innerCallback (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\Resolver.js:146:3)\n    at loggingCallbackWrapper (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at next (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\tapable\\lib\\Tapable.js:252:11)\n    at D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\UnsafeCachePlugin.js:40:4\n    at loggingCallbackWrapper (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at runAfter (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\Resolver.js:158:4)\n    at innerCallback (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\Resolver.js:146:3)\n    at loggingCallbackWrapper (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at next (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\tapable\\lib\\Tapable.js:252:11)\n    at innerCallback (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\Resolver.js:144:11)\n    at loggingCallbackWrapper (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at next (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\tapable\\lib\\Tapable.js:249:35)\n    at resolver.doResolve.createInnerCallback (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\DescriptionFilePlugin.js:44:6)\n    at loggingCallbackWrapper (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at afterInnerCallback (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\Resolver.js:168:10)\n    at loggingCallbackWrapper (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at next (D:\\JS_RollingScopes\\___RSS#2\\Game for 2 stage\\Santa\\node_modules\\tapable\\lib\\Tapable.js:252:11)");

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map