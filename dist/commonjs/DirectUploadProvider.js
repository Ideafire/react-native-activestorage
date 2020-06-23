"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _directUpload = _interopRequireDefault(require("./directUpload"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DirectUploadProvider = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(DirectUploadProvider, _Component);

  var _super = _createSuper(DirectUploadProvider);

  function DirectUploadProvider() {
    var _this;

    (0, _classCallCheck2["default"])(this, DirectUploadProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      uploading: false,
      fileUploads: {}
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleUpload", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(files) {
        var _this$props, directUploadsUrl, onSuccess, responses, validIds;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.state.uploading) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _this$props = _this.props, directUploadsUrl = _this$props.directUploadsUrl, onSuccess = _this$props.onSuccess;

                _this.setState({
                  uploading: true
                });

                _context.next = 6;
                return Promise.all(files.map(function (file) {
                  return (0, _directUpload["default"])({
                    file: file,
                    directUploadsUrl: directUploadsUrl
                  }, _this.handleChangeFileUpload);
                }));

              case 6:
                responses = _context.sent;
                validIds = responses.filter(function (r) {
                  return r.signed_id;
                });

                if (validIds.length > 0) {
                  onSuccess(responses);
                }

                _this.setState({
                  uploading: false
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleChangeFileUpload", function (fileUpload) {
      var newObj = (0, _defineProperty2["default"])({}, fileUpload.id, fileUpload);

      _this.setState(function (_ref2) {
        var fileUploads = _ref2.fileUploads;
        return {
          fileUploads: _objectSpread(_objectSpread({}, fileUploads), newObj)
        };
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(DirectUploadProvider, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      var fileUploads = this.state.fileUploads;
      return children({
        handleUpload: this.handleUpload,
        uploading: this.state.uploading,
        uploads: Object.keys(fileUploads).map(function (key) {
          return fileUploads[key];
        })
      });
    }
  }]);
  return DirectUploadProvider;
}(_react.Component);

exports["default"] = DirectUploadProvider;