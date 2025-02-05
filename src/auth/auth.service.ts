import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
      ) {}
    
      async signUp(username: string, password: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ username, password: hashedPassword });
        await this.usersRepository.save(user);
      }
    
      async signIn(username: string, password: string): Promise<string> {
        const user = await this.usersRepository.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
          const payload = { username: user.username, sub: user.id };
          return this.jwtService.sign(payload);
        }
        throw new Error('Invalid credentials');
      }
}
