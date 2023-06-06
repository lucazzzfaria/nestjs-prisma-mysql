import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { FileModule } from 'src/file/file.service';
@Module({
  imports: [
    JwtModule.register({
      secret: `c,M^BlEX-8[c5t@.uCD,^guG.f]0Il%i`,
    }),
    forwardRef(() => UserModule),
    PrismaModule,
    FileModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
