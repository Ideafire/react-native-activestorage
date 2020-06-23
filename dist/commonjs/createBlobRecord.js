"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _checksum = _interopRequireDefault(require("./checksum"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var _ref$directUploadsUrl, directUploadsUrl, file, _ref$headers, headers, checksum, params, response;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$directUploadsUrl = _ref.directUploadsUrl, directUploadsUrl = _ref$directUploadsUrl === void 0 ? '/rails/active_storage/direct_uploads' : _ref$directUploadsUrl, file = _ref.file, _ref$headers = _ref.headers, headers = _ref$headers === void 0 ? {} : _ref$headers;
            _context.next = 3;
            return (0, _checksum["default"])({
              path: file.path
            });

          case 3:
            checksum = _context.sent;
            params = {
              filename: file.name,
              content_type: file.type || 'image/jpeg',
              byte_size: file.size,
              checksum: checksum
            };

            if (file.metadata) {
              params.metadata = file.metadata;
            }

            _context.next = 8;
            return fetch(directUploadsUrl, {
              method: 'POST',
              body: JSON.stringify({
                blob: params
              }),
              headers: _objectSpread({
                'Content-Type': 'application/json'
              }, headers)
            });

          case 8:
            response = _context.sent;
            return _context.abrupt("return", response.json());

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;