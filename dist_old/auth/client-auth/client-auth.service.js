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
exports.ClientAuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../admin/users/entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let ClientAuthService = class ClientAuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const { email, password } = dto;
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['roles', 'persona'],
        });
        if (!user) {
            await bcrypt.compare(password, '$2b$10$invalidinvalidinvalidinvalidinv');
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const isClient = user.roles.some((r) => r.nombre === 'cliente');
        if (!isClient) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        if (user.estado !== 'activo') {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        if (user.eliminado_en) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const passwordOk = await bcrypt.compare(password, user.password_hash);
        if (!passwordOk) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        user.ultimo_login = new Date();
        await this.userRepository.save(user);
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles.map(r => r.nombre),
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_CLIENT_SECRET,
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_CLIENT_REFRESH_SECRET,
            expiresIn: '7d',
        });
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.roles[0].nombre,
                persona: {
                    nombre: user.persona.nombre,
                    apellido: user.persona.apellido,
                    ci: user.persona.documento_identidad,
                    telefono: user.persona.telefono,
                    email: user.persona.email
                }
            }
        };
    }
    async refresh(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_CLIENT_REFRESH_SECRET,
            });
            const newAccessToken = this.jwtService.sign({ id: payload.id, email: payload.email, roles: payload.roles }, { secret: process.env.JWT_CLIENT_SECRET, expiresIn: '15m' });
            return { access_token: newAccessToken };
        }
        catch {
            throw new common_1.UnauthorizedException('Refresh token inválido o expirado');
        }
    }
    async getProfile(userId) {
        const cliente = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['persona', 'roles'],
        });
        if (!cliente) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return {
            user: {
                id: cliente.id,
                email: cliente.email,
                role: cliente.roles[0].nombre,
                persona: {
                    nombre: cliente.persona.nombre,
                    apellido: cliente.persona.apellido,
                    ci: cliente.persona.documento_identidad,
                    telefono: cliente.persona.telefono,
                    email: cliente.persona.email
                }
            }
        };
    }
};
exports.ClientAuthService = ClientAuthService;
exports.ClientAuthService = ClientAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], ClientAuthService);
//# sourceMappingURL=client-auth.service.js.map