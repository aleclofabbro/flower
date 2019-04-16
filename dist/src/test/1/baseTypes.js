"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Living;
(function (Living) {
    var Things;
    (function (Things) {
        var Animal = /** @class */ (function () {
            function Animal() {
            }
            Animal.prototype.move = function () { };
            return Animal;
        }());
        Things.Animal = Animal;
        var Plant = /** @class */ (function () {
            function Plant() {
            }
            Plant.prototype.photosynthesize = function () { };
            return Plant;
        }());
        Things.Plant = Plant;
    })(Things = Living.Things || (Living.Things = {}));
})(Living = exports.Living || (exports.Living = {}));
dog.ts;
var b = require("./baseTypes");
(function (Living) {
    var Things;
    (function (Things) {
        // Error, can't find name 'Animal', ??
        var Dog = /** @class */ (function (_super) {
            __extends(Dog, _super);
            function Dog() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Dog.prototype.woof = function () { };
            return Dog;
        }(Things.Animal));
        Things.Dog = Dog;
    })(Things = Living.Things || (Living.Things = {}));
})(Living = exports.Living || (exports.Living = {}));
tree.ts;
(function (Living) {
    var Things;
    (function (Things) {
        // Why do I have to write b.Living.Things.Plant instead of b.Plant??
        var Tree = /** @class */ (function (_super) {
            __extends(Tree, _super);
            function Tree() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Tree;
        }(b.Living.Things.Plant));
    })(Things = Living.Things || (Living.Things = {}));
})(Living || (Living = {}));
//# sourceMappingURL=baseTypes.js.map