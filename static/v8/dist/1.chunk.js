webpackJsonp([1],{

/***/ "./src/app/views/core/fuel_speed_chart.ts":
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


var View = View_1 = (function () {
    function View(timeService) {
        var _this = this;
        this.timeService = timeService;
        this.title = "График топлива и скорости";
        this.dataFields = [{ name: 'date', title: "Дата" },
            { name: 'fuel', title: "Уровень топлива", interval: 1000 },
            { name: 'speed', title: "Скрорость", interval: 50 },
        ];
        this.xtype = "date";
        this.xfield = "date";
        this.xinterval = 10;
        this.selectorField = "fuel";
        this.timeService.controlChange.subscribe(function (event) {
            _this.chart.url = _this.getUrl(event.from, event.to);
            _this.chart.refresh();
        });
    }
    View.prototype.getUrl = function (from, to) {
        return View_1.api_url + "?from=" + from + "&to=" + to;
    };
    View.prototype.ngOnInit = function () {
        var from = this.timeService.from;
        var to = this.timeService.to;
        this.chart.url = this.getUrl(from, to);
    };
    return View;
}());
View.api_url = 'api/fuel_speed_chart';
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])("chart"),
    __metadata("design:type", Object)
], View.prototype, "chart", void 0);
View = View_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "fuel_speed_chart",
        template: "<vg-chart #chart\n                       [title]=\"title\"\n                       [description]=\"''\"\n                       [dataFields]=\"dataFields\"\n                       [xtype]=\"xtype\"\n                       [xfield]=\"xfield\"\n                       [xinterval]=\"xinterval\"\n                       [selectorField]=\"selectorField\"\n                       >\n             </vg-chart>\n"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_services__["b" /* TimeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_services__["b" /* TimeService */]) === "function" && _a || Object])
], View);

var View_1, _a;
//# sourceMappingURL=fuel_speed_chart.js.map

/***/ })

});
//# sourceMappingURL=1.chunk.js.map