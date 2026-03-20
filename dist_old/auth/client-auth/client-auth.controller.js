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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const client_auth_service_1 = require("./client-auth.service");
const throttler_1 = require("@nestjs/throttler");
const client_login_dto_1 = require("./dto/client-login.dto");
const client_jwt_guard_1 = require("./guards/client-jwt.guard");
let ClientAuthController = class ClientAuthController {
    clientAuthService;
    constructor(clientAuthService) {
        this.clientAuthService = clientAuthService;
    }
    async login(dto) {
        return this.clientAuthService.login(dto);
    }
    async getProfile(req) {
        return this.clientAuthService.getProfile(req.user.id);
    }
    async refresh(token) {
        return this.clientAuthService.refresh(token);
    }
};
exports.ClientAuthController = ClientAuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60000 } }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_login_dto_1.ClientLoginDto]),
    __metadata("design:returntype", Promise)
], ClientAuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(client_jwt_guard_1.ClientJwtGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientAuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('refresh'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientAuthController.prototype, "refresh", null);
exports.ClientAuthController = ClientAuthController = __decorate([
    (0, common_1.Controller)('client-auth'),
    __metadata("design:paramtypes", [client_auth_service_1.ClientAuthService])
], ClientAuthController);
//# sourceMappingURL=client-auth.controller.js.map