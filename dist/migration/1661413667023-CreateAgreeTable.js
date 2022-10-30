"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAgreeTable1661413667023 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeorm = require("typeorm");

/**
 * 用户点赞表，存储用户点文章的赞关系
 */
var CreateAgreeTable1661413667023 = /*#__PURE__*/function () {
  function CreateAgreeTable1661413667023() {
    (0, _classCallCheck2["default"])(this, CreateAgreeTable1661413667023);
  }

  (0, _createClass2["default"])(CreateAgreeTable1661413667023, [{
    key: "up",
    value: function () {
      var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryRunner) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return queryRunner.createTable(new _typeorm.Table({
                  name: "agrees",
                  columns: [{
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                  }, {
                    name: "userId",
                    type: "int"
                  }, // 点赞的用户id
                  {
                    name: "postId",
                    // 被点赞的文章id
                    type: "int"
                  }, {
                    name: "agreeStatus",
                    // 点赞状态：0代表没有点赞，1代表点赞
                    type: "int",
                    "default": 1 // 默认添加数据的时候代表添加一条点赞记录，如果用户取消点赞时则记为0

                  }, {
                    name: "createdAt",
                    // 创建时间
                    type: "timestamp",
                    isNullable: false,
                    "default": "now()"
                  }]
                }));

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
                return queryRunner.dropTable("agrees");

              case 2:
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
  return CreateAgreeTable1661413667023;
}();

exports.CreateAgreeTable1661413667023 = CreateAgreeTable1661413667023;