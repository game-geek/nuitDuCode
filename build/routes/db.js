"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUsers = exports.addUser = void 0;
var pg_1 = require("pg");
require('dotenv').config();
var pool = undefined;
if (Boolean(process.env.SSL)) {
    pool = new pg_1.Pool({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: 5432,
        ssl: {},
    });
}
else {
    pool = new pg_1.Pool({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: 5432
    });
}
console.log("pool", pool);
var usernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
function addUser(username, password, score) {
    return __awaiter(this, void 0, void 0, function () {
        var _username, _password, _score, exists, query, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!usernameRegex.test(username))
                        return [2 /*return*/, false];
                    if (typeof password != typeof String(""))
                        return [2 /*return*/, false];
                    if (typeof score != typeof Number(0))
                        return [2 /*return*/, false];
                    _username = String(username);
                    _password = String(password);
                    _score = Number(score);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, pool.query("SELECT id FROM users WHERE username = $1", [_username])];
                case 2:
                    exists = _a.sent();
                    if (!((exists === null || exists === void 0 ? void 0 : exists.rows.length) == 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, pool.query("INSERT INTO users (username, password, score, created_at) VALUES($1, $2, $3, '12-05-2023') RETURNING id", [_username, _password, _score])];
                case 3:
                    query = _a.sent();
                    console.log(query.rows);
                    return [3 /*break*/, 5];
                case 4: return [2 /*return*/, false];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.log("error", err_1);
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/, true];
            }
        });
    });
}
exports.addUser = addUser;
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var query, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, pool.query("SELECT username, score FROM users ORDER BY score DESC LIMIT 5")];
                case 1:
                    query = _a.sent();
                    return [2 /*return*/, query.rows];
                case 2:
                    err_2 = _a.sent();
                    console.log("error", err_2);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUsers = getUsers;
function updateUser(username, password, score) {
    return __awaiter(this, void 0, void 0, function () {
        var _username, _password, _score, query, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof username != typeof String(""))
                        return [2 /*return*/, false];
                    if (typeof password != typeof String(""))
                        return [2 /*return*/, false];
                    if (typeof score != typeof Number(0))
                        return [2 /*return*/, false];
                    _username = String(username);
                    _password = String(password);
                    _score = Number(score);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query("UPDATE users SET score = $1 WHERE username = $2 AND password = $3 RETURNING score", [_score, _username, _password])];
                case 2:
                    query = _a.sent();
                    if (query.rows.length) {
                        return [2 /*return*/, query.rows[0]];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    console.log("error", err_3);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
