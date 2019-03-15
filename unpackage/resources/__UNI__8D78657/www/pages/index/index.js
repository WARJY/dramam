// { "framework": "Vue"} 

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
/******/ 	return __webpack_require__(__webpack_require__.s = 319);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url_parse__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url_parse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url_parse__);
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 17/11/01
 */



const Utils = {
  UrlParser: __WEBPACK_IMPORTED_MODULE_0_url_parse___default.a,
  _typeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },
  isPlainObject(obj) {
    return Utils._typeof(obj) === 'object';
  },
  isString(obj) {
    return typeof obj === 'string';
  },
  isNonEmptyArray(obj = []) {
    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  },
  isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  decodeIconFont(text) {
    // 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
    const regExp = /&#x[a-z|0-9]{4,5};?/g;
    if (regExp.test(text)) {
      return text.replace(new RegExp(regExp, 'g'), function (iconText) {
        const replace = iconText.replace(/&#x/, '0x').replace(/;$/, '');
        return String.fromCharCode(replace);
      });
    } else {
      return text;
    }
  },
  mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (Utils.isObject(target) && Utils.isObject(source)) {
      for (const key in source) {
        if (Utils.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, {
              [key]: {}
            });
          }
          Utils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return Utils.mergeDeep(target, ...sources);
  },
  appendProtocol(url) {
    if (/^\/\//.test(url)) {
      const {
        bundleUrl
      } = weex.config;
      return `http${/^https:/.test(bundleUrl) ? 's' : ''}:${url}`;
    }
    return url;
  },
  encodeURLParams(url) {
    const parsedUrl = new __WEBPACK_IMPORTED_MODULE_0_url_parse___default.a(url, true);
    return parsedUrl.toString();
  },
  goToH5Page(jumpUrl, animated = false, callback = null) {
    const Navigator = weex.requireModule('navigator');
    const jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    const url = Utils.appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated.toString()
    }, callback);
  },
  env: {
    isTaobao() {
      const { appName } = weex.config.env;
      return (/(tb|taobao|淘宝)/i.test(appName)
      );
    },
    isTrip() {
      const { appName } = weex.config.env;
      return appName === 'LX';
    },
    isBoat() {
      const { appName } = weex.config.env;
      return appName === 'Boat' || appName === 'BoatPlayground';
    },
    isWeb() {
      const { platform } = weex.config.env;
      return typeof window === 'object' && platform.toLowerCase() === 'web';
    },
    isIOS() {
      const { platform } = weex.config.env;
      return platform.toLowerCase() === 'ios';
    },
    /**
     * 是否为 iPhone X or iPhoneXS or iPhoneXR or iPhoneXS Max
     * @returns {boolean}
     */
    isIPhoneX() {
      const { deviceHeight } = weex.config.env;
      if (Utils.env.isWeb()) {
        return typeof window !== undefined && window.screen && window.screen.width && window.screen.height && (parseInt(window.screen.width, 10) === 375 && parseInt(window.screen.height, 10) === 812 || parseInt(window.screen.width, 10) === 414 && parseInt(window.screen.height, 10) === 896);
      }
      return Utils.env.isIOS() && (deviceHeight === 2436 || deviceHeight === 2688 || deviceHeight == 1792);
    },
    isAndroid() {
      const { platform } = weex.config.env;
      return platform.toLowerCase() === 'android';
    },
    isAlipay() {
      const { appName } = weex.config.env;
      return appName === 'AP';
    },
    isTmall() {
      const { appName } = weex.config.env;
      return (/(tm|tmall|天猫)/i.test(appName)
      );
    },
    isAliWeex() {
      return Utils.env.isTmall() || Utils.env.isTrip() || Utils.env.isTaobao();
    },
    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight() {
      const { env } = weex.config;
      const navHeight = Utils.env.isWeb() ? 0 : Utils.env.isIPhoneX() ? 176 : 132;
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    },
    /**
     * 获取weex屏幕真实的设置高度
     * @returns {Number}
     */
    getScreenHeight() {
      const { env } = weex.config;
      return env.deviceHeight / env.deviceWidth * 750;
    }
  },

  /**
   * 版本号比较
   * @memberOf Utils
   * @param currVer {string}
   * @param promoteVer {string}
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wx-bridge');
   * const { compareVersion } = Utils;
   * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
   */
  compareVersion(currVer = '0.0.0', promoteVer = '0.0.0') {
    if (currVer === promoteVer) return true;
    const currVerArr = currVer.split('.');
    const promoteVerArr = promoteVer.split('.');
    const len = Math.max(currVerArr.length, promoteVerArr.length);
    for (let i = 0; i < len; i++) {
      const proVal = ~~promoteVerArr[i];
      const curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
    return false;
  },
  /**
   * 分割数组
   * @param arr 被分割数组
   * @param size 分割数组的长度
   * @returns {Array}
   */
  arrayChunk(arr = [], size = 4) {
    let groups = [];
    if (arr && arr.length > 0) {
      groups = arr.map((e, i) => {
        return i % size === 0 ? arr.slice(i, i + size) : null;
      }).filter(e => {
        return e;
      });
    }
    return groups;
  },
  /*
   * 截断字符串
   * @param str 传入字符串
   * @param len 截断长度
   * @param hasDot 末尾是否...
   * @returns {String}
   */
  truncateString(str, len, hasDot = true) {
    let newLength = 0;
    let newStr = '';
    let singleChar = '';
    const chineseRegex = /[^\x00-\xff]/g;
    const strLength = str.replace(chineseRegex, '**').length;
    for (let i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) !== null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }
    return newStr;
  },
  /*
   * 转换 obj 为 url params参数
   * @param obj 传入字符串
   * @returns {String}
   */
  objToParams(obj) {
    let str = "";
    for (let key in obj) {
      if (str !== "") {
        str += "&";
      }
      str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
  },
  /*
   * 转换 url params参数为obj
   * @param str 传入url参数字符串
   * @returns {Object}
   */
  paramsToObj(str) {
    let obj = {};
    try {
      obj = JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    } catch (e) {
      console.log(e);
    }
    return obj;
  },
  animation: {
    /**
     * 返回定义页面转场动画起初的位置
     * @param ref
     * @param transform 运动类型
     * @param status
     * @param callback 回调函数
     */
    pageTransitionAnimation(ref, transform, status, callback) {
      const animation = weex.requireModule('animation');
      animation.transition(ref, {
        styles: {
          transform: transform
        },
        duration: status ? 250 : 300, // ms
        timingFunction: status ? 'ease-in' : 'ease-out',
        delay: 0 // ms
      }, function () {
        callback && callback();
      });
    }
  },
  uiStyle: {
    /**
     * 返回定义页面转场动画起初的位置
     * @param animationType 页面转场动画的类型 push，model
     * @param size 分割数组的长度
     * @returns {}
     */
    pageTransitionAnimationStyle(animationType) {
      if (animationType === 'push') {
        return {
          left: '750px',
          top: '0px',
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        };
      } else if (animationType === 'model') {
        return {
          top: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px',
          left: '0px',
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        };
      }
      return {};
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Utils);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_weex_bindingx_lib_index_weex_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_weex_bindingx_lib_index_weex_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_weex_bindingx_lib_index_weex_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(0);
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 18/03/22
 */



const BindEnv = {
  supportsEB() {
    return __WEBPACK_IMPORTED_MODULE_0_weex_bindingx_lib_index_weex_js___default.a.isSupportBinding && !__WEBPACK_IMPORTED_MODULE_1__index__["default"].env.isWeb();
  },

  /**
   * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
   * @returns {boolean}
   */
  supportsEBForAndroid() {
    return __WEBPACK_IMPORTED_MODULE_1__index__["default"].env.isAndroid() && BindEnv.supportsEB();
  },

  /**
   * 判断IOS容器是否支持是否支持expressionBinding
   * @returns {boolean}
   */
  supportsEBForIos() {
    return __WEBPACK_IMPORTED_MODULE_1__index__["default"].env.isIOS() && BindEnv.supportsEB();
  }
};

/* harmony default export */ __webpack_exports__["default"] = (BindEnv);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


;(function (fn) {
  if (true) {
    module.exports = fn();
  } else if (typeof define === "function") {
    define("index", function (require, exports, module) {
      module.exports = fn();
    });
  } else {
    var root;
    if (typeof window !== "undefined") {
      root = window;
    } else if (typeof self !== "undefined") {
      root = self;
    } else if (typeof global !== "undefined") {
      root = global;
    } else {
      // NOTICE: In JavaScript strict mode, this is null
      root = this;
    }
    root["index"] = fn();
  }
})(function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /**
       Copyright 2018 Alibaba Group
      
       Licensed under the Apache License, Version 2.0 (the "License");
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at
      
       http://www.apache.org/licenses/LICENSE-2.0
      
       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
       */

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      var _bindingxParser = __webpack_require__(1);

      var isWeb = false;
      var isWeex = true;

      function requireModule(moduleName) {
        try {
          if ((typeof weex === 'undefined' ? 'undefined' : _typeof(weex)) !== undefined && weex.requireModule) {
            // eslint-disable-line
            return weex.requireModule(moduleName); // eslint-disable-line
          }
        } catch (err) {}
        return window.require('@weex-module/' + moduleName);
      }

      var isSupportNewBinding = true;
      var isSupportBinding = true;
      var WeexBinding = void 0;
      var WebBinding = {};

      try {
        WeexBinding = requireModule('bindingx');
        isSupportNewBinding = true;
      } catch (e) {
        isSupportNewBinding = false;
      }
      if (!WeexBinding || !WeexBinding.bind) {
        try {
          WeexBinding = requireModule('binding');
          isSupportNewBinding = true;
        } catch (e) {
          isSupportNewBinding = false;
        }
      }
      isSupportNewBinding = !!(WeexBinding && WeexBinding.bind && WeexBinding.unbind);
      if (!isSupportNewBinding) {
        try {
          WeexBinding = requireModule('expressionBinding');
          isSupportBinding = true;
        } catch (err) {
          isSupportBinding = false;
        }
      }
      isSupportBinding = !!(WeexBinding && (WeexBinding.bind || WeexBinding.createBinding));

      function formatExpression(expression) {
        if (expression === undefined) return;
        try {
          expression = JSON.parse(expression);
        } catch (err) {}
        var resultExpression = {};
        if (typeof expression === 'string') {
          resultExpression.origin = expression;
        } else if (expression) {
          resultExpression.origin = expression.origin;
          resultExpression.transformed = expression.transformed;
        }
        if (!resultExpression.transformed && !resultExpression.origin) return;
        resultExpression.transformed = resultExpression.transformed || (0, _bindingxParser.parse)(resultExpression.origin);
        return resultExpression;
      }

      // 统一回调参数
      function fixCallback(callback) {
        return function () {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (typeof callback === 'function') {
            return callback({
              state: params.state === 'end' ? 'exit' : params.state,
              t: params.t !== undefined ? params.t : params.deltaT
            });
          }
        };
      }

      exports.default = {
        // 是否支持新版本的binding
        isSupportNewBinding: isSupportNewBinding,
        // 是否支持binding
        isSupportBinding: isSupportBinding,
        _bindingInstances: [],
        /**
         * 绑定
         * @param options 参数
         * @example
         {
           anchor:blockRef,
           eventType:'pan',
           props: [
           {
             element:blockRef,
             property:'transform.translateX',
             expression:{
               origin:"x+1",
               transformed:"{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":1}]}"
             }
           }
          ]
         }
         */
        bind: function bind(options) {
          var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

          if (!options) {
            throw new Error('should pass options for binding');
          }

          options.exitExpression = formatExpression(options.exitExpression);

          if (options.props) {
            options.props.forEach(function (prop) {
              prop.expression = formatExpression(prop.expression);
            });
          }

          if (WeexBinding && isSupportBinding) {
            if (isSupportNewBinding) {
              return WeexBinding.bind(options, options && options.eventType === 'timing' ? fixCallback(callback) : callback);
            } else {
              WeexBinding.enableBinding(options.anchor, options.eventType);
              // 处理expression的参数格式
              var expressionArgs = options.props.map(function (prop) {
                return {
                  element: prop.element,
                  property: prop.property,
                  expression: prop.expression.transformed
                };
              });
              WeexBinding.createBinding(options.anchor, options.eventType, '', expressionArgs, callback);
            }
          }
        },

        /**
         *  @param {object} options
         *  @example
         *  {eventType:'pan',
         *   token:self.gesToken}
         */
        unbind: function unbind(options) {
          if (!options) {
            throw new Error('should pass options for binding');
          }

          if (WeexBinding && isSupportBinding) {
            if (isSupportNewBinding) {
              return WeexBinding.unbind(options);
            } else {
              return WeexBinding.disableBinding(options.anchor, options.eventType);
            }
          }
        },
        unbindAll: function unbindAll() {
          if (WeexBinding && isSupportBinding) {
            if (isSupportNewBinding) {
              return WeexBinding.unbindAll();
            } else {
              return WeexBinding.disableAll();
            }
          }
        },
        prepare: function prepare(options) {
          if (WeexBinding && isSupportBinding) {
            if (isSupportNewBinding) {
              return WeexBinding.prepare(options);
            } else {
              return WeexBinding.enableBinding(options.anchor, options.eventType);
            }
          }
        },
        getComputedStyle: function getComputedStyle(el) {
          if (isSupportNewBinding) {
            return WeexBinding.getComputedStyle(el);
          } else {
            return {};
          }
        }
      };
      module.exports = exports['default'];

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = __webpack_require__(2);

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var lex = {
        InputElementDiv: '<WhiteSpace>|<LineTerminator>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>',
        InputElementRegExp: '<WhiteSpace>|<LineTerminator>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>',
        ReservedWord: '<Keyword>|<NullLiteral>|<BooleanLiteral>',
        WhiteSpace: /[\t\v\f\u0020\u00A0\u1680\u180E\u2000-\u200A\u202F\u205f\u3000\uFEFF]/,
        LineTerminator: /[\n\r\u2028\u2029]/,
        Keyword: /new(?![_$a-zA-Z0-9])|void(?![_$a-zA-Z0-9])|delete(?![_$a-zA-Z0-9])|in(?![_$a-zA-Z0-9])|instanceof(?![_$a-zA-Z0-9])|typeof(?![_$a-zA-Z0-9])/,
        NullLiteral: /null(?![_$a-zA-Z0-9])/,
        BooleanLiteral: /(?:true|false)(?![_$a-zA-Z0-9])/,
        Identifier: /[_$a-zA-Z][_$a-zA-Z0-9]*/,
        Punctuator: /\/|=>|\*\*|>>>=|>>=|<<=|===|!==|>>>|<<|%=|\*=|-=|\+=|<=|>=|==|!=|\^=|\|=|\|\||&&|&=|>>|\+\+|--|\:|}|\*|&|\||\^|!|~|-|\+|\?|%|=|>|<|,|;|\.(?![0-9])|\]|\[|\)|\(|{/,
        DivPunctuator: /\/=|\//,
        NumericLiteral: /(?:0[xX][0-9a-fA-F]*|\.[0-9]+|(?:[1-9]+[0-9]*|0)(?:\.[0-9]*|\.)?)(?:[eE][+-]{0,1}[0-9]+)?(?![_$a-zA-Z0-9])/,
        StringLiteral: /"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"|'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'/,
        RegularExpressionLiteral: /\/(?:\[(?:\\[\s\S]|[^\]])*\]|[^*\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])(?:\[(?:\\[\s\S]|[^\]])*\]|[^\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])*\/[0-9a-zA-Z]*/
      };

      function XRegExp(xregexps, rootname, flag) {
        var expnames = [rootname];

        function buildRegExp(source) {
          var regexp = new RegExp();
          regexp.compile(source.replace(/<([^>]+)>/g, function (all, expname) {
            if (!xregexps[expname]) return '';
            expnames.push(expname);
            if (xregexps[expname] instanceof RegExp) return '(' + xregexps[expname].source + ')';
            return '(' + buildRegExp(xregexps[expname]).source + ')';
          }), flag);
          return regexp;
        }

        var regexp = buildRegExp(xregexps[rootname]);
        this.exec = function (string) {
          var matches = regexp.exec(string);
          if (matches == null) return null;
          var result = new String(matches[0]);
          for (var i = 0; i < expnames.length; i++) if (matches[i]) result[expnames[i]] = matches[i];
          return result;
        };
        Object.defineProperty(this, 'lastIndex', {
          'get': function () {
            return regexp.lastIndex;
          },
          'set': function (v) {
            regexp.lastIndex = v;
          }
        });
      }

      function LexicalParser() {
        var inputElementDiv = new XRegExp(lex, 'InputElementDiv', 'g');
        var inputElementRegExp = new XRegExp(lex, 'InputElementRegExp', 'g');
        var source;
        Object.defineProperty(this, 'source', {
          'get': function () {
            return source;
          },
          'set': function (v) {
            source = v;
            inputElementDiv.lastIndex = 0;
            inputElementRegExp.lastIndex = 0;
          }
        });
        this.reset = function () {
          inputElementDiv.lastIndex = 0;
          inputElementRegExp.lastIndex = 0;
        };
        this.getNextToken = function (useDiv) {
          var lastIndex = inputElementDiv.lastIndex;
          var inputElement;
          if (useDiv) inputElement = inputElementDiv;else inputElement = inputElementRegExp;
          var token = inputElement.exec(source);
          if (token && inputElement.lastIndex - lastIndex > token.length) {
            throw new SyntaxError('Unexpected token ILLEGAL');
          }
          inputElementDiv.lastIndex = inputElement.lastIndex;
          inputElementRegExp.lastIndex = inputElement.lastIndex;
          return token;
        };
      }

      var rules = {
        'IdentifierName': [['Identifier']],
        'Literal': [['NullLiteral'], ['BooleanLiteral'], ['NumericLiteral'], ['StringLiteral'], ['RegularExpressionLiteral']],
        'PrimaryExpression': [['Identifier'], ['Literal'], ['(', 'Expression', ')']],
        'CallExpression': [['PrimaryExpression', 'Arguments'], ['CallExpression', 'Arguments']],
        'Arguments': [['(', ')'], ['(', 'ArgumentList', ')']],
        'ArgumentList': [['ConditionalExpression'], ['ArgumentList', ',', 'ConditionalExpression']],
        'LeftHandSideExpression': [['PrimaryExpression'], ['CallExpression']],
        'UnaryExpression': [['LeftHandSideExpression'], ['void', 'UnaryExpression'], ['+', 'UnaryExpression'], ['-', 'UnaryExpression'], ['~', 'UnaryExpression'], ['!', 'UnaryExpression']],
        'ExponentiationExpression': [['UnaryExpression'], ['ExponentiationExpression', '**', 'UnaryExpression']],
        'MultiplicativeExpression': [['MultiplicativeExpression', '/', 'ExponentiationExpression'], ['ExponentiationExpression'], ['MultiplicativeExpression', '*', 'ExponentiationExpression'], ['MultiplicativeExpression', '%', 'ExponentiationExpression']],
        'AdditiveExpression': [['MultiplicativeExpression'], ['AdditiveExpression', '+', 'MultiplicativeExpression'], ['AdditiveExpression', '-', 'MultiplicativeExpression']],
        'ShiftExpression': [['AdditiveExpression'], ['ShiftExpression', '<<', 'AdditiveExpression'], ['ShiftExpression', '>>', 'AdditiveExpression'], ['ShiftExpression', '>>>', 'AdditiveExpression']],
        'RelationalExpression': [['ShiftExpression'], ['RelationalExpression', '<', 'ShiftExpression'], ['RelationalExpression', '>', 'ShiftExpression'], ['RelationalExpression', '<=', 'ShiftExpression'], ['RelationalExpression', '>=', 'ShiftExpression'], ['RelationalExpression', 'instanceof', 'ShiftExpression'], ['RelationalExpression', 'in', 'ShiftExpression']],
        'EqualityExpression': [['RelationalExpression'], ['EqualityExpression', '==', 'RelationalExpression'], ['EqualityExpression', '!=', 'RelationalExpression'], ['EqualityExpression', '===', 'RelationalExpression'], ['EqualityExpression', '!==', 'RelationalExpression']],
        'BitwiseANDExpression': [['EqualityExpression'], ['BitwiseANDExpression', '&', 'EqualityExpression']],
        'BitwiseXORExpression': [['BitwiseANDExpression'], ['BitwiseXORExpression', '^', 'BitwiseANDExpression']],
        'BitwiseORExpression': [['BitwiseXORExpression'], ['BitwiseORExpression', '|', 'BitwiseXORExpression']],
        'LogicalANDExpression': [['BitwiseORExpression'], ['LogicalANDExpression', '&&', 'BitwiseORExpression']],
        'LogicalORExpression': [['LogicalANDExpression'], ['LogicalORExpression', '||', 'LogicalANDExpression']],
        'ConditionalExpression': [['LogicalORExpression'], ['LogicalORExpression', '?', 'LogicalORExpression', ':', 'LogicalORExpression']],
        'Expression': [['ConditionalExpression'], ['Expression', ',', 'ConditionalExpression']],
        'Program': [['Expression']]

      };

      function Symbol(symbolName, token) {
        this.name = symbolName;
        this.token = token;
        this.childNodes = [];
        this.toString = function (indent) {
          if (!indent) indent = '';
          if (this.childNodes.length == 1) return this.childNodes[0].toString(indent);
          var str = indent + this.name + (this.token != undefined && this.name != this.token ? ':' + this.token : '') + '\n';
          for (var i = 0; i < this.childNodes.length; i++) str += this.childNodes[i].toString(indent + '    ');
          return str;
        };
      }

      function SyntacticalParser() {
        var currentRule;
        var root = {
          Program: '$'
        };
        var hash = {};

        function closureNode(node) {

          hash[JSON.stringify(node)] = node;

          var queue = Object.getOwnPropertyNames(node);
          while (queue.length) {
            var symbolName = queue.shift();
            if (!rules[symbolName]) continue;
            rules[symbolName].forEach(function (rule) {
              if (!node[rule[0]]) queue.push(rule[0]);
              var rulenode = node;
              var lastnode = null;
              rule.forEach(function (symbol) {
                if (!rulenode[symbol]) rulenode[symbol] = {};
                lastnode = rulenode;
                rulenode = rulenode[symbol];
              });
              if (node[symbolName].$div) rulenode.$div = true;
              rulenode.$reduce = symbolName;
              rulenode.$count = rule.length;
            });
          }

          for (var p in node) {
            if (typeof node[p] != 'object' || p.charAt(0) == '$' || node[p].$closure) continue;
            if (hash[JSON.stringify(node[p])]) node[p] = hash[JSON.stringify(node[p])];else {
              closureNode(node[p]);
            }
          }
          node.$closure = true;
        }

        closureNode(root);
        var symbolStack = [];
        var statusStack = [root];
        var current = root;
        this.insertSymbol = function insertSymbol(symbol, haveLineTerminator) {
          while (!current[symbol.name] && current.$reduce) {
            var count = current.$count;
            var newsymbol = new Symbol(current.$reduce);
            while (count--) newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
            current = statusStack[statusStack.length - 1];
            this.insertSymbol(newsymbol);
          }
          current = current[symbol.name];
          symbolStack.push(symbol), statusStack.push(current);
          if (!current) throw new Error();
          return current.$div;
        };
        this.reset = function () {
          current = root;
          symbolStack = [];
          statusStack = [root];
        };
        Object.defineProperty(this, 'grammarTree', {
          'get': function () {
            try {
              while (current.$reduce) {
                var count = current.$count;
                var newsymbol = new Symbol(current.$reduce);
                while (count--) newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
                current = statusStack[statusStack.length - 1];
                this.insertSymbol(newsymbol);
              }
              if (symbolStack.length > 0 && current[';']) {
                this.insertSymbol(new Symbol(';', ';'));
                return this.grammarTree;
              }
              if (symbolStack.length != 1 || symbolStack[0].name != 'Program') throw new Error();
            } catch (e) {
              throw new SyntaxError('Unexpected end of input');
            }
            return symbolStack[0];
          }
        });
      }

      function Parser() {
        this.lexicalParser = new LexicalParser();
        this.syntacticalParser = new SyntacticalParser();
        var terminalSymbols = ['NullLiteral', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral', 'RegularExpressionLiteral', 'Identifier', '**', '=>', '{', '}', '(', ')', '[', ']', '.', ';', ',', '<', '>', '<=', '>=', '==', '!=', '===', '!==', '+', '-', '*', '%', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=', '*=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', '/', '/=', 'instanceof', 'typeof', 'new', 'void', 'debugger', 'this', 'delete', 'in'];
        var terminalSymbolIndex = {};
        terminalSymbols.forEach(function (e) {
          Object.defineProperty(terminalSymbolIndex, e, {});
        });
        this.reset = function () {
          this.lexicalParser.reset();
          this.syntacticalParser.reset();
        };
        this.parse = function (source, onInputElement) {
          var token;
          var haveLineTerminator = false;
          this.lexicalParser.source = source;
          var useDiv = false;
          while (token = this.lexicalParser.getNextToken(useDiv)) {
            if (onInputElement) onInputElement(token);
            try {
              if (Object.getOwnPropertyNames(token).some(e => {
                if (terminalSymbolIndex.hasOwnProperty(e)) {
                  useDiv = this.syntacticalParser.insertSymbol(new Symbol(e, token), haveLineTerminator);
                  haveLineTerminator = false;
                  return true;
                } else return false;
              })) continue;
              if ((token.Keyword || token.Punctuator || token.DivPunctuator) && terminalSymbolIndex.hasOwnProperty(token.toString())) {
                useDiv = this.syntacticalParser.insertSymbol(new Symbol(token.toString(), token), haveLineTerminator);
              }
            } catch (e) {
              throw new SyntaxError('Unexpected token ' + token);
            }
          }
          return this.syntacticalParser.grammarTree;
        };
      }

      var parser = new Parser();

      function JavaScriptExpression(text) {
        parser.reset();
        this.tree = parser.parse(text);
        this.paths = [];
        var context = Object.create(null);
        var me = this;
        var pathIndex = Object.create(null);
        this.isSimple;
        this.isConst;
        walk(this.tree);
        checkSimple(this.tree);
        if (this.paths.length === 0) {
          this.isConst = true;
        }
        this.setter = function (path) {
          var curr = context;
          for (var i = 0; i < path.length - 1; i++) {
            if (!curr[path[i]]) curr[path[i]] = Object.create(null);
            curr = curr[path[i]];
          }
          return {
            isCompleted: function () {
              for (var p in pathIndex) if (!pathIndex[p]) return false;
              return true;
            },
            set: function (value) {
              if (!pathIndex[path.join('.')]) {
                pathIndex[path.join('.')] = true;
              }
              curr[path[i]] = value;
              if (this.isCompleted()) {
                return me.exec();
              } else {
                return undefined;
              }
            }
          };
        };

        this.valueOf = this.exec = function () {
          try {
            return function () {
              return eval(text);
            }.call(context);
          } catch (e) {}
        };

        function checkSimple(symbol) {

          var curr = symbol;
          while (curr.childNodes.length <= 1 && curr.name !== 'MemberExpression') {
            curr = curr.childNodes[0];
          }
          // TODO: need to point out "[……]"
          if (curr.name === 'MemberExpression') {
            me.isSimple = true;
          } else {
            me.isSimple = false;
          }
        }

        function walk(symbol) {
          if (symbol.name === 'CallExpression' && symbol.childNodes[symbol.childNodes.length - 1].name !== 'CallExpression') {
            var path = getPath(symbol.childNodes[1]);
            walk(symbol.childNodes[0]);
          } else if (symbol.name === 'NewExpression' && symbol.childNodes.length === 1) {
            var path = getPath(symbol.childNodes[0]);
          } else if (symbol.name === 'MemberExpression' && symbol.childNodes.length === 1) {
            var path = getPath(symbol);
          } else {
            for (var i = 0; i < symbol.childNodes.length; i++) walk(symbol.childNodes[i]);
          }
        }

        function getPath(symbol) {
          // [["PrimaryExpression"], ["MemberExpression", "[", "Expression", "]"], ["MemberExpression", ".", "IdentifierName"], ["new", "MemberExpression", "Arguments"]],

          if (symbol.childNodes[0].name === 'IdentifierName') {
            // MemberExpression : MemberExpression "." IdentifierName
            var path = getPath(symbol.childNodes[2]);
            if (path) path = path.concat(symbol.childNodes[0].childNodes[0].token.toString());
            createPath(path);
            return path;
          } else if (symbol.childNodes[0].name === 'PrimaryExpression') {
            // MemberExpression : PrimaryExpression
            if (symbol.childNodes[0].childNodes[0].name === 'Identifier') {
              var path = [symbol.childNodes[0].childNodes[0].token.toString()];
              createPath(path);
              return path;
            } else {
              return null;
            }
          } else if (symbol.childNodes[0].name === ']') {
            // MemberExpression : MemberExpression "[" Expression "]"
            getPath(symbol.childNodes[3]);
            walk(symbol.childNodes[1]);
            return null;
          } else if (symbol.childNodes[0].name === 'Arguments') {
            // MemberExpression : "new" MemberExpression Arguments
            walk(symbol.childNodes[0]);
            walk(symbol.childNodes[1]);
            return null;
          } else {
            for (var i = 0; i < symbol.childNodes.length; i++) walk(symbol.childNodes[i]);
          }
        }

        function createPath(path) {
          var curr = context;
          for (var i = 0; i < path.length - 1; i++) {
            if (!curr[path[i]]) curr[path[i]] = Object.create(null);
            curr = curr[path[i]];
          }
          me.paths.push(path);
          pathIndex[path.join('.')] = false;
        }
      }

      function visit(tree) {
        var childNodes = tree.childNodes.slice().reverse();
        var children = childNodes.filter(e => !e.token || !e.token.Punctuator);
        if (tree.name === 'UnaryExpression') {
          // negative number support
          if (childNodes.length === 2 && childNodes[0].name === '-' && children.length === 1) {
            var res = visit(children[0]);
            res.value = -res.value;
            return res;
          }
        }

        if (tree.name === 'Arguments') {
          var argumentList = [];
          var listNode = children[0];
          while (listNode) {
            if (listNode.childNodes.length === 3) {
              argumentList.unshift(listNode.childNodes[0]);
              listNode = listNode.childNodes[2];
            }
            if (listNode.childNodes.length === 1) {
              argumentList.unshift(listNode.childNodes[0]);
              listNode = null;
            }
          }
          return {
            type: 'Arguments',
            children: argumentList.map(e => visit(e))
          };
        }

        if (children && children.length === 1) {
          var res = visit(children[0]);
          return res;
        }

        if (tree.token && ['NullLiteral', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral', 'Identifier'].some(e => tree.token[e])) {
          var type = Object.keys(tree.token).filter(e => e.match(/Literal/) || e.match(/Identifier/))[0];
          var value = {
            'NullLiteral': null,
            'BooleanLiteral': Boolean(tree.token),
            'NumericLiteral': Number(tree.token),
            'StringLiteral': tree.token,
            'Identifier': tree.token
          }[type];

          return {
            type: type,
            value: value
          };
        }

        if (tree.name === 'CallExpression') return {
          type: 'CallExpression',
          children: [visit(childNodes[0]), visit(childNodes[1])]
        };

        return {
          type: childNodes.filter(e => e.token && e.token.Punctuator)[0].name,
          children: childNodes.filter(e => !e.token || !e.token.Punctuator).map(e => visit(e))
        };
      }

      function parse(originExp) {
        let exp = new JavaScriptExpression(originExp);
        return JSON.stringify(visit(exp.tree), null);
      }

      module.exports = {
        parse: parse
      };

      /***/
    }]
    /******/)
  );
});;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(275)('wks');
var uid = __webpack_require__(31);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(214)
)

/* script */
__vue_exports__ = __webpack_require__(215)

/* template */
var __vue_template__ = __webpack_require__(216)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0b8037be"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(282);
var toPrimitive = __webpack_require__(270);
var dP = Object.defineProperty;

exports.f = __webpack_require__(13) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(17)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(4);
var ctx = __webpack_require__(32);
var hide = __webpack_require__(15);
var has = __webpack_require__(11);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(12);
var createDesc = __webpack_require__(34);
module.exports = __webpack_require__(13) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__packages_bind_env__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__packages_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__packages_wxc_button__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__packages_wxc_cell__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__packages_wxc_checkbox__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__packages_wxc_checkbox_list__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__packages_wxc_city__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__packages_wxc_countdown__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__packages_wxc_dialog__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__packages_wxc_ep_slider__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__packages_wxc_full_page__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__packages_wxc_grid_select__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__packages_wxc_icon__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__packages_wxc_indexlist__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__packages_wxc_lightbox__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__packages_wxc_loading__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__packages_wxc_lottery_rain__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__packages_wxc_mask__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__packages_wxc_minibar__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__packages_wxc_noticebar__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__packages_wxc_overlay__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__packages_wxc_page_calendar__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__packages_wxc_pan_item__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__packages_wxc_part_loading__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__packages_wxc_popover__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__packages_wxc_popup__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__packages_wxc_progress__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__packages_wxc_radio__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__packages_wxc_refresher__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__packages_wxc_result__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__packages_wxc_rich_text__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__packages_wxc_searchbar__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__packages_wxc_simple_flow__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__packages_wxc_slide_nav__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__packages_wxc_slider_bar__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__packages_wxc_special_rich_text__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__packages_wxc_stepper__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__packages_wxc_tab_bar__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__packages_wxc_tab_page__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__packages_wxc_tag__ = __webpack_require__(263);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BindEnv", function() { return __WEBPACK_IMPORTED_MODULE_0__packages_bind_env__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return __WEBPACK_IMPORTED_MODULE_1__packages_utils__["default"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcButton", function() { return __WEBPACK_IMPORTED_MODULE_2__packages_wxc_button__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcCell", function() { return __WEBPACK_IMPORTED_MODULE_3__packages_wxc_cell__["default"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcCheckbox", function() { return __WEBPACK_IMPORTED_MODULE_4__packages_wxc_checkbox__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcCheckboxList", function() { return __WEBPACK_IMPORTED_MODULE_5__packages_wxc_checkbox_list__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcCity", function() { return __WEBPACK_IMPORTED_MODULE_6__packages_wxc_city__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcCountdown", function() { return __WEBPACK_IMPORTED_MODULE_7__packages_wxc_countdown__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcDialog", function() { return __WEBPACK_IMPORTED_MODULE_8__packages_wxc_dialog__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcEpSlider", function() { return __WEBPACK_IMPORTED_MODULE_9__packages_wxc_ep_slider__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcFullPage", function() { return __WEBPACK_IMPORTED_MODULE_10__packages_wxc_full_page__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcGridSelect", function() { return __WEBPACK_IMPORTED_MODULE_11__packages_wxc_grid_select__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcIcon", function() { return __WEBPACK_IMPORTED_MODULE_12__packages_wxc_icon__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcIndexlist", function() { return __WEBPACK_IMPORTED_MODULE_13__packages_wxc_indexlist__["default"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcLightbox", function() { return __WEBPACK_IMPORTED_MODULE_14__packages_wxc_lightbox__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcLoading", function() { return __WEBPACK_IMPORTED_MODULE_15__packages_wxc_loading__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcLotteryRain", function() { return __WEBPACK_IMPORTED_MODULE_16__packages_wxc_lottery_rain__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcMask", function() { return __WEBPACK_IMPORTED_MODULE_17__packages_wxc_mask__["default"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcMinibar", function() { return __WEBPACK_IMPORTED_MODULE_18__packages_wxc_minibar__["default"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcNoticebar", function() { return __WEBPACK_IMPORTED_MODULE_19__packages_wxc_noticebar__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcOverlay", function() { return __WEBPACK_IMPORTED_MODULE_20__packages_wxc_overlay__["default"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcPageCalendar", function() { return __WEBPACK_IMPORTED_MODULE_21__packages_wxc_page_calendar__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcPanItem", function() { return __WEBPACK_IMPORTED_MODULE_22__packages_wxc_pan_item__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcPartLoading", function() { return __WEBPACK_IMPORTED_MODULE_23__packages_wxc_part_loading__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcPopover", function() { return __WEBPACK_IMPORTED_MODULE_24__packages_wxc_popover__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcPopup", function() { return __WEBPACK_IMPORTED_MODULE_25__packages_wxc_popup__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcProgress", function() { return __WEBPACK_IMPORTED_MODULE_26__packages_wxc_progress__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcRadio", function() { return __WEBPACK_IMPORTED_MODULE_27__packages_wxc_radio__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcRefresher", function() { return __WEBPACK_IMPORTED_MODULE_28__packages_wxc_refresher__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcResult", function() { return __WEBPACK_IMPORTED_MODULE_29__packages_wxc_result__["default"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcRichText", function() { return __WEBPACK_IMPORTED_MODULE_30__packages_wxc_rich_text__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcSearchbar", function() { return __WEBPACK_IMPORTED_MODULE_31__packages_wxc_searchbar__["default"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcSimpleFlow", function() { return __WEBPACK_IMPORTED_MODULE_32__packages_wxc_simple_flow__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcSlideNav", function() { return __WEBPACK_IMPORTED_MODULE_33__packages_wxc_slide_nav__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcSliderBar", function() { return __WEBPACK_IMPORTED_MODULE_34__packages_wxc_slider_bar__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcSpecialRichText", function() { return __WEBPACK_IMPORTED_MODULE_35__packages_wxc_special_rich_text__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcStepper", function() { return __WEBPACK_IMPORTED_MODULE_36__packages_wxc_stepper__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcTabBar", function() { return __WEBPACK_IMPORTED_MODULE_37__packages_wxc_tab_bar__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcTabPage", function() { return __WEBPACK_IMPORTED_MODULE_38__packages_wxc_tab_page__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WxcTag", function() { return __WEBPACK_IMPORTED_MODULE_39__packages_wxc_tag__["a"]; });
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 17/09/25
 */












































/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(285);
var defined = __webpack_require__(272);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(56)
)

/* script */
__vue_exports__ = __webpack_require__(57)

/* template */
var __vue_template__ = __webpack_require__(59)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-b94f2f9c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by Tw93 on 2016/10/29.
 */

const GIF = 'https://img.alicdn.com/tfs/TB1aks3PpXXXXcXXFXXXXXXXXXX-150-150.gif';
/* harmony export (immutable) */ __webpack_exports__["GIF"] = GIF;

const BLACK_GIF = 'https://img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif';
/* harmony export (immutable) */ __webpack_exports__["BLACK_GIF"] = BLACK_GIF;

const PART = 'https://gtms02.alicdn.com/tfs/TB1y4QbSXXXXXbgapXXXXXXXXXX-50-50.gif';
/* harmony export (immutable) */ __webpack_exports__["PART"] = PART;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(224)
)

/* script */
__vue_exports__ = __webpack_require__(225)

/* template */
var __vue_template__ = __webpack_require__(226)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0f0578ce"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(284);
var enumBugKeys = __webpack_require__(276);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(33);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(12).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Page_vue__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Page_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Page_vue__);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Page_vue___default.a);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(39)
)

/* script */
__vue_exports__ = __webpack_require__(40)

/* template */
var __vue_template__ = __webpack_require__(268)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7ebf4be3"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = {
  "container": {
    "position": "relative"
  },
  "bg-image": {
    "position": "absolute",
    "top": 0,
    "width": "750",
    "height": "1334",
    "opacity": 1
  },
  "page": {
    "width": "750",
    "backgroundColor": "#f5f5f5",
    "position": "relative"
  },
  "page-content": {
    "position": "relative"
  },
  "refresh": {
    "width": "750",
    "textAlign": "center",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "paddingTop": "16",
    "paddingBottom": "16",
    "position": "absolute"
  },
  "loading": {
    "width": "750",
    "textAlign": "center",
    "position": "relative",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "indicator": {
    "height": "40",
    "width": "40",
    "color": "#ffffff"
  },
  "indicator-loading": {
    "height": "40",
    "width": "40",
    "color": "#ffffff",
    "marginTop": "16",
    "marginBottom": "16"
  },
  "top": {
    "fontFamily": "iconfont",
    "width": "80",
    "height": "80",
    "backgroundColor": "#ffffff",
    "borderRadius": 50,
    "position": "absolute",
    "right": "20",
    "bottom": "20",
    "fontSize": "40",
    "textAlign": "center",
    "lineHeight": "80",
    "boxShadow": "0 0 6px #ccc",
    "borderWidth": "1",
    "borderColor": "#cccccc"
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });






























var _weexUi = __webpack_require__(16);


var modal = weex.requireModule('modal'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var dom = weex.requireModule('dom');exports.default = { name: "Page", components: { WxcLoading: _weexUi.WxcLoading }, props: { minusHeight: { type: Number, default: function _default() {return 0;} }, imageBg: { type: String, default: function _default() {return '';} }, styleBg: { type: Object, default: function _default() {return {};} }, stylePage: { type: Object, default: function _default() {return {};} },

		refresh: {
			type: String,
			default: function _default() {
				return "";
			} },

		load: {
			type: String,
			default: function _default() {
				return "";
			} },

		refreshing: {
			type: Boolean,
			default: function _default() {
				return false;
			} },

		loading: {
			type: Boolean,
			default: function _default() {
				return false;
			} },

		isShow: {
			type: Boolean,
			default: function _default() {
				return true;
			} },

		refreshSlot: {
			type: Boolean,
			default: function _default() {
				return false;
			} },

		loadSlot: {
			type: Boolean,
			default: function _default() {
				return false;
			} },

		pageLoadSlot: {
			type: Boolean,
			default: function _default() {
				return false;
			} },

		toTop: {
			type: Boolean,
			default: function _default() {
				return false;
			} } },


	data: function data() {
		return {
			deviceWidth: 750,
			deviceHeight: 0,
			firstLoad: false };

	},
	created: function created() {
		if (this.toTop === true) {
			dom.addRule('fontFace', {
				'fontFamily': "iconfont",
				'src': "url('http://at.alicdn.com/t/font_811848_8vtd3k91r3i.ttf')" });

		}
		this.$data.deviceHeight = WXEnvironment.deviceHeight;
	},
	computed: {
		pageStyle: function pageStyle() {
			var base = {
				"height": this.containerHeight };

			var imgBg = {
				"backgroundColor": "transparent",
				"height": this.containerHeight };

			var res = [base];
			if (Object.getOwnPropertyNames(this.stylePage).length > 0) res.push(this.stylePage);
			if (this.imageBg && this.imageBg !== "") res.push(imgBg);
			res = res.reduce(function (t, v, i) {return Object.assign(t, v);});
			return res;
		},
		containerHeight: function containerHeight() {
			if (this.minusHeight > 0) return this.$data.deviceHeight - this.minusHeight;
			return this.$data.deviceHeight;
		} },

	methods: {
		handleScroll: function handleScroll(e) {
			this.$emit("scroll", e);
		},
		handlePullDown: function handlePullDown(e) {
			this.$emit("pullDown", e);
		},
		handleRefresh: function handleRefresh(e) {
			this.$emit("refreshing");
		},
		handleLoading: function handleLoading(e) {
			this.$emit("loadining");
		},
		handleTop: function handleTop(e) {
			var content = this.$refs.content;
			dom.scrollToElement(content);
		} } };

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_bind_env__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__utils_bind_env__["default"]; });
// hack for babel-plugin-component



/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var required = __webpack_require__(43)
  , qs = __webpack_require__(44)
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address) {          // Sanitize what is left of the address
    return address.replace('\\', '/');
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var globalVar;

  if (typeof window !== 'undefined') globalVar = window;
  else if (typeof global !== 'undefined') globalVar = global;
  else if (typeof self !== 'undefined') globalVar = self;
  else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.qs = qs;

module.exports = Url;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , undef;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    if (key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = []
    , value
    , key;

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = '';
      }

      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(value));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(47)
)

/* script */
__vue_exports__ = __webpack_require__(48)

/* template */
var __vue_template__ = __webpack_require__(50)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-a8612dbe"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-btn": {
    "width": "702",
    "height": "88",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "12",
    "opacity": 1
  },
  "btn-text": {
    "textOverflow": "ellipsis",
    "lines": 1,
    "fontSize": "36",
    "color": "#ffffff"
  }
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//

var _type = __webpack_require__(49);exports.default =

{
  props: {
    text: {
      type: String,
      default: '确认' },

    size: {
      type: String,
      default: 'none' },

    type: {
      type: String,
      default: 'red' },

    disabled: {
      type: Boolean,
      default: false },

    btnStyle: Object,
    textStyle: Object,
    disabledStyle: Object },

  computed: {
    mrBtnStyle: function mrBtnStyle() {var
      type = this.type,disabled = this.disabled,btnStyle = this.btnStyle,size = this.size,disabledStyle = this.disabledStyle;

      var mrBtnStyle = _extends({},
      _type.STYLE_MAP[type],
      btnStyle,
      _type.BUTTON_STYLE_MAP[size]);


      var disabledInStyle = { opacity: 0.2 };
      if (type === 'white') {
        disabledInStyle = { backgroundColor: 'rgba(0, 0, 0, 0.1)' };
      }

      return disabled ? _extends({},
      mrBtnStyle,
      disabledInStyle,
      disabledStyle, {
        borderWidth: 0 }) :
      mrBtnStyle;
    },
    mrTextStyle: function mrTextStyle() {var
      type = this.type,disabled = this.disabled,textStyle = this.textStyle,size = this.size;
      var mrTextStyle = _extends({}, _type.TEXT_STYLE_MAP[type], textStyle, _type.TEXT_FONTSIZE_STYLE_MAP[size]);
      return disabled ? _extends({}, mrTextStyle, { color: '#FFFFFF' }) : mrTextStyle;
    } },

  methods: {
    onClicked: function onClicked(e) {var
      type = this.type,disabled = this.disabled;
      this.$emit('wxcButtonClicked', { e: e, type: type, disabled: disabled });
    } } };

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const STYLE_MAP = {
  red: {
    backgroundColor: '#FF5000'
  },
  yellow: {
    backgroundColor: '#FFC900'
  },
  white: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A5A5A5',
    borderWidth: '1px'
  },
  blue: {
    backgroundColor: '#0F8DE8'
  },
  green: {
    backgroundColor: '#19be6b'
  }
};
/* harmony export (immutable) */ __webpack_exports__["STYLE_MAP"] = STYLE_MAP;


const TEXT_STYLE_MAP = {
  red: {
    color: '#FFFFFF'
  },
  yellow: {
    color: '#FFFFFF'
  },
  blue: {
    color: '#FFFFFF'
  },
  white: {
    color: '#3D3D3D'
  },
  green: {
    color: '#FFFFFF'
  }
};
/* harmony export (immutable) */ __webpack_exports__["TEXT_STYLE_MAP"] = TEXT_STYLE_MAP;


const BUTTON_STYLE_MAP = {
  full: {
    width: '702px',
    height: '88px'
  },
  big: {
    width: '339px',
    height: '70px'
  },
  medium: {
    width: '218px',
    height: '60px'
  },
  small: {
    width: '157px',
    height: '44px'
  }
};
/* harmony export (immutable) */ __webpack_exports__["BUTTON_STYLE_MAP"] = BUTTON_STYLE_MAP;


const TEXT_FONTSIZE_STYLE_MAP = {
  full: {
    fontSize: '36px'
  },
  big: {
    fontSize: '32px'
  },
  medium: {
    fontSize: '28px'
  },
  small: {
    fontSize: '24px'
  }
};
/* harmony export (immutable) */ __webpack_exports__["TEXT_FONTSIZE_STYLE_MAP"] = TEXT_FONTSIZE_STYLE_MAP;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-btn"],
    style: _vm.mrBtnStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": _vm.text
    },
    on: {
      "click": _vm.onClicked
    }
  }, [_c('text', {
    staticClass: ["btn-text"],
    style: _vm.mrTextStyle
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(52)
)

/* script */
__vue_exports__ = __webpack_require__(53)

/* template */
var __vue_template__ = __webpack_require__(54)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2b831391"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-cell": {
    "flexDirection": "row",
    "alignItems": "center",
    "paddingLeft": "24",
    "paddingRight": "24",
    "backgroundColor": "#ffffff"
  },
  "cell-margin": {
    "marginBottom": "24"
  },
  "cell-title": {
    "flex": 1
  },
  "cell-indent": {
    "paddingBottom": "30",
    "paddingTop": "30"
  },
  "has-desc": {
    "paddingBottom": "18",
    "paddingTop": "18"
  },
  "cell-top-border": {
    "borderTopColor": "#e2e2e2",
    "borderTopWidth": "1"
  },
  "cell-bottom-border": {
    "borderBottomColor": "#e2e2e2",
    "borderBottomWidth": "1"
  },
  "cell-label-text": {
    "fontSize": "30",
    "color": "#666666",
    "width": "188",
    "marginRight": "10"
  },
  "cell-arrow-icon": {
    "width": "22",
    "height": "22"
  },
  "cell-content": {
    "color": "#333333",
    "fontSize": "30",
    "lineHeight": "40"
  },
  "cell-desc-text": {
    "color": "#999999",
    "fontSize": "24",
    "lineHeight": "30",
    "marginTop": "4",
    "marginRight": "30"
  },
  "extra-content-text": {
    "fontSize": "28",
    "color": "#999999",
    "marginRight": "4"
  }
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });







































































































var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  props: {
    label: {
      type: String,
      default: '' },

    title: {
      type: String,
      default: '' },

    extraContent: {
      type: String,
      default: '' },

    desc: {
      type: String,
      default: '' },

    link: {
      type: String,
      default: '' },

    hasTopBorder: {
      type: Boolean,
      default: false },

    hasMargin: {
      type: Boolean,
      default: false },

    hasBottomBorder: {
      type: Boolean,
      default: true },

    hasArrow: {
      type: Boolean,
      default: false },

    arrowIcon: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB11zBUpwMPMeJjy1XbXXcwxVXa-22-22.png' },

    hasVerticalIndent: {
      type: Boolean,
      default: true },

    cellStyle: {
      type: Object,
      default: function _default() {return {};} },

    autoAccessible: {
      type: Boolean,
      default: true } },


  methods: {
    cellClicked: function cellClicked(e) {
      var link = this.link;
      this.$emit('wxcCellClicked', { e: e });
      link && _utils2.default.goToH5Page(link, true);
    } } }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['wxc-cell', _vm.hasTopBorder && 'cell-top-border', _vm.hasBottomBorder && 'cell-bottom-border', _vm.hasMargin && 'cell-margin', _vm.hasVerticalIndent && 'cell-indent', _vm.desc && 'has-desc'],
    style: _vm.cellStyle,
    attrs: {
      "accessible": _vm.autoAccessible,
      "ariaLabel": (_vm.label + "," + _vm.title + "," + _vm.desc)
    },
    on: {
      "click": _vm.cellClicked
    }
  }, [_vm._t("label", [(_vm.label) ? _c('div', [_c('text', {
    staticClass: ["cell-label-text"]
  }, [_vm._v(_vm._s(_vm.label))])]) : _vm._e()]), _c('div', {
    staticClass: ["cell-title"]
  }, [_vm._t("title", [_c('text', {
    staticClass: ["cell-content"]
  }, [_vm._v(_vm._s(_vm.title))]), (_vm.desc) ? _c('text', {
    staticClass: ["cell-desc-text"]
  }, [_vm._v(_vm._s(_vm.desc))]) : _vm._e()])], 2), _vm._t("value"), _vm._t("default"), (_vm.extraContent) ? _c('text', {
    staticClass: ["extra-content-text"]
  }, [_vm._v(_vm._s(_vm.extraContent))]) : _vm._e(), (_vm.hasArrow) ? _c('image', {
    staticClass: ["cell-arrow-icon"],
    attrs: {
      "src": _vm.arrowIcon,
      "ariaHidden": true
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = {
  "checkbox": {
    "width": "48",
    "height": "48"
  },
  "title-text": {
    "fontSize": "30"
  }
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });





























var _wxcCell = __webpack_require__(9);var _wxcCell2 = _interopRequireDefault(_wxcCell);
var _type = __webpack_require__(58);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default = { components: { WxcCell: _wxcCell2.default }, props: { hasTopBorder: { type: Boolean, default: false }, hasBottomBorder: { type: Boolean, default: true }, title: { type: String, require: true }, value: { type: [String, Number, Object], require: true }, disabled: { type: Boolean, default: false }, checked: { type: Boolean, default: false }, config: {
      type: Object,
      default: function _default() {return {};} } },


  data: function data() {return {
      icon: [_type.CHECKED, _type.UNCHECKED, _type.CHECKED_DISABLED, _type.UNCHECKED_DISABLED],
      color: '#3D3D3D',
      innerChecked: false };},

  computed: {
    checkIcon: function checkIcon() {var
      icon = this.icon,disabled = this.disabled,innerChecked = this.innerChecked,config = this.config;
      var mergeIcon = [].concat(_toConsumableArray(icon));
      config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
      config.unCheckedIcon && (mergeIcon[1] = config.unCheckedIcon);
      config.checkedDisabledIcon && (mergeIcon[2] = config.checkedDisabledIcon);
      config.unCheckedDisabledIcon && (mergeIcon[3] = config.unCheckedDisabledIcon);
      if (disabled) {
        return mergeIcon[innerChecked ? 2 : 3];
      } else {
        return mergeIcon[innerChecked ? 0 : 1];
      }
    },
    textColor: function textColor() {var
      innerChecked = this.innerChecked,disabled = this.disabled,config = this.config;
      var checkedColor = config.checkedColor ? config.checkedColor : '#EE9900';
      return innerChecked && !disabled ? checkedColor : '#3D3D3D';
    } },

  watch: {
    checked: function checked(newChecked) {
      this.innerChecked = newChecked;
    } },

  created: function created() {var
    checked = this.checked;
    this.innerChecked = checked;
  },
  methods: {
    wxcCellClicked: function wxcCellClicked() {var
      disabled = this.disabled,innerChecked = this.innerChecked,value = this.value;
      if (!disabled) {
        this.innerChecked = !innerChecked;
        this.$emit('wxcCheckBoxItemChecked', { value: value, checked: this.innerChecked });
      }
    } } };

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/10/21.
 */

const CHECKED = 'https://gw.alicdn.com/tfs/TB14fp2pwMPMeJjy1XbXXcwxVXa-72-72.png';
/* harmony export (immutable) */ __webpack_exports__["CHECKED"] = CHECKED;

const UNCHECKED = 'https://gw.alicdn.com/tfs/TB1U6SbpwMPMeJjy1XcXXXpppXa-72-72.png';
/* harmony export (immutable) */ __webpack_exports__["UNCHECKED"] = UNCHECKED;

const CHECKED_DISABLED = 'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png';
/* harmony export (immutable) */ __webpack_exports__["CHECKED_DISABLED"] = CHECKED_DISABLED;

const UNCHECKED_DISABLED = 'https://gw.alicdn.com/tfs/TB1lTuzpwoQMeJjy0FoXXcShVXa-72-72.png';
/* harmony export (immutable) */ __webpack_exports__["UNCHECKED_DISABLED"] = UNCHECKED_DISABLED;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-cell', {
    attrs: {
      "hasTopBorder": _vm.hasTopBorder,
      "hasBottomBorder": _vm.hasBottomBorder,
      "accessible": true,
      "ariaLabel": (_vm.title + ",状态为" + (_vm.checked ? '已选中' : '未选中') + "," + (_vm.disabled ? '不可更改' : '点击可切换'))
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('text', {
    staticClass: ["title-text"],
    style: {
      color: _vm.textColor
    },
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _c('image', {
    staticClass: ["checkbox"],
    attrs: {
      "slot": "value",
      "src": _vm.checkIcon
    },
    slot: "value"
  })])
},staticRenderFns: []}

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(62)

/* template */
var __vue_template__ = __webpack_require__(63)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });













var _index = __webpack_require__(19);var _index2 = _interopRequireDefault(_index);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  components: { WxcCheckbox: _index2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {return [];} },

    config: {
      type: Object,
      default: function _default() {return {};} } },


  data: function data() {return {
      checkedList: [] };},

  created: function created() {var _this = this;var
    list = this.list;
    if (list && list.length > 0) {
      list.forEach(function (item, i) {
        item.checked && _this.checkedList.push(item.value);
      });
    }
  },
  methods: {
    wxcCheckBoxItemChecked: function wxcCheckBoxItemChecked(e) {
      if (e.checked) {
        this.checkedList.push(e.value);
      } else {
        var index = this.checkedList.indexOf(e.value);
        this.checkedList.splice(index, 1);
      }
      this.$emit('wxcCheckBoxListChecked', { checkedList: this.checkedList });
    } } }; //
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.list), function(item, i) {
    return _c('wxc-checkbox', _vm._b({
      key: i,
      attrs: {
        "config": _vm.config
      },
      on: {
        "wxcCheckBoxItemChecked": _vm.wxcCheckBoxItemChecked
      }
    }, 'wxc-checkbox', item, false))
  }))
},staticRenderFns: []}

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(66)
)

/* script */
__vue_exports__ = __webpack_require__(67)

/* template */
var __vue_template__ = __webpack_require__(89)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-9a8d274c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-city": {
    "position": "fixed",
    "width": "750",
    "backgroundColor": "#F2F3F4"
  }
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _defaultData = __webpack_require__(68);var _defaultData2 = _interopRequireDefault(_defaultData);
var _util = __webpack_require__(69);var Util = _interopRequireWildcard(_util);
var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);
var _tab = __webpack_require__(70);var _tab2 = _interopRequireDefault(_tab);
var _wxcSearchbar = __webpack_require__(20);var _wxcSearchbar2 = _interopRequireDefault(_wxcSearchbar);
var _wxcResult = __webpack_require__(21);var _wxcResult2 = _interopRequireDefault(_wxcResult);
var _wxcIndexlist = __webpack_require__(22);var _wxcIndexlist2 = _interopRequireDefault(_wxcIndexlist);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  components: { wxcTab: _tab2.default, WxcSearchbar: _wxcSearchbar2.default, WxcResult: _wxcResult2.default, WxcIndexlist: _wxcIndexlist2.default },
  props: {
    animationType: {
      type: String,
      default: 'push' },

    inputConfig: {
      type: Object,
      default: function _default() {return {};} },

    sourceData: {
      type: Object,
      default: function _default() {return _defaultData2.default;} },

    cityStyleType: {
      type: String,
      default: 'list' },

    currentLocation: String,
    cityHeight: {
      type: Number,
      default: 0 },

    showTab: {
      type: Boolean,
      default: false },

    showIndex: {
      type: Boolean,
      default: true },

    showNavHeader: {
      type: Boolean,
      default: true } },


  data: function data() {return {
      tId: null,
      saveDefaultSourceData: {},
      onlyShowList: false,
      result: {
        noGoods: {
          pic: 'https://img.alicdn.com/tfs/TB1SpPHkf2H8KJjy0FcXXaDlFXa-200-200.png',
          button: '',
          content: '搜索无结果' } } };},



  created: function created() {
    this.saveDefaultSourceData = this.sourceData;
  },
  computed: {
    cityExtendStyle: function cityExtendStyle() {
      return _utils2.default.uiStyle.pageTransitionAnimationStyle(this.animationType);
    },
    currentCityLocationConfig: function currentCityLocationConfig() {
      if (this.currentLocation) {
        return {
          type: this.cityStyleType,
          title: '定位',
          list: [
          { name: this.currentLocation, isLocation: true }] };


      } else {
        return {};
      }
    },
    normalList: function normalList() {
      return Util.getCities(this.sourceData.cities);
    },
    hotListConfig: function hotListConfig() {
      return {
        type: this.cityStyleType,
        title: '热门',
        list: Util.getCities(this.sourceData.hotCity) };

    },
    showError: function showError() {var
      normalList = this.normalList,hotListConfig = this.hotListConfig;
      return normalList && normalList.length < 1 && hotListConfig && hotListConfig.list && hotListConfig.list.length < 1;
    },
    listHeight: function listHeight() {
      // 兼容去头逻辑
      var pageHeight = _utils2.default.env.getPageHeight();var

      cityHeight = this.cityHeight;
      if (cityHeight && !isNaN(cityHeight) && cityHeight > 0) {
        pageHeight = cityHeight;
      }
      // searchInput 84
      var tabHeight = this.showTab ? 90 : 0;
      return pageHeight - 84 - tabHeight;
    },
    mergeInputConfig: function mergeInputConfig() {
      return _extends({
        autofocus: false,
        alwaysShowCancel: true,
        placeholder: '中文/拼音/首字母' },
      this.inputConfig);

    } },

  methods: {
    onTabSwitch: function onTabSwitch(e) {
      this.$emit('wxcTabSwitch', e);
    },
    switchTab: function switchTab() {var _this = this;var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      setTimeout(function () {
        _this.$refs['wxc-tab'].switchTab(i);
      }, 100);
    },
    onItemClick: function onItemClick(e) {
      this.$refs['wxc-searchbar'].autoBlur();
      this.show(false);
      this.$emit('wxcCityItemSelected', { item: e.item });
    },
    onInput: function onInput(e) {var _this2 = this;
      clearTimeout(this.tId);var
      cities = this.sourceData.cities;var
      value = e.value;
      if (value !== '' && cities && cities.length > 0) {
        var queryData = Util.query(cities, String(value).trim());
        this.sourceData = {
          cities: queryData,
          hotCity: [] };

        this.onlyShowList = true;
      } else {
        this.sourceData = this.saveDefaultSourceData;
        this.onlyShowList = false;
      }
      this.tId = setTimeout(function () {
        _this2.$emit('wxcCityOnInput', {
          value: e.value });

      }, 300);
    },
    onCancel: function onCancel() {
      this.autoBlur();
      this.show(false);
      this.$emit('wxcCityCanceled', {});
    },
    onSubmit: function onSubmit(e) {
      this.autoBlur();
      this.$emit('wxcCityOnKeyUpEnter', { value: e.value });
    },
    autoBlur: function autoBlur() {
      var inputRef = this.$refs['wxc-searchbar'];
      inputRef && inputRef.autoBlur();
    },
    show: function show() {var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var ref = this.$refs.city;
      if (this.animationType === 'push') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateX(' + (status ? -750 : 750) + 'px)', status, callback);
      } else if (this.animationType === 'model') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateY(' + (status ? -_utils2.default.env.getScreenHeight() : _utils2.default.env.getScreenHeight()) + 'px)', status, callback);
      }
    } } };

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by dianwoda on 2018/1/31.
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  hotCity: [{ cityName: '北京', pinYin: 'beijing', py: 'bj' }, { cityName: '上海', pinYin: 'shanghai', py: 'sh' }, { cityName: '天津', pinYin: 'tianjin', py: 'tj' }, { cityName: '青岛', pinYin: 'qingdao', py: 'qd' }, { cityName: '南京', pinYin: 'nanjing', py: 'nj' }, { cityName: '杭州', pinYin: 'hangzhou', py: 'hz' }, { cityName: '厦门', pinYin: 'xiamen', py: 'xm' }, { cityName: '成都', pinYin: 'chengdu', py: 'cd' }, { cityName: '深圳', pinYin: 'shenzhen', py: 'sz' }, { cityName: '广州', pinYin: 'guangzhou', py: 'gz' }, { cityName: '沈阳', pinYin: 'shenyang', py: 'sy' }, { cityName: '武汉', pinYin: 'wuhan', py: 'wh' }],
  cities: [{ cityName: '北京', pinYin: 'beijing', py: 'bj' }, { cityName: '包头', pinYin: 'baotou', py: 'bt' }, { cityName: '北海', pinYin: 'beihai', py: 'bh' }, { cityName: '宝鸡', pinYin: 'baoji', py: 'bj' }, { cityName: '成都', pinYin: 'chengdu', py: 'cd' }, { cityName: '重庆', pinYin: 'chongqing', py: 'cq' }, { cityName: '长沙', pinYin: 'changsha', py: 'cs' }, { cityName: '长春', pinYin: 'changchun', py: 'cc' }, { cityName: '常州', pinYin: 'changzhou', py: 'cz' }, { cityName: '常德', pinYin: 'changde', py: 'cd' }, { cityName: '沧州', pinYin: 'cangzhou', py: 'cz' }, { cityName: '承德', pinYin: 'chengde', py: 'cd' }, { cityName: '长治', pinYin: 'changzhi', py: 'cz' }, { cityName: '滁州', pinYin: 'chuzhou', py: 'cz' }, { cityName: '大连', pinYin: 'dalian', py: 'dl' }, { cityName: '东莞', pinYin: 'dongguan', py: 'dg' }, { cityName: '大同', pinYin: 'datong', py: 'dt' }, { cityName: '达州', pinYin: 'dazhou', py: 'dz' }, { cityName: '鄂尔多斯', pinYin: 'eerduosi', py: 'eeds' }, { cityName: '恩施', pinYin: 'enshi', py: 'es' }, { cityName: '福州', pinYin: 'fuzhou', py: 'fz' }, { cityName: '佛山', pinYin: 'foshan', py: 'fs' }, { cityName: '抚顺', pinYin: 'fushun', py: 'fs' }, { cityName: '抚州', pinYin: 'fuzhou', py: 'fz' }, { cityName: '防城港', pinYin: 'fangchenggang', py: 'fcg' }, { cityName: '广州', pinYin: 'guangzhou', py: 'gz' }, { cityName: '贵阳', pinYin: 'guiyang', py: 'gy' }, { cityName: '桂林', pinYin: 'guilin', py: 'gl' }, { cityName: '广元', pinYin: 'guangyuan', py: 'gy' }, { cityName: '广安', pinYin: 'guangan', py: 'ga' }, { cityName: '杭州', pinYin: 'hangzhou', py: 'hz' }, { cityName: '哈尔滨', pinYin: 'haerbin', py: 'heb' }, { cityName: '合肥', pinYin: 'hefei', py: 'hf' }, { cityName: '呼和浩特', pinYin: 'huhehaote', py: 'hhht' }, { cityName: '海口', pinYin: 'haikou', py: 'hk' }, { cityName: '黄山', pinYin: 'huangshan', py: 'hs' }, { cityName: '呼伦贝尔', pinYin: 'hulunbeier', py: 'hlbe' }, { cityName: '邯郸', pinYin: 'handan', py: 'hd' }, { cityName: '衡阳', pinYin: 'hengyang', py: 'hy' }, { cityName: '汉中', pinYin: 'hanzhong', py: 'hz' }, { cityName: '济南', pinYin: 'jinan', py: 'jn' }, { cityName: '济宁', pinYin: 'jining', py: 'jn' }, { cityName: '九江', pinYin: 'jiujiang', py: 'jj' }, { cityName: '景德镇', pinYin: 'jingdezhen', py: 'jdz' }, { cityName: '吉林', pinYin: 'jilin', py: 'jl' }, { cityName: '江门', pinYin: 'jiangmen', py: 'jm' }, { cityName: '晋城', pinYin: 'jincheng', py: 'jc' }, { cityName: '嘉峪关', pinYin: 'jiayuguan', py: 'jyg' }, { cityName: '酒泉', pinYin: 'jiuquan', py: 'jq' }, { cityName: '昆明', pinYin: 'kunming', py: 'km' }, { cityName: '克拉玛依', pinYin: 'kelamayi', py: 'klmy' }, { cityName: '兰州', pinYin: 'lanzhou', py: 'lz' }, { cityName: '丽江', pinYin: 'lijiang', py: 'lj' }, { cityName: '洛阳', pinYin: 'luoyang', py: 'ly' }, { cityName: '柳州', pinYin: 'liuzhou', py: 'lz' }, { cityName: '泸州', pinYin: 'luzhou', py: 'lz' }, { cityName: '拉萨', pinYin: 'lasa', py: 'ls' }, { cityName: '临汾', pinYin: 'linfen', py: 'lf' }, { cityName: '乐山', pinYin: 'leshan', py: 'ls' }, { cityName: '聊城', pinYin: 'liaocheng', py: 'lc' }, { cityName: '丽水', pinYin: 'lishui', py: 'ls' }, { cityName: '绵阳', pinYin: 'mianyang', py: 'my' }, { cityName: '梅州', pinYin: 'meizhou', py: 'mz' }, { cityName: '眉山', pinYin: 'meishan', py: 'ms' }, { cityName: '南昌', pinYin: 'nanchang', py: 'nc' }, { cityName: '南京', pinYin: 'nanjing', py: 'nj' }, { cityName: '南宁', pinYin: 'nanning', py: 'nn' }, { cityName: '宁波', pinYin: 'ningbo', py: 'nb' }, { cityName: '南通', pinYin: 'nantong', py: 'nt' }, { cityName: '南充', pinYin: 'nanchong', py: 'nc' }, { cityName: '内江', pinYin: 'neijiang', py: 'nj' }, { cityName: '萍乡', pinYin: 'pingxiang', py: 'px' }, { cityName: '攀枝花', pinYin: 'panzhihua', py: 'pzh' }, { cityName: '青岛', pinYin: 'qingdao', py: 'qd' }, { cityName: '泉州', pinYin: 'quanzhou', py: 'qz' }, { cityName: '上海', pinYin: 'shanghai', py: 'sh' }, { cityName: '深圳', pinYin: 'shenzhen', py: 'sz' }, { cityName: '沈阳', pinYin: 'shenyang', py: 'sy' }, { cityName: '石家庄', pinYin: 'shijiazhuang', py: 'sjz' }, { cityName: '苏州', pinYin: 'suzhou', py: 'sz' }, { cityName: '三亚', pinYin: 'sanya', py: 'sy' }, { cityName: '汕头', pinYin: 'shantou', py: 'st' }, { cityName: '上饶', pinYin: 'shangrao', py: 'sr' }, { cityName: '遂宁', pinYin: 'suining', py: 'sn' }, { cityName: '宿迁', pinYin: 'suqian', py: 'sq' }, { cityName: '天津', pinYin: 'tianjin', py: 'tj' }, { cityName: '太原', pinYin: 'taiyuan', py: 'ty' }, { cityName: '台州', pinYin: 'taizhou', py: 'tz' }, { cityName: '唐山', pinYin: 'tangshan', py: 'ts' }, { cityName: '铁岭', pinYin: 'tieling', py: 'tl' }, { cityName: '武汉', pinYin: 'wuhan', py: 'wh' }, { cityName: '无锡', pinYin: 'wuxi', py: 'wx' }, { cityName: '温州', pinYin: 'wenzhou', py: 'wz' }, { cityName: '乌鲁木齐', pinYin: 'wulumuqi', py: 'wlmq' }, { cityName: '威海', pinYin: 'weihai', py: 'wh' }, { cityName: '渭南', pinYin: 'weinan', py: 'wn' }, { cityName: '西安', pinYin: 'xian', py: 'xa' }, { cityName: '厦门', pinYin: 'xiamen', py: 'xm' }, { cityName: '香港', pinYin: 'xianggang', py: 'xg' }, { cityName: '徐州', pinYin: 'xuzhou', py: 'xz' }, { cityName: '西宁', pinYin: 'xining', py: 'xn' }, { cityName: '襄阳', pinYin: 'xiangyang', py: 'xy' }, { cityName: '新余', pinYin: 'xinyu', py: 'xy' }, { cityName: '许昌', pinYin: 'xuchang', py: 'xc' }, { cityName: '信阳', pinYin: 'xinyang', py: 'xy' }, { cityName: '银川', pinYin: 'yinchuan', py: 'yc' }, { cityName: '宜昌', pinYin: 'yichang', py: 'yc' }, { cityName: '烟台', pinYin: 'yantai', py: 'yt' }, { cityName: '扬州', pinYin: 'yangzhou', py: 'yz' }, { cityName: '宜宾', pinYin: 'yibin', py: 'yb' }, { cityName: '运城', pinYin: 'yuncheng', py: 'yc' }, { cityName: '榆林', pinYin: 'yulin', py: 'yl' }, { cityName: '盐城', pinYin: 'yancheng', py: 'yc' }, { cityName: '岳阳', pinYin: 'yueyang', py: 'yy' }, { cityName: '延安', pinYin: 'yanan', py: 'ya' }, { cityName: '鹰潭', pinYin: 'yingtan', py: 'yt' }, { cityName: '永州', pinYin: 'yongzhou', py: 'yz' }, { cityName: '郑州', pinYin: 'zhengzhou', py: 'zz' }, { cityName: '珠海', pinYin: 'zhuhai', py: 'zh' }, { cityName: '张家界', pinYin: 'zhangjiajie', py: 'zzj' }, { cityName: '中山', pinYin: 'zhongshan', py: 'zs' }, { cityName: '遵义', pinYin: 'zunyi', py: 'zy' }, { cityName: '湛江', pinYin: 'zhanjiang', py: 'zj' }, { cityName: '株洲', pinYin: 'zhuzhou', py: 'zz' }, { cityName: '肇庆', pinYin: 'zhaoqing', py: 'zq' }, { cityName: '枣庄', pinYin: 'zaozhuang', py: 'zz' }, { cityName: '舟山', pinYin: 'zhoushan', py: 'zs' }, { cityName: '自贡', pinYin: 'zigong', py: 'zg' }, { cityName: '资阳', pinYin: 'ziyang', py: 'zy' }, { cityName: '张掖', pinYin: 'zhangye', py: 'zy' }]
});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getCities"] = getCities;
/* harmony export (immutable) */ __webpack_exports__["query"] = query;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


function getCities(list, showDesc = false) {
  if (list && list.length > 0) {
    const result = list.map(v => {
      const o = Object.assign({}, v);

      if (o.suggestName) {
        o.name = o.suggestName;
      }

      if (o.stationName && !o.name) {
        o.name = o.stationName;
      }

      if (o.cityName && !o.name) {
        o.name = o.cityName;
      }

      if (o.code && showDesc) {
        o.desc = o.code;
      }
      return o;
    });
    return result;
  } else {
    return [];
  }
}

function query(source, text) {
  let res = [];
  res = source.filter(item => {
    const arr = [];
    let isHave = false;
    Object.keys(item).forEach(prop => {
      const itemStr = item[prop];
      __WEBPACK_IMPORTED_MODULE_0__utils__["default"].isString(itemStr) && itemStr.split(',').forEach(val => {
        arr.push(val);
      });
    });
    arr.some(val => {
      isHave = new RegExp('^' + text).test(val);
      return isHave;
    });
    return isHave;
  });
  return res;
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(71)
)

/* script */
__vue_exports__ = __webpack_require__(72)

/* template */
var __vue_template__ = __webpack_require__(73)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-43aaa59d"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = {
  "tab-box": {
    "width": "750",
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "tab-item": {
    "flex": 1,
    "height": "90",
    "backgroundColor": "#ffffff",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "tab-item-text": {
    "textAlign": "center",
    "color": "#000000",
    "fontSize": "28"
  },
  "text-selected": {
    "fontWeight": "bold"
  },
  "tab-item-selected-bar": {
    "width": "750",
    "backgroundColor": "#f2f3f4"
  },
  "tab-item-selected-bar-in": {
    "width": "375",
    "justifyContent": "center",
    "alignItems": "center",
    "flexDirection": "row",
    "height": "6"
  },
  "tab-item-active": {
    "backgroundColor": "#ffb200",
    "width": "92",
    "height": "6"
  }
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default =
{
  props: {},
  data: function data() {return {
      checkedIndex: 0 };},

  methods: {
    switchTab: function switchTab(index) {
      var animation = weex.requireModule('animation');
      this.checkedIndex = index;
      this.$emit('wxcTabSwitch', {
        index: index });

      animation.transition(this.$refs['tab-bar'], {
        styles: {
          transform: 'translateX(' + index * 375 + 'px)' },

        duration: 150, // ms
        timingFunction: 'ease',
        delay: 0 // ms
      }, function () {
      });
    } } };

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: ["tab-box"]
  }, _vm._l((['国内', '国际']), function(name, i) {
    return _c('div', {
      key: i,
      staticClass: ["tab-item"],
      on: {
        "click": function($event) {
          _vm.switchTab(i)
        }
      }
    }, [_c('text', {
      staticClass: ["['tab-item-text',", "i===checkedIndex", "&&", "'text-selected']"]
    }, [_vm._v(_vm._s(name))])])
  })), _c('div', {
    staticClass: ["tab-item-selected-bar"]
  }, [_c('div', {
    ref: "tab-bar",
    staticClass: ["tab-item-selected-bar-in"]
  }, [_c('div', {
    staticClass: ["tab-item-active"]
  })])])])
},staticRenderFns: []}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(75)
)

/* script */
__vue_exports__ = __webpack_require__(76)

/* template */
var __vue_template__ = __webpack_require__(78)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3445ceb8"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-search-bar": {
    "paddingLeft": "20",
    "paddingRight": "20",
    "backgroundColor": "#ffffff",
    "width": "750",
    "height": "84",
    "flexDirection": "row"
  },
  "wxc-search-bar-yellow": {
    "backgroundColor": "#ffc900"
  },
  "search-bar-input": {
    "position": "absolute",
    "top": "10",
    "paddingTop": 0,
    "paddingBottom": 0,
    "paddingRight": "40",
    "paddingLeft": "60",
    "fontSize": "26",
    "width": "624",
    "height": "64",
    "lineHeight": "64",
    "backgroundColor": "#E5E5E5",
    "borderRadius": "6"
  },
  "search-bar-input-yellow": {
    "backgroundColor": "#fff6d6"
  },
  "search-bar-icon": {
    "position": "absolute",
    "width": "30",
    "height": "30",
    "left": "34",
    "top": "28"
  },
  "search-bar-close": {
    "position": "absolute",
    "width": "30",
    "height": "30",
    "right": "120",
    "top": "28"
  },
  "search-bar-button": {
    "width": "94",
    "height": "36",
    "fontSize": "30",
    "textAlign": "center",
    "backgroundColor": "#ffffff",
    "marginTop": "16",
    "marginRight": 0,
    "color": "#333333",
    "position": "absolute",
    "right": "8",
    "top": "9"
  },
  "search-bar-button-yellow": {
    "backgroundColor": "#FFC900"
  },
  "input-has-dep": {
    "paddingLeft": "240",
    "width": "710"
  },
  "bar-dep": {
    "width": "170",
    "paddingRight": "12",
    "paddingLeft": "12",
    "height": "42",
    "alignItems": "center",
    "flexDirection": "row",
    "position": "absolute",
    "left": "24",
    "top": "22",
    "borderRightStyle": "solid",
    "borderRightWidth": "1",
    "borderRightColor": "#C7C7C7"
  },
  "bar-dep-yellow": {
    "borderRightColor": "#C7C7C7"
  },
  "dep-text": {
    "flex": 1,
    "textAlign": "center",
    "fontSize": "26",
    "color": "#666666",
    "marginRight": "6",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "dep-arrow": {
    "width": "24",
    "height": "24"
  },
  "icon-has-dep": {
    "left": "214"
  },
  "disabled-input": {
    "width": "750",
    "height": "64",
    "position": "absolute",
    "left": 0,
    "backgroundColor": "rgba(0,0,0,0)"
  },
  "has-dep-disabled": {
    "width": "550",
    "left": "200"
  }
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

































































































































































































var _type = __webpack_require__(77);exports.default =

{
  props: {
    disabled: {
      type: Boolean,
      default: false },

    alwaysShowCancel: {
      type: Boolean,
      default: false },

    inputType: {
      type: String,
      default: 'text' },

    returnKeyType: {
      type: String,
      default: 'default' },

    mod: {
      type: String,
      default: 'default' },

    autofocus: {
      type: Boolean,
      default: false },

    theme: {
      type: String,
      default: 'gray' },

    barStyle: {
      type: Object,
      default: function _default() {return {};} },

    defaultValue: {
      type: String,
      default: '' },

    placeholder: {
      type: String,
      default: '搜索' },

    cancelLabel: {
      type: String,
      default: '取消 ' },

    depName: {
      type: String,
      default: '杭州' } },


  computed: {
    needShowCancel: function needShowCancel() {
      return this.alwaysShowCancel || this.showCancel;
    },
    buttonStyle: function buttonStyle() {var
      barStyle = this.barStyle;
      if (barStyle.backgroundColor) {
        return { backgroundColor: barStyle.backgroundColor };
      }
      return {};
    } },

  data: function data() {return {
      inputIcon: _type.INPUT_ICON,
      closeIcon: _type.CLOSE_ICON,
      arrowIcon: _type.ARROW_ICON,
      showCancel: false,
      showClose: false,
      value: '' };},


  created: function created() {
    this.defaultValue && (this.value = this.defaultValue);
    if (this.disabled) {
      this.showCancel = false;
      this.showClose = false;
    }
  },
  methods: {
    onBlur: function onBlur() {
      var self = this;
      setTimeout(function () {
        self.showCancel = false;
        self.detectShowClose();
        self.$emit('wxcSearchbarInputOnBlur', { value: self.value });
      }, 10);
    },
    autoBlur: function autoBlur() {
      this.$refs['search-input'].blur();
    },
    onFocus: function onFocus() {
      if (this.isDisabled) {
        return;
      }
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('wxcSearchbarInputOnFocus', { value: this.value });
    },
    closeClicked: function closeClicked() {
      this.value = '';
      this.showCancel && (this.showCancel = false);
      this.showClose && (this.showClose = false);
      this.$emit('wxcSearchbarCloseClicked', { value: this.value });
      this.$emit('wxcSearchbarInputOnInput', { value: this.value });
    },
    onInput: function onInput(e) {
      this.value = e.value;
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('wxcSearchbarInputOnInput', { value: this.value });
    },
    onSubmit: function onSubmit(e) {
      this.onBlur();
      this.value = e.value;
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('wxcSearchbarInputReturned', { value: this.value });
    },
    cancelClicked: function cancelClicked() {
      this.showCancel && (this.showCancel = false);
      this.showClose && (this.showClose = false);
      this.$emit('wxcSearchbarCancelClicked', { value: this.value });
    },
    detectShowClose: function detectShowClose() {
      this.showClose = this.value.length > 0 && this.showCancel;
    },
    depClicked: function depClicked() {
      this.$emit('wxcSearchbarDepChooseClicked', {});
    },
    inputDisabledClicked: function inputDisabledClicked() {
      this.$emit('wxcSearchbarInputDisabledClicked', {});
    },
    setValue: function setValue(value) {
      this.value = value;
    } } }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2016/10/31.
 */

const INPUT_ICON = "https://gw.alicdn.com/tfs/TB1FZB.pwMPMeJjy1XdXXasrXXa-30-30.png";
/* harmony export (immutable) */ __webpack_exports__["INPUT_ICON"] = INPUT_ICON;

const CLOSE_ICON = "https://gw.alicdn.com/tfs/TB1sZB.pwMPMeJjy1XdXXasrXXa-24-24.png";
/* harmony export (immutable) */ __webpack_exports__["CLOSE_ICON"] = CLOSE_ICON;

const ARROW_ICON = "https://gw.alicdn.com/tfs/TB1vZB.pwMPMeJjy1XdXXasrXXa-24-24.png";
/* harmony export (immutable) */ __webpack_exports__["ARROW_ICON"] = ARROW_ICON;


/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.mod === 'default') ? _c('div', {
    class: ['wxc-search-bar', 'wxc-search-bar-' + _vm.theme],
    style: _vm.barStyle
  }, [_c('input', {
    ref: "search-input",
    class: ['search-bar-input', 'search-bar-input-' + _vm.theme],
    style: {
      width: _vm.needShowCancel ? '624px' : '710px'
    },
    attrs: {
      "returnKeyType": _vm.returnKeyType,
      "autofocus": _vm.autofocus,
      "disabled": _vm.disabled,
      "value": _vm.value,
      "type": _vm.inputType,
      "placeholder": _vm.placeholder
    },
    on: {
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "input": _vm.onInput,
      "return": _vm.onSubmit
    }
  }), (_vm.disabled) ? _c('div', {
    staticClass: ["disabled-input"],
    on: {
      "click": _vm.inputDisabledClicked
    }
  }) : _vm._e(), _c('image', {
    staticClass: ["search-bar-icon"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.inputIcon
    }
  }), (_vm.showClose) ? _c('image', {
    staticClass: ["search-bar-close"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.closeIcon
    },
    on: {
      "click": _vm.closeClicked
    }
  }) : _vm._e(), (_vm.needShowCancel) ? _c('text', {
    class: ['search-bar-button', 'search-bar-button-' + _vm.theme],
    style: _vm.buttonStyle,
    on: {
      "click": _vm.cancelClicked
    }
  }, [_vm._v(_vm._s(_vm.cancelLabel))]) : _vm._e()]) : _vm._e(), (_vm.mod === 'hasDep') ? _c('div', {
    class: ['wxc-search-bar', 'wxc-search-bar-' + _vm.theme],
    style: _vm.barStyle
  }, [_c('input', {
    class: ['search-bar-input', 'input-has-dep', 'search-bar-input-' + _vm.theme],
    attrs: {
      "disabled": _vm.disabled,
      "autofocus": _vm.autofocus,
      "returnKeyType": _vm.returnKeyType,
      "value": _vm.value,
      "type": _vm.inputType,
      "placeholder": _vm.placeholder
    },
    on: {
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "input": _vm.onInput,
      "return": _vm.onSubmit
    }
  }), (_vm.disabled) ? _c('div', {
    staticClass: ["disabled-input", "has-dep-disabled"],
    on: {
      "click": _vm.inputDisabledClicked
    }
  }) : _vm._e(), _c('div', {
    class: ['bar-dep', '.bar-dep-' + _vm.theme],
    on: {
      "click": _vm.depClicked
    }
  }, [_c('text', {
    staticClass: ["dep-text"]
  }, [_vm._v(_vm._s(_vm.depName))]), _c('image', {
    staticClass: ["dep-arrow"],
    attrs: {
      "src": _vm.arrowIcon,
      "ariaHidden": true
    }
  })]), _c('image', {
    staticClass: ["search-bar-icon", "icon-has-dep"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.inputIcon
    }
  })]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(80)
)

/* script */
__vue_exports__ = __webpack_require__(81)

/* template */
var __vue_template__ = __webpack_require__(83)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-cbb9bf68"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = {
  "wrap": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "wxc-result": {
    "width": "750",
    "flex": 1,
    "alignItems": "center",
    "backgroundColor": "#f2f3f4"
  },
  "result-image": {
    "width": "320",
    "height": "320"
  },
  "result-content": {
    "marginTop": "36",
    "alignItems": "center"
  },
  "content-text": {
    "fontSize": "30",
    "color": "#A5A5A5",
    "height": "42",
    "lineHeight": "42",
    "textAlign": "center"
  },
  "content-desc": {
    "marginTop": "10"
  },
  "result-button": {
    "marginTop": "60",
    "borderWidth": "1",
    "borderColor": "#979797",
    "backgroundColor": "#FFFFFF",
    "borderRadius": "6",
    "width": "240",
    "height": "72",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "button-text": {
    "color": "#666666",
    "fontSize": "30"
  }
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


















































































var _type = __webpack_require__(82);var _type2 = _interopRequireDefault(_type);
var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default = { props: { type: { type: String, default: 'errorPage' }, show: { type: Boolean, default: true }, wrapStyle: Object, paddingTop: { type: [Number, String], default: 232 }, customSet: { type: Object, default: function _default() {return {};} } }, computed: { resultType: function resultType() {var type = this.type,customSet = this.customSet;var allTypes = _utils2.default.isEmptyObject(customSet) ? _type2.default : _utils2.default.mergeDeep(_type2.default, customSet);var types = allTypes['errorPage'];if (Object.keys(allTypes).indexOf(type) > -1) {types = allTypes[type];}return types;}, setPaddingTop: function setPaddingTop() {var paddingTop = this.paddingTop;return paddingTop + 'px';} }, methods: { handleTouchEnd: function handleTouchEnd(e) {// web上面有点击穿透问题
      var platform = weex.config.env.platform;platform === 'Web' && e.preventDefault && e.preventDefault();}, onClick: function onClick() {var type = this.type;this.$emit('wxcResultButtonClicked', { type: type });} } };

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2016/11/4.
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  errorPage: {
    pic: 'https://img.alicdn.com/tfs/TB17blphfDH8KJjy1XcXXcpdXXa-320-320.png',
    content: '抱歉出错了，我们正在全力解决中',
    button: '再试一次',
    title: '出错啦'
  },
  noGoods: {
    pic: 'https://img.alicdn.com/tfs/TB1mPWEeOqAXuNjy1XdXXaYcVXa-320-320.png',
    content: '主人，这里什么都没有找到',
    button: '再试一次',
    title: '暂无商品'
  },
  noNetwork: {
    pic: 'https://img.alicdn.com/tfs/TB1jkA5g9_I8KJjy0FoXXaFnVXa-320-320.png',
    content: '哎呀，没有网络了......',
    button: '刷新一下',
    title: '无网络'
  },
  errorLocation: {
    pic: 'https://img.alicdn.com/tfs/TB1zXXahhrI8KJjy0FpXXb5hVXa-320-320.png',
    content: '哎呀，定位失败了......',
    button: '刷新一下',
    title: '定位失败'
  }
});

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: ["wrap"],
    style: _vm.wrapStyle
  }, [_c('div', {
    staticClass: ["wxc-result"],
    style: {
      paddingTop: _vm.setPaddingTop
    }
  }, [_c('image', {
    staticClass: ["result-image"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.resultType.pic
    }
  }), (_vm.resultType.content) ? _c('div', {
    staticClass: ["result-content"]
  }, [_c('text', {
    staticClass: ["content-text"]
  }, [_vm._v(_vm._s(_vm.resultType.content))]), (_vm.resultType.desc) ? _c('text', {
    staticClass: ["content-text", "content-desc"]
  }, [_vm._v(_vm._s(_vm.resultType.desc))]) : _vm._e()]) : _vm._e(), (_vm.resultType.button) ? _c('div', {
    staticClass: ["result-button"],
    on: {
      "touchend": _vm.handleTouchEnd,
      "click": _vm.onClick
    }
  }, [_c('text', {
    staticClass: ["button-text"]
  }, [_vm._v(_vm._s(_vm.resultType.button))])]) : _vm._e()])]) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(85)
)

/* script */
__vue_exports__ = __webpack_require__(86)

/* template */
var __vue_template__ = __webpack_require__(88)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-9ab15106"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = {
  "index-list": {
    "width": "750",
    "height": "1334"
  },
  "index-list-title": {
    "borderBottomWidth": "1",
    "borderBottomColor": "rgba(32,35,37,0.15)",
    "backgroundColor": "#FBFBFB",
    "fontSize": "24",
    "color": "#666666",
    "height": "48",
    "lineHeight": "48",
    "paddingLeft": "24",
    "width": "750"
  },
  "group-title": {
    "borderBottomWidth": 0,
    "paddingBottom": 0,
    "height": "60",
    "paddingTop": "24"
  },
  "index-list-item": {
    "width": "750",
    "flexDirection": "row",
    "alignItems": "center",
    "borderBottomWidth": "1",
    "borderBottomColor": "#e0e0e0",
    "height": "92",
    "paddingLeft": "24",
    "paddingRight": "24",
    "backgroundColor": "#FFFFFF"
  },
  "iphone-x": {
    "height": "68"
  },
  "title": {
    "fontSize": "32",
    "color": "#3D3D3D"
  },
  "desc": {
    "fontSize": "24",
    "color": "#A5A5A5",
    "marginLeft": "30"
  },
  "index-list-nav": {
    "position": "absolute",
    "top": 0,
    "right": 0,
    "marginBottom": "60",
    "marginTop": "60",
    "paddingBottom": "20",
    "paddingTop": "20",
    "width": "70"
  },
  "list-nav-key": {
    "textAlign": "center",
    "fontSize": "24",
    "height": "40",
    "color": "#666666"
  },
  "index-list-pop": {
    "position": "fixed",
    "top": "550",
    "left": "316",
    "width": "120",
    "height": "120",
    "textAlign": "center",
    "justifyContent": "center",
    "backgroundColor": "rgba(32,35,37,0.6)",
    "borderBottomLeftRadius": "60",
    "borderBottomRightRadius": "60",
    "borderTopLeftRadius": "60",
    "borderTopRightRadius": "60",
    "paddingLeft": 0,
    "paddingRight": 0,
    "paddingTop": "35",
    "paddingBottom": "35",
    "color": "#ffffff"
  },
  "list-pop-text": {
    "fontSize": "40",
    "textAlign": "center",
    "color": "#ffffff"
  },
  "group": {
    "paddingBottom": "18",
    "paddingRight": "70",
    "backgroundColor": "#FBFBFB"
  },
  "group-list": {
    "flexDirection": "row",
    "marginLeft": "18",
    "marginTop": "18"
  },
  "group-item": {
    "width": "146",
    "height": "64",
    "borderWidth": "1",
    "borderColor": "#e0e0e0",
    "marginRight": "18",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#ffffff"
  },
  "item-name": {
    "fontSize": "24",
    "lineHeight": "26",
    "color": "#333333"
  },
  "item-desc": {
    "marginTop": "2",
    "color": "#999999",
    "fontSize": "20",
    "textAlign": "center"
  },
  "location-icon": {
    "width": "32",
    "height": "32",
    "marginRight": "8"
  }
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });













































































var _format = __webpack_require__(87);var Format = _interopRequireWildcard(_format);
var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var dom = weex.requireModule('dom');exports.default = { props: { height: { type: [Number, String], default: _utils2.default.env.getPageHeight() }, normalList: { type: Array, default: function _default() {return [];} }, onlyShowList: { type: Boolean, default: false }, showIndex: { type: Boolean, default: true }, needAnimation: { type: Boolean, default: true }, hotListConfig: { type: Object, default: function _default() {return {};} }, // 城市选择子组件 特殊情况支持
    cityLocationConfig: { type: Object, default: function _default() {return {};} }, headerStyle: { type: Object, default: function _default() {return {};} }, navStyle: { type: Object, default: function _default() {return {};} }, navTextStyle: { type: Object, default: function _default() {return {};} }, popStyle: { type: Object, default: function _default() {return {};} }, popTextStyle: { type: Object, default: function _default() {return {};} }, itemStyle: { type: Object, default: function _default() {return {};} }, itemTextStyle: { type: Object, default: function _default() {return {};} }, itemDescStyle: { type: Object, default: function _default() {return {};} }, groupWrapStyle: { type: Object, default: function _default() {return {};} }, groupItemStyle: { type: Object, default: function _default() {return {};} }, groupItemTextStyle: { type: Object, default: function _default() {return {};} }, groupItemDescStyle: {
      type: Object,
      default: function _default() {return {};} } },


  created: function created() {
    this.isIPhoneX = _utils2.default.env.isIPhoneX();
  },
  computed: {
    formatList: function formatList() {var
      normalList = this.normalList,hotListConfig = this.hotListConfig,cityLocationConfig = this.cityLocationConfig;
      return Format.totalList(normalList, hotListConfig, cityLocationConfig);
    } },

  data: function data() {return {
      popKeyShow: false,
      popKey: '',
      navOffsetY: 0,
      timer: null };},

  methods: {
    itemClicked: function itemClicked(item) {
      this.$emit('wxcIndexlistItemClicked', {
        item: item });

    },
    go2Key: function go2Key(key) {var _this = this;
      var keyEl = this.$refs['index-item-title-' + key][0];
      keyEl && dom.scrollToElement(keyEl, {
        offset: 0,
        animated: this.needAnimation });

      this.popKey = key;
      this.popKeyShow = true;
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.popKeyShow = false;
      }, 600);
    } } };

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["totalList"] = totalList;
/* harmony export (immutable) */ __webpack_exports__["getSpecialData"] = getSpecialData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 17/11/01
 */



/**
 * 根据26个字母取每一项首字母对数据进行排序,处理数据变换
 * @return {[array]}
 */
function totalList(source, hotListConfig, cityLocationConfig) {
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const res = [];
  LETTERS.split('').forEach(letter => {
    const _data = source.filter(item => {
      if (item.pinYin) {
        return item.pinYin.slice(0, 1).toLowerCase() === letter.toLowerCase();
      } else if (item.py) {
        return item.py.slice(0, 1).toLowerCase() === letter.toLowerCase();
      } else {
        return false;
      }
    });
    if (_data.length) {
      res.push({
        title: letter,
        data: _data,
        type: 'list'
      });
    }
  });

  // 处理热门数据
  const hotList = getSpecialData(hotListConfig);
  hotList && res.unshift(hotList);

  // 处理特殊定位数据
  const cityLocation = getSpecialData(cityLocationConfig);
  cityLocation && res.unshift(cityLocation);

  return res;
}

function getSpecialData(data) {
  if (data && data.type && data.list && data.list.length > 0) {
    const { type, title, list } = data;
    return {
      title,
      type,
      data: type === 'group' ? __WEBPACK_IMPORTED_MODULE_0__utils__["default"].arrayChunk(list) : list
    };
  } else {
    return null;
  }
}

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('list', {
    staticClass: ["index-list"],
    style: {
      height: _vm.height + 'px'
    }
  }, [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_vm._t("head")], 2), _vm._l((_vm.formatList), function(v, i) {
    return _c('cell', {
      key: i,
      ref: 'index-item-title-' + v.title,
      refInFor: true,
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [(!_vm.onlyShowList) ? _c('text', {
      class: ['index-list-title', v.type && v.type == 'group' && 'group-title'],
      style: _vm.headerStyle
    }, [_vm._v(_vm._s(v.title))]) : _vm._e(), (v.type && v.type === 'group' && !_vm.onlyShowList) ? _c('div', {
      staticClass: ["group"],
      style: _vm.groupWrapStyle
    }, _vm._l((v.data), function(group, index) {
      return _c('div', {
        key: index,
        staticClass: ["group-list"]
      }, _vm._l((group), function(item, i) {
        return _c('div', {
          key: i,
          staticClass: ["group-item"],
          style: _vm.groupItemStyle,
          attrs: {
            "accessible": true,
            "ariaLabel": ((item.name) + "," + (item.desc?item.desc:''))
          },
          on: {
            "click": function($event) {
              _vm.itemClicked(item)
            }
          }
        }, [(item.isLocation) ? _c('image', {
          staticClass: ["location-icon"],
          attrs: {
            "src": "https://gw.alicdn.com/tfs/TB1JUiUPFXXXXXUXXXXXXXXXXXX-32-32.png"
          }
        }) : _vm._e(), _c('div', [_c('text', {
          staticClass: ["item-name"],
          style: _vm.groupItemTextStyle
        }, [_vm._v(_vm._s(item.name))]), (item.desc) ? _c('text', {
          staticClass: ["item-desc"],
          style: _vm.groupItemDescStyle
        }, [_vm._v(_vm._s(item.desc))]) : _vm._e()])])
      }))
    })) : _vm._e(), (v.type === 'list') ? _c('div', _vm._l((v.data), function(item, index) {
      return _c('div', {
        key: index,
        staticClass: ["index-list-item"],
        style: _vm.itemStyle,
        attrs: {
          "accessible": true,
          "ariaLabel": ((item.name) + "," + (item.desc?item.desc:''))
        },
        on: {
          "click": function($event) {
            _vm.itemClicked(item)
          }
        }
      }, [_c('text', {
        staticClass: ["title"],
        style: _vm.itemTextStyle
      }, [_vm._v(_vm._s(item.name))]), _c('text', {
        staticClass: ["desc"],
        style: _vm.itemDescStyle
      }, [_vm._v(_vm._s(item.desc))])])
    })) : _vm._e()])
  }), (_vm.isIPhoneX) ? _c('cell', {
    staticClass: ["iphone-x"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }) : _vm._e()], 2), (_vm.showIndex && !_vm.onlyShowList) ? _c('div', {
    staticClass: ["index-list-nav"],
    style: _vm.navStyle
  }, _vm._l((_vm.formatList), function(item, index) {
    return _c('text', {
      key: index,
      staticClass: ["list-nav-key"],
      style: _vm.navTextStyle,
      attrs: {
        "title": item.title
      },
      on: {
        "click": function($event) {
          _vm.go2Key(item.title)
        }
      }
    }, [_vm._v(_vm._s(item.title))])
  })) : _vm._e(), (_vm.popKeyShow) ? _c('div', {
    staticClass: ["index-list-pop"],
    style: _vm.popStyle
  }, [_c('text', {
    staticClass: ["list-pop-text"],
    style: _vm.popTextStyle
  }, [_vm._v(_vm._s(_vm.popKey))])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "city",
    staticClass: ["wxc-city"],
    style: _vm.cityExtendStyle
  }, [_c('wxc-searchbar', _vm._b({
    ref: "wxc-searchbar",
    on: {
      "wxcSearchbarInputOnInput": _vm.onInput,
      "wxcSearchbarInputReturned": _vm.onSubmit,
      "wxcSearchbarCancelClicked": _vm.onCancel
    }
  }, 'wxc-searchbar', _vm.mergeInputConfig, false)), (_vm.showTab) ? _c('wxc-tab', {
    ref: "wxc-tab",
    on: {
      "wxcTabSwitch": _vm.onTabSwitch
    }
  }) : _vm._e(), _c('wxc-indexlist', {
    attrs: {
      "normalList": _vm.normalList,
      "hotListConfig": _vm.hotListConfig,
      "navStyle": {
        top: '24px'
      },
      "height": _vm.listHeight,
      "showIndex": _vm.showIndex,
      "onlyShowList": !_vm.showNavHeader || _vm.onlyShowList,
      "cityLocationConfig": _vm.currentCityLocationConfig
    },
    on: {
      "wxcIndexlistItemClicked": _vm.onItemClick
    }
  }), (_vm.showError) ? _c('wxc-result', {
    attrs: {
      "type": "noGoods",
      "wrapStyle": {
        top: '84px'
      },
      "show": true,
      "customSet": _vm.result
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(92)
)

/* script */
__vue_exports__ = __webpack_require__(93)

/* template */
var __vue_template__ = __webpack_require__(94)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-9e77e004"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = {
  "time-dot-wrap": {
    "flexDirection": "row",
    "alignItems": "center"
  }
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default =
{
  props: {
    // 时间戳
    time: {
      type: Number,
      default: 1501200000000 },

    // 倒计时的间隔,单位为"毫秒"
    interval: {
      type: Number,
      default: 1000 },

    tpl: {
      type: String,
      default: '{h}:{m}:{s}' },

    // 最外层包裹 style
    timeWrapStyle: Object,
    // 数字盒子 style
    timeBoxStyle: Object,
    // : 盒子Style
    dotBoxStyle: Object,
    // 数字文字 Style
    timeTextStyle: Object,
    // : 文字Style
    dotTextStyle: Object },

  data: function data() {return {
      NOW_DATE: new Date().getTime(),
      completed: false,
      tplIndexOfDays: -1,
      tplIndexOfHours: -1,
      tplIndexOfMinutes: -1,
      tplIndexOfSeconds: -1,
      TIME_WRAP_STYLE: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '12px',
        marginRight: '12px' },

      TIME_BOX_STYLE: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        height: '30px',
        width: '30px' },

      DOT_BOX_STYLE: {
        width: '18px',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center' },

      TIME_TEXT_STYLE: {
        color: '#FFCC80',
        fontSize: '18px' },

      DOT_TEXT_STYLE: {
        color: '#333333',
        fontSize: '18px',
        fontWeight: 'bold' } };},


  mounted: function mounted() {var _this = this;
    setInterval(function () {
      _this.NOW_DATE = new Date().getTime();
    }, this.interval);

    this.tplIndexOfDays = this.tpl.indexOf('d');
    this.tplIndexOfHours = this.tpl.indexOf('h');
    this.tplIndexOfMinutes = this.tpl.indexOf('m');
    this.tplIndexOfSeconds = this.tpl.indexOf('s');
  },
  computed: {
    mrTimeWrapStyle: function mrTimeWrapStyle() {
      return _extends({},
      this.TIME_WRAP_STYLE,
      this.timeWrapStyle);

    },
    mrTimeBoxStyle: function mrTimeBoxStyle() {
      return _extends({},
      this.TIME_BOX_STYLE,
      this.timeBoxStyle);

    },
    mrDotBoxStyle: function mrDotBoxStyle() {
      return _extends({},
      this.DOT_BOX_STYLE,
      this.dotBoxStyle);

    },
    mrTimeTextStyle: function mrTimeTextStyle() {
      return _extends({},
      this.TIME_TEXT_STYLE,
      this.timeTextStyle);

    },
    mrDotTextStyle: function mrDotTextStyle() {
      return _extends({},
      this.DOT_TEXT_STYLE,
      this.dotTextStyle);

    },

    countDownData: function countDownData() {
      var timeSpacing = this.time - this.NOW_DATE;

      // 倒计时结束了
      if (timeSpacing < 0) {
        if (this.completed === false) {
          this.$emit('wxcOnComplete');
        }
        this.completed = true;
        return {
          day: '00',
          hour: '00',
          minute: '00',
          second: '00' };

      }

      var day = 0;
      var hour = 0;
      var minute = 0;
      var second = 0;

      if (this.tplIndexOfDays !== -1) {
        day = Math.floor(timeSpacing / (24 * 60 * 60 * 1000));
        hour = Math.floor(timeSpacing % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      } else {
        day = 0;
        hour = Math.floor(timeSpacing / (60 * 60 * 1000));
      }

      if (this.tplIndexOfHours !== -1) {
        hour = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
      } else {
        hour = 0;
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 1000));
      }

      if (this.tplIndexOfMinutes !== -1) {
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000));
        second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) % (60 * 1000) / 1000);
      } else {
        minute = 0;
        second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000);
      }

      return {
        day: day < 10 ? '0' + day : '' + day,
        hour: hour < 10 ? '0' + hour : '' + hour,
        minute: minute < 10 ? '0' + minute : '' + minute,
        second: second < 10 ? '0' + second : '' + second };

    } },


  methods: {
    getDot: function getDot(prevTagIndex) {var nextTagIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      if (nextTagIndex === -1) {
        return this.tpl.slice(prevTagIndex + 2);
      }
      return this.tpl.slice(prevTagIndex + 2, nextTagIndex - 1);
    } } };

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    style: _vm.mrTimeWrapStyle
  }, [_c('div', {
    staticClass: ["time-dot-wrap"]
  }, [(_vm.tplIndexOfDays !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.day) + "天")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.day))])]) : _vm._e(), (_vm.tplIndexOfDays !== -1) ? _c('div', {
    style: _vm.mrDotBoxStyle,
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfDays, _vm.tplIndexOfHours)))])]) : _vm._e(), (_vm.tplIndexOfHours !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.hour) + "时")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.hour))])]) : _vm._e(), (_vm.tplIndexOfHours !== -1) ? _c('div', {
    style: _vm.mrDotBoxStyle,
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfHours, _vm.tplIndexOfMinutes)))])]) : _vm._e(), (_vm.tplIndexOfMinutes !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.minute) + "分")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.minute))])]) : _vm._e(), (_vm.tplIndexOfMinutes !== -1) ? _c('div', {
    style: _vm.mrDotBoxStyle,
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfMinutes, _vm.tplIndexOfSeconds)))])]) : _vm._e(), (_vm.tplIndexOfSeconds !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.second) + "秒")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.second))])]) : _vm._e(), (_vm.tplIndexOfSeconds !== -1) ? _c('div', {
    style: _vm.mrDotBoxStyle,
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfSeconds, -1)))])]) : _vm._e()])])
},staticRenderFns: []}

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(97)
)

/* script */
__vue_exports__ = __webpack_require__(98)

/* template */
var __vue_template__ = __webpack_require__(104)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2249c892"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = {
  "container": {
    "position": "fixed",
    "width": "750",
    "zIndex": 99999
  },
  "dialog-box": {
    "position": "fixed",
    "left": "96",
    "width": "558",
    "backgroundColor": "#FFFFFF"
  },
  "dialog-content": {
    "paddingTop": "36",
    "paddingBottom": "36",
    "paddingLeft": "36",
    "paddingRight": "36"
  },
  "content-title": {
    "color": "#333333",
    "fontSize": "36",
    "textAlign": "center",
    "marginBottom": "24"
  },
  "content-subtext": {
    "color": "#666666",
    "fontSize": "26",
    "lineHeight": "36",
    "textAlign": "center"
  },
  "dialog-footer": {
    "flexDirection": "row",
    "alignItems": "center",
    "borderTopColor": "#F3F3F3",
    "borderTopWidth": "1"
  },
  "footer-btn": {
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "flex": 1,
    "height": "90"
  },
  "cancel": {
    "borderRightColor": "#F3F3F3",
    "borderRightWidth": "1"
  },
  "btn-text": {
    "fontSize": "36",
    "color": "#666666"
  },
  "no-prompt": {
    "width": "486",
    "alignItems": "center",
    "justifyContent": "center",
    "flexDirection": "row",
    "marginTop": "24"
  },
  "no-prompt-icon": {
    "width": "24",
    "height": "24",
    "marginRight": "12"
  },
  "no-prompt-text": {
    "fontSize": "24",
    "color": "#A5A5A5"
  }
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });





















































































































var _wxcOverlay = __webpack_require__(6);var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);
var _type = __webpack_require__(103);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default = { components: { WxcOverlay: _wxcOverlay2.default }, props: { show: { type: Boolean, default: false }, single: { type: Boolean, default: false }, title: { type: String, default: '' }, content: { type: String, default: '' }, top: { type: Number, default: 400 }, cancelText: { type: String, default: '取消' }, confirmText: { type: String, default: '确定' }, mainBtnColor: { type: String, default: '#EE9900' }, secondBtnColor: { type: String, default: '#666666' }, showNoPrompt: { type: Boolean, default: false }, noPromptText: { type: String, default: '不再提示' }, isChecked: { type: Boolean, default: false } }, data: function data() {return { noPromptIcon: _type.UN_CHECKED, pageHeight: 1334 };}, created: function created() {var _weex$config$env = weex.config.env,deviceHeight = _weex$config$env.deviceHeight,deviceWidth = _weex$config$env.deviceWidth;this.pageHeight = deviceHeight / deviceWidth * 750;}, methods: { secondaryClicked: function secondaryClicked() {this.$emit('wxcDialogCancelBtnClicked', { type: 'cancel' });}, primaryClicked: function primaryClicked(e) {this.$emit('wxcDialogConfirmBtnClicked', { type: 'confirm' });}, noPromptClicked: function noPromptClicked(e) {var isChecked = !this.isChecked;this.noPromptIcon = isChecked ? _type.CHECKED : _type.UN_CHECKED;this.$emit('wxcDialogNoPromptClicked', { isChecked: isChecked });} } };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(100)
)

/* script */
__vue_exports__ = __webpack_require__(101)

/* template */
var __vue_template__ = __webpack_require__(102)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-412511c6"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-overlay": {
    "width": "750",
    "position": "fixed",
    "left": 0,
    "top": 0,
    "bottom": 0,
    "right": 0
  }
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');exports.default =
{
  props: {
    show: {
      type: Boolean,
      default: true },

    hasAnimation: {
      type: Boolean,
      default: true },

    duration: {
      type: [Number, String],
      default: 300 },

    timingFunction: {
      type: Array,
      default: function _default() {return ['ease-in', 'ease-out'];} },

    opacity: {
      type: [Number, String],
      default: 0.6 },

    canAutoClose: {
      type: Boolean,
      default: true } },


  computed: {
    overlayStyle: function overlayStyle() {
      return {
        opacity: this.hasAnimation ? 0 : 1,
        backgroundColor: 'rgba(0, 0, 0,' + this.opacity + ')' };

    },
    shouldShow: function shouldShow() {var _this = this;var
      show = this.show,hasAnimation = this.hasAnimation;
      hasAnimation && setTimeout(function () {
        _this.appearOverlay(show);
      }, 50);
      return show;
    } },

  methods: {
    overlayClicked: function overlayClicked(e) {
      this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});
    },
    appearOverlay: function appearOverlay(bool) {var _this2 = this;var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;var
      hasAnimation = this.hasAnimation,timingFunction = this.timingFunction,canAutoClose = this.canAutoClose;
      var needEmit = !bool && canAutoClose;
      needEmit && this.$emit('wxcOverlayBodyClicking', {});
      var overlayEl = this.$refs['wxc-overlay'];
      if (hasAnimation && overlayEl) {
        animation.transition(overlayEl, {
          styles: {
            opacity: bool ? 1 : 0 },

          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0 },
        function () {
          needEmit && _this2.$emit('wxcOverlayBodyClicked', {});
        });
      } else {
        needEmit && this.$emit('wxcOverlayBodyClicked', {});
      }
    } } };

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('div', {
    ref: "wxc-overlay",
    staticClass: ["wxc-overlay"],
    style: _vm.overlayStyle,
    attrs: {
      "hack": _vm.shouldShow
    },
    on: {
      "click": _vm.overlayClicked
    }
  }) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2016/10/29.
 */

const CHECKED = 'https://gw.alicdn.com/tfs/TB1UT3VpgMPMeJjy1XdXXasrXXa-42-42.png';
/* harmony export (immutable) */ __webpack_exports__["CHECKED"] = CHECKED;

const UN_CHECKED = 'https://gw.alicdn.com/tfs/TB1hE3VpgMPMeJjy1XdXXasrXXa-42-42.png';
/* harmony export (immutable) */ __webpack_exports__["UN_CHECKED"] = UN_CHECKED;


/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["container"]
  }, [(_vm.show) ? _c('wxc-overlay', {
    attrs: {
      "show": true,
      "hasAnimation": false
    }
  }) : _vm._e(), (_vm.show) ? _c('div', {
    staticClass: ["dialog-box"],
    style: {
      top: _vm.top + 'px'
    }
  }, [_c('div', {
    staticClass: ["dialog-content"]
  }, [_vm._t("title", [_c('text', {
    staticClass: ["content-title"]
  }, [_vm._v(_vm._s(_vm.title))])]), _vm._t("content", [_c('text', {
    staticClass: ["content-subtext"]
  }, [_vm._v(_vm._s(_vm.content))])]), (_vm.showNoPrompt) ? _c('div', {
    staticClass: ["no-prompt"],
    on: {
      "click": _vm.noPromptClicked
    }
  }, [_c('image', {
    staticClass: ["no-prompt-icon"],
    attrs: {
      "src": _vm.noPromptIcon
    }
  }), _c('text', {
    staticClass: ["no-prompt-text"]
  }, [_vm._v(_vm._s(_vm.noPromptText))])]) : _vm._e()], 2), _c('div', {
    staticClass: ["dialog-footer"]
  }, [(!_vm.single) ? _c('div', {
    staticClass: ["footer-btn", "cancel"],
    on: {
      "click": _vm.secondaryClicked
    }
  }, [_c('text', {
    staticClass: ["btn-text"],
    style: {
      color: _vm.secondBtnColor
    }
  }, [_vm._v(_vm._s(_vm.cancelText))])]) : _vm._e(), _c('div', {
    staticClass: ["footer-btn", "confirm"],
    on: {
      "click": _vm.primaryClicked
    }
  }, [_c('text', {
    staticClass: ["btn-text"],
    style: {
      color: _vm.mainBtnColor
    }
  }, [_vm._v(_vm._s(_vm.confirmText))])])])]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(107)
)

/* script */
__vue_exports__ = __webpack_require__(108)

/* template */
var __vue_template__ = __webpack_require__(109)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-26a9c8e0"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = {
  "slider": {
    "position": "absolute",
    "top": 0
  }
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });































var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);
var _bindEnv = __webpack_require__(1);var _bindEnv2 = _interopRequireDefault(_bindEnv);
var _indexWeex = __webpack_require__(2);var _indexWeex2 = _interopRequireDefault(_indexWeex);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var swipeBack = weex.requireModule('swipeBack');var animation = weex.requireModule('animation');exports.default = { props: { sliderId: { type: [String, Number], default: 1 }, panOffset: { type: Number, default: 80 }, cardLength: { type: Number, default: 1 }, selectIndex: { type: Number, default: 0 }, enableSwipe: { type: Boolean, default: true }, containerS: { type: Object, default: function _default() {return { position: 'relative', width: 750, height: 352 };} },


    cardS: {
      type: Object,
      default: function _default() {return {
          width: 360,
          height: 300,
          spacing: 0,
          scale: 0.75 };} },


    autoPlay: {
      type: Boolean,
      default: false },

    interval: {
      type: [Number, String],
      default: 1200 } },


  data: function data() {return {
      isMoving: false,
      gesToken: 0,
      startX: 0,
      startTime: 0,
      currentIndex: 0,
      autoPlayTimer: null };},

  computed: {
    cardList: function cardList() {
      return new Array(this.cardLength + 1).join().split('');
    },
    cardWidth: function cardWidth() {
      return (this.cardLength - 1) * this.cardS.width + this.containerS.width + 235;
    } },

  created: function created() {
    this.currentIndex = this.selectIndex;
  },
  mounted: function mounted() {var _this = this;
    // ios和页面返回冲突，组件里面将ios系统横滑返回禁止
    if (swipeBack && swipeBack.forbidSwipeBack) {
      swipeBack.forbidSwipeBack(true);
    }

    setTimeout(function () {
      var sliderCtn = _this.$refs['sliderCtn_' + _this.sliderId];
      if (_bindEnv2.default.supportsEB() && sliderCtn && sliderCtn.ref) {
        _indexWeex2.default.prepare && _indexWeex2.default.prepare({
          anchor: sliderCtn.ref,
          eventType: 'pan' });

      }
    }, 20);
    this.checkNeedAutoPlay();
  },
  methods: {
    onPanStart: function onPanStart(e) {
      if (_bindEnv2.default.supportsEB()) {
        return;
      }
      this.clearAutoPlay();
      this.startX = e.changedTouches[0].clientX;
      this.startTime = Date.now();
    },
    onPanMove: function onPanMove(e) {
      if (_bindEnv2.default.supportsEB()) {
        return;
      }
      var moveX = e.changedTouches[0].clientX - this.startX;
      var index = this.loopedIndex(this.currentIndex, this.cardLength);
      var cardLength = this.cardLength;
      var currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);

      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      sliderCtn && animation.transition(sliderCtn, {
        styles: {
          transform: 'translateX(' + (moveX - currentCardLeft) + 'px)' },

        timingFunction: 'ease',
        delay: 0,
        duration: 0 },
      function () {
      });

      if (this.cardS.scale !== 1) {
        var currentCard = this.$refs['card' + this.loopedIndex(index, cardLength) + '_' + this.sliderId][0];
        currentCard && animation.transition(currentCard, {
          styles: {
            transform: 'scale(' + (1 - Math.abs(moveX) / this.cardS.width * (1 - this.cardS.scale)) + ')' },

          timingFunction: 'ease',
          delay: 0,
          duration: 0 },
        function () {
        });
        // 左边的卡片
        var leftCard = this.$refs['card' + this.loopedIndex(index - 1, cardLength) + '_' + this.sliderId][0];
        // loop 函数负数返回 0，这里有点冲突
        if (leftCard && index !== 0) {
          animation.transition(leftCard, {
            styles: {
              transform: 'scale(' + (1 - Math.abs(moveX - this.cardS.width) / this.cardS.width * (1 - this.cardS.scale)) + ')' },

            timingFunction: 'ease',
            delay: 0,
            duration: 0 },
          function () {
          });
        }
        // 右边卡片
        var rightCard = this.$refs['card' + this.loopedIndex(index + 1, cardLength) + '_' + this.sliderId][0];
        rightCard && animation.transition(rightCard, {
          styles: {
            transform: 'scale(' + (1 - Math.abs(this.cardS.width + moveX) / this.cardS.width * (1 - this.cardS.scale)) + ')' },

          timingFunction: 'ease',
          delay: 0,
          duration: 0 },
        function () {
        });
      }
    },
    onEpPanStart: function onEpPanStart(e) {var _this2 = this;
      if (_bindEnv2.default.supportsEB() && e.state === 'start') {
        this.clearAutoPlay();
        setTimeout(function () {
          var sliderCtn = _this2.$refs['sliderCtn_' + _this2.sliderId];
          _this2.bindExp(sliderCtn);
        }, 0);
      }
    },
    onPanEnd: function onPanEnd(e) {
      if (_bindEnv2.default.supportsEB()) {
        return;
      }
      this.panEnd(e);
    },
    panEnd: function panEnd(e) {var _this3 = this;
      this.isMoving = true;
      var moveX = e.deltaX;

      if (_utils2.default.env.isWeb()) {
        moveX = e.changedTouches[0].clientX - this.startX;
      }

      var originIndex = this.currentIndex;
      var selectIndex = originIndex;
      var duration = Date.now() - this.startTime;
      var panOffset = this.panOffset || this.cardS.width / 2;
      var isPullMore = selectIndex === this.cardLength - 1 && (moveX < -68 || moveX < -10 && duration < 200);

      if (isPullMore) {
        this.$emit('wxcEpSliderPullMore', { currentIndex: selectIndex });
      }

      if (moveX < -panOffset || moveX < -10 && duration < 200) {
        if (selectIndex !== this.cardLength - 1) {
          selectIndex++;
        }
      } else if (moveX > panOffset || moveX > 10 && duration < 500) {
        if (selectIndex !== 0) {
          selectIndex--;
        }
      }

      this.slideTo(originIndex, selectIndex);
      setTimeout(function () {_this3.checkNeedAutoPlay();}, 3000);
    },
    slideTo: function slideTo(originIndex, selectIndex) {var _this4 = this;
      var currentCardScale = 1;
      var rightCardScale = this.cardS.scale;
      var leftCardScale = this.cardS.scale;
      var duration = selectIndex === 0 && originIndex === this.cardLength - 1 && this.cardLength !== 2 ? 0.00001 : 300;
      this.$emit('wxcEpSliderCurrentIndexSelected', { currentIndex: selectIndex });
      if (originIndex < selectIndex) {
        currentCardScale = this.cardS.scale;
        rightCardScale = 1;
      } else if (originIndex > selectIndex) {
        currentCardScale = this.cardS.scale;
        leftCardScale = 1;
      }
      var currentCard = this.$refs['card' + this.loopedIndex(originIndex, this.cardLength) + '_' + this.sliderId][0];
      currentCard && animation.transition(currentCard, {
        styles: {
          transform: 'scale(' + currentCardScale + ')' },

        timingFunction: 'ease',
        duration: duration },
      function () {
      });

      var leftCard = this.$refs['card' + this.loopedIndex(originIndex - 1, this.cardLength) + '_' + this.sliderId][0];
      if (this.isMoving && leftCard && originIndex !== 0) {
        animation.transition(leftCard, {
          styles: {
            transform: 'scale(' + leftCardScale + ')' },

          timingFunction: 'ease',
          duration: duration },
        function () {
        });
      }
      var rightCard = this.$refs['card' + this.loopedIndex(originIndex + 1, this.cardLength) + '_' + this.sliderId][0];
      if (rightCard && originIndex !== this.cardLength - 1) {
        animation.transition(rightCard, {
          styles: {
            transform: 'scale(' + rightCardScale + ')' },

          timingFunction: 'ease',
          duration: duration },
        function () {
        });
      }

      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      sliderCtn && animation.transition(sliderCtn, {
        styles: {
          transform: 'translateX(-' + selectIndex * (this.cardS.width + this.cardS.spacing) + 'px)' },

        timingFunction: 'ease',
        duration: duration },
      function () {
        _this4.isMoving = false;
        if (originIndex !== selectIndex) {
          _this4.currentIndex = selectIndex;
        }
      });
    },
    // 使index维持在0-length之间循环
    loopedIndex: function loopedIndex(index, total) {
      if (index < 0) {
        index = index + (1 - index / total) * total;
      }
      return index % total;
    },
    bindExp: function bindExp(element) {var _this5 = this;
      if (element && element.ref) {

        if (this.isMoving && this.gesToken !== 0) {
          _indexWeex2.default.unbind({
            eventType: 'pan',
            token: this.gesToken });

          this.gesToken = 0;
          return;
        }

        this.startTime = Date.now();
        var index = this.loopedIndex(this.currentIndex, this.cardLength);
        var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
        var currentCard = this.$refs['card' + index + '_' + this.sliderId][0];
        var rightCard = null;
        var leftCard = null;
        var currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);

        // 卡片容器
        var sliderCtnExp = 'x - ' + currentCardLeft;
        var args = [
        {
          element: sliderCtn.ref,
          property: 'transform.translateX',
          expression: sliderCtnExp }];



        if (this.cardS.scale !== 1) {

          var currentCardExp = '1-abs(x)/' + this.cardS.width + '*' + (1 - this.cardS.scale);
          var leftCardExp = '1-abs(x-' + this.cardS.width + ')/' + this.cardS.width + '*' + (1 - this.cardS.scale);
          var rightCardExp = '1-abs(' + this.cardS.width + '+x)/' + this.cardS.width + '*' + (1 - this.cardS.scale);

          args.push({
            element: currentCard.ref,
            property: 'transform.scale',
            expression: currentCardExp });


          if (index === 0 && this.$refs['card' + (index + 1) + '_' + this.sliderId]) {

            rightCard = this.$refs['card' + (index + 1) + '_' + this.sliderId][0];
            args.push({
              element: rightCard.ref,
              property: 'transform.scale',
              expression: rightCardExp });

          } else if (index === this.cardLength - 1 && this.$refs['card' + (index - 1) + '_' + this.sliderId]) {
            leftCard = this.$refs['card' + (index - 1) + '_' + this.sliderId][0];
            args.push({
              element: leftCard.ref,
              property: 'transform.scale',
              expression: leftCardExp });

          } else if (this.$refs['card' + (index - 1) + '_' + this.sliderId]) {
            // 左边卡片
            leftCard = this.$refs['card' + (index - 1) + '_' + this.sliderId][0];
            args.push({
              element: leftCard.ref,
              property: 'transform.scale',
              expression: leftCardExp });

            // 右边卡片
            rightCard = this.$refs['card' + (index + 1) + '_' + this.sliderId][0];
            args.push({
              element: rightCard.ref,
              property: 'transform.scale',
              expression: rightCardExp });

          }
        }

        var gesTokenObj = _indexWeex2.default.bind({
          anchor: element.ref,
          eventType: 'pan',
          props: args },
        function (e) {
          if (!_this5.isMoving && (e.state === 'end' || e.state === 'cancel' || e.state === 'exit')) {
            _this5.panEnd(e);
          }
        });

        this.gesToken = gesTokenObj.token;
      }
    },
    checkNeedAutoPlay: function checkNeedAutoPlay() {var _this6 = this;
      if (this.autoPlay) {
        this.clearAutoPlay();
        this.autoPlayTimer = setInterval(function () {
          _this6.slideTo(_this6.currentIndex, _this6.loopedIndex(_this6.currentIndex + 1, _this6.cardLength));
        }, parseInt(this.interval));
      }
    },
    clearAutoPlay: function clearAutoPlay() {
      this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    },
    rebind: function rebind() {
      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      if (sliderCtn && sliderCtn.ref) {
        _indexWeex2.default.unbind({
          eventType: 'pan',
          token: this.gesToken });

        this.gesToken = 0;
        this.bindExp(sliderCtn);
      }
    },
    manualSetPage: function manualSetPage(selectIndex) {var _this7 = this;
      this.clearAutoPlay();
      var step = this.currentIndex < selectIndex ? 1 : -1;
      this.slideTo(this.loopedIndex(selectIndex - step, this.cardLength), selectIndex);
      setTimeout(function () {
        _this7.checkNeedAutoPlay();
      }, 3000);
    } } };

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    style: _vm.containerS
  }, [_c('div', {
    ref: ("sliderCtn_" + _vm.sliderId),
    style: {
      width: _vm.cardWidth + 'px',
      height: _vm.cardS.height + 'px',
      transform: ("translateX(-" + (_vm.currentIndex * (_vm.cardS.width + _vm.cardS.spacing)) + "px)")
    },
    on: {
      "panstart": _vm.onPanStart,
      "panmove": _vm.onPanMove,
      "panend": _vm.onPanEnd,
      "horizontalpan": _vm.onEpPanStart
    }
  }, [_vm._l((_vm.cardList), function(v, index) {
    return _c('div', {
      ref: ("card" + index + "_" + _vm.sliderId),
      refInFor: true,
      staticClass: ["slider"],
      style: {
        transform: ("scale(" + (index===_vm.currentIndex ? 1 : _vm.cardS.scale) + ")"),
        left: ((index * (_vm.cardS.width+_vm.cardS.spacing)) + "px"),
        marginLeft: (((_vm.containerS.width - _vm.cardS.width) / 2) + "px"),
        width: _vm.cardS.width + 'px',
        height: _vm.cardS.height + 'px'
      }
    }, [_vm._t(("card" + index + "_" + _vm.sliderId))], 2)
  }), _vm._t("pull-more")], 2)])
},staticRenderFns: []}

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wxc_tab_page_full_page_vue__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wxc_tab_page_full_page_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__wxc_tab_page_full_page_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__wxc_tab_page_full_page_vue___default.a; });
// hack for babel-plugin-component



/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(112)
)

/* script */
__vue_exports__ = __webpack_require__(113)

/* template */
var __vue_template__ = __webpack_require__(114)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2eb7201e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-tab-page": {
    "width": "750",
    "backgroundColor": "#f2f3f4"
  },
  "tab-title-list": {
    "width": "750",
    "position": "absolute",
    "flexDirection": "row"
  },
  "title-item": {
    "justifyContent": "center",
    "alignItems": "center",
    "borderBottomStyle": "solid"
  },
  "border-bottom": {
    "position": "absolute",
    "bottom": 0
  },
  "tab-page-wrap": {
    "width": "750"
  },
  "tab-container": {
    "flex": 1,
    "flexDirection": "row",
    "position": "absolute"
  },
  "tab-text": {
    "lines": 1,
    "textOverflow": "ellipsis"
  }
}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });






























































































var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);
var _bindEnv = __webpack_require__(1);var _bindEnv2 = _interopRequireDefault(_bindEnv);
var _indexWeex = __webpack_require__(2);var _indexWeex2 = _interopRequireDefault(_indexWeex);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var dom = weex.requireModule('dom');var animation = weex.requireModule('animation');var swipeBack = weex.requireModule('swipeBack');var expressionBinding = weex.requireModule('expressionBinding');var isIos = _utils2.default.env.isIOS();exports.default = { props: { tabTitles: { type: Array, default: function _default() {return [];} }, panDist: { type: Number, default: 200 }, spmC: { type: [String, Number], default: '' }, tabStyles: { type: Object, default: function _default() {return { titleColor: '#666666', activeTitleColor: '#3D3D3D', isActiveTitleBold: true, width: 160, height: 40, fontSize: 24, textPaddingLeft: 10, textPaddingRight: 10 };} }, titleType: { type: String, default: 'icon' }, tabPageHeight: { type: [String, Number], default: 1334 }, needSlider: { type: Boolean, default: true }, duration: { type: [Number, String], default: 300 }, timingFunction: { type: String, default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' } }, data: function data() {return { currentPage: 0, isMoving: false, deltaX: 0 };}, mounted: function mounted() {// ios 下面禁止左滑出去
    if (swipeBack && swipeBack.forbidSwipeBack) {swipeBack.forbidSwipeBack(true);}if (_bindEnv2.default.supportsEBForIos() && this.needSlider) {var tabPageEl = this.$refs['tab-page-wrap'];_indexWeex2.default.prepare && _indexWeex2.default.prepare({ anchor: tabPageEl.ref, eventType: 'pan' });}}, methods: { next: function next() {var page = this.currentPage;if (page < this.tabTitles.length - 1) {page++;}this.setPage(page);}, prev: function prev() {var page = this.currentPage;if (page > 0) {page--;}this.setPage(page);}, startHandler: function startHandler(e) {if (_bindEnv2.default.supportsEBForIos() && this.isTabView && this.needSlider) {this.bindExp(this.$refs['tab-page-wrap']);}}, bindExp: function bindExp(element) {var _this = this;
      if (element && element.ref) {

        if (this.isMoving && this.gesToken !== 0) {
          _indexWeex2.default.unbind({
            eventType: 'pan',
            token: this.gesToken });

          this.gesToken = 0;
          return;
        }

        var tabElement = this.$refs['tab-container'];var
        currentPage = this.currentPage,panDist = this.panDist;
        var dist = currentPage * 750;

        // x-dist

        var props = [{
          element: tabElement.ref,
          property: 'transform.translateX',
          expression: '{"type":"CallExpression","children":[{"type":"Identifier","value":"min"},{"type":"Arguments","children":[{"type":"NumericLiteral","value":0},{"type":"CallExpression","children":[{"type":"Identifier","value":"max"},{"type":"Arguments","children":[{"type":"NumericLiteral","value":' + -(tabTitles.length - 1) * 750 + '},{"type":"-","children":[{"type":"Identifier","value":"x"},{"type":"NumericLiteral","value":' + dist + '}]}]}]}]}]}' }];


        var gesTokenObj = _indexWeex2.default.bind({
          anchor: element.ref,
          eventType: 'pan',
          props: props },
        function (e) {var
          deltaX = e.deltaX,state = e.state;
          if (state === 'end') {
            if (deltaX < -panDist) {
              _this.next();
            } else if (deltaX > panDist) {
              _this.prev();
            } else {
              _this.setPage(currentPage);
            }
          }
        });
        this.gesToken = gesTokenObj.token;
      }
    },
    setPage: function setPage(page) {
      if (this.isMoving === true) {
        return;
      }
      this.isMoving = true;
      var previousPage = this.currentPage;
      var currentTabEl = this.$refs['wxc-tab-title-' + page][0];var
      width = this.tabStyles.width;
      var appearNum = parseInt(750 / width);
      var tabsNum = this.tabTitles.length;
      var computedPage = tabsNum > appearNum ? 2 : page;
      var offset = page > appearNum ? -(750 - width) / 2 : -width * computedPage;

      (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
        offset: offset });


      page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
        offset: -width * page });

      this._animateTransformX(page);
      this.isMoving = false;
      this.currentPage = page;
      this.$emit('wxcTabPageCurrentTabSelected', { page: page });
    },
    _animateTransformX: function _animateTransformX(page) {var
      duration = this.duration,timingFunction = this.timingFunction;
      var containerEl = this.$refs['tab-container'];
      var dist = page * 750;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)' },

        duration: duration,
        timingFunction: timingFunction,
        delay: 0 },
      function () {
      });
    } } };

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-tab-page"],
    style: {
      height: (_vm.tabPageHeight) + 'px'
    }
  }, [_c('div', {
    ref: "tab-page-wrap",
    staticClass: ["tab-page-wrap"],
    style: {
      height: _vm.tabPageHeight + 'px'
    },
    attrs: {
      "preventMoveEvent": true
    },
    on: {
      "horizontalpan": _vm.startHandler
    }
  }, [_c('div', {
    ref: "tab-container",
    staticClass: ["tab-container"]
  }, [_vm._t("default")], 2)]), _c('scroller', {
    ref: "tab-title-list",
    staticClass: ["tab-title-list"],
    style: {
      backgroundColor: _vm.tabStyles.bgColor,
      height: (_vm.tabStyles.height) + 'px',
      top: _vm.tabStyles.top + 'px'
    },
    attrs: {
      "showScrollbar": false,
      "scrollDirection": "horizontal",
      "dataSpm": _vm.spmC
    }
  }, _vm._l((_vm.tabTitles), function(v, index) {
    return _c('div', {
      key: index,
      ref: 'wxc-tab-title-' + index,
      refInFor: true,
      staticClass: ["title-item"],
      style: {
        width: _vm.tabStyles.width + 'px',
        height: _vm.tabStyles.height + 'px',
        backgroundColor: _vm.currentPage == index ? _vm.tabStyles.activeBgColor : _vm.tabStyles.bgColor
      },
      attrs: {
        "accessible": true,
        "ariaLabel": ("" + (v.title?v.title:'标签'+index))
      },
      on: {
        "click": function($event) {
          _vm.setPage(index, v.url)
        }
      }
    }, [(_vm.titleType == 'icon') ? _c('image', {
      style: {
        width: _vm.tabStyles.iconWidth + 'px',
        height: _vm.tabStyles.iconHeight + 'px'
      },
      attrs: {
        "src": _vm.currentPage == index ? v.activeIcon : v.icon
      }
    }) : _vm._e(), _c('text', {
      staticClass: ["tab-text"],
      style: {
        fontSize: _vm.tabStyles.fontSize + 'px',
        fontWeight: (_vm.currentPage == index && _vm.tabStyles.isActiveTitleBold) ? 'bold' : 'normal',
        color: _vm.currentPage == index ? _vm.tabStyles.activeTitleColor : _vm.tabStyles.titleColor,
        paddingLeft: (_vm.tabStyles.textPaddingLeft ? _vm.tabStyles.textPaddingLeft : 10) + 'px',
        paddingRight: (_vm.tabStyles.textPaddingRight ? _vm.tabStyles.textPaddingRight : 10) + 'px'
      }
    }, [_vm._v(_vm._s(v.title))]), (_vm.tabStyles.hasActiveBottom) ? _c('div', {
      staticClass: ["border-bottom"],
      style: {
        width: _vm.tabStyles.activeBottomWidth + 'px',
        left: (_vm.tabStyles.width - _vm.tabStyles.activeBottomWidth) / 2 + 'px',
        height: _vm.tabStyles.activeBottomHeight + 'px',
        backgroundColor: _vm.currentPage == index ? _vm.tabStyles.activeBottomColor : 'transparent'
      }
    }) : _vm._e()])
  }))])
},staticRenderFns: []}

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(117)
)

/* script */
__vue_exports__ = __webpack_require__(118)

/* template */
var __vue_template__ = __webpack_require__(123)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-c6170e20"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = {
  "grid-select": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "flexWrap": "wrap"
  }
}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _option = __webpack_require__(119);var _option2 = _interopRequireDefault(_option);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  components: { Option: _option2.default },
  props: {
    // 标识, 当界面展示多个grid, 防止v-for :key重复
    id: {
      type: String,
      default: 'one' },

    // 列数
    cols: {
      type: Number,
      default: 4 },

    // 是否单选
    single: {
      type: Boolean,
      default: false },

    // 数据
    list: {
      type: Array,
      default: function _default() {return [];} },

    // 选择个数限制
    limit: {
      type: Number },

    // 用户自定义样式，用于个性化设置option样式
    customStyles: {
      type: Object,
      default: function _default() {return {};} } },


  data: function data() {
    return {
      dList: this.initList() };

  },
  computed: {
    cHackList: function cHackList() {var
      list = this.list,cols = this.cols;
      var remainder = list.length % cols;
      var len = remainder ? cols - remainder : 0;

      return Array.apply(null, { length: len });
    } },

  watch: {
    list: function list() {
      this.dList = this.initList();
    } },

  created: function created() {
    // 行间距
    this.lineSpacing = this.customStyles.lineSpacing || '12px';
  },
  methods: {
    onSelect: function onSelect(index) {
      var checked = this.dList[index].checked;
      if (this.limit <= this.checkedCount && !checked) {
        this.$emit('overLimit', this.limit);
      } else {
        this.updateList(index);
        this.$emit('select', {
          selectIndex: index,
          checked: !checked,
          checkedList: this.dList.filter(function (item) {return item.checked;}) });

      }
    },
    initList: function initList() {
      var single = this.single;
      var checkedCount = 0;

      var dList = this.list.map(function (item, i) {var
        checked = item.checked,disabled = item.disabled;
        disabled = !!disabled;
        // disabled为true时认为checked无效，同时单选模式下只认为第一个checked为true的为有效值
        checked = !disabled && !!checked && (!single || checkedCount === 0);
        if (item.checked) checkedCount += 1;
        return _extends({},
        item, {
          checked: checked,
          disabled: disabled });

      });

      this.checkedCount = checkedCount;
      return dList;
    },
    updateList: function updateList(index) {
      var single = this.single;
      var checkedCount = 0;
      this.dList = this.dList.map(function (item, i) {
        if (single) {
          item.checked = index === i && !item.checked;
        } else {
          if (i === index) item.checked = !item.checked;
        }
        if (item.checked) checkedCount += 1;
        return item;
      });
      this.checkedCount = checkedCount;
    } } };

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(120)
)

/* script */
__vue_exports__ = __webpack_require__(121)

/* template */
var __vue_template__ = __webpack_require__(122)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-299172c7"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = {
  "grid-option": {
    "justifyContent": "center",
    "borderRadius": "8",
    "borderWidth": "2",
    "paddingLeft": "6",
    "paddingRight": "6"
  },
  "text-title": {
    "lines": 2,
    "lineHeight": "30",
    "textOverflow": "ellipsis",
    "textAlign": "center",
    "fontSize": "26"
  },
  "image-checked": {
    "position": "absolute",
    "right": 0,
    "bottom": 0,
    "width": "38",
    "height": "34"
  }
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default =
{
  props: {
    index: {
      type: Number,
      default: -1 },

    // 是否选中
    checked: {
      type: Boolean,
      default: false },

    // 是否可选
    disabled: {
      type: Boolean,
      default: false },

    // 标题
    title: {
      type: String,
      default: '' },

    width: {
      type: String,
      default: '166px' },

    height: {
      type: String,
      default: '72px' },

    // 默认 x
    icon: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB1IAByhgMPMeJjy1XdXXasrXXa-38-34.png' },

    // 正常状态文字色值
    color: {
      type: String,
      default: '#3d3d3d' },

    // 选中状态文字色值
    checkedColor: {
      type: String,
      default: '#3d3d3d' },

    // 不可选状态文字色值
    disabledColor: {
      type: String,
      default: '#9b9b9b' },

    // 正常状态边框色值
    borderColor: {
      type: String,
      default: 'transparent' },

    // 选中状态边框色值
    checkedBorderColor: {
      type: String,
      default: '#ffb200' },

    // 不可选状态边框色值
    disabledBorderColor: {
      type: String,
      default: 'transparent' },

    // 正常状态背景色值
    backgroundColor: {
      type: String,
      default: '#f6f6f6' },

    // 选中状态背景色值
    checkedBackgroundColor: {
      type: String,
      default: '#ffffff' },

    // 不可选状态背景色值
    disabledBackgroundColor: {
      type: String,
      default: '#f6f6f6' } },


  computed: {
    cWrapperStyle: function cWrapperStyle() {var
      checked = this.checked,disabled = this.disabled,width = this.width,height = this.height,borderColor = this.borderColor,checkedBorderColor = this.checkedBorderColor,disabledBorderColor = this.disabledBorderColor,backgroundColor = this.backgroundColor,checkedBackgroundColor = this.checkedBackgroundColor,disabledBackgroundColor = this.disabledBackgroundColor;
      return {
        width: width,
        height: height,
        borderColor: disabled ? disabledBorderColor : checked ? checkedBorderColor : borderColor,
        backgroundColor: disabled ? disabledBackgroundColor : checked ? checkedBackgroundColor : backgroundColor };

    },
    cTitleStyle: function cTitleStyle() {var
      checked = this.checked,disabled = this.disabled,color = this.color,checkedColor = this.checkedColor,disabledColor = this.disabledColor;
      return {
        color: disabled ? disabledColor : checked ? checkedColor : color };

    } },

  methods: {
    onClick: function onClick() {
      if (!this.disabled) {
        this.$emit('select', this.index);
      }
    } } };

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["grid-option"],
    style: _vm.cWrapperStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": (_vm.title + "," + (_vm.checked?'已选中':'未选中'))
    },
    on: {
      "click": _vm.onClick
    }
  }, [(_vm.title) ? _c('text', {
    staticClass: ["text-title"],
    style: _vm.cTitleStyle
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), (_vm.checked && _vm.icon) ? _c('image', {
    staticClass: ["image-checked"],
    attrs: {
      "src": _vm.icon
    }
  }) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["grid-select"]
  }, [_vm._l((_vm.dList), function(item, index) {
    return _c('option', _vm._b({
      key: index,
      style: {
        marginTop: index >= _vm.cols ? _vm.lineSpacing : null
      },
      attrs: {
        "index": index
      },
      on: {
        "select": function($event) {
          _vm.onSelect(index)
        }
      }
    }, 'option', Object.assign({}, _vm.customStyles, item), false))
  }), _vm._l((_vm.cHackList), function(item, index) {
    return _c('option', _vm._b({
      key: _vm.id + index,
      style: {
        opacity: 0,
        marginTop: _vm.dList.length >= _vm.cols ? _vm.lineSpacing : null
      }
    }, 'option', Object.assign({}, _vm.customStyles, item), false))
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(126)
)

/* script */
__vue_exports__ = __webpack_require__(127)

/* template */
var __vue_template__ = __webpack_require__(129)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4ae3d430"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = {
  "icon-font": {
    "color": "#666666"
  }
}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//

var _type = __webpack_require__(128);var _type2 = _interopRequireDefault(_type);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var dom = weex.requireModule('dom');exports.default =

{
  props: {
    name: {
      default: 'success',
      type: String },

    size: {
      default: 'small',
      type: String },

    iconStyle: {
      type: Object,
      default: function _default() {return {};} } },


  data: function data() {return {
      Icon: _type2.default };},

  beforeCreate: function beforeCreate() {
    dom.addRule('fontFace', {
      'fontFamily': "weexUiIconFont",
      'src': "url('https://at.alicdn.com/t/font_520368_r89ekv69euahsemi.ttf')" });

  },
  computed: {
    mergeStyle: function mergeStyle() {var
      iconStyle = this.iconStyle,size = this.size;
      var fontSize = '48px';
      switch (size) {
        case 'xs':
          fontSize = '24px';
          break;
        case 'small':
          fontSize = '48px';
          break;
        case 'medium':
          fontSize = '72px';
          break;
        case 'big':
          fontSize = '128px';
          break;
        default:
          fontSize = '48px';}

      return _extends({
        fontFamily: 'weexUiIconFont',
        fontSize: fontSize },
      iconStyle);

    } },

  methods: {
    itemClicked: function itemClicked(name) {
      this.$emit('wxcIconClicked', {
        name: name });

    } } };

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
  less: '\ue6a5',
  'more_unfold': '\ue6a6',
  back: '\ue697',
  more: '\ue6a7',
  add: '\ue6b9',
  subtract: '\ue6fe',
  close: '\ue69a',
  cry: '\ue69c',
  delete: '\ue69d',
  help: '\ue6a3',
  refresh: '\ue6aa',
  search: '\ue6ac',
  success: '\ue6b1',
  warning: '\ue6b6',
  wrong: '\ue6b7',
  clock: '\ue6bb',
  scanning: '\ue6ec',
  filter: '\ue6f1',
  map: '\ue715',
  play: '\ue719'
});

/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('text', {
    staticClass: ["icon-font"],
    style: _vm.mergeStyle,
    on: {
      "click": function($event) {
        _vm.itemClicked(_vm.name)
      }
    }
  }, [_vm._v(_vm._s(_vm.Icon[_vm.name]))])
},staticRenderFns: []}

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(132)
)

/* script */
__vue_exports__ = __webpack_require__(133)

/* template */
var __vue_template__ = __webpack_require__(138)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-525c1ee4"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = {
  "indicator": {
    "position": "absolute",
    "itemColor": "rgba(255,195,0,0.5)",
    "itemSelectedColor": "#ffc300",
    "itemSize": "20",
    "height": "20",
    "bottom": "24"
  }
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _wxcMask = __webpack_require__(23);var _wxcMask2 = _interopRequireDefault(_wxcMask);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  components: {
    WxcMask: _wxcMask2.default },

  props: {
    width: {
      type: [Number, String],
      default: 750 },

    height: {
      type: [Number, String],
      default: 750 },

    show: {
      type: Boolean,
      default: false },

    imageList: Array,
    indicatorColor: {
      type: Object,
      default: function _default() {return {
          'item-color': 'rgba(255, 195, 0, .5)',
          'item-selected-color': '#ffc300',
          'item-size': '20px' };} },


    index: {
      type: [Number, String],
      default: 0 },

    interval: {
      type: [Number, String],
      default: 3000 } },


  computed: {
    indicatorStyle: function indicatorStyle() {
      return _extends({
        width: this.width + 'px' },
      this.indicatorColor);

    } },

  methods: {
    maskOverlayClick: function maskOverlayClick() {
      this.$emit('wxcLightboxOverlayClicked', {});
    } } };

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(135)
)

/* script */
__vue_exports__ = __webpack_require__(136)

/* template */
var __vue_template__ = __webpack_require__(137)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-35d0a6ca"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = {
  "container": {
    "position": "fixed",
    "width": "750",
    "zIndex": 99999
  },
  "wxc-mask": {
    "position": "fixed",
    "top": "300",
    "left": "60",
    "width": "702",
    "height": "800"
  },
  "mask-bottom": {
    "width": "100",
    "height": "100",
    "backgroundColor": "rgba(0,0,0,0)",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "mask-close-icon": {
    "width": "64",
    "height": "64"
  }
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};
































































var _wxcOverlay = __webpack_require__(6);var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var animation = weex.requireModule('animation');exports.default = { components: { WxcOverlay: _wxcOverlay2.default }, props: { height: { type: [String, Number], default: 800 }, width: { type: [String, Number], default: 702 }, top: { type: Number, default: 0 }, show: { type: Boolean, default: false }, showClose: { type: Boolean, default: false }, duration: { type: [String, Number], default: 300 }, hasOverlay: { type: Boolean, default: true }, hasAnimation: { type: Boolean, default: true }, timingFunction: { type: Array, default: function _default() {return ['ease-in', 'ease-out'];} }, overlayCfg: { type: Object, default: function _default() {return { hasAnimation: true, timingFunction: ['ease-in', 'ease-out'], canAutoClose: true, duration: 300, opacity: 0.6 };} }, borderRadius: { type: [String, Number], default: 0 }, overlayCanClose: { type: Boolean, default: true }, maskBgColor: { type: String, default: '#ffffff' } },
  data: function data() {return {
      closeIcon: 'https://gw.alicdn.com/tfs/TB1qDJUpwMPMeJjy1XdXXasrXXa-64-64.png',
      maskTop: 264,
      opened: false };},

  computed: {
    mergeOverlayCfg: function mergeOverlayCfg() {
      return _extends({},
      this.overlayCfg, {
        hasAnimation: this.hasAnimation });

    },
    maskStyle: function maskStyle() {var
      width = this.width,height = this.height,showClose = this.showClose,hasAnimation = this.hasAnimation,opened = this.opened,top = this.top;
      var newHeight = showClose ? height - 0 + 100 : height;var _weex$config$env =
      weex.config.env,deviceHeight = _weex$config$env.deviceHeight,deviceWidth = _weex$config$env.deviceWidth,platform = _weex$config$env.platform;
      var _deviceHeight = deviceHeight || 1334;
      var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
      var navHeight = isWeb ? 0 : 130;
      var pageHeight = _deviceHeight / deviceWidth * 750 - navHeight;
      return {
        width: width + 'px',
        height: newHeight + 'px',
        left: (750 - width) / 2 + 'px',
        top: (top || (pageHeight - height) / 2) + 'px',
        opacity: hasAnimation && !opened ? 0 : 1 };

    },
    contentStyle: function contentStyle() {
      return {
        width: this.width + 'px',
        backgroundColor: this.maskBgColor,
        height: this.height + 'px',
        borderRadius: this.borderRadius + 'px' };

    },
    shouldShow: function shouldShow() {var _this = this;var
      show = this.show,hasAnimation = this.hasAnimation;
      hasAnimation && setTimeout(function () {
        _this.appearMask(show);
      }, 50);
      return show;
    } },

  methods: {
    closeIconClicked: function closeIconClicked() {
      this.appearMask(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      if (this.hasAnimation) {
        this.appearMask(false);
        this.$emit('wxcOverlayBodyClicking', {});
      }
    },
    wxcOverlayBodyClicked: function wxcOverlayBodyClicked() {
      if (!this.hasAnimation) {
        this.appearMask(false);
        this.$emit('wxcOverlayBodyClicked', {});
      }
    },
    needEmit: function needEmit() {var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.opened = bool;
      !bool && this.$emit('wxcMaskSetHidden', {});
    },
    appearMask: function appearMask(bool) {var _this2 = this;var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;var
      hasAnimation = this.hasAnimation,timingFunction = this.timingFunction;
      var maskEl = this.$refs['wxc-mask'];
      if (hasAnimation && maskEl) {
        animation.transition(maskEl, {
          styles: {
            opacity: bool ? 1 : 0 },

          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0 },
        function () {
          _this2.needEmit(bool);
        });
      } else {
        this.needEmit(bool);
      }
    } } };

/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["container"]
  }, [(_vm.show) ? _c('wxc-overlay', _vm._b({
    attrs: {
      "show": _vm.show && _vm.hasOverlay,
      "canAutoClose": _vm.overlayCanClose
    },
    on: {
      "wxcOverlayBodyClicking": _vm.wxcOverlayBodyClicking,
      "wxcOverlayBodyClicked": _vm.wxcOverlayBodyClicked
    }
  }, 'wxc-overlay', _vm.mergeOverlayCfg, false)) : _vm._e(), (_vm.show) ? _c('div', {
    ref: "wxc-mask",
    staticClass: ["wxc-mask"],
    style: _vm.maskStyle,
    attrs: {
      "hack": _vm.shouldShow
    }
  }, [_c('div', {
    style: _vm.contentStyle
  }, [_vm._t("default")], 2), (_vm.showClose) ? _c('div', {
    staticClass: ["mask-bottom"],
    style: {
      width: _vm.width + 'px'
    },
    on: {
      "click": _vm.closeIconClicked
    }
  }, [_c('image', {
    staticClass: ["mask-close-icon"],
    attrs: {
      "src": _vm.closeIcon,
      "ariaLabel": "关闭"
    }
  })]) : _vm._e()]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-mask', {
    attrs: {
      "width": _vm.width,
      "height": _vm.height,
      "ariaHidden": "true",
      "maskBgColor": "transparent",
      "overlayOpacity": "0.8",
      "show": _vm.show,
      "showClose": false
    },
    on: {
      "wxcMaskSetHidden": _vm.maskOverlayClick
    }
  }, [(_vm.show) ? _c('slider', {
    style: {
      height: _vm.height + 'px'
    },
    attrs: {
      "autoPlay": "false",
      "index": _vm.index,
      "interval": _vm.interval
    }
  }, [_vm._l((_vm.imageList), function(v, index) {
    return _c('div', {
      key: index,
      style: {
        height: _vm.height + 'px'
      }
    }, [_c('image', {
      style: {
        height: _vm.height + 'px',
        width: _vm.width + 'px'
      },
      attrs: {
        "resize": "cover",
        "src": v.src
      }
    })])
  }), _c('indicator', {
    staticClass: ["indicator"],
    style: _vm.indicatorStyle
  })], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(141)
)

/* script */
__vue_exports__ = __webpack_require__(142)

/* template */
var __vue_template__ = __webpack_require__(143)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-214bdd09"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports = {
  "loading-container": {
    "position": "relative"
  },
  "loading-need-mask": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "backgroundColor": "rgba(0,0,0,0.2)"
  },
  "wxc-loading": {
    "position": "absolute",
    "left": "287",
    "top": "500",
    "zIndex": 9999
  },
  "loading-box": {
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "20",
    "width": "175",
    "height": "175",
    "backgroundColor": "rgba(0,0,0,0.8)"
  },
  "trip-loading": {
    "backgroundColor": "rgba(0,0,0,0.2)"
  },
  "loading-trip-image": {
    "height": "75",
    "width": "75"
  },
  "loading-text": {
    "color": "#ffffff",
    "fontSize": "24",
    "lineHeight": "30",
    "height": "30",
    "marginTop": "8",
    "textOverflow": "ellipsis",
    "width": "140",
    "textAlign": "center"
  }
}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








































































var _type = __webpack_require__(24);
var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default = { props: { show: { type: Boolean, default: false }, loadingText: { type: String, default: '' }, type: { type: String, default: 'default' }, interval: { type: [Number, String], default: 0 }, needMask: { type: Boolean, default: false }, maskStyle: { type: Object, default: function _default() {return {};} } }, data: function data() {return { showLoading: false, tid: 0 };}, watch: { show: function show() {this.setShow();} }, computed: { loading: function loading() {var loading = {};switch (this.type) {case 'trip':loading = { url: _type.GIF, class: 'trip-loading' };break;default:loading = { url: _type.BLACK_GIF, class: 'default-loading' };}return loading;}, topPosition: function topPosition() {return (_utils2.default.env.getPageHeight() - 200) / 2;} }, created: function created() {this.setShow();}, methods: { maskClicked: function maskClicked() {this.needMask && this.$emit('wxcLoadingMaskClicked', {});}, setShow: function setShow() {var _this = this;var interval = this.interval,show = this.show,showLoading = this.showLoading;var stInterval = parseInt(interval);clearTimeout(this.tid);if (show) {if (showLoading) {
          return;
        }
        if (stInterval === 0) {
          this.showLoading = true;
        } else {
          this.tid = setTimeout(function () {
            _this.showLoading = true;
          }, stInterval);
        }
      } else {
        this.showLoading = false;
      }
    } } };

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['loading-container', _vm.showLoading && _vm.needMask && 'loading-need-mask'],
    style: _vm.maskStyle,
    on: {
      "click": _vm.maskClicked
    }
  }, [(_vm.showLoading) ? _c('div', {
    staticClass: ["wxc-loading"],
    style: {
      top: _vm.topPosition + 'px'
    }
  }, [_c('div', {
    class: ['loading-box', _vm.loading.class],
    attrs: {
      "ariaHidden": true
    }
  }, [_c('image', {
    staticClass: ["loading-trip-image"],
    attrs: {
      "src": _vm.loading.url,
      "resize": "contain",
      "quality": "original"
    }
  }), (_vm.loadingText) ? _c('text', {
    staticClass: ["loading-text"]
  }, [_vm._v(_vm._s(_vm.loadingText))]) : _vm._e()])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(146)
)

/* script */
__vue_exports__ = __webpack_require__(147)

/* template */
var __vue_template__ = __webpack_require__(155)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-a8926d72"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-lottery-rain": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "backgroundColor": "rgba(133,11,11,0.8)"
  }
}

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

























var _rainItem = __webpack_require__(148);var _rainItem2 = _interopRequireDefault(_rainItem);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  components: { RainItem: _rainItem2.default },
  props: {
    picList: Array,
    config: Object,
    wrapStyle: Object },

  methods: {
    wxcLotteryRainCaught: function wxcLotteryRainCaught(e) {
      this.$emit('wxcLotteryRainCaught', { rainId: e.rainId });
    },
    destroy: function destroy() {var
      picList = this.picList;
      var length = picList.length;
      for (var i = 0; i < length; i++) {
        this.$refs['rain-item-' + i][0].destroy();
      }
    } } }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(149)
)

/* script */
__vue_exports__ = __webpack_require__(150)

/* template */
var __vue_template__ = __webpack_require__(154)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6efb5aa1"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = {
  "rain-item": {
    "position": "absolute",
    "opacity": 0
  }
}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _animate = __webpack_require__(151);var Ani = _interopRequireWildcard(_animate);
var _config = __webpack_require__(152);var CFG = _interopRequireWildcard(_config);
var _region = __webpack_require__(153);var _region2 = _interopRequireDefault(_region);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}exports.default =

{
  props: {
    src: String,
    rainId: [String, Number],
    config: {
      type: Object,
      default: function _default() {return {};} } },


  computed: {
    // 合并用户配置和默认
    cfg: function cfg() {
      return _extends({},
      CFG.DEFAULT,
      this.config);

    } },

  data: function data() {return {
      showItem: false,
      hiding: false,
      pos: {},
      showTimer: null,
      hideTimer: null,
      intervalTimer: null };},

  created: function created() {var _cfg =
    this.cfg,width = _cfg.width,height = _cfg.height;
    this.pos = _region2.default.get(width, height);
  },
  mounted: function mounted() {
    this.start();
  },
  methods: {
    start: function start() {var _this = this;var
      cfg = this.cfg;
      var random = Math.round(Math.random() * cfg.randomTime);
      var showTime = cfg.showTime + random;
      var intervalTime = Math.max(cfg.intervalTime, cfg.showAniTime + showTime + cfg.hideAniTime) + random;

      this.onShow = function () {
        _this.hideTimer = setTimeout(function () {
          _this.hide();
        }, showTime);
      };

      this.onHide = function () {
        _region2.default.remove(_this.pos);
        _this.pos = {};
        _this.showItem = false;
        _this.hiding = false;var _cfg2 =
        _this.cfg,width = _cfg2.width,height = _cfg2.height;
        _this.pos = _region2.default.get(width, height);
      };

      this.showTimer = setTimeout(function () {
        _this.show();
      }, random);

      this.intervalTimer = setInterval(function () {
        _this.show();
      }, intervalTime);
    },

    hide: function hide() {var
      cfg = this.cfg,rainId = this.rainId;
      this.hiding = true;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      Ani.hidePig(this.$refs['rain-item-' + rainId], cfg.hideAniTime, this.onHide);
    },

    show: function show() {var
      cfg = this.cfg,rainId = this.rainId;
      this.showItem = true;
      Ani.showPig(this.$refs['rain-item-' + rainId], cfg.showAniTime, this.onShow);
    },

    caught: function caught() {var _this2 = this;var
      rainId = this.rainId,hiding = this.hiding;
      if (hiding) return;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      Ani.shakePig(this.$refs['rain-item-' + rainId], function () {
        _this2.hide();
      });
      this.$emit('wxcLotteryRainCaught', { rainId: rainId });
    },

    destroy: function destroy() {
      _region2.default.remove(this.pos);
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      clearInterval(this.intervalTimer);
      this.showItem = false;
    } } };

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["showPig"] = showPig;
/* harmony export (immutable) */ __webpack_exports__["hidePig"] = hidePig;
/* harmony export (immutable) */ __webpack_exports__["shakePig"] = shakePig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/09/06.
 * 红包雨动画类
 */

const animation = weex.requireModule('animation');


const isIos = __WEBPACK_IMPORTED_MODULE_0__utils__["default"].env.isIOS();

function showPig(ref, duration, callback) {
  ref && animation.transition(ref, {
    styles: {
      transform: 'translate(0, -140px)',
      opacity: 1
    },
    duration,
    timingFunction: 'ease-in'
  }, () => {
    callback && callback();
  });
}

function hidePig(ref, duration, callback) {
  ref && animation.transition(ref, {
    styles: {
      transform: 'translate(0, 0)',
      opacity: 0
    },
    duration,
    timingFunction: 'ease-out'
  }, () => {
    callback && callback();
  });
}

function shakePig(ref, callback) {
  const duration = isIos ? 20 : 10;
  ref && animation.transition(ref, {
    styles: {
      transform: 'rotate(12deg) translate(0, -140px)'
    },
    duration,
    timingFunction: 'ease-in'
  }, () => {
    animation.transition(ref, {
      styles: {
        transform: 'rotate(0) translate(0, -140px)'
      },
      duration,
      timingFunction: 'ease-out'
    }, () => {
      animation.transition(ref, {
        styles: {
          transform: 'rotate(-12deg) translate(0, -140px)'
        },
        duration,
        timingFunction: 'ease-in'
      }, () => {
        animation.transition(ref, {
          styles: {
            transform: 'rotate(0) translate(0, -140px)'
          },
          duration,
          timingFunction: 'ease-out'
        }, () => {
          callback && callback();
        });
      });
    });
  });
}

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const DEFAULT = {
  intervalTime: 400,
  hideAniTime: 300,
  showAniTime: 300,
  showTime: 400,
  randomTime: 300,
  width: 241,
  height: 206
};
/* harmony export (immutable) */ __webpack_exports__["DEFAULT"] = DEFAULT;


/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/09/06.
 * 红包雨区域检测类
 */



const Region = {
  regions: [],
  isCross(region) {
    const { regions } = this;

    region.right = region.left + region.width;
    region.bottom = region.top + region.height;

    for (let i = 0; i < regions.length; i++) {
      const curRegion = regions[i];
      // 两区域相交
      curRegion.right = curRegion.left + curRegion.width;
      curRegion.bottom = curRegion.top + curRegion.height;
      if (!(region.left > curRegion.right || region.right < curRegion.left || region.bottom < curRegion.top || region.top > curRegion.bottom)) {
        return true;
      }
    }
    return false;
  },
  get(width, height) {
    if (!width || !height) {
      return;
    }
    let i = 1000;
    const viewWidth = 750;
    const viewHeight = __WEBPACK_IMPORTED_MODULE_0__utils__["default"].env.getPageHeight();
    let wrapWidth = viewWidth - width;
    let wrapHeight = viewHeight - height - 140;
    wrapHeight = wrapHeight < 0 ? 0 : wrapHeight;
    wrapWidth = wrapWidth < 0 ? 0 : wrapWidth;

    const region = {
      left: '-9999px',
      top: '-9999px',
      width: width + 'px',
      height: height + 'px'
    };
    while (i--) {
      region.left = Math.round(Math.random() * wrapWidth) + 'px';
      region.top = Math.round(Math.random() * wrapHeight + height) + 'px';
      if (!this.isCross(region)) {
        this.add(region);
        return region;
      }
    }
  },
  buildRandom() {
    return new Date().getTime() + '_' + parseInt(Math.random() * 1000000);
  },
  add(region) {
    const { regions } = this;
    region.id = this.buildRandom();
    regions.push(region);
  },
  remove(region) {
    const { regions } = this;
    if (!region) return;
    for (let i = 0; i < regions.length; i++) {
      if (region.id === regions[i].id) {
        regions.splice(i, 1);
      }
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Region);

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.showItem && _vm.src) ? _c('image', {
    ref: ("rain-item-" + _vm.rainId),
    staticClass: ["rain-item"],
    style: _vm.pos,
    attrs: {
      "src": _vm.src
    },
    on: {
      "click": _vm.caught
    }
  }) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 155 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-lottery-rain"],
    style: _vm.wrapStyle
  }, _vm._l((_vm.picList), function(src, i) {
    return _c('rain-item', {
      key: "i",
      ref: ("rain-item-" + i),
      refInFor: true,
      attrs: {
        "src": src,
        "rainId": i
      },
      on: {
        "wxcLotteryRainCaught": _vm.wxcLotteryRainCaught
      }
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(157)
)

/* script */
__vue_exports__ = __webpack_require__(158)

/* template */
var __vue_template__ = __webpack_require__(159)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-c3860fae"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-minibar": {
    "width": "750",
    "height": "90",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "#009ff0"
  },
  "left": {
    "width": "180",
    "paddingLeft": "32"
  },
  "middle-title": {
    "fontSize": "30",
    "color": "#ffffff",
    "height": "36",
    "lineHeight": "34"
  },
  "right": {
    "width": "180",
    "paddingRight": "32",
    "alignItems": "flex-end"
  },
  "left-button": {
    "width": "21",
    "height": "36"
  },
  "right-button": {
    "width": "32",
    "height": "32"
  },
  "icon-text": {
    "fontSize": "28",
    "color": "#ffffff"
  }
}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Navigator = weex.requireModule('navigator');exports.default =
{
  props: {
    backgroundColor: {
      type: String,
      default: '#FFC900' },

    leftButton: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png' },

    textColor: {
      type: String,
      default: '#3D3D3D' },

    rightButton: {
      type: String,
      default: '' },

    title: {
      type: String,
      default: '标题' },

    leftText: {
      type: String,
      default: '' },

    rightText: {
      type: String,
      default: '' },

    useDefaultReturn: {
      type: Boolean,
      default: true },

    show: {
      type: Boolean,
      default: true },

    barStyle: {
      type: Object } },


  computed: {
    newBarStyle: function newBarStyle() {var
      backgroundColor = this.backgroundColor,barStyle = this.barStyle;
      return _extends({
        backgroundColor: backgroundColor },
      barStyle);

    } },

  methods: {
    leftButtonClicked: function leftButtonClicked() {
      if (this.useDefaultReturn) {
        Navigator.pop({}, function (e) {
        });
      }
      this.$emit('wxcMinibarLeftButtonClicked', {});
    },
    rightButtonClicked: function rightButtonClicked() {
      var hasRightContent = this.rightText || this.rightButton || this.$slots && this.$slots.right;
      hasRightContent && this.$emit('wxcMinibarRightButtonClicked', {});
    } } };

/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: ["wxc-minibar"],
    style: _vm.newBarStyle
  }, [_c('div', {
    staticClass: ["left"],
    attrs: {
      "ariaLabel": "返回",
      "accessible": true
    },
    on: {
      "click": _vm.leftButtonClicked
    }
  }, [_vm._t("left", [(_vm.leftButton && !_vm.leftText) ? _c('image', {
    staticClass: ["left-button"],
    attrs: {
      "src": _vm.leftButton
    }
  }) : _vm._e(), (_vm.leftText) ? _c('text', {
    staticClass: ["icon-text"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.leftText))]) : _vm._e()])], 2), _vm._t("middle", [_c('text', {
    staticClass: ["middle-title"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.title))])]), _c('div', {
    staticClass: ["right"],
    on: {
      "click": _vm.rightButtonClicked
    }
  }, [_vm._t("right", [(_vm.rightButton && !_vm.rightText) ? _c('image', {
    staticClass: ["right-button"],
    attrs: {
      "src": _vm.rightButton,
      "ariaHidden": true
    }
  }) : _vm._e(), (_vm.rightText) ? _c('text', {
    staticClass: ["icon-text"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.rightText))]) : _vm._e()])], 2)], 2) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(162)
)

/* script */
__vue_exports__ = __webpack_require__(163)

/* template */
var __vue_template__ = __webpack_require__(165)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-46860b88"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-noticebar": {
    "width": "750",
    "paddingTop": "10",
    "paddingBottom": "10",
    "paddingLeft": "24",
    "backgroundColor": "#FFF7D6",
    "borderBottomWidth": "1",
    "borderTopWidth": "1",
    "borderColor": "#FFEEAE",
    "borderStyle": "solid",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "noticebar-content": {
    "color": "#EE9900",
    "fontSize": "26",
    "lineHeight": "36",
    "width": "592",
    "textOverflow": "ellipsis"
  },
  "more-click-content": {
    "width": "64",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "mode-ICON": {
    "width": "32",
    "height": "32"
  },
  "type-ICON": {
    "width": "32",
    "height": "32"
  }
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });






























































var _type = __webpack_require__(164);var _type2 = _interopRequireDefault(_type);
var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default = { props: { notice: { type: String, default: '' }, noticeUrl: { type: String, default: '' }, mode: { type: String, default: '' }, lines: { type: [Number, String], default: 1 }, type: { type: String, default: '' }, spm: { type: String, default: '' } }, computed: { contentWidth: function contentWidth() {return this.mode ? 605 : 683;}, modeIcon: function modeIcon() {var modeIcon = void 0;switch (this.mode) {case 'link':modeIcon = _type2.default.linkIcon;break;case 'closable':modeIcon = _type2.default.closeIcon;break;default:modeIcon = '';}return modeIcon;}, typeIcon: function typeIcon() {var typeIcon = void 0;switch (this.type) {case 'success':typeIcon = _type2.default.successIcon;break;case 'error':typeIcon = _type2.default.errorIcon;break;case 'info':typeIcon = _type2.default.infoIcon;break;case 'question':typeIcon = _type2.default.questionIcon;break;case 'warn':
          typeIcon = _type2.default.warnIcon;
          break;
        case 'time':
          typeIcon = _type2.default.timeIcon;
          break;
        case 'redbag':
          typeIcon = _type2.default.redbag;
          break;
        default:
          typeIcon = '';}

      return typeIcon;
    } },

  data: function data() {return {
      show: true };},

  methods: {
    noticeBarClicked: function noticeBarClicked() {var
      mode = this.mode,noticeUrl = this.noticeUrl,spm = this.spm;
      if (mode === 'link' && noticeUrl) {var
        ttid = weex.config.env.ttid;
        _utils2.default.goToH5Page(noticeUrl, spm, ttid, true);
        this.$emit('wxcNoticebarLinkClicked', { url: noticeUrl });
      }
    },
    noticeIconClicked: function noticeIconClicked() {var
      mode = this.mode;
      if (mode === 'closable') {
        this.show = false;
        this.$emit('wxcNoticebarCloseClicked', {});
      } else {
        this.noticeBarClicked();
      }
    } } };

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by Tw93 on 2016/10/29.
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  closeIcon: 'https://gw.alicdn.com/tfs/TB1THvhpwMPMeJjy1XcXXXpppXa-32-32.png',
  linkIcon: 'https://gw.alicdn.com/tfs/TB1utlZpwMPMeJjy1XdXXasrXXa-32-32.png',
  infoIcon: 'https://gw.alicdn.com/tfs/TB1xdlZpwMPMeJjy1XdXXasrXXa-32-32.png',
  warnIcon: 'https://gw.alicdn.com/tfs/TB1TCvhpwMPMeJjy1XcXXXpppXa-32-32.png',
  successIcon: 'https://gw.alicdn.com/tfs/TB12Em8pwMPMeJjy1XbXXcwxVXa-32-32.png',
  errorIcon: 'https://gw.alicdn.com/tfs/TB1UCvhpwMPMeJjy1XcXXXpppXa-32-32.png',
  questionIcon: 'https://gw.alicdn.com/tfs/TB1vJlZpwMPMeJjy1XdXXasrXXa-32-32.png',
  timeIcon: 'https://gw.alicdn.com/tfs/TB1eSzhpwMPMeJjy1XcXXXpppXa-30-30.png',
  redbag: 'https://gw.alicdn.com/tfs/TB1dCzhpwMPMeJjy1XcXXXpppXa-32-32.png'
});

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: ["wxc-noticebar"],
    attrs: {
      "accessible": true,
      "ariaLabel": _vm.notice
    },
    on: {
      "click": _vm.noticeBarClicked
    }
  }, [(_vm.typeIcon) ? _c('image', {
    staticClass: ["type-ICON"],
    attrs: {
      "src": _vm.typeIcon
    }
  }) : _vm._e(), _c('text', {
    staticClass: ["noticebar-content"],
    style: {
      width: _vm.contentWidth + 'px',
      lines: _vm.lines
    }
  }, [_vm._v(_vm._s(_vm.notice))]), (_vm.modeIcon) ? _c('div', {
    staticClass: ["more-click-content"],
    attrs: {
      "mode": _vm.mode
    },
    on: {
      "click": _vm.noticeIconClicked
    }
  }, [_c('image', {
    staticClass: ["mode-ICON"],
    attrs: {
      "src": _vm.modeIcon
    }
  })]) : _vm._e()]) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(168)
)

/* script */
__vue_exports__ = __webpack_require__(169)

/* template */
var __vue_template__ = __webpack_require__(171)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-29e8056e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-page-calendar": {
    "position": "fixed",
    "width": "750",
    "color": "#333333",
    "backgroundColor": "#ffffff"
  },
  "flex-item": {
    "flex": 1,
    "textAlign": "center"
  },
  "calendar-weekday": {
    "height": "60",
    "backgroundColor": "#ffffff",
    "borderBottomWidth": "1",
    "borderTopWidth": "1",
    "borderColor": "#e2e2e2",
    "flexDirection": "row",
    "justifyContent": "space-around",
    "alignItems": "center"
  },
  "weekday-text": {
    "color": "#000000",
    "flex": 1,
    "fontSize": "24",
    "textAlign": "center"
  },
  "calendar-list": {
    "flex": 1
  },
  "month-text": {
    "fontSize": "32",
    "height": "60",
    "lineHeight": "60",
    "width": "750",
    "textAlign": "center",
    "alignItems": "center",
    "backgroundColor": "#f2f3f4"
  },
  "calendar-row": {
    "height": "140",
    "flexDirection": "row",
    "backgroundColor": "#ffffff",
    "borderBottomWidth": "1",
    "borderColor": "#f2f3f4",
    "alignItems": "center",
    "justifyContent": "space-between"
  },
  "row-item": {
    "flex": 1,
    "height": "140",
    "paddingTop": "10",
    "paddingBottom": "10",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "iphone-x": {
    "height": "68"
  },
  "calendar-note": {
    "height": "36",
    "lineHeight": "36",
    "fontSize": "24",
    "color": "#000000",
    "textAlign": "center"
  },
  "calendar-day": {
    "height": "48",
    "lineHeight": "48",
    "fontSize": "36",
    "color": "#000000",
    "textAlign": "center"
  },
  "calendar-ext": {
    "height": "36",
    "lineHeight": "36",
    "color": "#999999",
    "textAlign": "center",
    "fontSize": "24",
    "textOverflow": "ellipsis"
  },
  "calendar-holiday": {
    "color": "#FF5000"
  },
  "calendar-rest": {
    "color": "#FF5000"
  },
  "item-row-selected": {
    "color": "#ffffff",
    "backgroundColor": "#FFC900",
    "textAlign": "center"
  },
  "item-text-selected": {
    "color": "#3d3d3d",
    "textAlign": "center"
  },
  "calendar-disabled": {
    "color": "#CCCCCC"
  },
  "cell-disabled": {
    "backgroundColor": "#FBFBFB"
  },
  "calendar-day-include": {
    "backgroundColor": "#FFF7D6"
  }
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });













































var _format = __webpack_require__(170);var Format = _interopRequireWildcard(_format);
var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);





var _wxcMinibar = __webpack_require__(25);var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var isWeb = _utils2.default.env.isWeb();var dom = weex.requireModule('dom');exports.default = { components: { WxcMinibar: _wxcMinibar2.default }, props: { selectedDate: Array, animationType: { type: String, default: 'push' }, dateRange: { type: Array, required: true, default: function _default() {return [];} }, minibarCfg: { type: Object, default: function _default() {return { 'title': '选择日期', 'background-color': '#FFC900', 'text-color': '#3D3D3D' };} }, showHeader: { type: Boolean, default: false }, selectedNote: { type: Array, default: function _default() {return ['开始', '到达', '往返'];} }, isRange: { type: Boolean, default: false }, needDestroy: { type: Boolean, default: false }, descList: { type: Array, default: function _default() {return [];} }, selectedCellStyle: { type: Object, default: function _default() {return {};} },

    selectedTextStyle: {
      type: Object,
      default: function _default() {return {};} } },


  data: function data() {return {
      isShow: false,
      reSelect: true,
      today: Format.getToDay(),
      departDate: '',
      arriveDate: '' };},

  computed: {
    calendarExtendStyle: function calendarExtendStyle() {
      return _utils2.default.uiStyle.pageTransitionAnimationStyle(this.animationType);
    },
    monthsArray: function monthsArray() {var
      range = this.dateRange,today = this.today,departDate = this.departDate,arriveDate = this.arriveDate,selectedNote = this.selectedNote,descList = this.descList;
      var param = { range: range, today: today, departDate: departDate, arriveDate: arriveDate, selectedNote: selectedNote, descList: descList };
      return Format.generateDateCell(param);
    } },

  created: function created() {
    this.isIPhoneX = _utils2.default.env.isIPhoneX();
    this.showTitle = isWeb || this.showHeader;
    this.detectShow();
  },
  mounted: function mounted() {var _this = this;var
    needDestroy = this.needDestroy;
    var hold = isWeb ? 700 : 100;
    !needDestroy && setTimeout(function () {
      _this.isShow = true;
      _this.scrollToDate();
    }, hold);
  },
  watch: {
    needDestroy: function needDestroy(newVal, preVal) {var _this2 = this;
      if (!newVal && newVal !== preVal) {
        setTimeout(function () {
          _this2.isShow = true;
        }, 200);
      }
    } },

  methods: {
    minibarLeftButtonClick: function minibarLeftButtonClick() {var _this3 = this;
      setTimeout(function () {
        _this3.hide();
        _this3.$emit('wxcPageCalendarBackClicked', {});
      }, 100);
    },
    onClickDate: function onClickDate(datConfig) {
      var self = this;
      if (datConfig.disabled || datConfig.isEmpty) return;

      if (self.reSelect) {
        self.departDate = '';
        self.arriveDate = '';
        self.reSelect = false;
      }

      if (self.isRange) {
        if (self.departDate && Date.parse(self.departDate) <= Date.parse(datConfig.date)) {
          self.arriveDate = datConfig.date;
        } else {
          self.departDate = datConfig.date;
        }
        if (self.departDate && self.arriveDate) {
          self.dispatchDateChange([self.departDate, self.arriveDate]);
        }
      } else {
        self.departDate = datConfig.date;
        self.dispatchDateChange([self.departDate]);
      }
    },
    scrollToDate: function scrollToDate() {var _this4 = this;
      setTimeout(function () {
        if (_this4.departDate) {
          var el = _this4.$refs.departDate[0];
          el && dom.getComponentRect && dom.getComponentRect(el, function (e) {
            if (e && e.result) {var
              bottom = e.size.bottom;var
              env = weex.config.env;
              // 误差
              var height = env.deviceHeight / env.deviceWidth * 750 - 50;
              if (bottom > height || bottom === 0) {
                dom.scrollToElement(el, { offset: -146, animated: false });
              }
            }
          });
        }
      }, 10);
    },
    dispatchDateChange: function dispatchDateChange(dateArr) {var _this5 = this;
      var duration = isWeb ? 400 : 600;
      setTimeout(function () {
        _this5.hide();
      }, duration);
      this.$emit('wxcPageCalendarDateSelected', {
        date: dateArr });

    },
    detectShow: function detectShow() {
      if (this.isRange && this.selectedDate.length >= 2) {
        this.departDate = this.selectedDate[0];
        this.arriveDate = this.selectedDate[1];
      } else if (this.selectedDate.length >= 1) {
        this.departDate = this.selectedDate[0];
        this.arriveDate = '';
      }
    },
    _animate: function _animate(status) {var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var ref = this.$refs.pageCalendar;
      if (this.animationType === 'push') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateX(' + (status ? -750 : 750) + 'px)', status, callback);
      } else if (this.animationType === 'model') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateY(' + (status ? -_utils2.default.env.getScreenHeight() : _utils2.default.env.getScreenHeight()) + 'px)', status, callback);
      }
    },
    show: function show() {var
      needDestroy = this.needDestroy;
      needDestroy && (this.isShow = true);
      this.reSelect = true;
      this.detectShow();
      this._animate(true);
      needDestroy && this.scrollToDate();
    },
    hide: function hide() {
      this.needDestroy && (this.isShow = false);
      this.reSelect = false;
      this._animate(false);
      this.$emit('wxcPageCalendarHide', {});
    } } };

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["_getTraditionalHoliday"] = _getTraditionalHoliday;
/* harmony export (immutable) */ __webpack_exports__["_isDate"] = _isDate;
/* harmony export (immutable) */ __webpack_exports__["_checkHash"] = _checkHash;
/* harmony export (immutable) */ __webpack_exports__["getTime"] = getTime;
/* harmony export (immutable) */ __webpack_exports__["_isInRange"] = _isInRange;
/* harmony export (immutable) */ __webpack_exports__["_isInSelectRange"] = _isInSelectRange;
/* harmony export (immutable) */ __webpack_exports__["_fixNum"] = _fixNum;
/* harmony export (immutable) */ __webpack_exports__["_isWeekend"] = _isWeekend;
/* harmony export (immutable) */ __webpack_exports__["_isToday"] = _isToday;
/* harmony export (immutable) */ __webpack_exports__["_getMonthDays"] = _getMonthDays;
/* harmony export (immutable) */ __webpack_exports__["_getPadding"] = _getPadding;
/* harmony export (immutable) */ __webpack_exports__["_unique"] = _unique;
/* harmony export (immutable) */ __webpack_exports__["getToDay"] = getToDay;
/* harmony export (immutable) */ __webpack_exports__["getWeekRows"] = getWeekRows;
/* harmony export (immutable) */ __webpack_exports__["generateDateCell"] = generateDateCell;
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/07/29.
 */

// 国际节日
const GLOBAL_HOLIDAY = {
  '01-01': '元旦',
  '02-14': '情人',
  '05-01': '劳动',
  '06-01': '儿童',
  '10-01': '国庆',
  '12-25': '圣诞'
};
/* harmony export (immutable) */ __webpack_exports__["GLOBAL_HOLIDAY"] = GLOBAL_HOLIDAY;


// 传统节日
const TRADITIONAL_HOLIDAY = {
  '除夕': ['2015-02-18', '2016-02-07', '2017-01-27', '2018-02-15', '2019-02-04', '2020-01-24'],
  '春节': ['2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05', '2020-01-25'],
  '元宵': ['2015-03-05', '2016-02-22', '2017-02-11', '2018-03-02', '2019-02-19', '2020-02-08'],
  '清明': ['2015-04-05', '2016-04-04', '2017-04-04', '2018-04-05', '2019-04-05', '2020-04-04'],
  '端午': ['2015-06-20', '2016-06-09', '2017-05-30', '2018-06-18', '2019-06-07', '2020-06-25'],
  '中秋': ['2015-09-27', '2016-09-15', '2017-10-04', '2018-09-24', '2019-09-13', '2020-10-01'],
  '重阳': ['2015-10-21', '2016-10-09', '2017-10-28', '2018-10-17', '2019-10-07', '2020-10-25']
};

// 放假日
const REST_DAYS = ['2017-10-01', '2017-10-02', '2017-10-03', '2017-10-04', '2017-10-05', '2017-10-06', '2017-10-07', '2017-10-08'];

// 工作日
const WORK_DAYS = ['2017-09-30'];

function _getTraditionalHoliday() {
  const HOLIDAY_TEMP = {};

  const keys = Object.keys(TRADITIONAL_HOLIDAY);
  keys.forEach(k => {
    const arr = TRADITIONAL_HOLIDAY[k];
    arr.forEach(i => {
      HOLIDAY_TEMP[i] = k;
    });
  });
  return HOLIDAY_TEMP;
}

function _isDate(obj) {
  const type = obj === null ? String(obj) : {}.toString.call(obj) || 'object';
  return type === '[object date]';
}

/**
 * 检测Hash
 *
 * @method _checkHash
 * @private
 */
function _checkHash(url, hash) {
  return url && url.match(/#/) && url.replace(/^.*#/, '') === hash;
}

/**
 * 获取当前日期的毫秒数
 * @method getTime
 * @param {String} date
 * @return {Number}
 */
function getTime(date) {
  if (_isDate(date)) {
    return new Date(date).getTime();
  } else {
    try {
      return new Date(date.replace(/-/g, '/')).getTime();
    } catch (e) {
      return 0;
    }
  }
}

function _isInRange(range, date) {
  const start = getTime(range[0]);
  const end = getTime(range[1]);
  const d = getTime(date);
  return start <= d && end >= d;
}

function _isInSelectRange(range, date) {
  const start = getTime(range[0]);
  const end = getTime(range[1]);
  const d = getTime(date);
  return start < d && end > d;
}

function _fixNum(num) {
  return (num < 10 ? '0' : '') + num;
}

/**
 * 是否是周末
 * @method isWeekend
 * @param {String} date
 * @return {Boolean}
 */
function _isWeekend(date) {
  const day = new Date(date.replace(/-/g, '/')).getDay();
  return day === 0 || day === 6;
}

/**
 * 是否是今天
 * @method isToday
 * @param {String} date
 * @return {Boolean}
 */
function _isToday(today, date) {
  return getTime(today) === getTime(date);
}

/**
 * 检查是否是闰年
 * @method _checkLeapYear
 * @param {Number} y 年份
 * @param {Date} t today
 * @protected
 */
function _getMonthDays(y, t) {
  const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const year = y || t.getFullYear();
  let isLeapYear = false;

  if (year % 100) {
    isLeapYear = !(year % 4);
  } else {
    isLeapYear = !(year % 400);
  }

  if (isLeapYear) {
    MONTH_DAYS[1] = 29;
  } else {
    MONTH_DAYS[1] = 28;
  }
  return MONTH_DAYS;
}

/**
 * 当月1号前面有多少空格
 * @method _getPadding
 * @protected
 */
function _getPadding(year, month) {
  const date = new Date(year + '/' + month + '/1');
  return date.getDay();
}

function _unique(array) {
  return Array.prototype.filter.call(array, function (item, index) {
    return array.indexOf(item) === index;
  });
}

function getToDay() {
  return new Date().getFullYear() + '-' + _fixNum(new Date().getMonth() + 1) + '-' + _fixNum(new Date().getDate());
}

function getWeekRows(y, m, today, dateRange, departDate, arriveDate, selectedNote, descList) {
  const monthDays = _getMonthDays(y, today);
  const padding = _getPadding(y, m, 7);
  const num = monthDays[m - 1] + padding;
  const rows = Math.ceil(num / 7);
  const remain = num % 7;
  const rowsData = [];

  for (let i = 1; i <= rows; i++) {
    const cells = [];

    for (let j = 1; j <= 7; j++) {
      let cell = {};
      // 前后空格
      if (i === 1 && j <= padding || remain && i === rows && j > remain) {
        cell.isEmpty = true;
      } else {
        const d = (i - 1) * 7 + j - padding;
        const date = y + '-' + _fixNum(m) + '-' + _fixNum(d);
        let cls = [];
        let ref = '';
        const cellClass = [];
        const isInRange = _isInRange(dateRange, date);
        let disabled = false;
        const global = _fixNum(m) + '-' + _fixNum(d);
        let note = '';
        let ext = '';
        let isSelected = false;

        if (descList && descList.length > 0) {
          const nowDesc = descList.filter(item => item.date === date);
          if (nowDesc && nowDesc.length > 0) {
            ext = nowDesc[0].value;
            if (nowDesc[0].emphasize) {
              cls.push('calendar-holiday');
            }
          }
        }

        // 国际节日
        if (GLOBAL_HOLIDAY[global]) {
          note = GLOBAL_HOLIDAY[global];
          cls.push('calendar-holiday');
        }

        const tHoliday = _getTraditionalHoliday()[date];

        // 传统节日
        if (tHoliday) {
          note = tHoliday;
          cls.push('calendar-holiday');
        }
        // 放假日
        if (REST_DAYS.indexOf(date) > -1) {
          cls.push('calendar-holiday');
        }

        // 工作日
        if (WORK_DAYS.indexOf(date) > -1) {
          cls.push('calendar-work');
        }

        // 周末
        if (_isWeekend(date)) {
          cls.push('calendar-holiday');
        }

        // 今天
        if (_isToday(today, date)) {
          cls.push('calendar-today');
          note = '今天';
        }

        // 不在日期范围内
        if (!isInRange) {
          disabled = true;
        }

        if (disabled) {
          cls = [];
          cls.push('calendar-disabled');
          cellClass.push('cell-disabled');
        }

        if (!ext && disabled && isInRange) {
          ext = '不可选';
        }

        if (departDate === date || arriveDate === date) {
          note = departDate === date ? selectedNote[0] : selectedNote[1];
          ref = departDate === date ? 'departDate' : 'arriveDate';
          if (departDate === arriveDate && selectedNote.length >= 3) {
            note = selectedNote[2];
          }
          isSelected = true;
          cls.push('item-text-selected');
          cellClass.push('item-row-selected');
        }

        if (departDate && arriveDate && _isInSelectRange([departDate, arriveDate], date)) {
          cellClass.push('calendar-day-include');
        }

        cell = {
          isSelected,
          isEmpty: false,
          ref,
          cls: _unique(cls).join(' '),
          cellClass: _unique(cellClass).join(' '),
          note: note,
          date: date,
          ext: ext,
          disabled: disabled,
          text: d
        };
      }
      cells.push(cell);
    }

    rowsData.push(cells);
  }

  return rowsData;
}

function generateDateCell({ range, today, departDate, arriveDate, selectedNote, descList }) {
  const start = new Date(range[0].replace(/-/g, '/'));
  const end = new Date(range[1].replace(/-/g, '/'));
  const startYear = start.getFullYear();
  const startMonth = start.getMonth() + 1;
  const endYear = end.getFullYear();
  const endMonth = end.getMonth() + 1;

  const l = (endYear - startYear) * 12 + endMonth - startMonth + 1;
  let y = startYear;
  let n = startMonth;
  const months = [];

  for (let i = 0; i < l; i++) {
    if (n > 12) {
      n = 1;
      y++;
    }
    months.push({ title: `${y}-${_fixNum(n)}` }, ...getWeekRows(y, n, today, range, departDate, arriveDate, selectedNote, descList));
    n++;
  }
  return months;
}

/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "pageCalendar",
    staticClass: ["wxc-page-calendar"],
    style: _vm.calendarExtendStyle
  }, [_c('wxc-minibar', _vm._b({
    attrs: {
      "show": _vm.showTitle,
      "useDefaultReturn": false
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick
    }
  }, 'wxc-minibar', _vm.minibarCfg, false)), (_vm.isShow) ? _c('div', {
    staticClass: ["calendar-weekday"]
  }, _vm._l((['日', '一', '二', '三', '四', '五', '六']), function(week, k) {
    return _c('text', {
      key: k,
      staticClass: ["flex-item", "weekday-text"],
      attrs: {
        "ariaLabel": ("周" + week)
      }
    }, [_vm._v(_vm._s(week))])
  })) : _vm._e(), (_vm.isShow) ? _c('list', {
    staticClass: ["calendar-list"]
  }, [_vm._l((_vm.monthsArray), function(month, index) {
    return _c('cell', {
      key: index,
      class: [!month.title && 'calendar-row'],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [(month.title) ? _c('text', {
      staticClass: ["month-text"]
    }, [_vm._v(_vm._s(month.title))]) : _vm._l((month), function(cell, rowIndex) {
      return _c('div', {
        key: (index + "-" + rowIndex),
        ref: cell.ref,
        refInFor: true,
        class: ['row-item', cell.cellClass],
        style: cell.isSelected ? _vm.selectedCellStyle : {},
        attrs: {
          "accessible": true,
          "ariaLabel": ((cell.text?cell.text:'') + "," + (cell.note?cell.note:'') + "," + (cell.ext?cell.ext:''))
        },
        on: {
          "click": function($event) {
            _vm.onClickDate(cell)
          }
        }
      }, [_c('text', {
        class: ['calendar-note', cell.cls],
        style: cell.isSelected ? _vm.selectedTextStyle : {}
      }, [_vm._v(_vm._s(cell.note))]), _c('text', {
        class: ['calendar-day', cell.cls],
        style: cell.isSelected ? _vm.selectedTextStyle : {}
      }, [_vm._v(_vm._s(cell.text))]), _c('text', {
        class: ['calendar-ext', cell.cls],
        style: cell.isSelected ? _vm.selectedTextStyle : {}
      }, [_vm._v(_vm._s(cell.ext))])])
    })], 2)
  }), (_vm.isIPhoneX) ? _c('cell', {
    staticClass: ["iphone-x"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }) : _vm._e()], 2) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(174)

/* template */
var __vue_template__ = __webpack_require__(175)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });























var _indexWeex = __webpack_require__(2);var _indexWeex2 = _interopRequireDefault(_indexWeex);
var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);
var _bindEnv = __webpack_require__(1);var _bindEnv2 = _interopRequireDefault(_bindEnv);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  props: {
    url: {
      type: String,
      default: '' },

    needSlider: {
      type: Boolean,
      default: true } },


  data: function data() {return {
      isPanning: false,
      appearMap: [],
      supportAndroid: _bindEnv2.default.supportsEBForAndroid() };},

  mounted: function mounted() {var _this = this;
    setTimeout(function () {
      if (_this.supportAndroid && _this.needSlider) {
        var element = _this.$refs['wxc-pan-item'];
        _indexWeex2.default.prepare && _indexWeex2.default.prepare({
          anchor: element.ref,
          eventType: 'pan' });

      }
    }, 300);
  },
  methods: {
    itemClicked: function itemClicked() {
      if (this.isPanning) {
        return;
      }
      this.url && _utils2.default.goToH5Page(this.url, true);
      this.$emit('wxcPanItemClicked', { extId: this.extId });
    },

    dispatchPan: function dispatchPan(e) {var _this2 = this;
      if (this.supportAndroid && this.needSlider) {
        if (e.state === 'start') {
          this.isPanning = true;
          var element = this.$refs['wxc-pan-item'];
          element && this.$emit('wxcPanItemPan', { element: element });
        } else if (e.state === 'end') {
          setTimeout(function () {
            _this2.isPanning = false;
          }, 50);
        }
      }
    } } }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 175 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.supportAndroid) ? _c('div', {
    ref: "wxc-pan-item",
    on: {
      "horizontalpan": _vm.dispatchPan,
      "appear": _vm.onItemAppear,
      "disappear": _vm.onItemDisAppear,
      "click": _vm.itemClicked
    }
  }, [_vm._t("default")], 2) : _c('div', {
    ref: "wxc-pan-item",
    on: {
      "click": _vm.itemClicked
    }
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(178)

/* template */
var __vue_template__ = __webpack_require__(179)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });















var _type = __webpack_require__(24);exports.default =

{
  props: {
    show: {
      type: Boolean,
      default: false },

    width: {
      type: [Number, String],
      default: 36 },

    height: {
      type: [Number, String],
      default: 36 } },


  data: function data() {return {
      PART: _type.PART };},

  computed: {
    loadingStyle: function loadingStyle() {var
      height = this.height,width = this.width;
      return {
        height: height + 'px',
        width: width + 'px' };

    } } }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('image', {
    style: _vm.loadingStyle,
    attrs: {
      "src": _vm.PART,
      "resize": "contain",
      "quality": "original"
    }
  }) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(182)
)

/* script */
__vue_exports__ = __webpack_require__(183)

/* template */
var __vue_template__ = __webpack_require__(184)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-ccdb299c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "zIndex": 999
  },
  "g-cover": {
    "position": "fixed",
    "top": 0,
    "right": 0,
    "left": 0,
    "bottom": 0,
    "backgroundColor": "rgba(0,0,0,0.4)",
    "zIndex": 1
  },
  "g-popover": {
    "position": "fixed",
    "paddingTop": "15",
    "paddingRight": "15",
    "paddingBottom": "15",
    "paddingLeft": "15",
    "zIndex": 10
  },
  "u-popover-arrow": {
    "position": "absolute",
    "borderRadius": "4",
    "width": "30",
    "height": "30",
    "backgroundColor": "#ffffff"
  },
  "u-popover-inner": {
    "borderRadius": "10",
    "backgroundColor": "#ffffff"
  },
  "i-btn": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginLeft": "20",
    "marginRight": "20",
    "paddingLeft": "20",
    "paddingRight": "20",
    "borderBottomWidth": "1",
    "borderBottomColor": "#dddddd"
  },
  "i-btn-noborder": {
    "borderBottomColor": "#ffffff"
  },
  "btn-icon": {
    "width": "32",
    "height": "32",
    "marginRight": "16"
  },
  "btn-text": {
    "flex": 1,
    "height": "80",
    "fontSize": "30",
    "lineHeight": "80"
  },
  "text-align-center": {
    "textAlign": "center"
  }
}

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');exports.default =
{
  props: {
    buttons: {
      type: Array,
      default: [] },

    position: {
      type: Object,
      default: function _default() {return {
          x: 0,
          y: 0 };} },


    arrowPosition: {
      type: Object,
      default: function _default() {return {
          pos: 'top',
          x: 0,
          y: 0 };} },


    coverColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)' },

    hasAnimation: {
      type: Boolean,
      default: true },

    textStyle: Object },

  data: function data() {return {
      show: false,
      showIn: false };},

  computed: {
    coverStyle: function coverStyle() {
      return this.coverColor ? { backgroundColor: this.coverColor, opacity: this.hasAnimation || !this.showIn ? '0' : '1' } : '';
    },
    transformOrigin: function transformOrigin() {var _arrowPosition =
      this.arrowPosition,_arrowPosition$x = _arrowPosition.x,x = _arrowPosition$x === undefined ? 0 : _arrowPosition$x,_arrowPosition$y = _arrowPosition.y,y = _arrowPosition$y === undefined ? 0 : _arrowPosition$y,_arrowPosition$pos = _arrowPosition.pos,pos = _arrowPosition$pos === undefined ? 'top' : _arrowPosition$pos,
      _origins = [];
      switch (pos) {
        case 'top':
        case 'bottom':
          _origins = [x < 0 ? 'right' : 'left', pos];
          break;
        case 'left':
        case 'right':
          _origins = [pos, y < 0 ? 'bottom' : 'top'];
          break;}

      return _origins.join(' ');
    },
    contentTransform: function contentTransform() {var _arrowPosition2 =
      this.arrowPosition,_arrowPosition2$x = _arrowPosition2.x,x = _arrowPosition2$x === undefined ? 0 : _arrowPosition2$x,_arrowPosition2$y = _arrowPosition2.y,y = _arrowPosition2$y === undefined ? 0 : _arrowPosition2$y,_arrowPosition2$pos = _arrowPosition2.pos,pos = _arrowPosition2$pos === undefined ? 'top' : _arrowPosition2$pos,
      _translates = ['scale(0)'];
      if (x >= 0 && x < 22) {
        x = 22;
      } else if (x < 0 && x > -22) {
        x = -22;
      }
      if (y >= 0 && y < 22) {
        y = 22;
      } else if (y < 0 && y > -22) {
        y = -22;
      }
      switch (pos) {
        case 'top':
        case 'bottom':
          _translates[1] = 'translateX(' + (x < 0 ? x - 15 : x + 15) + 'px)';
          break;
        case 'left':
        case 'right':
          _translates[1] = 'translateY(' + (y < 0 ? y - 15 : y + 15) + 'px)';
          break;}

      return _translates.join(' ');
    },
    contentStyle: function contentStyle() {var _position =
      this.position,_position$x = _position.x,x = _position$x === undefined ? 0 : _position$x,_position$y = _position.y,y = _position$y === undefined ? 0 : _position$y,
      style = {};
      x < 0 ? style.right = -x + 'px' : style.left = x + 'px';
      y < 0 ? style.bottom = -y + 'px' : style.top = y + 'px';
      style.opacity = this.hasAnimation || !this.showIn ? '0' : '1';
      style.transform = this.hasAnimation || !this.showIn ? this.contentTransform : 'scale(1)';
      style.transformOrigin = this.transformOrigin;
      return style;
    },
    arrowStyle: function arrowStyle() {var _arrowPosition3 =
      this.arrowPosition,_arrowPosition3$pos = _arrowPosition3.pos,pos = _arrowPosition3$pos === undefined ? 'top' : _arrowPosition3$pos,_arrowPosition3$x = _arrowPosition3.x,x = _arrowPosition3$x === undefined ? 0 : _arrowPosition3$x,_arrowPosition3$y = _arrowPosition3.y,y = _arrowPosition3$y === undefined ? 0 : _arrowPosition3$y,
      style = {};
      switch (pos) {
        case 'top':
          style.top = '6px';
        case 'bottom':
          !style.top && (style.bottom = '6px');
          style.transform = 'scaleX(0.8) rotate(45deg)';
          if (x >= 0 && x < 22) {
            x = 22;
          } else if (x < 0 && x > -22) {
            x = -22;
          }
          x < 0 ? style.right = -x + 'px' : style.left = x + 'px';
          break;
        case 'left':
          style.left = '6px';
        case 'right':
          !style.left && (style.right = '6px');
          style.transform = 'scaleY(0.8) rotate(45deg)';
          if (y >= 0 && y < 22) {
            y = 22;
          } else if (y < 0 && y > -22) {
            y = -22;
          }
          y < 0 ? style.bottom = -y + 'px' : style.top = y + 'px';
          break;
        default:
          break;}

      return style;
    } },

  methods: {
    wxcPopoverShow: function wxcPopoverShow() {var _this = this;
      if (!!this.animationLock) {
        return;
      }
      this.show = true;
      if (this.hasAnimation) {
        setTimeout(function () {return _this.wxcPopoverAnimationShow();}, 40);
      } else {
        setTimeout(function () {return _this.showIn = true;}, 40);
      }
    },
    /**
       * smooth in
       **/
    wxcPopoverAnimationShow: function wxcPopoverAnimationShow() {var _this2 = this;
      var popoverEl = this.$refs['wxc-popover'];
      var coverEl = this.$refs['wxc-cover'];
      if (!coverEl || !popoverEl) {
        return;
      }
      this.setAnimationLock();
      var a1End = false,a2End = false;
      animation.transition(popoverEl, {
        styles: {
          opacity: 1,
          transform: "scale(1)",
          transformOrigin: this.transformOrigin },

        delay: 0,
        duration: 250,
        timingFunction: 'ease-out' },
      function (e) {
        a1End = true;
        if (a1End && a2End) {
          _this2.animationLock = false;
        }
      });

      animation.transition(coverEl, {
        styles: {
          opacity: 1 },

        delay: 0,
        duration: 250,
        timingFunction: 'ease-in' },
      function (e) {
        a2End = true;
        if (a1End && a2End) {
          _this2.animationLock = false;
        }
      });
    },
    wxcButtonClicked: function wxcButtonClicked(index, key) {
      if (!!this.animationLock) {
        return;
      }
      this.$emit('wxcPopoverButtonClicked', { key: key, index: index });
      this.hideAction();
    },
    /**
       * 隐藏操作
       */
    hideAction: function hideAction() {var _this3 = this;
      if (!!this.animationLock) {
        return;
      }
      if (this.hasAnimation) {
        this.setAnimationLock();
        var popoverEl = this.$refs['wxc-popover'];
        var coverEl = this.$refs['wxc-cover'];
        if (!popoverEl || !coverEl) {
          return;
        }
        var a1End = false,a2End = false;
        animation.transition(popoverEl, {
          styles: {
            opacity: 0,
            transform: this.contentTransform,
            transformOrigin: this.transformOrigin },

          duration: 250 },
        function () {
          a1End = true;
          if (a1End && a2End) {
            _this3.show = false;
            _this3.showIn = false;
            _this3.animationLock = false;
          }
        });
        animation.transition(coverEl, {
          styles: {
            opacity: 0 },

          duration: 250 },
        function () {
          a2End = true;
          if (a1End && a2End) {
            _this3.show = false;
            _this3.showIn = false;
            _this3.animationLock = false;
          }
        });
      } else {
        this.show = false;
        this.showIn = false;
      }
    },
    /**
       * 设置动画锁
       */
    setAnimationLock: function setAnimationLock() {
      this.animationLock = true;
    } } };

/***/ }),
/* 184 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [(_vm.show) ? _c('div', {
    ref: "wxc-cover",
    staticClass: ["g-cover"],
    style: _vm.coverStyle,
    on: {
      "touchend": _vm.hideAction
    }
  }) : _vm._e(), (_vm.show && _vm.buttons) ? _c('div', {
    ref: "wxc-popover",
    staticClass: ["g-popover"],
    style: _vm.contentStyle
  }, [_c('div', {
    staticClass: ["u-popover-arrow"],
    style: _vm.arrowStyle
  }), _c('div', {
    staticClass: ["u-popover-inner"]
  }, _vm._l((_vm.buttons), function(item, i) {
    return _c('div', {
      key: i,
      class: ['i-btn', i === _vm.buttons.length - 1 ? 'i-btn-noborder' : ''],
      on: {
        "click": function($event) {
          _vm.wxcButtonClicked(i, item.key)
        }
      }
    }, [(item.icon) ? _c('image', {
      staticClass: ["btn-icon"],
      attrs: {
        "src": item.icon
      }
    }) : _vm._e(), _c('text', {
      staticClass: ["btn-text"],
      style: _vm.textStyle
    }, [_vm._v(_vm._s(item.text))])])
  }))]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(187)
)

/* script */
__vue_exports__ = __webpack_require__(188)

/* template */
var __vue_template__ = __webpack_require__(189)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-8d9db78e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-popup": {
    "position": "fixed",
    "width": "750"
  },
  "top": {
    "left": 0,
    "right": 0
  },
  "bottom": {
    "left": 0,
    "right": 0
  },
  "left": {
    "bottom": 0,
    "top": 0
  },
  "right": {
    "bottom": 0,
    "top": 0
  }
}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};
























































var _wxcOverlay = __webpack_require__(6);var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var animation = weex.requireModule('animation');var platform = weex.config.env.platform;var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';exports.default = { components: { WxcOverlay: _wxcOverlay2.default }, props: { show: { type: Boolean, default: false }, pos: { type: String, default: 'bottom' }, popupColor: { type: String, default: '#FFFFFF' }, overlayCfg: { type: Object, default: function _default() {return { hasAnimation: true, timingFunction: ['ease-in', 'ease-out'], duration: 300, opacity: 0.6 };} }, height: { type: [Number, String], default: 840 }, standOut: { type: [Number, String], default: 0 }, width: { type: [Number, String], default: 750 }, animation: { type: Object, default: function _default() {return { timingFunction: 'ease-in' };} } }, data: function data() {return { haveOverlay: true, isOverShow: true };}, computed: { isNeedShow: function isNeedShow() {var _this = this;setTimeout(function () {_this.appearPopup(_this.show);}, 50);
      return this.show;
    },
    _height: function _height() {
      this.appearPopup(this.show, 150);
      return this.height;
    },
    padStyle: function padStyle() {var
      pos = this.pos,width = this.width,height = this.height,popupColor = this.popupColor,standOut = this.standOut;
      var stand = parseInt(standOut, 10);
      var style = {
        width: width + 'px',
        backgroundColor: popupColor };

      pos === 'top' && (style = _extends({},
      style, {
        top: -height + stand + 'px',
        height: height + 'px' }));

      pos === 'bottom' && (style = _extends({},
      style, {
        bottom: -height + stand + 'px',
        height: height + 'px' }));

      pos === 'left' && (style = _extends({},
      style, {
        left: -width + stand + 'px' }));

      pos === 'right' && (style = _extends({},
      style, {
        right: -width + stand + 'px' }));

      return style;
    } },

  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 在支付宝上面有点击穿透问题
      var platform = weex.config.env.platform;
      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    hide: function hide() {
      this.appearPopup(false);
      this.$refs.overlay.appearOverlay(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      this.isShow && this.appearPopup(false);
    },
    appearPopup: function appearPopup(bool) {var _this2 = this;var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      this.isShow = bool;
      var popupEl = this.$refs['wxc-popup'];
      if (!popupEl) {
        return;
      }
      animation.transition(popupEl, _extends({
        styles: {
          transform: this.getTransform(this.pos, this.width, this.height, !bool) },

        duration: duration,
        delay: 0 },
      this.animation),
      function () {
        if (!bool) {
          _this2.$emit('wxcPopupOverlayClicked', { pos: _this2.pos });
        }
      });
    },
    getTransform: function getTransform(pos, width, height, bool) {
      var _size = pos === 'top' || pos === 'bottom' ? height : width;
      bool && (_size = 0);
      var _transform = void 0;
      switch (pos) {
        case 'top':
          _transform = 'translateY(' + _size + 'px)';
          break;
        case 'bottom':
          _transform = 'translateY(-' + _size + 'px)';
          break;
        case 'left':
          _transform = 'translateX(' + _size + 'px)';
          break;
        case 'right':
          _transform = 'translateX(-' + _size + 'px)';
          break;}

      return _transform;
    } } };

/***/ }),
/* 189 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    on: {
      "touchend": _vm.handleTouchEnd
    }
  }, [(_vm.show) ? _c('wxc-overlay', _vm._b({
    ref: "overlay",
    attrs: {
      "show": _vm.haveOverlay && _vm.isOverShow
    },
    on: {
      "wxcOverlayBodyClicking": _vm.wxcOverlayBodyClicking
    }
  }, 'wxc-overlay', _vm.overlayCfg, false)) : _vm._e()], 1), (_vm.show) ? _c('div', {
    ref: "wxc-popup",
    class: ['wxc-popup', _vm.pos],
    style: _vm.padStyle,
    attrs: {
      "height": _vm._height,
      "hack": _vm.isNeedShow
    },
    on: {
      "click": function () {}
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(192)
)

/* script */
__vue_exports__ = __webpack_require__(193)

/* template */
var __vue_template__ = __webpack_require__(194)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2b6c921c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-progress": {
    "backgroundColor": "#f2f3f4"
  },
  "progress": {
    "position": "absolute",
    "backgroundColor": "#FFC900"
  }
}

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default =
{
  props: {
    barColor: {
      type: String,
      default: '#FFC900' },

    barWidth: {
      type: Number,
      default: 600 },

    barHeight: {
      type: Number,
      default: 8 },

    barRadius: {
      type: Number,
      default: 0 },

    value: {
      type: Number,
      default: 0 } },


  computed: {
    runWayStyle: function runWayStyle() {var
      barWidth = this.barWidth,barHeight = this.barHeight,barRadius = this.barRadius;
      return {
        width: barWidth + 'px',
        height: barHeight + 'px',
        borderRadius: barRadius + 'px' };

    },
    progressStyle: function progressStyle() {var
      value = this.value,barWidth = this.barWidth,barHeight = this.barHeight,barColor = this.barColor,barRadius = this.barRadius;
      var newValue = value < 0 ? 0 : value > 100 ? 100 : value;
      return {
        backgroundColor: barColor,
        borderRadius: barRadius + 'px',
        height: barHeight + 'px',
        width: newValue / 100 * barWidth + 'px' };

    } } };

/***/ }),
/* 194 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-progress"],
    style: _vm.runWayStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ("进度为百分之" + _vm.value)
    }
  }, [_c('div', {
    staticClass: ["progress"],
    style: _vm.progressStyle
  })])
},staticRenderFns: []}

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(197)
)

/* script */
__vue_exports__ = __webpack_require__(198)

/* template */
var __vue_template__ = __webpack_require__(204)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-192b9e70"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 197 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


















var _item = __webpack_require__(199);var _item2 = _interopRequireDefault(_item);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  components: { wxcRadio: _item2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {return [];} },

    config: {
      type: Object,
      default: function _default() {return {};} } },


  data: function data() {return {
      checkedIndex: -1 };},

  computed: {
    updateList: function updateList() {var
      checkedIndex = this.checkedIndex,list = this.list;
      var updateList = [];
      list && list.forEach(function (item, i) {
        item.checked = i === checkedIndex;
        updateList.push(item);
      });
      return updateList;
    } },

  watch: {
    list: function list(newList) {
      this.setListChecked(newList);
    } },

  created: function created() {
    this.setListChecked(this.list);
  },
  methods: {
    setListChecked: function setListChecked(list) {var _this = this;
      if (list && list.length > 0) {
        list.forEach(function (item, i) {
          item.checked && (_this.checkedIndex = i);
        });
      }
    },
    wxcRadioItemChecked: function wxcRadioItemChecked(i, e) {
      var oldIndex = this.checkedIndex;var _list$i =
      this.list[i],value = _list$i.value,title = _list$i.title;
      this.checkedIndex = i;
      this.$emit('wxcRadioListChecked', { value: value, title: title, oldIndex: oldIndex, index: i });
    } } }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(200)
)

/* script */
__vue_exports__ = __webpack_require__(201)

/* template */
var __vue_template__ = __webpack_require__(203)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-dcd1cbe6"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 200 */
/***/ (function(module, exports) {

module.exports = {
  "radio": {
    "width": "48",
    "height": "48"
  },
  "title-text": {
    "fontSize": "30"
  }
}

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });






























var _wxcCell = __webpack_require__(9);var _wxcCell2 = _interopRequireDefault(_wxcCell);
var _type = __webpack_require__(202);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default = { components: { WxcCell: _wxcCell2.default }, props: { hasTopBorder: { type: Boolean, default: false }, title: { type: String, require: true }, value: { type: [String, Number, Object], require: true }, disabled: { type: Boolean, default: false }, checked: { type: Boolean, default: false }, config: { type: Object, default: function _default() {return {};} } }, data: function data() {return {
      icon: [_type.CHECKED, _type.DISABLED] };},

  computed: {
    radioIcon: function radioIcon() {var
      icon = this.icon,disabled = this.disabled,checked = this.checked,config = this.config;
      var mergeIcon = icon;
      config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
      config.disabledIcon && (mergeIcon[1] = config.disabledIcon);
      return checked ? mergeIcon[disabled ? 1 : 0] : '';
    },
    backgroundColor: function backgroundColor() {var
      disabled = this.disabled;
      return disabled ? '#F2F3F4' : '#FFFFFF';
    },
    color: function color() {var
      disabled = this.disabled,checked = this.checked,config = this.config;
      var checkedColor = '#EE9900';
      config.checkedColor && (checkedColor = config.checkedColor);
      return checked && !disabled ? checkedColor : '#3D3D3D';
    } },

  methods: {
    wxcCellClicked: function wxcCellClicked() {var
      disabled = this.disabled,value = this.value;
      if (!disabled) {
        this.$emit('wxcRadioItemChecked', { value: value, disabled: disabled });
      }
    } } };

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const CHECKED = 'https://gw.alicdn.com/tfs/TB1Y9vlpwMPMeJjy1XcXXXpppXa-72-72.png';
/* harmony export (immutable) */ __webpack_exports__["CHECKED"] = CHECKED;

const DISABLED = 'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png';
/* harmony export (immutable) */ __webpack_exports__["DISABLED"] = DISABLED;


/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-cell', {
    attrs: {
      "hasTopBorder": _vm.hasTopBorder,
      "cellStyle": {
        backgroundColor: _vm.backgroundColor
      },
      "accessible": true,
      "ariaLabel": (_vm.title + ",状态为" + (_vm.checked?'已选中':'未选中') + "," + (_vm.disabled?'不可更改':''))
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('text', {
    staticClass: ["title-text"],
    style: {
      color: _vm.color
    },
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v(_vm._s(_vm.title))]), (_vm.radioIcon) ? _c('image', {
    staticClass: ["radio"],
    attrs: {
      "slot": "value",
      "src": _vm.radioIcon
    },
    slot: "value"
  }) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 204 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.updateList), function(item, i) {
    return _c('wxc-radio', _vm._b({
      key: i,
      attrs: {
        "config": _vm.config
      },
      on: {
        "wxcRadioItemChecked": function($event) {
          _vm.wxcRadioItemChecked(i, $event)
        }
      }
    }, 'wxc-radio', item, false))
  }))
},staticRenderFns: []}

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(207)
)

/* script */
__vue_exports__ = __webpack_require__(208)

/* template */
var __vue_template__ = __webpack_require__(209)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1803fdd5"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-refresher": {
    "height": "140",
    "width": "750",
    "flexDirection": "row",
    "flexWrap": "nowrap",
    "justifyContent": "center",
    "paddingTop": "50"
  },
  "cycle-container": {
    "position": "relative",
    "width": "60",
    "height": "60"
  },
  "u-cover": {
    "position": "absolute",
    "width": "30",
    "height": "60",
    "top": 0,
    "backgroundColor": "#ffffff",
    "overflow": "hidden",
    "right": 0
  },
  "c1": {
    "zIndex": 1
  },
  "c2": {
    "zIndex": 2,
    "transformOrigin": "left center",
    "transform": "rotateZ(0deg)"
  },
  "u-cover-cycle": {
    "position": "absolute",
    "width": "60",
    "height": "60",
    "right": 0,
    "top": 0,
    "boxSizing": "border-box",
    "borderWidth": "2",
    "borderColor": "#666666",
    "borderStyle": "solid",
    "borderRadius": 100,
    "opacity": 0
  },
  "cover1": {
    "opacity": 1
  },
  "indicator": {
    "marginRight": "20",
    "height": "60",
    "width": "60",
    "color": "#666666"
  },
  "arrow-down": {
    "position": "relative",
    "top": "15",
    "left": "-45",
    "width": "30",
    "height": "30"
  },
  "u-txt": {
    "fontSize": "24",
    "lineHeight": "40",
    "color": "#999999",
    "marginTop": "10",
    "marginLeft": "10",
    "height": "40",
    "lines": 1
  }
}

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



























var _index = __webpack_require__(2);var _index2 = _interopRequireDefault(_index);
var _bindEnv = __webpack_require__(1);var _bindEnv2 = _interopRequireDefault(_bindEnv);
var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var animation = weex.requireModule('animation'); // 减少打包体积
var ICON_ARROW_DOWN = 'https://img.alicdn.com/tfs/TB1A8faeTtYBeNjy1XdXXXXyVXa-48-48.png';exports.default = { props: { scrollerRef: String, maxTime: { type: Number, default: 0 }, mainText: { type: String, default: '下拉即可刷新...' }, pullingText: { type: String, default: '释放即可刷新...' }, refreshingText: { type: String, default: '加载中...' }, textWidth: { type: Number, default: 200 } },


  data: function data() {
    return {
      ICON_ARROW_DOWN: ICON_ARROW_DOWN,
      refreshing: false,
      couldUnLash: false };

  },
  computed: {
    newStyleFlag: function newStyleFlag() {
      return this.scrollerRef && _bindEnv2.default.supportsEBForIos();
    },
    refresherText: function refresherText() {
      return this.refreshing ? this.refreshingText : this.pText;
    },
    pText: function pText() {
      return this.couldUnLash ? this.pullingText : this.mainText;
    } },

  created: function created() {
    this.newStyleFlag && this.animationBinding();
  },
  beforeDestroy: function beforeDestroy() {
    this.bindingsDestroy();
  },
  methods: {
    onRefresh: function onRefresh(event) {var _this = this;
      this.$emit('wxcRefresh', event);
      this.refreshing = true;
      this.newStyleFlag && this.cycleGoRound();
      if (this.maxTime <= 0) return;
      this.timeoutSto && clearTimeout(this.timeoutSto);
      this.timeoutSto = setTimeout(function () {
        _this.$emit('wxcTimeout');
        _this.wxcCancel();
      }, this.maxTime);
    },
    /**
        * 取消 refreshing
        */
    wxcCancel: function wxcCancel() {
      this.refreshing = false;
      this.timeoutSto && clearTimeout(this.timeoutSto);
      this.roundingDestroy();
    },
    /**
        * 下拉事件
        */
    onPullingDown: function onPullingDown(event) {
      this.$emit('wxcPullingDown', event);
      var pd = event.pullingDistance * (_utils2.default.env.isIOS() ? -1 : 1);
      pd > (_utils2.default.env.isAndroid() ? 200 : 140) ? this.couldUnLash = true : this.couldUnLash = false;
      if (this.refreshing && pd < 20) {
        this.timeoutSto && clearTimeout(this.timeoutSto);
        this.refreshing = false;
        this.roundingDestroy();
      }
    },
    /**
        * 注册 bindingx
        */
    animationBinding: function animationBinding() {var _this2 = this;
      setTimeout(function () {
        // 降级版本取不到，需要注意
        var scroller = _this2.$parent.$refs[_this2.scrollerRef].ref;
        var cover2 = _this2.$refs['cover2'].ref;
        var coverCycle = _this2.$refs['cover-cycle'].ref;

        var bindingResult = _index2.default.bind({
          eventType: 'scroll',
          anchor: scroller,
          props: [
          {
            element: cover2,
            property: 'transform.rotateZ',
            expression: 'y>-140?(y%75/150*-360):156' },

          {
            element: coverCycle,
            property: 'opacity',
            expression: 'y<-75 ?1:0' }] },


        function (e) {});
        _this2.bindingToken = bindingResult.token;
      }, 300);
    },
    /**
        * 旋转动作
        */
    cycleGoRound: function cycleGoRound() {
      if (_utils2.default.env.isAndroid()) return;
      var cycle = this.$refs['cycle'].ref;
      this.arrowShow(false);
      if (!cycle) {
        return;
      }
      var roundingResult = _index2.default.bind({
        eventType: 'timing',
        props: [
        {
          element: cycle,
          property: 'transform.rotateZ',
          expression: 't*0.72' }] },


      function (e) {
      });
      this.roundingToken = roundingResult.token;
    },
    /**
        * 箭头显隐控制
        */
    arrowShow: function arrowShow() {var _show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arrow = this.$refs['arrow'];
      arrow && animation.transition(arrow, {
        styles: {
          opacity: _show ? 1 : 0,
          transform: _show ? "scale(1)" : "scale(0.5)" },

        duration: 300,
        delay: 0 },
      function () {
      });
    },
    /**
        * 完整 bindingx 销毁
        */
    bindingsDestroy: function bindingsDestroy() {
      if (this.bindingToken !== 0) {
        _index2.default && _index2.default.unbind({
          eventType: 'scroll',
          token: this.bindingToken });

        this.bindingToken = 0;
      }
      this.roundingDestroy();
    },
    /**
        * 旋转 bindingx 销毁
        */
    roundingDestroy: function roundingDestroy() {
      if (this.roundingToken !== 0) {
        _index2.default && _index2.default.unbind({
          eventType: 'timing',
          token: this.roundingToken });

        this.roundingToken = 0;
      }
      this.arrowShow(true);
    } } };

/***/ }),
/* 209 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('refresh', {
    staticClass: ["wxc-refresher"],
    attrs: {
      "display": _vm.refreshing ? 'show' : 'hide'
    },
    on: {
      "refresh": _vm.onRefresh,
      "pullingdown": _vm.onPullingDown
    }
  }, [(_vm.newStyleFlag) ? _c('div', {
    ref: "cycle",
    staticClass: ["cycle-container"]
  }, [_c('div', {
    ref: "cover1",
    staticClass: ["u-cover", "c1"]
  }, [_c('div', {
    staticClass: ["u-cover-cycle", "cover1"]
  })]), _c('div', {
    ref: "cover2",
    staticClass: ["u-cover", "c2"]
  }, [_c('div', {
    ref: "cover-cycle",
    staticClass: ["u-cover-cycle"]
  })])]) : _vm._e(), (_vm.newStyleFlag) ? _c('image', {
    ref: "arrow",
    staticClass: ["arrow-down"],
    attrs: {
      "src": _vm.ICON_ARROW_DOWN,
      "resize": "contain"
    }
  }) : _c('loading-indicator', {
    staticClass: ["indicator"]
  }), _c('text', {
    staticClass: ["u-txt"],
    style: {
      width: (_vm.textWidth + "px")
    }
  }, [_vm._v(_vm._s(_vm.refresherText))])])
},staticRenderFns: []}

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(212)
)

/* script */
__vue_exports__ = __webpack_require__(213)

/* template */
var __vue_template__ = __webpack_require__(227)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-da2d35ea"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 212 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-rich-text": {
    "alignItems": "center",
    "flexDirection": "row"
  },
  "default-text": {
    "color": "#A5A5A5",
    "fontSize": "24",
    "lineHeight": "30"
  }
}

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
















































var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  components: {
    WxcRichTextText: __webpack_require__(10),
    WxcRichTextLink: __webpack_require__(217),
    WxcRichTextIcon: __webpack_require__(220),
    WxcRichTextTag: __webpack_require__(26) },

  props: {
    configList: {
      type: [Array, String],
      default: function _default() {
        return [];
      } },

    hasTextMargin: {
      type: Boolean,
      default: true } },


  data: function data() {return {};},
  computed: {
    isNotEmptyArray: function isNotEmptyArray() {
      return _utils2.default.isNonEmptyArray(this.configList);
    },
    isString: function isString() {
      return _utils2.default.isString(this.configList);
    } },

  methods: {
    linkClick: function linkClick(e) {
      this.$emit('wxcRichTextLinkClick', e);
    } } }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 214 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-text": {
    "fontSize": "24",
    "color": "#3d3d3d"
  },
  "black": {
    "color": "#3D3D3D"
  },
  "yellow": {
    "color": "#EE9900"
  },
  "blue": {
    "color": "#30A0FF"
  },
  "gray": {
    "color": "#A5A5A5"
  },
  "red": {
    "color": "#FF5000"
  },
  "margin-text": {
    "marginRight": "6"
  }
}

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default =
{
  props: {
    textValue: {
      type: String,
      default: '' },

    textTheme: {
      type: String,
      default: 'gray' },

    textStyle: {
      type: Object,
      default: function _default() {return {};} },

    hasTextMargin: {
      type: Boolean,
      default: true } },


  computed: {
    themeStyle: function themeStyle() {
      var style = {};
      var textStyle = this.textStyle;
      if (textStyle && textStyle.fontSize) {
        style = _extends({},
        style, {
          fontSize: textStyle.fontSize + 'px',
          height: textStyle.fontSize * 1.2 + 'px' });

      }
      if (textStyle && textStyle.color) {
        style = _extends({},
        style, {
          color: textStyle.color });

      }
      return style;
    } } };

/***/ }),
/* 216 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('text', {
    class: ['wxc-text', _vm.textTheme, _vm.hasTextMargin ? 'margin-text' : ''],
    style: _vm.themeStyle
  }, [_vm._v(_vm._s(_vm.textValue))])
},staticRenderFns: []}

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(218)

/* template */
var __vue_template__ = __webpack_require__(219)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });













var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);
var _wxcRichTextText = __webpack_require__(10);var _wxcRichTextText2 = _interopRequireDefault(_wxcRichTextText);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
exports.default = { components: { WxcRichTextText: _wxcRichTextText2.default }, props: { linkValue: { type: [String, Number], default: '' }, hasTextMargin: { type: Boolean, default: true }, linkHref: {
      type: String,
      default: '' },

    linkTheme: {
      type: String,
      default: 'black' },

    linkStyle: {
      type: Object,
      default: function _default() {return {};} } },


  data: function data() {return {
      defObj: {} };},

  methods: {
    onLinkClick: function onLinkClick(e) {
      this.$emit('wxcRichTextLinkClick', { element: e, href: this.linkHref });
      _utils2.default.goToH5Page(this.linkHref);
    } } };

/***/ }),
/* 219 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    on: {
      "click": _vm.onLinkClick
    }
  }, [_c('wxc-rich-text-text', {
    attrs: {
      "textValue": _vm.linkValue,
      "hasTextMargin": _vm.hasTextMargin,
      "textStyle": _vm.linkStyle ? _vm.linkStyle : _vm.defObj,
      "textTheme": _vm.linkTheme ? _vm.linkTheme : 'black'
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(221)
)

/* script */
__vue_exports__ = __webpack_require__(222)

/* template */
var __vue_template__ = __webpack_require__(223)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1b56a90a"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 221 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-image": {
    "width": "90",
    "height": "24",
    "marginRight": "6"
  }
}

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default =
{
  props: {
    iconSrc: String,
    iconStyle: {
      type: Object,
      default: function _default() {return {
          height: 24 };} } },



  data: function data() {return {
      width: 90 };},

  computed: {
    computedStyle: function computedStyle() {var
      width = this.width,iconStyle = this.iconStyle;
      if (iconStyle && iconStyle.width && iconStyle.height) {
        return {
          width: iconStyle.width + "px",
          height: iconStyle.height + "px" };

      } else {
        return {
          width: width + "px",
          height: iconStyle.height + "px" };

      }
    } },

  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        var width = e.size.naturalWidth;
        var height = e.size.naturalHeight;
        this.width = width * (this.iconStyle.height / height);
      }
    } } };

/***/ }),
/* 223 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('image', {
    staticClass: ["wxc-image"],
    style: {
      width: _vm.computedStyle.width,
      height: _vm.computedStyle.height
    },
    attrs: {
      "src": _vm.iconSrc,
      "ariaHidden": true
    },
    on: {
      "load": _vm.onLoad
    }
  })
},staticRenderFns: []}

/***/ }),
/* 224 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-tag": {
    "borderColor": "#3d3d3d",
    "borderWidth": "2",
    "borderRadius": "4",
    "marginRight": "6",
    "backgroundColor": "rgba(0,0,0,0)",
    "paddingLeft": "6",
    "paddingRight": "6",
    "height": "26",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "tag-text": {
    "fontSize": "20",
    "color": "#3d3d3d"
  },
  "black": {
    "color": "#3D3D3D"
  },
  "yellow": {
    "color": "#EE9900"
  },
  "blue": {
    "color": "#30A0FF"
  },
  "gray": {
    "color": "#A5A5A5"
  },
  "red": {
    "color": "#FF5000"
  },
  "border-black": {
    "borderColor": "#A5A5A5"
  },
  "border-yellow": {
    "borderColor": "#EE9900"
  },
  "border-blue": {
    "borderColor": "#30A0FF"
  },
  "border-gray": {
    "borderColor": "#A5A5A5"
  },
  "border-red": {
    "borderColor": "#FF5000"
  }
}

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default =
{
  props: {
    tagValue: {
      type: [String, Number],
      default: '' },

    tagTheme: {
      type: String,
      default: 'blue' },

    tagStyle: {
      type: Object,
      default: function _default() {return {};} } },


  computed: {
    newTheme: function newTheme() {
      var tagStyle = this.tagStyle;
      var tagValue = this.tagValue;
      var divStyle = {};
      var textStyle = {};
      if (tagStyle && tagStyle.fontSize) {
        textStyle = _extends({},
        textStyle, {
          fontSize: tagStyle.fontSize + 'px' });

      }
      if (tagStyle && tagStyle.color) {
        textStyle = _extends({},
        textStyle, {
          color: tagStyle.color });

      }

      if (tagStyle && tagStyle.borderColor) {
        divStyle = _extends({},
        divStyle, {
          borderColor: tagStyle.borderColor });

      }

      if (tagStyle && tagStyle.borderWidth) {
        divStyle = _extends({},
        divStyle, {
          borderWidth: tagStyle.borderWidth + 'px' });

      }

      if (tagStyle && tagStyle.borderRadius) {
        divStyle = _extends({},
        divStyle, {
          borderRadius: tagStyle.borderRadius + 'px' });

      }

      if (tagStyle && tagStyle.backgroundColor) {
        divStyle = _extends({},
        divStyle, {
          backgroundColor: tagStyle.backgroundColor });

      }

      if (tagStyle && tagStyle.height) {
        divStyle = _extends({},
        divStyle, {
          height: tagStyle.height + 'px' });

      }

      if (tagStyle && tagStyle.width) {
        divStyle = _extends({},
        divStyle, {
          width: tagStyle.width + 'px' });

      }

      if (tagValue && tagValue.length === 1) {
        divStyle = _extends({},
        divStyle, {
          paddingLeft: 0,
          paddingRight: 0 });

      }

      return {
        divStyle: divStyle,
        textStyle: textStyle };

    } } };

/***/ }),
/* 226 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['wxc-tag', 'border-' + _vm.tagTheme],
    style: _vm.newTheme.divStyle
  }, [_c('text', {
    class: ['tag-text', _vm.tagTheme],
    style: _vm.newTheme.textStyle
  }, [_vm._v(_vm._s(_vm.tagValue))])])
},staticRenderFns: []}

/***/ }),
/* 227 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.isNotEmptyArray) ? _c('div', {
    staticClass: ["wxc-rich-text"]
  }, _vm._l((_vm.configList), function(v) {
    return _c('div', [(v.type == 'text' && v.value) ? _c('wxc-rich-text-text', {
      attrs: {
        "textValue": v.value,
        "textStyle": v.style,
        "hasTextMargin": _vm.hasTextMargin,
        "textTheme": v.theme
      }
    }) : _vm._e(), (v.type == 'link' && v.href && v.value) ? _c('wxc-rich-text-link', {
      attrs: {
        "linkValue": v.value,
        "linkHref": v.href,
        "linkStyle": v.style,
        "hasTextMargin": _vm.hasTextMargin,
        "linkTheme": v.theme
      },
      on: {
        "wxcRichTextLinkClick": _vm.linkClick
      }
    }) : _vm._e(), (v.type == 'icon' && v.src) ? _c('wxc-rich-text-icon', {
      attrs: {
        "iconSrc": v.src,
        "iconStyle": v.style
      }
    }) : _vm._e(), (v.type == 'tag' && v.value) ? _c('wxc-rich-text-tag', {
      attrs: {
        "tagValue": v.value,
        "tagTheme": v.theme,
        "tagStyle": v.style
      }
    }) : _vm._e()], 1)
  })) : _vm._e(), (_vm.isString) ? _c('text', {
    staticClass: ["default-text"]
  }, [_vm._v(_vm._s(_vm.configList))]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(230)
)

/* script */
__vue_exports__ = __webpack_require__(231)

/* template */
var __vue_template__ = __webpack_require__(232)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-a3afbf14"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports = {
  "flex-row": {
    "flexDirection": "row"
  },
  "full-rest": {
    "flex": 1
  },
  "root": {
    "paddingTop": "28",
    "paddingBottom": "24",
    "backgroundColor": "#ffffff"
  },
  "content": {
    "paddingTop": "9",
    "paddingBottom": "42",
    "paddingLeft": "70",
    "paddingRight": "70"
  },
  "last-one-content": {
    "paddingBottom": 0
  },
  "title": {
    "paddingLeft": "70",
    "paddingRight": "70"
  },
  "line": {
    "position": "absolute",
    "top": 0,
    "bottom": 0,
    "left": "38",
    "width": "2",
    "backgroundColor": "#FFC300"
  },
  "first-one-title-line": {
    "top": "20"
  },
  "last-one-title-line": {
    "bottom": "20"
  },
  "last-one-content-line": {
    "width": 0
  },
  "point": {
    "position": "absolute",
    "top": "13",
    "left": "32",
    "width": "14",
    "height": "14",
    "backgroundColor": "#FFF0BD",
    "borderStyle": "solid",
    "borderWidth": "2",
    "borderColor": "#EE9900",
    "borderRadius": "100"
  },
  "highlight-point": {
    "top": "7",
    "left": "26",
    "width": "26",
    "height": "26",
    "backgroundColor": "#EE9900",
    "borderStyle": "solid",
    "borderWidth": "6",
    "borderColor": "#FFE78D"
  },
  "text-title": {
    "fontSize": "30",
    "color": "#3d3d3d"
  },
  "text-highlight-title": {
    "color": "#EE9900"
  },
  "text-desc": {
    "fontSize": "24",
    "color": "#a5a5a5",
    "marginBottom": "12"
  },
  "text-date": {
    "fontSize": "24",
    "color": "#a5a5a5"
  }
}

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default =
{
  props: {
    list: {
      type: Array,
      required: true },

    themeColor: {
      type: Object,
      default: function _default() {return {};} } },


  computed: {
    cItems: function cItems() {
      return this.adapter(this.list);
    } },

  methods: {
    adapter: function adapter(items) {var _themeColor =







      this.themeColor,lineColor = _themeColor.lineColor,pointInnerColor = _themeColor.pointInnerColor,pointBorderColor = _themeColor.pointBorderColor,highlightTitleColor = _themeColor.highlightTitleColor,highlightPointInnerColor = _themeColor.highlightPointInnerColor,highlightPointBorderColor = _themeColor.highlightPointBorderColor;
      var len = items.length;
      var pre = Date.now();

      return items.map(function (item, index) {
        item.key = pre + '_' + index;
        item.__titleLineClass__ = [];
        item.__contentClass__ = [];
        item.__contentLineClass__ = [];
        item.__pointClass__ = [];
        item.__titleTextClass__ = [];
        item.__pointStyle__ = {};
        item.__lineStyle__ = {};
        item.__titleStyle__ = {};

        if (lineColor) item.__lineStyle__.backgroundColor = lineColor;
        if (pointInnerColor) item.__pointStyle__.backgroundColor = pointInnerColor;
        if (pointBorderColor) item.__pointStyle__.borderColor = pointBorderColor;

        if (index === 0) {
          item.__titleLineClass__.push('first-one-title-line');
        }

        if (index === len - 1) {
          item.__titleLineClass__.push('last-one-title-line');
          item.__contentClass__.push('last-one-content');
          item.__contentLineClass__.push('last-one-content-line');
        }

        if (item.highlight) {
          item.__pointClass__.push('highlight-point');
          item.__titleTextClass__.push('text-highlight-title');
          if (highlightTitleColor) item.__titleStyle__.color = highlightTitleColor;
          if (highlightPointInnerColor) item.__pointStyle__.backgroundColor = highlightPointInnerColor;
          if (highlightPointBorderColor) item.__pointStyle__.borderColor = highlightPointBorderColor;
        }
        return item;
      });
    } } };

/***/ }),
/* 232 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["root"]
  }, _vm._l((_vm.cItems), function(item, index) {
    return _c('div', {
      key: item.key,
      attrs: {
        "accessible": true,
        "ariaLabel": ((item.title) + "," + (item.desc?item.desc:'') + "," + (item.date?item.date:'') + "," + (item.highlight?'已完成':'等待完成'))
      }
    }, [_c('div', {
      staticClass: ["title", "flex-row"]
    }, [_c('div', {
      staticClass: ["line"],
      class: item.__titleLineClass__,
      style: item.__lineStyle__
    }), _c('div', {
      staticClass: ["point"],
      class: item.__pointClass__,
      style: item.__pointStyle__
    }), _c('text', {
      staticClass: ["text-title", "full-rest"],
      class: item.__titleTextClass__,
      style: item.__titleStyle__
    }, [_vm._v(_vm._s(item.title))])]), _c('div', {
      staticClass: ["content", "flex-row"],
      class: item.__contentClass__
    }, [_c('div', {
      staticClass: ["line"],
      class: item.__contentLineClass__,
      style: item.__lineStyle__
    }), _c('div', {
      staticClass: ["full-rest"]
    }, [(item.desc) ? _c('text', {
      staticClass: ["text-desc"]
    }, [_vm._v(_vm._s(item.desc))]) : _vm._e(), (item.date) ? _c('text', {
      staticClass: ["text-date"]
    }, [_vm._v(_vm._s(item.date))]) : _vm._e()])])])
  }))
},staticRenderFns: []}

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(235)
)

/* script */
__vue_exports__ = __webpack_require__(236)

/* template */
var __vue_template__ = __webpack_require__(237)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2a2f7d58"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 235 */
/***/ (function(module, exports) {

module.exports = {
  "slide-nav": {
    "position": "absolute",
    "zIndex": 1000
  }
}

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var DOM = weex.requireModule('dom');
var Animation = weex.requireModule('animation');
var OFFSET_ACCURACY = 10;
var SCALE = weex.config.env.platform.toLowerCase() === 'web' ? 2 : 1;

function _toNum(str) {
  return typeof str === 'number' ? str : parseFloat((str || '').replace(/px$/i, ''));
}

function _getHeight(element, callback) {
  if (!element) {
    return;
  }
  if (element.__cacheHeight) {
    element.__cacheHeight && callback && callback(element.__cacheHeight);
  } else {
    DOM.getComponentRect(element, function (res) {
      var height = (parseFloat(res && res.size && res.size.height) || 0) / SCALE;
      height && callback && callback(element.__cacheHeight = height);
    });
  }
}exports.default =

{

  props: {
    position: {
      'type': String,
      'default': 'top' },


    height: [String, Number] },


  data: function data() {
    return {
      visible: true };

  },

  watch: {
    visible: function visible(newVal) {
      newVal ? this._slideIn() : this._slideOut();
    } },


  created: function created() {
    this._height = _toNum(this.height) || 0;
    this._isBottom = this.position === 'bottom';
    this._direction = this._isBottom ? 1 : -1;
  },

  methods: {

    _slideOut: function _slideOut() {var _this = this;
      this.getHeight(function (height) {
        _this.$emit('slideOut');
        _this.slideY(height * _this._direction * SCALE, function () {
          _this.$emit('slideOutEnd');
        });
      });
    },

    _slideIn: function _slideIn() {var _this2 = this;
      this.getHeight(function (height) {
        _this2.$emit('slideIn');
        _this2.slideY(0, function () {
          _this2.$emit('slideInEnd');
        });
      });
    },

    getHeight: function getHeight(callback) {
      return _getHeight(this.$refs.wrapper, callback);
    },

    slideOut: function slideOut() {
      this.visible = false;
    },

    slideIn: function slideIn() {
      this.visible = true;
    },

    slideY: function slideY(y, callback) {
      Animation.transition(this.$refs.wrapper, {
        styles: { transform: 'translateY(' + y + 'px)' },
        duration: 150, //ms
        timingFunction: 'ease',
        delay: 0 //ms
      }, callback);
    } },


  handleTouchStart: function handleTouchStart(e) {
    var touch = e.changedTouches[0];
    this._touchParams = {
      pageY: touch.screenY,
      startY: touch.screenY,
      lastPageY: touch.screenY,
      timeStamp: e.timeStamp,
      direction: -1 };

  },

  handleTouchMove: function handleTouchMove(e, bottomNav) {
    var tp = this._touchParams;
    var touch = e.changedTouches[0];
    var offsetY = void 0;

    // 安卓下滚动的时候经常不触发touchstart事件
    if (!tp || tp.hasEnd) {
      return this._touchParams = {
        pageY: touch.screenY,
        startY: touch.screenY,
        lastPageY: touch.screenY,
        timeStamp: e.timeStamp,
        direction: -1 };

    }

    offsetY = touch.screenY - tp.pageY;

    tp.lastPageY = tp.pageY;
    tp.lastDirection = tp.direction;
    tp.direction = offsetY > 0 ? 1 : -1;

    if (tp.lastDirection !== tp.direction) {
      tp.startY = tp.lastPageY;
    }

    tp.pageY = touch.screenY;
    tp.offsetY = tp.pageY - tp.startY;

    if (!this.__scrollable && bottomNav) {
      if (tp.offsetY <= -OFFSET_ACCURACY) {
        bottomNav.slideOut();
      } else if (tp.offsetY >= OFFSET_ACCURACY) {
        bottomNav.slideIn();
      }
    }
  },

  handleTouchEnd: function handleTouchEnd() {
    var tp = this._touchParams;
    tp && (tp.hasEnd = true);
  },

  handleScroll: function handleScroll(e, scroller, topNav, bottomNav, startThreshold) {var _this3 = this;var moveThreshold = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;
    var scrollY = e.contentOffset.y;
    var nav = topNav || bottomNav;
    var scrollFn = function scrollFn(maxScrollY) {
      if (-scrollY > maxScrollY) {
        return;
      }
      maxScrollY = Math.abs(maxScrollY);
      if (Math.abs(scrollY) < startThreshold) {
        if (Math.abs(scrollY) >= maxScrollY - OFFSET_ACCURACY) {
          var tp = _this3._touchParams;
          if (!tp) {
            return;
          }
          var offsetY = tp.offsetY;
          if (offsetY < -OFFSET_ACCURACY) {
            bottomNav && bottomNav.slideOut();
          } else if (offsetY > OFFSET_ACCURACY) {
            bottomNav && bottomNav.slideIn();
          }
        } else {
          topNav && topNav.slideIn();
          bottomNav && bottomNav.slideIn();
        }
      } else {
        var _tp = _this3._touchParams;
        if (!_tp) {
          return;
        }
        var _offsetY = _tp.offsetY;
        if (Math.abs(_offsetY) >= moveThreshold) {
          if (_offsetY > 0) {
            topNav && topNav.slideIn();
            bottomNav && bottomNav.slideIn();
          } else {
            topNav && topNav.slideOut();
            bottomNav && bottomNav.slideOut();
          }
        }
      }
    };

    var maxScrollYCheck = function maxScrollYCheck(maxScrollY) {
      if (!_this3.__scrollable) {
        return;
      }
      if (startThreshold) {
        scrollFn(maxScrollY);
      } else {
        nav.getHeight(function (navHeight) {
          startThreshold = navHeight;
          scrollFn(maxScrollY);
        });
      }
    };

    if (!nav) {
      return;
    }

    _getHeight(scroller, function (scrollerHeight) {
      var maxScrollY = e.contentSize.height - scrollerHeight;
      _this3.__scrollable = maxScrollY >= OFFSET_ACCURACY;

      if (bottomNav) {
        bottomNav.getHeight(function (height) {
          _this3.__scrollable = maxScrollY >= height;
          maxScrollYCheck(maxScrollY);
        });
      } else {
        maxScrollYCheck(maxScrollY);
      }
    });
  } };

/***/ }),
/* 237 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "wrapper",
    staticClass: ["slide-nav"]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(240)
)

/* script */
__vue_exports__ = __webpack_require__(241)

/* template */
var __vue_template__ = __webpack_require__(242)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4c346754"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 240 */
/***/ (function(module, exports) {

module.exports = {
  "slider-bar-container": {
    "height": "56",
    "justifyContent": "center",
    "alignItems": "center",
    "overflow": "hidden"
  },
  "range-bar": {
    "overflow": "hidden"
  },
  "value-bar": {
    "height": "4",
    "overflow": "hidden"
  },
  "slide-block": {
    "width": "56",
    "height": "56",
    "backgroundColor": "#ffffff",
    "borderRadius": "28",
    "borderWidth": "1",
    "borderColor": "rgba(0,0,0,0.1)",
    "position": "absolute",
    "left": 0,
    "bottom": 0
  }
}

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });















































var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);
var _bindEnv = __webpack_require__(1);var _bindEnv2 = _interopRequireDefault(_bindEnv);
var _indexWeex = __webpack_require__(2);var _indexWeex2 = _interopRequireDefault(_indexWeex);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var animation = weex.requireModule('animation'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var dom = weex.requireModule('dom');exports.default = { data: function data() {return { env: 'weex', diffX1: 0, diffX2: 0, barWidth: 0, preventMoveEvent: true, minDist: 0, selectRange: [0, 0], blockRadius: 28, DPR: 1, timeout: 100, isAndroid: _utils2.default.env.isAndroid() };}, props: { length: { type: Number, default: 500 }, height: { type: Number, default: 4 }, // 是否双滑块模式
    range: { type: Boolean, default: false }, // 最小值
    min: { type: Number, default: 0 }, // 最大值
    max: { type: Number, default: 100 }, // 最小取值范围，用于范围选择范围最小差值
    minDiff: { type: Number, default: 5 }, // 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number]
    value: { type: [Number, Array], default: 0 }, // 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number]
    defaultValue: { type: [Number, Array],
      default: 0 },

    // 值为 true 时，滑块为禁用状态
    disabled: {
      type: Boolean,
      default: false },

    invalidColor: {
      type: String,
      default: '#E0E0E0' },

    validColor: {
      type: String,
      default: '#EE9900' },

    disabledColor: {
      type: String,
      default: '#AAA' } },


  watch: {
    value: function value(e) {
      if (!this.range) {
        this.diffX1 = this._getDiffX(e || this.defaultValue);
      } else {
        this.diffX1 = this._getDiffX(e[0] || this.defaultValue[0]);
        this.diffX2 = this._getDiffX(e[1] || this.defaultValue[1]);
        this.barWidth = this.diffX2 - this.diffX1;
      }
    } },

  created: function created() {
    if (_utils2.default.env.isWeb()) {
      this.env = 'web';
      this.DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    } else {
      this.DPR = weex.config.env.scale;
    }
  },
  mounted: function mounted() {var _this = this;
    this.block1 = this.$refs['slide-block-1']; // 左侧滑块
    this.block2 = this.$refs['slide-block-2']; // 右侧滑块
    this.valueBar = this.$refs['value-bar']; // 黄色值条
    this.barContainer = this.$refs['bar-container']; // 滚动条容器

    if (!this.range) {
      this.diffX1 = this._getDiffX(this.value || this.defaultValue);
    } else {
      this.diffX1 = this._getDiffX(this.value[0] || this.defaultValue[0]);
      this.diffX2 = this._getDiffX(this.value[1] || this.defaultValue[1]);
      this.barWidth = this.diffX2 - this.diffX1;
    }

    // 是否支持expresstionBinding
    if (_bindEnv2.default.supportsEB() && _indexWeex2.default.prepare) {
      this.block1 && _indexWeex2.default.prepare({
        anchor: this.block1.ref,
        eventType: 'pan' });

      this.block2 && _indexWeex2.default.prepare({
        anchor: this.block2.ref,
        eventType: 'pan' });

      this.valueBar && _indexWeex2.default.prepare({
        anchor: this.valueBar.ref,
        eventType: 'pan' });

    }

    if (this.range) {
      this.selectRange = this.value || this.defaultValue; // 初始化范围选择返回数据
      this.minDist = this.minDiff / (this.max - this.min) * this.length; // 滑块1、2之前最小间距
    }

    // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要异步执行
    setTimeout(function () {
      dom.getComponentRect(_this.barContainer, function (option) {var
        left = option.size.left;
        _this.leftDiffX = left;
      });
    }, 100);
  },

  computed: {
    containerStyle: function containerStyle() {
      return {
        width: this.length + 56 + 'px',
        height: '56px' };

    },
    rangeBarStyle: function rangeBarStyle() {
      return {
        width: this.length + 'px',
        height: this.height + 'px',
        flexDirection: 'row',
        backgroundColor: this.invalidColor };

    },
    valueBarStyle: function valueBarStyle() {
      var left = 0;
      var width = 0;

      if (!this.range) {
        left = this.diffX1 - this.length;
        width = this.length;
      } else {
        left = this.diffX1;
        width = this.diffX2 - this.diffX1;
      }

      return {
        width: width + 'px',
        height: this.height + 'px',
        transform: 'translateX(' + left + 'px)',
        backgroundColor: this.disabled ? this.disabledColor : this.validColor };

    },
    blockStyle1: function blockStyle1() {
      var left = this.diffX1;
      return {
        transform: 'translateX(' + left + 'px)' };

    },
    blockStyle2: function blockStyle2() {
      return {
        transform: 'translateX(' + this.diffX2 + 'px)' };

    } },

  methods: {

    // 更新单选值或最小值
    weexHandler1: function weexHandler1(e) {var _this2 = this;
      var self = this;
      switch (e.state) {
        case 'start':
          self.bindBlock1();
          break;
        case 'move':
          dom.getComponentRect(this.block1, function (option) {var
            left = option.size.left;
            var value = _this2._getValue(left - _this2.leftDiffX);
            if (!_this2.range) {
              _this2.$emit('updateValue', value);
            } else {
              _this2.selectRange[0] = value;
              _this2.$emit('updateValue', _this2.selectRange);
            }
          });
          break;
        case 'end':
          break;
        default:
          break;}

    },

    // 更新最大值
    weexHandler2: function weexHandler2(e) {var _this3 = this;
      var self = this;

      switch (e.state) {
        case 'start':
          self.bindBlock2();
          break;
        case 'move':
          dom.getComponentRect(this.block2, function (option) {var
            left = option.size.left;
            _this3.selectRange[1] = _this3._getValue(left - _this3.leftDiffX);
            _this3.$emit('updateValue', _this3.selectRange);
          });
          break;
        case 'end':
          break;
        default:
          break;}

    },

    weexStartHandler1: function weexStartHandler1() {var _this4 = this;
      // 由于android端不支持 horizontalpan 的move事件，使用setInterval hack方案
      if (!this.isAndroid) {
        return;
      }
      this.firstInterval = setInterval(function () {
        dom.getComponentRect(_this4.block1, function (option) {var
          left = option.size.left;
          var value = _this4._getValue(left - _this4.leftDiffX);
          if (!_this4.range) {
            _this4.$emit('updateValue', value);
          } else {
            _this4.selectRange[0] = value;
            _this4.$emit('updateValue', _this4.selectRange);
          }
        });
      }, this.timeout);
    },

    weexStartHandler2: function weexStartHandler2() {var _this5 = this;
      if (!this.isAndroid) {
        return;
      }
      // 由于android端不支持 horizontalpan 的move事件，使用setInterval hack方案
      this.secondInterval = setInterval(function () {
        dom.getComponentRect(_this5.block2, function (option) {var
          left = option.size.left;
          _this5.selectRange[1] = _this5._getValue(left - _this5.leftDiffX);
          _this5.$emit('updateValue', _this5.selectRange);
        });
      }, this.timeout);
    },

    // 清除定时器
    weexEndHandler: function weexEndHandler() {
      if (!this.isAndroid) {
        return;
      }
      this.firstInterval && clearInterval(this.firstInterval);
      this.secondInterval && clearInterval(this.secondInterval);
    },

    webStartHandler: function webStartHandler(e) {
      if (this.env === 'weex') {
        return;
      }
      this.startX = e.touch.clientX;
      this.startDiffX1 = this.diffX1;
      this.startDiffX2 = this.diffX2;
    },

    webMoveHandler1: function webMoveHandler1(e) {
      if (this.env === 'weex' || this.disabled) {
        return;
      }

      var deltaX = (e.touch.clientX - this.startX) * this.DPR;
      var diff = this.startDiffX1 + deltaX;

      var max = this.length;
      if (this.range) {
        max = this.diffX2 - this.minDist;
      }

      if (diff > 0 && diff < max) {
        this.diffX1 = diff;
        animation.transition(this.block1, {
          styles: {
            transform: 'translateX(' + this.diffX1 + 'px)' } },

        function () {});
        if (!this.range) {
          this.$emit('updateValue', this._getValue(this.diffX1));
        } else {
          this.selectRange[0] = this._getValue(this.diffX1);
          this.$emit('updateValue', this.selectRange);
        }
      }
    },

    webMoveHandler2: function webMoveHandler2(e) {
      if (this.env === 'weex' || this.disabled) {
        return;
      }

      var deltaX = (e.touch.clientX - this.startX) * this.DPR;
      var diff = this.startDiffX2 + deltaX;
      var min = this.diffX1 + this.minDist;
      var max = this.length;

      if (diff > min && diff < max) {
        this.diffX2 = diff;
        animation.transition(this.block2, {
          styles: {
            transform: 'translateX(' + this.diffX2 + 'px)' } },

        function () {});
        if (!this.range) {
          this.$emit('updateValue', this._getValue(this.diffX2));
        } else {
          this.selectRange[1] = this._getValue(this.diffX2);
          this.$emit('updateValue', this.selectRange);
        }
      }
    },

    bindBlock1: function bindBlock1() {
      var self = this;

      // 如果禁用，不行进行表达式绑定
      if (self.disabled) {
        _indexWeex2.default.unbind({
          token: this.gesToken1,
          eventType: 'pan' });

        this.gesToken1 = 0;
        return;
      }

      // 初始化按钮&条的大小范围
      var blockMax1 = 0;
      if (self.range) {
        blockMax1 = self.diffX2 - self.minDist;
      } else {
        blockMax1 = self.length;
      }

      var barMax1 = self.diffX2;

      if (!self.range) {

        var startLeft = self.diffX1 - blockMax1 - self.minDist;

        var props = [{
          element: self.block1.ref,
          property: 'transform.translateX',
          expression: 'min(' + blockMax1 + ', max(x + ' + self.diffX1 + ', 0))' },
        {
          element: self.valueBar.ref,
          property: 'transform.translateX',
          expression: 'min(0, max(x + ' + startLeft + ', -' + blockMax1 + '))' }];


        var gesTokenObj = _indexWeex2.default.bind({
          anchor: self.block1.ref,
          eventType: 'pan',
          props: props },
        function (e) {
          if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
            var range = self.getRange();
            // 限制diffX1范围
            self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
            self.bindBlock1();
          }
        });
        this.gesToken1 = gesTokenObj.token;
      } else {

        // 选范围
        var _props = [{
          element: self.block1.ref,
          property: 'transform.translateX',
          expression: 'min(' + blockMax1 + ', max(x + ' + self.diffX1 + ', 0))' },
        {
          element: self.valueBar.ref,
          property: 'transform.translateX',
          expression: 'min(' + blockMax1 + ', max(x + ' + self.diffX1 + ', 0))' },
        {
          element: self.valueBar.ref,
          property: 'width',
          expression: 'min(' + barMax1 + ', max(0, ' + self.barWidth + ' - x))' }];


        var _gesTokenObj = _indexWeex2.default.bind({
          anchor: self.block1.ref,
          eventType: 'pan',
          props: _props },
        function (e) {
          if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
            var range = self.getRange();
            self.barWidth = self._restrictValue(range.rangeX1, self.barWidth - e.deltaX);
            self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
            self.bindBlock1();
          }
        });
        this.gesToken1 = _gesTokenObj.token;
      }
    },

    bindBlock2: function bindBlock2() {
      var self = this;

      // 如果禁用，不行进行表达式绑定
      if (self.disabled) {
        _indexWeex2.default.unbind({
          token: this.gesToken2,
          eventType: 'pan' });

        this.gesToken2 = 0;
        return;
      }

      // 初始化按钮&条的大小范围
      var blockMax1 = 0;
      if (self.range) {
        blockMax1 = self.diffX2 - self.minDist;
      } else {
        blockMax1 = self.length;
      }

      var blockMax2 = self.length;
      var blockMin2 = self.diffX1 + self.minDist;
      var barMax2 = self.length - self.diffX1;

      var props = [{
        element: self.block2.ref,
        property: 'transform.translateX',
        expression: 'min(' + blockMax2 + ', max(x + ' + self.diffX2 + ', ' + blockMin2 + '))' },
      {
        element: self.valueBar.ref,
        property: 'width',
        expression: 'min(' + barMax2 + ', max(0, x + ' + self.barWidth + '))' }];


      var gesTokenObj = _indexWeex2.default.bind({
        anchor: self.block2.ref,
        eventType: 'pan',
        props: props },
      function (e) {
        if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
          var range = self.getRange();
          self.barWidth = self._restrictValue([0, self.length - self.diffX1], self.barWidth + e.deltaX);
          self.diffX2 = self._restrictValue(range.rangeX2, self.diffX2 + e.deltaX);
          self.bindBlock2();
        }
      });
      this.gesToken2 = gesTokenObj.token;
    },

    // 获取diffx1 diffx2 取值范围
    getRange: function getRange() {
      if (!this.range) {
        return {
          rangeX1: [0, this.length] };

      } else {
        return {
          rangeX1: [0, this.diffX2 - this.minDist],
          rangeX2: [this.diffX1 + this.minDist, this.length] };

      }
    },

    // 限制取值范围
    _restrictValue: function _restrictValue(range, value) {
      if (range && range.length && range.length === 2) {
        if (value < range[0]) {
          return range[0];
        } else if (value > range[1]) {
          return range[1];
        } else {
          return value;
        }
      }
      return;
    },

    // 根据x方向偏移量计算value
    _getValue: function _getValue(diffX) {
      return Math.round(diffX / this.length * (this.max - this.min) + this.min);
    },

    // 根据value和length计算x方向偏移值
    _getDiffX: function _getDiffX(value) {
      return (value - this.min) / (this.max - this.min) * this.length;
    } } };

/***/ }),
/* 242 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "bar-container",
    staticClass: ["slider-bar-container"],
    style: _vm.containerStyle
  }, [_c('div', {
    staticClass: ["range-bar"],
    style: _vm.rangeBarStyle
  }, [_c('div', {
    ref: "value-bar",
    staticClass: ["value-bar"],
    style: _vm.valueBarStyle
  }, [_c('div')])]), _c('div', {
    ref: "slide-block-1",
    staticClass: ["slide-block"],
    style: _vm.blockStyle1,
    attrs: {
      "preventMoveEvent": _vm.preventMoveEvent
    },
    on: {
      "panstart": _vm.webStartHandler,
      "panmove": _vm.webMoveHandler1,
      "touchstart": _vm.weexStartHandler1,
      "touchend": _vm.weexEndHandler,
      "horizontalpan": _vm.weexHandler1
    }
  }, [_c('div')]), (_vm.range) ? _c('div', {
    ref: "slide-block-2",
    staticClass: ["slide-block"],
    style: _vm.blockStyle2,
    attrs: {
      "preventMoveEvent": _vm.preventMoveEvent
    },
    on: {
      "panstart": _vm.webStartHandler,
      "panmove": _vm.webMoveHandler2,
      "touchstart": _vm.weexStartHandler2,
      "touchend": _vm.weexEndHandler,
      "horizontalpan": _vm.weexHandler2
    }
  }, [_c('div')]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(245)
)

/* script */
__vue_exports__ = __webpack_require__(246)

/* template */
var __vue_template__ = __webpack_require__(247)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-30b8cef7"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 245 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-special-rich-text": {
    "position": "relative"
  },
  "tag-div": {
    "position": "absolute",
    "top": 0,
    "color": "#A5A5A5",
    "fontSize": "24",
    "lineHeight": "30"
  },
  "wxc-text": {
    "fontSize": "24",
    "lineHeight": "34",
    "color": "#3d3d3d",
    "lines": 2,
    "textOverflow": "ellipsis",
    "overflow": "hidden"
  },
  "black": {
    "color": "#3D3D3D"
  },
  "yellow": {
    "color": "#EE9900"
  },
  "blue": {
    "color": "#30A0FF"
  },
  "gray": {
    "color": "#A5A5A5"
  },
  "red": {
    "color": "#FF5000"
  },
  "margin-text": {
    "marginRight": "6"
  }
}

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);





var _wxcRichTextText = __webpack_require__(10);var _wxcRichTextText2 = _interopRequireDefault(_wxcRichTextText);
var _wxcRichTextTag = __webpack_require__(26);var _wxcRichTextTag2 = _interopRequireDefault(_wxcRichTextTag);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _weex$config$env = weex.config.env,appName = _weex$config$env.appName,osName = _weex$config$env.osName,deviceWidth = _weex$config$env.deviceWidth;var needHack = (_utils2.default.env.isAlipay() || appName === 'UC' || appName === 'TUnionSDK') && osName !== 'iOS' || _utils2.default.env.isAndroid();var isPad = osName === 'iOS' && deviceWidth > 1300;exports.default =

{
  components: {
    WxcRichTextText: _wxcRichTextText2.default,
    WxcRichTextTag: _wxcRichTextTag2.default },

  props: {
    configList: {
      type: [Array, String],
      default: function _default() {return {};} } },


  data: function data() {return {
      iconWidth: 90,
      iconHeight: 24,
      needHack: needHack };},

  computed: {
    newList: function newList() {var
      configList = this.configList,iconHeight = this.iconHeight,iconWidth = this.iconWidth,needHack = this.needHack;
      if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {
        var r1 = configList[0];
        var r2 = configList[1];
        var iconStyle = r1.style;
        var textStyle = r2.style;
        var style = {};
        var fontSize = 24;
        var tagWidth = iconStyle && iconStyle.width ? iconStyle.width : 24;

        if (textStyle && textStyle.fontSize && !isNaN(textStyle.fontSize)) {
          fontSize = textStyle.fontSize;
          style = {
            fontSize: textStyle.fontSize + 'px',
            lineHeight: Number(textStyle.fontSize * 1.4).toFixed(2) + 'px' };

        }

        if (textStyle && textStyle.color) {
          style = _extends({},
          style, {
            color: textStyle.color });

        }

        if (textStyle && textStyle.lines) {
          style = _extends({},
          style, {
            lines: textStyle.lines });

        }

        if (r1.type === 'icon' && iconStyle && iconStyle.height && !iconStyle.width) {
          tagWidth = parseInt(iconWidth * (iconStyle.height / iconHeight));
          r1 = _extends({},
          r1, {
            style: {
              width: tagWidth + 'px',
              height: iconStyle.height + 'px' } });


        }

        if (r1.type === 'icon' && !(iconStyle && iconStyle.height)) {
          r1 = _extends({},
          r1, {
            style: {
              width: iconWidth + 'px',
              height: iconHeight + 'px' } });


        }

        if (r1.type === 'tag' && iconStyle && iconStyle.width) {
          r1 = _extends({},
          r1, {
            style: _extends({}, iconStyle, { width: null }) });

        }

        var blank = '';
        var num = Math.ceil(tagWidth / fontSize) + 1;

        if (r1.type === 'tag' && r1.value) {
          num = this.countString(r1.value);
        }

        var tagMoreBlank = (!isPad && num < 7 ? '  ' : '') + (needHack ? '  ' : '') + (isPad && num < 3 ? '    ' : '');
        var iconMoreBlank = num > 2 ? needHack ? '     ' : '   ' : ' ';
        if (r1.type === 'tag') {
          blank = new Array(num).join('  ') + tagMoreBlank;
        } else if (r1.type === 'icon') {
          blank = new Array(num).join('  ') + iconMoreBlank;
        }
        blank += isPad && num > 2 ? '     ' : '';
        var newValue = r2.value ? blank + (' ' + r2.value) : '';

        r2 = _extends({},
        r2, {
          style: style,
          value: newValue });


        return [r1, r2];
      } else {
        return configList;
      }
    },
    top: function top() {var
      configList = this.configList,needHack = this.needHack;
      if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {
        var iconStyle = configList[0].style;
        var textStyle = configList[1].style;
        var fontSize = 24;
        var tagHeight = iconStyle && iconStyle.height ? iconStyle.height : 26;
        if (textStyle && textStyle.fontSize) {
          fontSize = textStyle.fontSize;
        }
        var d = needHack ? 1.1 : 1.4;
        return Math.ceil((fontSize * d - tagHeight) / 2);
      } else {
        return 0;
      }
    } },

  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {var _e$size =
        e.size,naturalWidth = _e$size.naturalWidth,naturalHeight = _e$size.naturalHeight;
        this.iconWidth = naturalWidth;
        this.iconHeight = naturalHeight;
      } else {var
        configList = this.configList;
        if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {var
          style = configList[0].style;
          if (style && style.height && style.width) {
            this.iconWidth = style.width;
            this.iconHeight = style.height;
          }
        }
      }
    },
    countString: function countString(str) {
      var chineseRegex = /[^ -~]/g;
      return str.replace(chineseRegex, '**').length;
    } } };

/***/ }),
/* 247 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-special-rich-text"]
  }, [_c('div', {
    staticClass: ["tag-div"],
    style: {
      top: _vm.top + 'px'
    }
  }, [(_vm.newList[0] && _vm.newList[0].type === 'icon' && _vm.newList[0].src) ? _c('image', {
    staticClass: ["wxc-image"],
    style: _vm.newList[0].style,
    attrs: {
      "src": _vm.newList[0].src,
      "quality": "original",
      "original": true,
      "ariaHidden": true
    },
    on: {
      "load": _vm.onLoad
    }
  }) : _vm._e(), (_vm.newList[0] && _vm.newList[0].type === 'tag' && _vm.newList[0].value) ? _c('wxc-rich-text-tag', {
    attrs: {
      "tagValue": _vm.newList[0].value,
      "tagTheme": _vm.newList[0].theme,
      "tagStyle": _vm.newList[0].style
    }
  }) : _vm._e()], 1), (_vm.newList[0] && _vm.newList[0].type === 'text' && _vm.newList[0].value) ? _c('text', {
    class: ['wxc-text', _vm.newList[0].theme],
    style: _vm.newList[0].style
  }, [_vm._v(_vm._s(_vm.newList[0].value))]) : _vm._e(), (_vm.newList[1] && _vm.newList[1].value) ? _c('text', {
    class: ['wxc-text', _vm.newList[1].theme],
    style: _vm.newList[1].style
  }, [_vm._v(_vm._s(_vm.newList[1].value))]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(250)
)

/* script */
__vue_exports__ = __webpack_require__(251)

/* template */
var __vue_template__ = __webpack_require__(252)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-61c76c5e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 250 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-stepper": {
    "flexDirection": "row"
  },
  "stepper-plus": {
    "width": "56",
    "height": "56",
    "backgroundColor": "#ededed",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "6"
  },
  "stepper-minus": {
    "width": "56",
    "height": "56",
    "backgroundColor": "#ededed",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "6"
  },
  "stepper-input": {
    "borderWidth": 0,
    "textAlign": "center",
    "color": "#3d3d3d",
    "fontSize": "30",
    "lineHeight": "56",
    "width": "86"
  },
  "stepper-icon": {
    "fontSize": "36",
    "color": "#666666",
    "marginTop": "-4"
  }
}

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default =
{
  props: {
    min: {
      type: [String, Number],
      default: 1 },

    max: {
      type: [String, Number],
      default: 100 },

    step: {
      type: [String, Number],
      default: 1 },

    disabled: {
      type: Boolean,
      default: false },

    defaultValue: {
      type: [String, Number],
      default: 1 },

    readOnly: {
      type: Boolean,
      default: false } },


  computed: {
    disableStyle: function disableStyle() {
      if (this.disabled) {
        return {
          color: '#cccccc' };

      }
    },
    valueString: function valueString() {
      return this.value.toString();
    } },

  data: function data() {return {
      value: 1,
      isLess: false,
      isOver: false };},

  watch: {
    defaultValue: function defaultValue(newNum) {
      this.value = newNum;
    } },

  created: function created() {
    this.value = parseInt(this.defaultValue, 10);
    if (this.disabled) {
      this.isLess = true;
      this.isOver = true;
    }
  },
  methods: {
    minusClicked: function minusClicked() {
      if (this.disabled) {
        return;
      }
      var isMinOver = this.value <= this.min;
      var nowNum = this.value - parseInt(this.step, 10);
      if (isMinOver) {
        this.$emit('wxcStepperValueIsMinOver', { value: this.value });
      } else {
        this.value = nowNum;
        this.resetDisabledStyle();
      }
      // 由于此处已经减step
      if (nowNum <= this.min) {
        this.value = parseInt(this.min, 10);
        this.isLess = true;
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    plusClicked: function plusClicked() {
      if (this.disabled) {
        return;
      }
      var isMaxOver = this.value >= this.max;
      var nowNum = this.value + parseInt(this.step, 10);
      if (isMaxOver) {
        this.$emit('wxcStepperValueIsMaxOver', { value: this.value });
      } else {
        this.value = nowNum;
        this.resetDisabledStyle();
      }
      // 由于此处已经加step
      if (nowNum >= this.max) {
        this.value = parseInt(this.max, 10);
        this.isOver = true;
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    onInput: function onInput(e) {
      this.correctInputValue(e.value);
    },
    onBlur: function onBlur(e) {
      this.correctInputValue(e.value);
    },
    correctInputValue: function correctInputValue(v) {
      if (/^[1-9]\d{0,}$/.test(v) && parseInt(v, 10) >= this.min && parseInt(v, 10) <= this.max) {
        this.value = parseInt(v, 10);
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },

    resetDisabledStyle: function resetDisabledStyle() {
      this.isLess = false;
      this.isOver = false;
    } } };

/***/ }),
/* 252 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-stepper"]
  }, [_c('div', {
    staticClass: ["stepper-minus"],
    attrs: {
      "ariaLabel": "减数",
      "accessible": true
    },
    on: {
      "click": _vm.minusClicked
    }
  }, [_c('text', {
    staticClass: ["stepper-icon"],
    style: {
      color: _vm.isLess ? '#cccccc' : '#666666'
    }
  }, [_vm._v("-")])]), _c('input', {
    staticClass: ["stepper-input"],
    style: _vm.disableStyle,
    attrs: {
      "type": "number",
      "value": _vm.valueString,
      "disabled": _vm.disabled || _vm.readOnly
    },
    on: {
      "input": _vm.onInput,
      "blur": _vm.onBlur
    }
  }), _c('div', {
    staticClass: ["stepper-plus"],
    attrs: {
      "ariaLabel": "加数",
      "accessible": true
    },
    on: {
      "click": _vm.plusClicked
    }
  }, [_c('text', {
    staticClass: ["stepper-icon"],
    style: {
      color: _vm.isOver ? '#cccccc' : '#666666'
    }
  }, [_vm._v("+")])])])
},staticRenderFns: []}

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(255)
)

/* script */
__vue_exports__ = __webpack_require__(256)

/* template */
var __vue_template__ = __webpack_require__(257)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-bfe24230"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 255 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-tab-page": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "tab-title-list": {
    "flexDirection": "row",
    "justifyContent": "space-around"
  },
  "title-item": {
    "justifyContent": "center",
    "alignItems": "center",
    "borderBottomStyle": "solid"
  },
  "tab-page-wrap": {
    "width": "750",
    "flex": 1,
    "overflow": "hidden"
  },
  "tab-container": {
    "flex": 1,
    "flexDirection": "row",
    "position": "absolute"
  },
  "tab-text": {
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "desc-tag": {
    "position": "absolute",
    "top": "10",
    "right": "20",
    "borderBottomRightRadius": "14",
    "borderBottomLeftRadius": 0,
    "borderTopLeftRadius": "14",
    "borderTopRightRadius": "14",
    "backgroundColor": "#FF5E00",
    "height": "26",
    "alignItems": "center",
    "justifyContent": "center",
    "paddingLeft": "6",
    "paddingRight": "6"
  },
  "dot": {
    "width": "12",
    "height": "12",
    "borderBottomRightRadius": "12",
    "borderBottomLeftRadius": "12",
    "borderTopLeftRadius": "12",
    "borderTopRightRadius": "12",
    "position": "absolute",
    "top": "10",
    "right": "40",
    "backgroundColor": "#FF5E00"
  },
  "desc-text": {
    "fontSize": "18",
    "color": "#ffffff"
  }
}

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });























































































































var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var dom = weex.requireModule('dom');var animation = weex.requireModule('animation');exports.default = { props: { tabTitles: { type: Array, default: function _default() {return [];} }, tabStyles: { type: Object, default: function _default() {return { bgColor: '#FFFFFF', titleColor: '#666666', activeTitleColor: '#3D3D3D', activeBgColor: '#FFFFFF', isActiveTitleBold: true, iconWidth: 70, iconHeight: 70, width: 160, height: 120, fontSize: 24, activeBottomColor: '#FFC900', activeBottomWidth: 120, activeBottomHeight: 6, textPaddingLeft: 10, textPaddingRight: 10 };} }, titleType: { type: String, default: 'icon' }, titleUseSlot: { type: Boolean, default: false }, isTabView: { type: Boolean, default: true }, duration: { type: [Number, String], default: 300 }, timingFunction: { type: String, default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }, wrapBgColor: { type: String, default: '#f2f3f4' } }, data: function data() {return { currentPage: 0, translateX: 0 };}, created: function created() {var titleType = this.titleType,tabStyles = this.tabStyles;if (titleType === 'iconFont' && tabStyles.iconFontUrl) {dom.addRule('fontFace', { 'fontFamily': "wxcIconFont", 'src': 'url(\'' + tabStyles.iconFontUrl + '\')' });}this.isIPhoneX = _utils2.default.env.isIPhoneX();}, methods: { next: function next() {var page = this.currentPage;if (page < this.tabTitles.length - 1) {page++;}this.setPage(page);}, prev: function prev() {var page = this.currentPage;if (page > 0) {page--;}this.setPage(page);}, setPage: function setPage(page) {var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;var animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;if (!this.isTabView) {this.currentPage = page;this._animateTransformX(page, animated);this.$emit('wxcTabBarCurrentTabSelected', { page: page });this.jumpOut(url);return;}var previousPage = this.currentPage;var currentTabEl = this.$refs['wxc-tab-title-' + page][0];var width = this.tabStyles.width;var appearNum = parseInt(750 / width);var tabsNum = this.tabTitles.length;var offset = page > appearNum ? -(750 - width) / 2 : -width * 2;if (appearNum < tabsNum) {(previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, { offset: offset, animated: animated });page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, { offset: -width * page, animated: animated });}this.currentPage = page;this._animateTransformX(page, animated);this.$emit('wxcTabBarCurrentTabSelected', { page: page });}, jumpOut: function jumpOut(url) {url && _utils2.default.goToH5Page(url);}, _animateTransformX: function _animateTransformX(page, animated) {var duration = this.duration,timingFunction = this.timingFunction;var computedDur = animated ? duration : 0.00001;
      var containerEl = this.$refs['tab-container'];
      var dist = page * 750;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)' },

        duration: computedDur,
        timingFunction: timingFunction,
        delay: 0 },
      function () {
      });
    } } };

/***/ }),
/* 257 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-tab-page"],
    style: {
      backgroundColor: _vm.wrapBgColor
    }
  }, [_c('div', {
    ref: "tab-page-wrap",
    staticClass: ["tab-page-wrap"]
  }, [_c('div', {
    ref: "tab-container",
    staticClass: ["tab-container"]
  }, [_vm._t("default")], 2)]), _c('div', {
    staticClass: ["tab-title-list"],
    style: {
      backgroundColor: _vm.tabStyles.bgColor,
      height: (_vm.tabStyles.height + (_vm.isIPhoneX ? 78 : 0)) + 'px',
      paddingBottom: _vm.isIPhoneX ? '78px' : '0'
    }
  }, _vm._l((_vm.tabTitles), function(v, index) {
    return _c('div', {
      key: index,
      ref: 'wxc-tab-title-' + index,
      refInFor: true,
      staticClass: ["title-item"],
      style: {
        width: _vm.tabStyles.width + 'px',
        height: _vm.tabStyles.height + 'px',
        backgroundColor: _vm.currentPage == index ? _vm.tabStyles.activeBgColor : _vm.tabStyles.bgColor
      },
      attrs: {
        "accessible": true,
        "ariaLabel": ("" + (v.title?v.title:'标签'+index))
      },
      on: {
        "click": function($event) {
          _vm.setPage(index, v.url)
        }
      }
    }, [(_vm.titleType === 'icon' && !_vm.titleUseSlot) ? _c('image', {
      style: {
        width: _vm.tabStyles.iconWidth + 'px',
        height: _vm.tabStyles.iconHeight + 'px'
      },
      attrs: {
        "src": _vm.currentPage == index ? v.activeIcon : v.icon
      }
    }) : _vm._e(), (_vm.titleType === 'iconFont' && v.codePoint && !_vm.titleUseSlot) ? _c('text', {
      style: {
        fontFamily: 'wxcIconFont',
        fontSize: _vm.tabStyles.iconFontSize + 'px',
        marginBottom: _vm.tabStyles.iconFontMarginBottom ? (_vm.tabStyles.iconFontMarginBottom + 'px') : '8px',
        color: _vm.currentPage == index ? _vm.tabStyles.activeIconFontColor : _vm.tabStyles.iconFontColor
      }
    }, [_vm._v(_vm._s(v.codePoint))]) : _vm._e(), (!_vm.titleUseSlot) ? _c('text', {
      staticClass: ["tab-text"],
      style: {
        fontSize: _vm.tabStyles.fontSize + 'px',
        fontWeight: (_vm.currentPage == index && _vm.tabStyles.isActiveTitleBold) ? 'bold' : 'normal',
        color: _vm.currentPage == index ? _vm.tabStyles.activeTitleColor : _vm.tabStyles.titleColor,
        paddingLeft: _vm.tabStyles.textPaddingLeft + 'px',
        paddingRight: _vm.tabStyles.textPaddingRight + 'px'
      }
    }, [_vm._v(_vm._s(v.title))]) : _vm._e(), (v.badge && !_vm.titleUseSlot) ? _c('div', {
      staticClass: ["desc-tag"]
    }, [_c('text', {
      staticClass: ["desc-text"]
    }, [_vm._v(_vm._s(v.badge))])]) : _vm._e(), (v.dot && !v.badge && !_vm.titleUseSlot) ? _c('div', {
      staticClass: ["dot"]
    }) : _vm._e(), (_vm.titleUseSlot) ? _vm._t(("tab-title-" + index)) : _vm._e()], 2)
  }))])
},staticRenderFns: []}

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(260)
)

/* script */
__vue_exports__ = __webpack_require__(261)

/* template */
var __vue_template__ = __webpack_require__(262)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-13b0d136"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 260 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-tab-page": {
    "width": "750"
  },
  "tab-title-list": {
    "flexDirection": "row"
  },
  "title-item": {
    "justifyContent": "center",
    "alignItems": "center",
    "borderBottomStyle": "solid"
  },
  "border-bottom": {
    "position": "absolute",
    "bottom": 0
  },
  "tab-page-wrap": {
    "width": "750",
    "overflow": "hidden"
  },
  "tab-container": {
    "flex": 1,
    "flexDirection": "row",
    "position": "absolute"
  },
  "tab-text": {
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "rightIcon": {
    "position": "fixed",
    "backgroundColor": "#ffffff",
    "boxShadow": "-50px 0 20px #ffffff"
  }
}

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });




























































































































var _utils = __webpack_require__(0);var _utils2 = _interopRequireDefault(_utils);
var _bindEnv = __webpack_require__(1);var _bindEnv2 = _interopRequireDefault(_bindEnv);
var _indexWeex = __webpack_require__(2);var _indexWeex2 = _interopRequireDefault(_indexWeex);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var dom = weex.requireModule('dom');var animation = weex.requireModule('animation');var swipeBack = weex.requireModule('swipeBack');exports.default = { props: { tabTitles: { type: Array, default: function _default() {return [];} }, panDist: { type: Number, default: 200 }, spmC: { type: [String, Number], default: '' }, titleUseSlot: { type: Boolean, default: false }, tabStyles: { type: Object, default: function _default() {return { bgColor: '#FFFFFF', titleColor: '#666666', activeTitleColor: '#3D3D3D', activeBgColor: '#FFFFFF', isActiveTitleBold: true, iconWidth: 70, iconHeight: 70, width: 160, height: 120, fontSize: 24, hasActiveBottom: true, activeBottomColor: '#FFC900', activeBottomWidth: 120, activeBottomHeight: 6, textPaddingLeft: 10, textPaddingRight: 10, leftOffset: 0, rightOffset: 0, normalBottomColor: '#F2F2F2', normalBottomHeight: 0, hasRightIcon: false };} }, titleType: { type: String, default: 'icon' }, tabPageHeight: { type: [String, Number], default: 1334 }, needSlider: { type: Boolean, default: true }, isTabView: { type: Boolean, default: true }, duration: { type: [Number, String], default: 300 }, timingFunction: { type: String, default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }, wrapBgColor: { type: String, default: '#f2f3f4' }, clickAnimation: { type: Boolean, default: true }, rightIconStyle: { type: Object, default: function _default() {return { top: 0, right: 0, paddingLeft: 20, paddingRight: 20 };} } }, data: function data() {return { currentPage: 0, gesToken: 0, isMoving: false, startTime: 0, deltaX: 0, translateX: 0 };}, created: function created() {var titleType = this.titleType,tabStyles = this.tabStyles;if (titleType === 'iconFont' && tabStyles.iconFontUrl) {dom.addRule('fontFace', { 'fontFamily': "wxcIconFont", 'src': 'url(' + tabStyles.iconFontUrl + ')' });}}, mounted: function mounted() {if (swipeBack && swipeBack.forbidSwipeBack) {swipeBack.forbidSwipeBack(true);}if (_bindEnv2.default.supportsEBForIos() && this.isTabView && this.needSlider) {var tabPageEl = this.$refs['tab-page-wrap'];_indexWeex2.default.prepare && _indexWeex2.default.prepare({ anchor: tabPageEl.ref, eventType: 'pan' });}}, methods: { next: function next() {var page = this.currentPage;if (page < this.tabTitles.length - 1) {
        page++;
      }
      this.setPage(page);
    },
    prev: function prev() {
      var page = this.currentPage;
      if (page > 0) {
        page--;
      }
      this.setPage(page);
    },
    startHandler: function startHandler() {
      if (_bindEnv2.default.supportsEBForIos() && this.isTabView && this.needSlider) {
        this.bindExp(this.$refs['tab-page-wrap']);
      }
    },
    bindExp: function bindExp(element) {var _this = this;
      if (element && element.ref) {

        if (this.isMoving && this.gesToken !== 0) {
          _indexWeex2.default.unbind({
            eventType: 'pan',
            token: this.gesToken });

          this.gesToken = 0;
          return;
        }

        var tabElement = this.$refs['tab-container'];var
        currentPage = this.currentPage,panDist = this.panDist;
        var dist = currentPage * 750;

        // x-dist
        var props = [{
          element: tabElement.ref,
          property: 'transform.translateX',
          expression: 'x-' + dist }];


        var gesTokenObj = _indexWeex2.default.bind({
          anchor: element.ref,
          eventType: 'pan',
          props: props },
        function (e) {var
          deltaX = e.deltaX,state = e.state;
          if (state === 'end') {
            if (deltaX < -panDist) {
              _this.next();
            } else if (deltaX > panDist) {
              _this.prev();
            } else {
              _this.setPage(currentPage);
            }
          }
        });
        this.gesToken = gesTokenObj.token;
      }
    },
    setPage: function setPage(page) {var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;var animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (!this.isTabView) {
        this.jumpOut(url);
        return;
      }
      if (this.isMoving === true) {
        return;
      }
      this.isMoving = true;
      var previousPage = this.currentPage;
      var currentTabEl = this.$refs['wxc-tab-title-' + page][0];var
      width = this.tabStyles.width;
      var appearNum = parseInt(750 / width);
      var tabsNum = this.tabTitles.length;
      var offset = page > appearNum ? -(750 - width) / 2 : -width * 2;

      if (appearNum < tabsNum) {
        (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
          offset: offset, animated: animated });


        page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
          offset: -width * page,
          animated: animated });

      }

      this.isMoving = false;
      this.currentPage = page;
      this._animateTransformX(page, animated);
      this.$emit('wxcTabPageCurrentTabSelected', { page: page });
    },
    jumpOut: function jumpOut(url) {
      url && _utils2.default.goToH5Page(url);
    },
    _animateTransformX: function _animateTransformX(page, animated) {var
      duration = this.duration,timingFunction = this.timingFunction;
      var computedDur = animated ? duration : 0.00001;
      var containerEl = this.$refs['tab-container'];
      var dist = page * 750;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)' },

        duration: computedDur,
        timingFunction: timingFunction,
        delay: 0 },
      function () {
      });
    } } };

/***/ }),
/* 262 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-tab-page"],
    style: {
      height: (_vm.tabPageHeight) + 'px',
      backgroundColor: _vm.wrapBgColor
    }
  }, [_c('scroller', {
    ref: "tab-title-list",
    staticClass: ["tab-title-list"],
    style: {
      backgroundColor: _vm.tabStyles.bgColor,
      height: (_vm.tabStyles.height) + 'px',
      paddingLeft: (_vm.tabStyles.leftOffset ? _vm.tabStyles.leftOffset : 0) + 'px',
      paddingRight: _vm.tabStyles.rightOffset
    },
    attrs: {
      "showScrollbar": false,
      "scrollDirection": "horizontal",
      "dataSpm": _vm.spmC
    }
  }, [_vm._l((_vm.tabTitles), function(v, index) {
    return _c('div', {
      key: index,
      ref: 'wxc-tab-title-' + index,
      refInFor: true,
      staticClass: ["title-item"],
      style: {
        width: _vm.tabStyles.width + 'px',
        height: _vm.tabStyles.height + 'px',
        backgroundColor: _vm.currentPage === index ? _vm.tabStyles.activeBgColor : _vm.tabStyles.bgColor,
        borderBottomWidth: _vm.tabStyles.normalBottomHeight,
        borderBottomColor: _vm.tabStyles.normalBottomColor
      },
      attrs: {
        "accessible": true,
        "ariaLabel": ("" + (v.title?v.title:'标签'+index))
      },
      on: {
        "click": function($event) {
          _vm.setPage(index, v.url, _vm.clickAnimation)
        }
      }
    }, [(_vm.titleType === 'icon' && !_vm.titleUseSlot) ? _c('image', {
      style: {
        width: _vm.tabStyles.iconWidth + 'px',
        height: _vm.tabStyles.iconHeight + 'px'
      },
      attrs: {
        "src": _vm.currentPage === index ? v.activeIcon : v.icon
      }
    }) : _vm._e(), (_vm.titleType === 'iconFont' && v.codePoint && !_vm.titleUseSlot) ? _c('text', {
      staticClass: ["icon-font"],
      style: {
        fontFamily: 'wxcIconFont',
        fontSize: _vm.tabStyles.iconFontSize + 'px',
        color: _vm.currentPage === index ? _vm.tabStyles.activeIconFontColor : _vm.tabStyles.iconFontColor
      }
    }, [_vm._v(_vm._s(v.codePoint))]) : _vm._e(), (!_vm.titleUseSlot) ? _c('text', {
      staticClass: ["tab-text"],
      style: {
        fontSize: _vm.tabStyles.fontSize + 'px',
        fontWeight: (_vm.currentPage === index && _vm.tabStyles.isActiveTitleBold) ? 'bold' : 'normal',
        color: _vm.currentPage === index ? _vm.tabStyles.activeTitleColor : _vm.tabStyles.titleColor,
        paddingLeft: (_vm.tabStyles.textPaddingLeft ? _vm.tabStyles.textPaddingLeft : 10) + 'px',
        paddingRight: (_vm.tabStyles.textPaddingRight ? _vm.tabStyles.textPaddingRight : 10) + 'px'
      }
    }, [_vm._v(_vm._s(v.title))]) : _vm._e(), (_vm.tabStyles.hasActiveBottom && !_vm.titleUseSlot) ? _c('div', {
      staticClass: ["border-bottom"],
      style: {
        width: _vm.tabStyles.activeBottomWidth + 'px',
        left: (_vm.tabStyles.width - _vm.tabStyles.activeBottomWidth) / 2 + 'px',
        height: _vm.tabStyles.activeBottomHeight + 'px',
        backgroundColor: _vm.currentPage === index ? _vm.tabStyles.activeBottomColor : 'transparent'
      }
    }) : _vm._e(), (_vm.titleUseSlot) ? _vm._t(("tab-title-" + index)) : _vm._e()], 2)
  }), (_vm.tabStyles.hasRightIcon) ? _c('div', {
    staticClass: ["rightIcon"],
    style: {
      top: _vm.rightIconStyle.top,
      right: _vm.rightIconStyle.right,
      paddingLeft: _vm.rightIconStyle.paddingLeft,
      paddingRight: _vm.rightIconStyle.paddingRight
    }
  }, [_vm._t("rightIcon")], 2) : _vm._e()], 2), _c('div', {
    ref: "tab-page-wrap",
    staticClass: ["tab-page-wrap"],
    style: {
      height: (_vm.tabPageHeight - _vm.tabStyles.height) + 'px'
    },
    on: {
      "horizontalpan": _vm.startHandler
    }
  }, [_c('div', {
    ref: "tab-container",
    staticClass: ["tab-container"]
  }, [_vm._t("default")], 2)])])
},staticRenderFns: []}

/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(265)
)

/* script */
__vue_exports__ = __webpack_require__(266)

/* template */
var __vue_template__ = __webpack_require__(267)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4ed75567"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 265 */
/***/ (function(module, exports) {

module.exports = {
  "tag-item": {
    "height": "24",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingBottom": "2"
  },
  "tag-border": {
    "borderBottomLeftRadius": "4",
    "borderBottomRightRadius": "4",
    "borderTopLeftRadius": "4",
    "borderTopRightRadius": "4"
  },
  "tag-hollow": {
    "borderWidth": "1"
  },
  "tag-image": {
    "height": "24"
  },
  "tag-special": {
    "borderWidth": "1",
    "flexDirection": "row"
  },
  "left-image": {
    "width": "20",
    "height": "20"
  },
  "tag-left": {
    "width": "24",
    "height": "24",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "tag-text": {
    "fontSize": "20",
    "height": "22",
    "lineHeight": "22",
    "paddingLeft": "6",
    "paddingRight": "6"
  }
}

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default =
{
  props: {
    type: {
      type: String,
      default: 'solid' },

    value: {
      type: [String, Number],
      default: '测试测试' },

    tagColor: {
      type: String,
      default: '#ff5000' },

    fontColor: {
      type: String,
      default: '#333333' },

    specialIcon: {
      type: String,
      default: '' },

    img: {
      type: String,
      default: '' } },


  computed: {
    showSolid: function showSolid() {var
      type = this.type,value = this.value;
      return type === 'solid' && value !== '';
    },
    showHollow: function showHollow() {var
      type = this.type,value = this.value;
      return type === 'hollow' && value !== '';
    },
    showSpecial: function showSpecial() {var
      type = this.type,value = this.value,specialIcon = this.specialIcon;
      return type === 'special' && value !== '' && specialIcon !== '';
    },
    showImage: function showImage() {var
      type = this.type,img = this.img;
      return type === 'image' && img !== '';
    },
    tagTextStyle: function tagTextStyle() {var
      tagColor = this.tagColor,showSolid = this.showSolid;
      return showSolid ? { backgroundColor: tagColor } : { borderColor: tagColor };
    } },

  data: function data() {return {
      imgWidth: 90 };},

  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        var width = e.size.naturalWidth;
        var height = e.size.naturalHeight;
        this.imgWidth = width * (24 / height);
      }
    } } };

/***/ }),
/* 267 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.showSolid || _vm.showHollow) ? _c('div', {
    class: ['tag-item', 'tag-border', _vm.showHollow && 'tag-hollow'],
    style: _vm.tagTextStyle
  }, [_c('text', {
    staticClass: ["tag-text"],
    style: {
      color: _vm.fontColor
    }
  }, [_vm._v(_vm._s(_vm.value))])]) : _vm._e(), (_vm.showImage) ? _c('image', {
    staticClass: ["tag-image"],
    style: {
      width: _vm.imgWidth + 'px'
    },
    attrs: {
      "src": _vm.img,
      "ariaHidden": true
    },
    on: {
      "load": _vm.onLoad
    }
  }) : _vm._e(), (_vm.showSpecial) ? _c('div', {
    staticClass: ["tag-special", "tag-border"],
    style: {
      borderColor: _vm.tagColor
    },
    attrs: {
      "accessible": true,
      "ariaLabel": _vm.value
    }
  }, [_c('div', {
    staticClass: ["tag-left"],
    style: {
      backgroundColor: _vm.tagColor
    }
  }, [_c('image', {
    staticClass: ["left-image"],
    attrs: {
      "src": _vm.specialIcon
    }
  })]), _c('text', {
    staticClass: ["tag-text"],
    style: {
      color: _vm.fontColor
    }
  }, [_vm._v(_vm._s(_vm.value))])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 268 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["container"]
  }, [(_vm.imageBg) ? _c('image', {
    staticClass: ["bg-image"],
    style: _vm.styleBg,
    attrs: {
      "src": _vm.imageBg,
      "resize": "cover"
    }
  }) : _vm._e(), (_vm.isShow) ? _c('div', {
    staticClass: ["container"]
  }, [_c('scroller', {
    staticClass: ["page"],
    style: _vm.pageStyle,
    on: {
      "scroll": _vm.handleScroll
    }
  }, [(_vm.refresh === 'on') ? _c('refresh', {
    staticClass: ["refresh"],
    attrs: {
      "display": _vm.refreshing ? 'show' : 'hide'
    },
    on: {
      "refresh": _vm.handleRefresh,
      "pullingdown": _vm.handlePullDown
    }
  }, [(_vm.refreshSlot) ? _c('div', {
    ref: "refreshSlot"
  }, [_vm._t("refreshSlot")], 2) : _vm._e(), (!_vm.refreshSlot) ? _c('loading-indicator', {
    staticClass: ["indicator"]
  }) : _vm._e()]) : _vm._e(), _c('div', {
    ref: "content",
    staticClass: ["page-content"],
    style: {
      minHeight: (_vm.containerHeight + 1) + 'px'
    }
  }, [_vm._t("default")], 2), (_vm.load === 'on') ? _c('loading', {
    staticClass: ["loading"],
    attrs: {
      "display": _vm.loading ? 'show' : 'hide'
    },
    on: {
      "loading": _vm.handleLoading
    }
  }, [(_vm.loadSlot) ? _c('div', {
    ref: "loadingSlot"
  }, [_vm._t("loadingSlot")], 2) : _vm._e(), (!_vm.loadSlot) ? _c('loading-indicator', {
    staticClass: ["indicator-loading"]
  }) : _vm._e()]) : _vm._e()]), (_vm.toTop) ? _c('text', {
    staticClass: ["top"],
    on: {
      "click": _vm.handleTop
    }
  }, [_vm._v("")]) : _vm._e()]) : _vm._e(), (!_vm.isShow) ? _c('div', [(_vm.pageLoadSlot) ? _vm._t("pageLoading") : _vm._e(), _c('wxc-loading', {
    attrs: {
      "show": !_vm.pageLoadSlot,
      "type": "default"
    }
  })], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(272);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 272 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 273 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(275)('keys');
var uid = __webpack_require__(31);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(4);
var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(29) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 276 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(4);
var LIBRARY = __webpack_require__(29);
var wksExt = __webpack_require__(277);
var defineProperty = __webpack_require__(12).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 279 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(33);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(31)('meta');
var isObject = __webpack_require__(7);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(12).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(17)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(13) && !__webpack_require__(17)(function () {
  return Object.defineProperty(__webpack_require__(269)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(14);
var core = __webpack_require__(4);
var fails = __webpack_require__(17);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(18);
var arrayIndexOf = __webpack_require__(329)(false);
var IE_PROTO = __webpack_require__(274)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(273);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(333), __esModule: true };

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(334)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(289)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var $export = __webpack_require__(14);
var redefine = __webpack_require__(290);
var hide = __webpack_require__(15);
var Iterators = __webpack_require__(30);
var $iterCreate = __webpack_require__(335);
var setToStringTag = __webpack_require__(35);
var getPrototypeOf = __webpack_require__(337);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(336);
var enumBugKeys = __webpack_require__(276);
var IE_PROTO = __webpack_require__(274)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(269)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(292).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(338);
var global = __webpack_require__(3);
var hide = __webpack_require__(15);
var Iterators = __webpack_require__(30);
var TO_STRING_TAG = __webpack_require__(5)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(342), __esModule: true };

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(284);
var hiddenKeys = __webpack_require__(276).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 296 */
/***/ (function(module, exports) {



/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(28);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(8);
var aFunction = __webpack_require__(33);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(32);
var invoke = __webpack_require__(362);
var html = __webpack_require__(292);
var cel = __webpack_require__(269);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(28)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 300 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var isObject = __webpack_require__(7);
var newPromiseCapability = __webpack_require__(280);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(320)
)

/* script */
__vue_exports__ = __webpack_require__(321)

/* template */
var __vue_template__ = __webpack_require__(370)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6c2d692a"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ }),
/* 320 */
/***/ (function(module, exports) {

module.exports = {
  "content": {
    "marginTop": "10",
    "display": "flex",
    "flexDirection": "column",
    "position": "relative"
  },
  "history": {
    "width": "750",
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "display": "flex"
  },
  "histroy-content": {
    "flex": 1,
    "backgroundColor": "#e5e5e5",
    "borderRadius": "10",
    "display": "flex",
    "flexDirection": "column",
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20"
  },
  "histroy-title": {
    "fontSize": "36",
    "color": "#696969"
  },
  "history-img": {
    "width": "670",
    "height": "300",
    "marginTop": "5",
    "marginBottom": "5"
  },
  "history-text": {
    "fontSize": "28",
    "color": "#7c8692"
  }
}

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });





















var _index = __webpack_require__(37);var _index2 = _interopRequireDefault(_index);
var _weexUi = __webpack_require__(16);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var navigator = weex.requireModule('navigator');var modal = weex.requireModule('modal');var stream = weex.requireModule('stream');var storage = weex.requireModule('storage');exports.default = { name: "search", components: { Page: _index2.default, WxcSearchbar: _weexUi.WxcSearchbar }, data: function data() {return { showPage: false, refreshing: false, loading: false, minusHeight: 130, styleBar: { "backgroundColor": "transparent" },
			homeData: "",
			keywords: "" };

	},
	mounted: function mounted() {var _this = this;
		stream.fetch({
			method: "GET",
			url: "http://47.107.134.57:3000/home",
			type: "json" },
		function (res) {
			console.log(res);
			_this.$data.homeData = res.data;
			_this.$data.showPage = true;
		});
	},
	methods: {
		nav2Detail: function nav2Detail(keywords) {
			storage.setItem('keywords', keywords, function (e) {
				if (e.result === "success" && e.data === undefined) {
					uni.navigateTo({
						url: '../detail/detail' });

				}
			});
		},
		getDetail: function getDetail(item) {
			if (item.keywords) {
				this.nav2Detail(item.keywords);
			}
		},
		handleRefresh: function handleRefresh() {var _this2 = this;
			this.$data.refreshing = true;
			setTimeout(function () {
				_this2.$data.refreshing = false;
			}, 1000);
		},
		handleLoading: function handleLoading() {var _this3 = this;
			this.$data.loading = true;
			setTimeout(function () {
				_this3.$data.loading = false;
			}, 1000);
		},
		wxcSearchbarInputOnInput: function wxcSearchbarInputOnInput(e) {
			this.$data.keywords = e.value;
		},
		wxcSearchbarInputReturned: function wxcSearchbarInputReturned() {
			this.nav2Detail(this.$data.keywords);
		} } };
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(322)["default"]))

/***/ }),
/* 322 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_typeof__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_symbol__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_assign__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise__);
var isFn = function isFn(v) {
  return typeof v === 'function';
};

var handlePromise = function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
};

var REGEX = /^on|^create|Sync$|Manager$|^pause/;
var API_NORMAL_LIST = ['os', 'stopRecord', 'stopVoice', 'stopBackgroundAudio', 'stopPullDownRefresh', 'hideKeyboard', 'hideToast', 'hideLoading', 'showNavigationBarLoading', 'hideNavigationBarLoading', 'canIUse', 'navigateBack', 'closeSocket', 'pageScrollTo', 'drawCanvas'];

var shouldPromise = function shouldPromise(name) {
  if (REGEX.test(name) && name !== 'createBLEConnection') {
    return false;
  }
  if (~API_NORMAL_LIST.indexOf(name)) {
    return false;
  }
  return true;
};

var promisify = function promisify(api) {
  return function () {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(undefined, [options].concat(params));
    }
    return handlePromise(new __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      api.apply(undefined, [__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_assign___default()({}, options, {
        success: resolve,
        fail: reject })].
      concat(params));
      /* eslint-disable no-extend-native */
      __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise___default.a.prototype.finally = function (callback) {
        var promise = this.constructor;
        return this.then(function (value) {
          return promise.resolve(callback()).then(function () {
            return value;
          });
        }, function (reason) {
          return promise.resolve(callback()).then(function () {
            throw reason;
          });
        });
      };
    }));
  };
};

var UNIAPP_LAUNCH_WEBVIEW_ID = '__UNIAPP_LAUNCH_WEBVIEW_ID';

var plus = weex.requireModule('plus');
var storage = weex.requireModule('plusstorage');
var globalEvent = weex.requireModule('globalEvent');

var id = 0;
var callbacks = {};

var WEBVIEW_ID = '';

storage && storage.getItem && storage.getItem(UNIAPP_LAUNCH_WEBVIEW_ID, function (evt) {
  if (evt.result === 'success' && evt.data) {
    WEBVIEW_ID = evt.data;
  }
});

globalEvent.addEventListener('plusMessage', function (e) {
  if (e.data.type === 'UniAppJsApi') {
    invoke(e.data.id, e.data.data);
  } else if (e.data.type === 'onNavigationBarButtonTap') {
    if (typeof onNavigationBarButtonTapCallback === 'function') {
      onNavigationBarButtonTapCallback(e.data.data);
    }
  }
});

var createCallback = function createCallback(args, type) {
  var callback = function callback(res) {
    if (isFn(args)) {
      args(res);
    } else if (args) {
      if (~res.errMsg.indexOf(':ok')) {
        isFn(args.success) && args.success(res);
      } else if (~res.errMsg.indexOf(':fail')) {
        isFn(args.fail) && args.fail(res);
      }
      isFn(args.complete) && args.complete(res);
    }
  };
  if (isFn(args) || args && isFn(args.callback)) {
    callback.keepAlive = true;
  }
  return callback;
};

var invoke = function invoke(callbackId, data) {
  var callback = callbacks[callbackId];
  if (callback) {
    callback(data);
    if (!callback.keepAlive) {
      delete callbacks[callbackId];
    }
  } else {
    console.error('callback[' + callbackId + '] is undefined');
  }
};

var publish = function publish(_ref) {
  var id = _ref.id,
  type = _ref.type,
  params = _ref.params;

  callbacks[id] = createCallback(params, type);
  if (WEBVIEW_ID) {
    plus.postMessage({
      id: id,
      type: type,
      params: params },
    WEBVIEW_ID);
  } else {
    console.error('launch webview id is not ready');
  }
};

function postMessage(data) {
  if (WEBVIEW_ID) {
    plus.postMessage(data, WEBVIEW_ID);
  } else {
    console.error('launch webview id is not ready');
  }
}

var createPublish = function createPublish(name) {
  return function (args) {
    publish({
      id: id++,
      type: name,
      params: args });

  };
};

var onNavigationBarButtonTapCallback = void 0;
function onNavigationBarButtonTap(callback) {
  onNavigationBarButtonTapCallback = callback;
}

function requireNativePlugin(pluginName) {
  return weex.requireModule(pluginName);
}

var dom = weex.requireModule('dom');

function loadFontFace(_ref) {
  var family = _ref.family,
  source = _ref.source,
  desc = _ref.desc,
  success = _ref.success,
  fail = _ref.fail,
  complete = _ref.complete;

  dom.addRule('fontFace', {
    fontFamily: family,
    src: source.replace(/"/g, '\'') });

  var res = {
    errMsg: 'loadFontFace:ok',
    status: 'loaded' };

  isFn(success) && success(res);
  isFn(complete) && complete(res);
}

var globalEvent$1 = weex.requireModule('globalEvent');

var callbacks$1 = [];

globalEvent$1.addEventListener('plusMessage', function (e) {
  if (e.data.type === 'UniAppReady') {
    ready.isUniAppReady = true;
    if (callbacks$1.length) {
      callbacks$1.forEach(function (callback) {
        return callback();
      });
      callbacks$1 = [];
    }
  }
});

function ready(callback) {
  if (typeof callback === 'function') {
    if (this.isUniAppReady) {
      callback();
    } else {
      callbacks$1.push(callback);
    }
  }
}

var _typeof = typeof __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_symbol___default.a === "function" && __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_typeof___default()(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator___default.a) === "symbol" ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_typeof___default()(obj);
} : function (obj) {
  return obj && typeof __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_symbol___default.a === "function" && obj.constructor === __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_symbol___default.a && obj !== __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_symbol___default.a.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_typeof___default()(obj);
};

var stream = weex.requireModule('stream');

// let requestTaskId = 0

var METHOD_GET = 'GET';
var METHOD_POST = 'POST';
var CONTENT_TYPE_JSON = 'application/json';
var CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded';

var serialize = function serialize(data) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : METHOD_GET;
  var contentType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CONTENT_TYPE_FORM;

  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    if (method.toUpperCase() === METHOD_POST && contentType.toLowerCase() === CONTENT_TYPE_JSON) {
      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(data);
    } else {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(data).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');
    }
  }
  return data;
};

function request(_ref) {
  var url = _ref.url,
  data = _ref.data,
  header = _ref.header,
  _ref$method = _ref.method,
  method = _ref$method === undefined ? 'GET' : _ref$method,
  _ref$dataType = _ref.dataType,
  dataType = _ref$dataType === undefined ? 'json' : _ref$dataType,
  responseType = _ref.responseType,
  success = _ref.success,
  fail = _ref.fail,
  complete = _ref.complete;

  // requestTaskId++
  var aborted = false;

  var hasContentType = false;
  var headers = {};
  if (header) {
    for (var name in header) {
      if (!hasContentType && name.toLowerCase() === 'content-type') {
        hasContentType = true;
        headers['Content-Type'] = header[name];
      } else {
        headers[name] = header[name];
      }
    }
  }
  if (method === METHOD_GET && data) {
    url = url + (~url.indexOf('?') ? url.substr(-1) === '&' || url.substr(-1) === '?' ? '' : '&' : '?') + serialize(data);
  }
  stream.fetch({
    url: url,
    method: method,
    headers: headers,
    type: dataType === 'json' ? 'json' : 'text',
    body: method !== METHOD_GET ? serialize(data, method, headers['Content-Type']) : '' },
  function (_ref2) {
    var status = _ref2.status,
    ok = _ref2.ok,
    statusText = _ref2.statusText,
    data = _ref2.data,
    headers = _ref2.headers;

    var ret = {};
    if (!status || status === -1 || aborted) {
      ret.errMsg = 'request:fail';
      isFn(fail) && fail(ret);
    } else {
      ret.data = data;
      ret.statusCode = status;
      ret.header = headers;
      isFn(success) && success(ret);
    }
    isFn(complete) && complete(ret);
  });
  return {
    abort: function abort() {
      aborted = true;
    } };

}

var storage$1 = weex.requireModule('plusstorage');
var UNIAPP_STORAGE_DATA_TYPE = '__TYPE';

function getStorage(_ref) {
  var key = _ref.key,
  data = _ref.data,
  success = _ref.success,
  fail = _ref.fail,
  complete = _ref.complete;

  storage$1.getItem(key + UNIAPP_STORAGE_DATA_TYPE, function (ret) {
    if (ret.result === 'success') {
      var dataType = ret.data;
      storage$1.getItem(key, function (res) {
        if (res.result === 'success') {
          var result = res.data;
          if (dataType && result) {
            if (dataType !== 'String') {
              result = JSON.parse(result);
            }
            isFn(success) && success({
              errMsg: 'getStorage:ok',
              data: result });

          } else {
            res.errMsg = 'setStorage:fail';
            isFn(fail) && fail(res);
          }
        } else {
          res.errMsg = 'setStorage:fail';
          isFn(fail) && fail(res);
        }
        isFn(complete) && complete(res);
      });
    } else {
      ret.errMsg = 'setStorage:fail';
      isFn(fail) && fail(ret);
      isFn(complete) && complete(ret);
    }
  });
}
function setStorage(_ref2) {
  var key = _ref2.key,
  data = _ref2.data,
  success = _ref2.success,
  fail = _ref2.fail,
  complete = _ref2.complete;

  var dataType = 'String';
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    dataType = 'Object';
    data = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(data);
  }
  storage$1.setItem(key, data, function (res) {
    if (res.result === 'success') {
      storage$1.setItem(key + UNIAPP_STORAGE_DATA_TYPE, dataType, function (ret) {
        if (ret.result === 'success') {
          isFn(success) && success({
            errMsg: 'setStorage:ok' });

        } else {
          ret.errMsg = 'setStorage:fail';
          isFn(fail) && fail(ret);
        }
      });
    } else {
      res.errMsg = 'setStorage:fail';
      isFn(fail) && fail(res);
    }
    isFn(complete) && complete(res);
  });
}

function removeStorage(_ref3) {
  var key = _ref3.key,
  data = _ref3.data,
  success = _ref3.success,
  fail = _ref3.fail,
  complete = _ref3.complete;

  storage$1.removeItem(key, function (res) {
    if (res.result === 'success') {
      isFn(success) && success({
        errMsg: 'removeStorage:ok' });

    } else {
      res.errMsg = 'removeStorage:fail';
      isFn(fail) && fail(res);
    }
    isFn(complete) && complete(res);
  });
  storage$1.removeItem(key + UNIAPP_STORAGE_DATA_TYPE);
}

function clearStorage(_ref4) {
  var key = _ref4.key,
  data = _ref4.data,
  success = _ref4.success,
  fail = _ref4.fail,
  complete = _ref4.complete;
}

var clipboard = weex.requireModule('clipboard');

function getClipboardData(_ref) {
  var success = _ref.success,
  fail = _ref.fail,
  complete = _ref.complete;

  clipboard.getString(function (_ref2) {
    var data = _ref2.data;

    var res = {
      errMsg: 'getClipboardData:ok',
      data: data };

    isFn(success) && success(res);
    isFn(complete) && complete(res);
  });
}

function setClipboardData(_ref3) {
  var data = _ref3.data,
  success = _ref3.success,
  fail = _ref3.fail,
  complete = _ref3.complete;

  var res = {
    errMsg: 'setClipboardData:ok' };

  clipboard.setString(data);
  isFn(success) && success(res);
  isFn(complete) && complete(res);
}



var api = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default()({
  loadFontFace: loadFontFace,
  ready: ready,
  request: request,
  getStorage: getStorage,
  setStorage: setStorage,
  removeStorage: removeStorage,
  clearStorage: clearStorage,
  getClipboardData: getClipboardData,
  setClipboardData: setClipboardData });


var wx = {
  uploadFile: true,
  downloadFile: true,
  chooseImage: true,
  previewImage: true,
  getImageInfo: true,
  saveImageToPhotosAlbum: true,
  chooseVideo: true,
  saveVideoToPhotosAlbum: true,
  saveFile: true,
  getSavedFileList: true,
  getSavedFileInfo: true,
  removeSavedFile: true,
  openDocument: true,
  setStorage: true,
  getStorage: true,
  getStorageInfo: true,
  removeStorage: true,
  clearStorage: true,
  getLocation: true,
  chooseLocation: true,
  openLocation: true,
  getSystemInfo: true,
  getNetworkType: true,
  makePhoneCall: true,
  scanCode: true,
  setScreenBrightness: true,
  getScreenBrightness: true,
  setKeepScreenOn: true,
  vibrateLong: true,
  vibrateShort: true,
  addPhoneContact: true,
  showToast: true,
  showLoading: true,
  hideToast: true,
  hideLoading: true,
  showModal: true,
  showActionSheet: true,
  setNavigationBarTitle: true,
  setNavigationBarColor: true,
  navigateTo: true,
  redirectTo: true,
  reLaunch: true,
  switchTab: true,
  navigateBack: true,
  getProvider: true,
  login: true,
  getUserInfo: true,
  share: true,
  requestPayment: true,
  subscribePush: true,
  unsubscribePush: true,
  onPush: true,
  offPush: true };


var uni = {};

var baseUni = {
  os: {
    nvue: true } };



if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'os') {
        return {
          nvue: true };

      }
      if (name === 'postMessage') {
        return postMessage;
      }
      if (name === 'requireNativePlugin') {
        return requireNativePlugin;
      }
      if (name === 'onNavigationBarButtonTap') {
        return onNavigationBarButtonTap;
      }
      var method = api[name];
      if (!method) {
        method = createPublish(name);
      }
      if (shouldPromise(name)) {
        return promisify(method);
      }
      return method;
    } });

} else {
  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(baseUni).forEach(function (key) {
    uni[key] = baseUni[key];
  });

  uni.postMessage = postMessage;

  uni.requireNativePlugin = requireNativePlugin;

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(wx).forEach(function (name) {
    var method = api[name];
    if (!method) {
      method = createPublish(name);
    }
    if (shouldPromise(name)) {
      uni[name] = promisify(method);
    } else {
      uni[name] = method;
    }
  });
}

var uni$1 = uni;

/* harmony default export */ __webpack_exports__["default"] = (uni$1);

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(324), __esModule: true };

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(325);
module.exports = __webpack_require__(4).Object.freeze;


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(7);
var meta = __webpack_require__(281).onFreeze;

__webpack_require__(283)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(327), __esModule: true };

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(328);
module.exports = __webpack_require__(4).Object.keys;


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(271);
var $keys = __webpack_require__(27);

__webpack_require__(283)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(18);
var toLength = __webpack_require__(286);
var toAbsoluteIndex = __webpack_require__(330);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(273);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(332), __esModule: true };

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(4);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(288);
__webpack_require__(293);
module.exports = __webpack_require__(277).f('iterator');


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(273);
var defined = __webpack_require__(272);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(291);
var descriptor = __webpack_require__(34);
var setToStringTag = __webpack_require__(35);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(12);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(27);

module.exports = __webpack_require__(13) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(271);
var IE_PROTO = __webpack_require__(274)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(339);
var step = __webpack_require__(340);
var Iterators = __webpack_require__(30);
var toIObject = __webpack_require__(18);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(289)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 339 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 340 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(287);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(294);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(343);
__webpack_require__(296);
__webpack_require__(348);
__webpack_require__(349);
module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(13);
var $export = __webpack_require__(14);
var redefine = __webpack_require__(290);
var META = __webpack_require__(281).KEY;
var $fails = __webpack_require__(17);
var shared = __webpack_require__(275);
var setToStringTag = __webpack_require__(35);
var uid = __webpack_require__(31);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(277);
var wksDefine = __webpack_require__(278);
var enumKeys = __webpack_require__(344);
var isArray = __webpack_require__(345);
var anObject = __webpack_require__(8);
var isObject = __webpack_require__(7);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(270);
var createDesc = __webpack_require__(34);
var _create = __webpack_require__(291);
var gOPNExt = __webpack_require__(346);
var $GOPD = __webpack_require__(347);
var $DP = __webpack_require__(12);
var $keys = __webpack_require__(27);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(295).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(36).f = $propertyIsEnumerable;
  __webpack_require__(279).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(29)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(27);
var gOPS = __webpack_require__(279);
var pIE = __webpack_require__(36);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(28);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(18);
var gOPN = __webpack_require__(295).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(36);
var createDesc = __webpack_require__(34);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(270);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(282);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(13) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(278)('asyncIterator');


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(278)('observable');


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(351), __esModule: true };

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(352);
module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(14);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(353) });


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(27);
var gOPS = __webpack_require__(279);
var pIE = __webpack_require__(36);
var toObject = __webpack_require__(271);
var IObject = __webpack_require__(285);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(17)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(355), __esModule: true };

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(296);
__webpack_require__(288);
__webpack_require__(293);
__webpack_require__(356);
__webpack_require__(368);
__webpack_require__(369);
module.exports = __webpack_require__(4).Promise;


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var global = __webpack_require__(3);
var ctx = __webpack_require__(32);
var classof = __webpack_require__(297);
var $export = __webpack_require__(14);
var isObject = __webpack_require__(7);
var aFunction = __webpack_require__(33);
var anInstance = __webpack_require__(357);
var forOf = __webpack_require__(358);
var speciesConstructor = __webpack_require__(298);
var task = __webpack_require__(299).set;
var microtask = __webpack_require__(363)();
var newPromiseCapabilityModule = __webpack_require__(280);
var perform = __webpack_require__(300);
var userAgent = __webpack_require__(364);
var promiseResolve = __webpack_require__(301);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(365)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(35)($Promise, PROMISE);
__webpack_require__(366)(PROMISE);
Wrapper = __webpack_require__(4)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(367)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 357 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(32);
var call = __webpack_require__(359);
var isArrayIter = __webpack_require__(360);
var anObject = __webpack_require__(8);
var toLength = __webpack_require__(286);
var getIterFn = __webpack_require__(361);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(8);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(30);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(297);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(30);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 362 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(299).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(28)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(15);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(4);
var dP = __webpack_require__(12);
var DESCRIPTORS = __webpack_require__(13);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(14);
var core = __webpack_require__(4);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(298);
var promiseResolve = __webpack_require__(301);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(14);
var newPromiseCapability = __webpack_require__(280);
var perform = __webpack_require__(300);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 370 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["container"]
  }, [_c('page', {
    attrs: {
      "isShow": _vm.showPage,
      "minusHeight": _vm.minusHeight,
      "imageBg": "http://47.107.134.57:3000/images/bg.jpg",
      "refreshing": _vm.refreshing,
      "loading": _vm.loading
    },
    on: {
      "refreshing": _vm.handleRefresh,
      "loadining": _vm.handleLoading
    }
  }, [_c('div', {
    staticClass: ["content"]
  }, [_c('wxc-searchbar', {
    attrs: {
      "placeholder": "关键字",
      "barStyle": _vm.styleBar
    },
    on: {
      "wxcSearchbarInputOnInput": _vm.wxcSearchbarInputOnInput,
      "wxcSearchbarInputReturned": _vm.wxcSearchbarInputReturned
    }
  }), _vm._l((_vm.homeData), function(item, index) {
    return _c('div', {
      key: index
    }, [_c('div', {
      staticClass: ["history"]
    }, [_c('div', {
      staticClass: ["histroy-content"],
      on: {
        "click": function($event) {
          _vm.getDetail(item)
        }
      }
    }, [_c('text', {
      staticClass: ["histroy-title"]
    }, [_vm._v(_vm._s(item.title))]), (item.src) ? _c('image', {
      staticClass: ["history-img"],
      attrs: {
        "src": item.src,
        "resize": "cover"
      }
    }) : _vm._e(), (item.content) ? _c('text', {
      staticClass: ["history-text"]
    }, [_vm._v(_vm._s(item.content))]) : _vm._e()])])])
  })], 2)])], 1)
},staticRenderFns: []}

/***/ })
/******/ ]);