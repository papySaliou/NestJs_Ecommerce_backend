import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"; // ✅ Ajout des imports manquants
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // ⚠️ À remplacer par un secret sécurisé (ex: via .env)
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
