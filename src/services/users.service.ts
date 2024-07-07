import { Injectable } from '@nestjs/common'
import { CreateUserBodySchema } from 'src/controllers/users.controller'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create({ name, email, password }: CreateUserBodySchema) {
    await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })
  }
}
