"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upDateComment1664979838085 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeorm = require("typeorm");

var upDateComment1664979838085 = /*#__PURE__*/function () {
  function upDateComment1664979838085() {
    (0, _classCallCheck2["default"])(this, upDateComment1664979838085);
  }

  (0, _createClass2["default"])(upDateComment1664979838085, [{
    key: "up",
    value: function () {
      var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryRunner) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return queryRunner.addColumns("comments", [new _typeorm.TableColumn({
                  name: "replayId",
                  type: "int",
                  isNullable: false,
                  "default": 0
                }), new _typeorm.TableColumn({
                  name: "parentId",
                  type: "int",
                  isNullable: false,
                  "default": 0
                }), new _typeorm.TableColumn({
                  name: "isDelete",
                  type: "int",
                  isNullable: false,
                  "default": 0
                }), new _typeorm.TableColumn({
                  name: "commentLikeCount",
                  type: "int",
                  isNullable: false,
                  "default": 0
                })]);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function up(_x) {
        return _up.apply(this, arguments);
      }

      return up;
    }()
  }, {
    key: "down",
    value: function () {
      var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryRunner) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return queryRunner.dropColumn("comments", "replayId");

              case 2:
                _context2.next = 4;
                return queryRunner.dropColumn("comments", "parentId");

              case 4:
                _context2.next = 6;
                return queryRunner.dropColumn("comments", "isDelete");

              case 6:
                _context2.next = 8;
                return queryRunner.dropColumn("comments", "commentLikeCount");

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function down(_x2) {
        return _down.apply(this, arguments);
      }

      return down;
    }()
  }]);
  return upDateComment1664979838085;
}();

exports.upDateComment1664979838085 = upDateComment1664979838085;