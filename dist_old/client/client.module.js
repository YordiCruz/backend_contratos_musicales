"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModule = void 0;
const common_1 = require("@nestjs/common");
const clients_controller_1 = require("./clients/clients.controller");
const clients_module_1 = require("./clients/clients.module");
const client_auth_module_1 = require("../auth/client-auth/client-auth.module");
const client_auth_controller_1 = require("../auth/client-auth/client-auth.controller");
let ClientModule = class ClientModule {
};
exports.ClientModule = ClientModule;
exports.ClientModule = ClientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            clients_module_1.ClientsModule,
            client_auth_module_1.ClientAuthModule
        ],
        controllers: [
            client_auth_controller_1.ClientAuthController,
            clients_controller_1.ClientsController
        ],
    })
], ClientModule);
//# sourceMappingURL=client.module.js.map