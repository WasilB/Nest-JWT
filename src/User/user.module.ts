import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServivce } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '10m' } }),
  ],
  controllers: [UserController],
  providers: [UserServivce],
})
export class UserModule {}
