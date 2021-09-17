"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sort = /** @class */ (function () {
    function Sort() {
        this.sortOrder = 1;
        this.collator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: "base",
        });
    }
    Sort.prototype.startSort = function (property, order, type) {
        var _this = this;
        if (type === void 0) { type = ""; }
        if (order === "desc") {
            this.sortOrder = -1;
        }
        return function (a, b) {
            if (type === "date") {
                return _this.sortData(new Date(a[property]), new Date(b[property]));
            }
            else {
                return _this.collator.compare(a[property], b[property]) * _this.sortOrder;
            }
        };
    };
    Sort.prototype.sortData = function (a, b) {
        if (a < b) {
            return -1 * this.sortOrder;
        }
        else if (a > b) {
            return 1 * this.sortOrder;
        }
        else {
            return 0 * this.sortOrder;
        }
    };
    return Sort;
}());
exports.Sort = Sort;
//# sourceMappingURL=sort.js.map