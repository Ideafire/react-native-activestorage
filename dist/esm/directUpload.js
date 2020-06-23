import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import RNFetchBlob from 'rn-fetch-blob';
import createBlobRecord from './createBlobRecord';
var id = 0;
export default (function (_ref, onStatusChange) {
  var directUploadsUrl = _ref.directUploadsUrl,
      file = _ref.file,
      headers = _ref.headers;
  var taskId = ++id;
  var canceled = false;
  var task;

  var handleCancel = function handleCancel() {
    if (!task) {
      return;
    }

    canceled = true;
    task.cancel();
  };

  var handleStatusUpdate = function handleStatusUpdate(data) {
    onStatusChange(_objectSpread(_objectSpread({}, data), {}, {
      id: taskId,
      cancel: handleCancel,
      file: file
    }));
  };

  handleStatusUpdate({
    status: 'waiting'
  });
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(resolve, reject) {
      var blobData, _blobData$direct_uplo, url, uploadHeaders, fileData;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return createBlobRecord({
                directUploadsUrl: directUploadsUrl,
                file: file,
                headers: headers
              });

            case 2:
              blobData = _context.sent;
              _blobData$direct_uplo = blobData.direct_upload, url = _blobData$direct_uplo.url, uploadHeaders = _blobData$direct_uplo.headers;
              fileData = RNFetchBlob.wrap(file.path);
              task = RNFetchBlob.fetch('PUT', url, uploadHeaders, fileData);
              task.uploadProgress({
                interval: 250
              }, function (count, total) {
                var progress = count / total * 100;
                handleStatusUpdate({
                  status: 'progress',
                  progress: progress,
                  total: total,
                  count: count
                });
              }).then(function (resp) {
                var status = resp.info().status;

                if (status >= 200 && status < 400) {
                  handleStatusUpdate({
                    status: 'finished'
                  });
                } else {
                  handleStatusUpdate({
                    status: 'error'
                  });
                }

                resolve(blobData);
              })["catch"](function (err) {
                if (canceled) {
                  handleStatusUpdate({
                    status: 'canceled'
                  });
                } else {
                  handleStatusUpdate({
                    status: 'error'
                  });
                }

                resolve();
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
});