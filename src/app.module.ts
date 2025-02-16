import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class AppModule {}
