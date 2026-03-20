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
exports.CreateClientDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_persona_dto_1 = require("../../personas/dto/create-persona.dto");
const create_client_data_dto_1 = require("./create-client-data.dto");
class CreateClientDto {
    persona;
    cliente;
    static _OPENAPI_METADATA_FACTORY() {
        return { persona: { required: true, type: () => require("../../personas/dto/create-persona.dto").CreatePersonaDto }, cliente: { required: true, type: () => require("./create-client-data.dto").CreateClientDataDto } };
    }
}
exports.CreateClientDto = CreateClientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => create_persona_dto_1.CreatePersonaDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_persona_dto_1.CreatePersonaDto),
    __metadata("design:type", create_persona_dto_1.CreatePersonaDto)
], CreateClientDto.prototype, "persona", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => create_client_data_dto_1.CreateClientDataDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_client_data_dto_1.CreateClientDataDto),
    __metadata("design:type", create_client_data_dto_1.CreateClientDataDto)
], CreateClientDto.prototype, "cliente", void 0);
//# sourceMappingURL=create-client.dto.js.map