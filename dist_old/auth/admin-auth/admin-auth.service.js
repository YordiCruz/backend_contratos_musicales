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
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../admin/users/entities/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AdminAuthService = class AdminAuthService {
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
        const isAdmin = user.roles.some((r) => r.nombre === 'admin');
        if (!isAdmin) {
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
            secret: process.env.JWT_ADMIN_SECRET,
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ADMIN_REFRESH_SECRET,
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
                secret: process.env.JWT_ADMIN_REFRESH_SECRET,
            });
            const newAccessToken = this.jwtService.sign({ id: payload.id, email: payload.email, roles: payload.roles }, { secret: process.env.JWT_ADMIN_SECRET, expiresIn: '15m' });
            return { access_token: newAccessToken };
        }
        catch {
            throw new common_1.UnauthorizedException('Refresh token inválido o expirado');
        }
    }
    async getProfile(userId) {
        const admin = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['persona', 'roles'],
        });
        if (!admin) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return {
            user: {
                id: admin.id,
                email: admin.email,
                role: admin.roles[0].nombre,
                persona: {
                    nombre: admin.persona.nombre,
                    apellido: admin.persona.apellido,
                    ci: admin.persona.documento_identidad,
                    telefono: admin.persona.telefono,
                    email: admin.persona.email
                }
            }
        };
    }
};
exports.AdminAuthService = AdminAuthService;
exports.AdminAuthService = AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AdminAuthService);
//# sourceMappingURL=admin-auth.service.js.map