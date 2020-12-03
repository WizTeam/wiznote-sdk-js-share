"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WizServerError = exports.WizNotExistsError = exports.WizTimeoutError = exports.WizInternalError = exports.WizNetworkError = exports.WizInvalidParamError = exports.WizInvalidPasswordError = exports.WizInvalidUserError = exports.WizInvalidTokenError = exports.WizKnownError = void 0;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var WizKnownError = /*#__PURE__*/function (_Error) {
  _inherits(WizKnownError, _Error);

  var _super = _createSuper(WizKnownError);

  function WizKnownError(message, code, externCode) {
    var _this;

    _classCallCheck(this, WizKnownError);

    _this = _super.call(this, message);
    (0, _assert["default"])(message);
    (0, _assert["default"])(code);
    _this.message = message;
    _this.code = code;

    if (externCode) {
      _this.externCode = externCode;
    }

    return _this;
  }

  _createClass(WizKnownError, [{
    key: "toResult",
    value: function toResult() {
      return {
        returnCode: this.code,
        returnMessage: this.message,
        externCode: this.externCode,
        code: this.code
      };
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toResult();
    } //

  }, {
    key: "log",
    value: function log() {
      console.error(this);
    } //

  }], [{
    key: "noErrorResult",
    value: function noErrorResult() {
      var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        returnCode: 200,
        returnMessage: 'OK',
        result: result
      };
    }
  }]);

  return WizKnownError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.WizKnownError = WizKnownError;

var WizInvalidTokenError = /*#__PURE__*/function (_WizKnownError) {
  _inherits(WizInvalidTokenError, _WizKnownError);

  var _super2 = _createSuper(WizInvalidTokenError);

  function WizInvalidTokenError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Invalid token';

    _classCallCheck(this, WizInvalidTokenError);

    return _super2.call(this, message, 'WizErrorInvalidToken');
  }

  return WizInvalidTokenError;
}(WizKnownError);

exports.WizInvalidTokenError = WizInvalidTokenError;

var WizInvalidUserError = /*#__PURE__*/function (_WizKnownError2) {
  _inherits(WizInvalidUserError, _WizKnownError2);

  var _super3 = _createSuper(WizInvalidUserError);

  function WizInvalidUserError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Invalid user';

    _classCallCheck(this, WizInvalidUserError);

    return _super3.call(this, message, 'WizErrorInvalidUser');
  }

  return WizInvalidUserError;
}(WizKnownError);

exports.WizInvalidUserError = WizInvalidUserError;

var WizInvalidPasswordError = /*#__PURE__*/function (_WizKnownError3) {
  _inherits(WizInvalidPasswordError, _WizKnownError3);

  var _super4 = _createSuper(WizInvalidPasswordError);

  function WizInvalidPasswordError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'invalid password';

    _classCallCheck(this, WizInvalidPasswordError);

    return _super4.call(this, message, 'WizErrorInvalidPassword');
  }

  return WizInvalidPasswordError;
}(WizKnownError);

exports.WizInvalidPasswordError = WizInvalidPasswordError;

var WizInvalidParamError = /*#__PURE__*/function (_WizKnownError4) {
  _inherits(WizInvalidParamError, _WizKnownError4);

  var _super5 = _createSuper(WizInvalidParamError);

  function WizInvalidParamError(message) {
    _classCallCheck(this, WizInvalidParamError);

    return _super5.call(this, message, 'WizErrorInvalidParam');
  }

  return WizInvalidParamError;
}(WizKnownError);

exports.WizInvalidParamError = WizInvalidParamError;

var WizNetworkError = /*#__PURE__*/function (_WizKnownError5) {
  _inherits(WizNetworkError, _WizKnownError5);

  var _super6 = _createSuper(WizNetworkError);

  function WizNetworkError(message) {
    _classCallCheck(this, WizNetworkError);

    return _super6.call(this, message, 'WizErrorNetwork');
  }

  return WizNetworkError;
}(WizKnownError);

exports.WizNetworkError = WizNetworkError;

var WizInternalError = /*#__PURE__*/function (_WizKnownError6) {
  _inherits(WizInternalError, _WizKnownError6);

  var _super7 = _createSuper(WizInternalError);

  function WizInternalError(message, externCode) {
    _classCallCheck(this, WizInternalError);

    return _super7.call(this, message, 'WizErrorInternal', externCode);
  }

  return WizInternalError;
}(WizKnownError);

exports.WizInternalError = WizInternalError;

var WizTimeoutError = /*#__PURE__*/function (_WizKnownError7) {
  _inherits(WizTimeoutError, _WizKnownError7);

  var _super8 = _createSuper(WizTimeoutError);

  //
  function WizTimeoutError(message) {
    _classCallCheck(this, WizTimeoutError);

    return _super8.call(this, message, 'WizErrorTimeout');
  } //


  _createClass(WizTimeoutError, [{
    key: "log",
    value: function log() {
      console.error("".concat(this.code, " ").concat(this.message));
    }
  }]);

  return WizTimeoutError;
}(WizKnownError);

exports.WizTimeoutError = WizTimeoutError;

var WizNotExistsError = /*#__PURE__*/function (_WizKnownError8) {
  _inherits(WizNotExistsError, _WizKnownError8);

  var _super9 = _createSuper(WizNotExistsError);

  function WizNotExistsError(message) {
    _classCallCheck(this, WizNotExistsError);

    return _super9.call(this, message, 'WizNotExistsError');
  }

  return WizNotExistsError;
}(WizKnownError);

exports.WizNotExistsError = WizNotExistsError;

var WizServerError = /*#__PURE__*/function (_WizKnownError9) {
  _inherits(WizServerError, _WizKnownError9);

  var _super10 = _createSuper(WizServerError);

  function WizServerError(message, externCode) {
    _classCallCheck(this, WizServerError);

    return _super10.call(this, message, 'WizErrorServer', externCode);
  }

  return WizServerError;
}(WizKnownError);

exports.WizServerError = WizServerError;