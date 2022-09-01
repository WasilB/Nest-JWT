import {
  Inject,
  Injectable,
  Next,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { from, identity, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { userEntity } from './user.entity';
import { userInterFace } from './user.interface';
import { JwtService } from '@nestjs/jwt';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class UserServivce {
  constructor(
    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,
    private jwtService: JwtService,
  ) {}

  async findOne(condition: any): Promise<userEntity> {
    return this.userRepository.findOneBy(condition);
  }

  createUser(data: any): Observable<userInterFace> {
    return from(this.userRepository.save(data));
  }
}
