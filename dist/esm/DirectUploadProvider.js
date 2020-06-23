import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import directUpload from './directUpload';

var DirectUploadProvider = /*#__PURE__*/function (_Component) {
  _inherits(DirectUploadProvider, _Component);

  var _super = _createSuper(DirectUploadProvider);

  function DirectUploadProvider() {
    var _this;

    _classCallCheck(this, DirectUploadProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      uploading: false,
      fileUploads: {}
    });

    _defineProperty(_assertThisInitialized(_this), "handleUpload", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(files) {
        var _this$props, directUploadsUrl, onSuccess, responses, validIds;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
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
                  return directUpload({
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

    _defineProperty(_assertThisInitialized(_this), "handleChangeFileUpload", function (fileUpload) {
      var newObj = _defineProperty({}, fileUpload.id, fileUpload);

      _this.setState(function (_ref2) {
        var fileUploads = _ref2.fileUploads;
        return {
          fileUploads: _objectSpread(_objectSpread({}, fileUploads), newObj)
        };
      });
    });

    return _this;
  }

  _createClass(DirectUploadProvider, [{
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
}(Component);

export { DirectUploadProvider as default };