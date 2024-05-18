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
var selenium_webdriver_1 = require("selenium-webdriver");
var mainUrl = 'https://www.qemu.org/';
function discoverWebsiteStructure(url_1) {
    return __awaiter(this, arguments, void 0, function (url, visited) {
        function explorePage(pageUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var links, pageLinks, _i, links_1, link, href, _a, pageLinks_1, link;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (visited.has(pageUrl))
                                return [2 /*return*/];
                            visited.add(pageUrl);
                            return [4 /*yield*/, driver.get(pageUrl)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.tagName('a'))];
                        case 2:
                            links = _b.sent();
                            pageLinks = [];
                            _i = 0, links_1 = links;
                            _b.label = 3;
                        case 3:
                            if (!(_i < links_1.length)) return [3 /*break*/, 6];
                            link = links_1[_i];
                            return [4 /*yield*/, link.getAttribute('href')];
                        case 4:
                            href = _b.sent();
                            //if (href && href.startsWith(url) && !visited.has(href)) {
                            pageLinks.push(href);
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6:
                            structure.set(pageUrl, pageLinks);
                            _a = 0, pageLinks_1 = pageLinks;
                            _b.label = 7;
                        case 7:
                            if (!(_a < pageLinks_1.length)) return [3 /*break*/, 10];
                            link = pageLinks_1[_a];
                            return [4 /*yield*/, explorePage(link)];
                        case 8:
                            _b.sent();
                            _b.label = 9;
                        case 9:
                            _a++;
                            return [3 /*break*/, 7];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        }
        var driver, structure;
        if (visited === void 0) { visited = new Set(); }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser('chrome').build()];
                case 1:
                    driver = _a.sent();
                    structure = new Map();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 4, 6]);
                    return [4 /*yield*/, explorePage(url)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, driver.quit()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/, structure];
            }
        });
    });
}
function composeInterconnectionMatrix(structure) {
    var pages = Array.from(structure.keys());
    var matrix = [];
    for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
        var page1 = pages_1[_i];
        var row = [];
        var links = structure.get(page1) || [];
        for (var _a = 0, pages_2 = pages; _a < pages_2.length; _a++) {
            var page2 = pages_2[_a];
            if (page1 === page2) {
                row.push('N/A');
            }
            else {
                row.push(links.includes(page2) ? 'Y' : 'N');
            }
        }
        matrix.push(row);
    }
    return matrix;
}
discoverWebsiteStructure(mainUrl).then(function (structure) {
    var pages = Array.from(structure.keys());
    console.log('Discovered pages:', pages);
    var matrix = composeInterconnectionMatrix(structure);
    console.log('Interconnection Matrix:');
    console.table(matrix);
});
