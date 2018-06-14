"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
let BankAccount = class BankAccount extends repository_1.Entity {
};
__decorate([
    repository_1.property({
        type: 'number',
        id: true
    }),
    __metadata("design:type", Number)
], BankAccount.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true
    }),
    __metadata("design:type", Number)
], BankAccount.prototype, "charity_id", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true
    }),
    __metadata("design:type", Number)
], BankAccount.prototype, "bank_id", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true
    }),
    __metadata("design:type", Number)
], BankAccount.prototype, "accountNum", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true
    }),
    __metadata("design:type", Number)
], BankAccount.prototype, "routingNum", void 0);
BankAccount = __decorate([
    repository_1.model({
        name: "bankaccount"
    })
], BankAccount);
exports.BankAccount = BankAccount;
//# sourceMappingURL=bankaccount.js.map