"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express = require("express");
var uuid_1 = require("uuid");
var db_1 = require("./db");
var router = express.Router();
router.use(logger);
var scores = {};
// fetch('http://localhost:3000/users/update', {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         username: "isaac",password: '381aa789-b828-4273-8e97-0e222cd09d62', score: 101
//     })
// })
// .then(res => {
//     if (res.ok){
//         console.log("SUCCESS");return res.json();
//     } else {
//         console.log("NOT SUCCESSFUL")
//     }
// })
// .then(data => (console.log(data)))
// .catch(error => console.log("ERROR"))
// ::::::
// fetch("http://localhost:3000/users")
//   .then((res) => {
//     if (res.ok) {
//       console.log("SUCCESS");
//       return res.json();
//     } else {
//       console.log("NOT SUCCESSFUL");
//     }
//   })
//   .then((data) => console.log(data))
//   .catch((error) => console.log("ERROR"));
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, db_1.getUsers)()];
            case 1:
                data = _a.sent();
                if (data) {
                    res.send({ scores: data });
                }
                else {
                    res.send({ scores: [] });
                }
                return [2 /*return*/];
        }
    });
}); });
router.post("/username", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, successful;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                console.log("username", username);
                password = (0, uuid_1.v4)().slice(0, 6);
                return [4 /*yield*/, (0, db_1.addUser)(username, password, 0)];
            case 1:
                successful = _a.sent();
                if (successful) {
                    console.log("new user created", { valid: true, password: password });
                    res.send({ valid: true, password: password });
                    return [2 /*return*/];
                }
                else {
                    res.send({ valid: false, username: username });
                    return [2 /*return*/];
                }
                return [2 /*return*/];
        }
    });
}); });
router.get("/username", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, successful;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.query.username;
                if (typeof username != typeof String()) {
                    res.send({ valid: false, username: username });
                    return [2 /*return*/];
                }
                console.log("username", username);
                password = (0, uuid_1.v4)().slice(0, 6);
                return [4 /*yield*/, (0, db_1.addUser)(username, password, 0)];
            case 1:
                successful = _a.sent();
                if (successful) {
                    console.log("new user created", { valid: true, password: password });
                    res.send({ valid: true, password: password });
                    return [2 /*return*/];
                }
                else {
                    res.send({ valid: false, username: username });
                    return [2 /*return*/];
                }
                return [2 /*return*/];
        }
    });
}); });
router.get("/test", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("ok");
        return [2 /*return*/];
    });
}); });
router.post("/account", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                password = req.body.password;
                if (!(typeof username == typeof String() &&
                    typeof password == typeof String())) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, db_1.checkAccount)(username, password)];
            case 1:
                data = _a.sent();
                if (data) {
                    res.send(__assign({ valid: true }, data));
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2:
                res.send({ valid: false, username: username });
                return [2 /*return*/];
        }
    });
}); });
router.get("/account", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.query.username;
                password = req.query.password;
                if (!(typeof username == typeof String() &&
                    typeof password == typeof String())) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, db_1.checkAccount)(username, password)];
            case 1:
                data = _a.sent();
                if (data) {
                    res.send(__assign({ valid: true }, data));
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2:
                res.send({ valid: false, username: username });
                return [2 /*return*/];
        }
    });
}); });
router.post("/update", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, score, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(scores, "scores");
                username = req.body.username;
                password = req.body.password;
                score = parseInt(req.body.score);
                if (!(typeof username == typeof String() &&
                    typeof password == typeof String() &&
                    typeof score == typeof Number())) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, db_1.updateUser)(username, password, score)];
            case 1:
                data = _a.sent();
                if (data) {
                    res.send(__assign({ valid: true }, data));
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2:
                res.send({ valid: false, username: username });
                return [2 /*return*/];
        }
    });
}); });
router.get("/update", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, score, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(scores, "scores");
                username = req.query.username;
                password = req.query.password;
                if (typeof req.query.score != typeof String()) {
                    res.send({ valid: false, username: username });
                    return [2 /*return*/];
                }
                score = parseInt(req.query.score);
                if (!(typeof username == typeof String() &&
                    typeof password == typeof String() &&
                    typeof score == typeof Number())) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, db_1.updateUser)(username, password, score)];
            case 1:
                data = _a.sent();
                if (data) {
                    res.send(__assign({ valid: true }, data));
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2:
                res.send({ valid: false, username: username });
                return [2 /*return*/];
        }
    });
}); });
router.param("id", function (req, res, next, id) {
    // req.user = users[id];
    next();
});
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}
router.get("/new", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, db_1.getUsers)()];
            case 1:
                data = _a.sent();
                if (!data) {
                    data = [];
                }
                res.render("users/display", { data: data });
                return [2 /*return*/];
        }
    });
}); });
router.post("/update-get", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, score, data, data_get;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body, "scores");
                username = req.body.username;
                password = req.body.password;
                score = parseInt(req.body.score);
                if (!(typeof username == typeof String() &&
                    typeof password == typeof String() &&
                    typeof score == typeof Number())) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, db_1.updateUser)(username, password, score)];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, (0, db_1.getUsers)()];
            case 2:
                data_get = _a.sent();
                if (data && data_get) {
                    res.send(__assign(__assign({ valid: true }, data), { scores: data_get }));
                    return [2 /*return*/];
                }
                else if (data && !data_get) {
                    res.send(__assign(__assign({ valid: true }, data), { scores: [] }));
                    return [2 /*return*/];
                }
                else if (!data && data_get) {
                    res.send({ valid: false, username: username, scores: data_get });
                    return [2 /*return*/];
                }
                else {
                    res.send({ valid: false, username: username, scores: [] });
                    return [2 /*return*/];
                }
                _a.label = 3;
            case 3:
                res.send({ valid: false, username: username, scores: [] });
                return [2 /*return*/];
        }
    });
}); });
router.get("/update-get", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, score, data, data_get;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.query, "scores");
                username = req.query.username;
                password = req.query.password;
                if (typeof req.query.score != typeof String()) {
                    res.send({ valid: false, username: username, scores: [] });
                    return [2 /*return*/];
                }
                score = parseInt(req.query.score);
                if (!(typeof username == typeof String() &&
                    typeof password == typeof String() &&
                    typeof score == typeof Number())) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, db_1.updateUser)(username, password, score)];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, (0, db_1.getUsers)()];
            case 2:
                data_get = _a.sent();
                if (data && data_get) {
                    res.send(__assign(__assign({ valid: true }, data), { scores: data_get }));
                    return [2 /*return*/];
                }
                else if (data && !data_get) {
                    res.send(__assign(__assign({ valid: true }, data), { scores: [] }));
                    return [2 /*return*/];
                }
                else if (!data && data_get) {
                    res.send({ valid: false, username: username, scores: data_get });
                    return [2 /*return*/];
                }
                else {
                    res.send({ valid: false, username: username, scores: [] });
                    return [2 /*return*/];
                }
                _a.label = 3;
            case 3:
                res.send({ valid: false, username: username, scores: [] });
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
