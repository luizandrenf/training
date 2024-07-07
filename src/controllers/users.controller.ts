import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { UsersService } from 'src/services/users.service'
import { z } from 'zod'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async create(@Body() data: CreateUserBodySchema) {
    const { name, email, password } = data

    const userWithSameEmail = await this.usersService.findByEmail(email)

    if (userWithSameEmail) {
      throw new ConflictException()
    }

    const passwordHashed = await hash(password, 8)

    await this.usersService.create({
      name,
      email,
      password: passwordHashed,
    })
  }
}
