"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _typeorm = require("typeorm");

var _getDatabaseConnection = require("lib/getDatabaseConnection");

var _md = _interopRequireDefault(require("md5"));

var _ = _interopRequireWildcard(require("lodash"));

var _User2 = require("src/entity/User");

var _dec, _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ModelUser = (_dec = (0, _typeorm.BeforeInsert)(), (_class = /*#__PURE__*/function (_User) {
  (0, _inherits2["default"])(ModelUser, _User);

  var _super = _createSuper(ModelUser);

  function ModelUser() {
    (0, _classCallCheck2["default"])(this, ModelUser);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(ModelUser, [{
    key: "validate",
    // 检测参数是否存在问题
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var found;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.username.trim() === "") {
                  this.errors.username.push("用户名不能为空");
                }

                if (!/[a-zA-Z0-9_]/.test(this.username.trim())) {
                  this.errors.username.push("用户名格式不合法，应只包括数字、字母、下划线");
                }

                if (this.username.trim().length > 42) {
                  this.errors.username.push("用户名太长");
                }

                if (this.username.trim().length <= 3) {
                  this.errors.username.push("用户名太短");
                }

                _context.next = 6;
                return (0, _getDatabaseConnection.getDatabaseConnection)();

              case 6:
                _context.next = 8;
                return _context.sent.manager.findOne(_User2.User, {
                  where: {
                    username: this.username
                  }
                });

              case 8:
                found = _context.sent;

                if (found) {
                  this.errors.username.push("用户名重复，请再试");
                }

                if (this.password.length < 6) {
                  this.errors.password.push("密码太短");
                }

                if (this.password.length > 16) {
                  this.errors.password.push("密码太长");
                }

                if (this.password.length === 0) {
                  this.errors.password.push("密码不能为0");
                }

                if (this.passwordConfirmation !== this.password) {
                  this.errors.passwordConfirmation.push("密码不匹配");
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }() // 检测

  }, {
    key: "hasErrors",
    value: function hasErrors() {
      return !!Object.values(this.errors).find(function (v) {
        return v.length > 0;
      });
    }
  }, {
    key: "generatePasswordDigest",
    value: function generatePasswordDigest() {
      this.passwordDigest = (0, _md["default"])(this.password);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return _.omit(this, ["passwordConfirmation", "password", "passwordDigest", "errors"]);
    }
  }]);
  return ModelUser;
}(_User2.User), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "generatePasswordDigest", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "generatePasswordDigest"), _class.prototype)), _class));
exports.ModelUser = ModelUser;