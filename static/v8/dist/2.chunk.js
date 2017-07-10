webpackJsonp([2],{

/***/ "./src/app/views/core/fuel_report.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var View = (function () {
    function View() {
        this.dataFields = [{ name: "fuel1", type: "float" },
            { name: "fuel2", type: "float" },
            { name: "fuel3", type: "float" },
            { name: "fuel4", type: "float" },
            { name: "speed", type: "int" },
            { name: "driver", type: "string" },
            { name: "date", type: "date" },
        ];
        this.columns = [{ text: 'Уровень топлива в баке 1', datafield: 'fuel1', width: 130 },
            { text: 'Уровень топлива в баке 2', datafield: 'fuel2', width: 130 },
            { text: 'Уровень топлива в баке 3', datafield: 'fuel3', width: 130 },
            { text: 'Уровень топлива в баке 4', datafield: 'fuel4', width: 130 },
            { text: 'Скорость', datafield: 'speed', width: 130 },
            { text: 'Водитель', datafield: 'driver', width: 250 },
            { text: 'Дата', datafield: 'date', width: 150 },
        ];
        this.url = 'api/fuel_speed_report';
    }
    return View;
}());
View = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "fuel_speed_report",
        template: "<vg-grid [dataFields]='dataFields' [columns]='columns' [url]='url'></vg-grid>",
    })
], View);

//# sourceMappingURL=fuel_report.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map