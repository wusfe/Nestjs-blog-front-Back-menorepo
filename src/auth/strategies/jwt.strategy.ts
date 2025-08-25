import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中获取, 也可以从cookie或者query参数中获取
      ignoreExpiration: false, // 是否忽略 token 的过期时间, 默认 false, token 过期会验证失败
      secretOrKey: process.env.JWT_SECRET || 'dev_secret',
    });
  }
  
  async validate(payload: any) {
    // 这里先执行1
    console.log(payload, 2);
    
    return { userId: payload.sub, username: payload.username};
  }

  
}
