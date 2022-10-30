"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAgreeCountTable1661415609007 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeorm = require("typeorm");

/**
 * 存储文章点赞总数
 */
var CreateAgreeCountTable1661415609007 = /*#__PURE__*/function () {
  function CreateAgreeCountTable1661415609007() {
    (0, _classCallCheck2["default"])(this, CreateAgreeCountTable1661415609007);
  }

  (0, _createClass2["default"])(CreateAgreeCountTable1661415609007, [{
    key: "up",
    value: function () {
      var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryRunner) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return queryRunner.createTable(new _typeorm.Table({
                  name: "agreeCount",
                  columns: [{
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                  }, {
                    name: "postId",
                    type: "int"
                  }, // 文章id
                  {
                    name: "count",
                    // 文章点赞总数
                    type: "int"
                  }, {
                    name: "createdAt",
                    // 创建时间
                    type: "timestamp",
                    isNullable: false,
                    "default": "now()"
                  }, {
                    name: "updatedAt",
                    // 更新时间
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
                return queryRunner.dropTable("agreeCount");

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
  return CreateAgreeCountTable1661415609007;
}();

exports.CreateAgreeCountTable1661415609007 = CreateAgreeCountTable1661415609007;