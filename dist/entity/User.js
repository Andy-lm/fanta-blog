"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _Post = require("./Post");

var _typeorm = require("typeorm");

var _md = _interopRequireDefault(require("md5"));

var _ = _interopRequireWildcard(require("lodash"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var User = (_dec = (0, _typeorm.Entity)("users"), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)("increment"), _dec3 = (0, _typeorm.Column)("varchar"), _dec4 = (0, _typeorm.Column)("varchar"), _dec5 = (0, _typeorm.CreateDateColumn)(), _dec6 = (0, _typeorm.UpdateDateColumn)(), _dec7 = (0, _typeorm.OneToMany)(function () {
  return _Post.Post;
}, function (post) {
  return post.author;
}), _dec8 = (0, _typeorm.BeforeInsert)(), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function User() {
    (0, _classCallCheck2["default"])(this, User);
    (0, _initializerDefineProperty2["default"])(this, "id", _descriptor, this);
    (0, _initializerDefineProperty2["default"])(this, "username", _descriptor2, this);
    (0, _initializerDefineProperty2["default"])(this, "passwordDigest", _descriptor3, this);
    (0, _initializerDefineProperty2["default"])(this, "createdAt", _descriptor4, this);
    (0, _initializerDefineProperty2["default"])(this, "updatedAt", _descriptor5, this);
    (0, _initializerDefineProperty2["default"])(this, "posts", _descriptor6, this);
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "passwordConfirmation", void 0);
    (0, _defineProperty2["default"])(this, "errors", {
      username: [],
      password: [],
      passwordConfirmation: []
    });
  }

  (0, _createClass2["default"])(User, [{
    key: "validate",
    value: // 检测参数是否存在问题
    function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
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
                return connection.manager.findOne(User, {
                  where: {
                    username: this.username
                  }
                });

              case 6:
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

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate(_x) {
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
  return User;
}(), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "username", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "passwordDigest", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "createdAt", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "updatedAt", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "posts", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "generatePasswordDigest", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "generatePasswordDigest"), _class2.prototype)), _class2)) || _class);
exports.User = User;