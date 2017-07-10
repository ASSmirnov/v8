webpackJsonp([0],{

/***/ "./src/app/views/core/modal_test.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_services__ = __webpack_require__("./src/app/services/services.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var View = (function () {
    function View(messageBox) {
        this.messageBox = messageBox;
    }
    View.prototype.onClick1 = function (event) {
        event.stopPropagation();
        this.messageBox.warning("Тут явно что-то не так. А может и так", "Мы вас хотитм предупредить").then(function (num) {
            console.log(num);
        });
    };
    View.prototype.onClick2 = function (event) {
        event.stopPropagation();
        this.messageBox.error("Что-то пошло не так, обратитесь в техподдержку").then(function (num) {
            console.log(num);
        });
    };
    View.prototype.onClick3 = function (event) {
        var _this = this;
        event.stopPropagation();
        this.messageBox.confirm("Точно будем удалять все данные не далая бэкапы?", "Мы вас хотим спросить").then(function (num) {
            if (num === 0) {
                _this.messageBox.error("Не надо было нажимать ДА");
            }
        });
    };
    return View;
}());
View = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "modal_test",
        template: "\n  <vg-button-group>\n        <vg-button (click)=\"onClick1($event)\">Warning</vg-button>\n        <vg-button (click)=\"onClick2($event)\">Error</vg-button>\n        <vg-button (click)=\"onClick3($event)\">Confirm</vg-button>\n  </vg-button-group>\n"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_services__["a" /* MessageBox */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_services__["a" /* MessageBox */]) === "function" && _a || Object])
], View);

var _a;
//# sourceMappingURL=modal_test.js.map

/***/ })

});
//# sourceMappingURL=0.chunk.js.map