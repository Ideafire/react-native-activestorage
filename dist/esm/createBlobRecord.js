import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import getChecksum from './checksum';
export default /*#__PURE__*/(function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var _ref$directUploadsUrl, directUploadsUrl, file, _ref$headers, headers, checksum, params, response;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$directUploadsUrl = _ref.directUploadsUrl, directUploadsUrl = _ref$directUploadsUrl === void 0 ? '/rails/active_storage/direct_uploads' : _ref$directUploadsUrl, file = _ref.file, _ref$headers = _ref.headers, headers = _ref$headers === void 0 ? {} : _ref$headers;
            _context.next = 3;
            return getChecksum({
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
})();