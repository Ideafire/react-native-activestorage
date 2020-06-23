import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import RNFetchBlob from 'rn-fetch-blob';
import { btoa } from 'abab';
export default /*#__PURE__*/(function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var path, md5, hexArray, byteString;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = _ref.path;
            _context.next = 3;
            return RNFetchBlob.fs.hash(path, 'md5');

          case 3:
            md5 = _context.sent;
            hexArray = md5.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ");
            byteString = String.fromCharCode.apply(null, hexArray);
            return _context.abrupt("return", btoa(byteString));

          case 7:
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