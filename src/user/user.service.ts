import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put.dto';
import { UpdatePatchUserDTO } from './dto/update-patch.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {


    const salt = await bcrypt.genSalt();


    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.users.create({
      data,
    });
  }

  async list() {
    return this.prisma.users.findMany();
  }

  async show(id: number) {
    await this.exists(id);
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { email, name, password, birhtAt, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();


    password = await bcrypt.hash(password, salt);

    return this.prisma.users.update({
      data: {
        email,
        name,
        password,
        birthAt: birhtAt ? new Date(birhtAt) : null,
        role,
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: number,
    { email, name, password, birhtAt, role }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);
    const data: any = {};
    if (birhtAt) {
      data.birhtAt = new Date(birhtAt);
    }

    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();


      data.password = await bcrypt.hash(data.password, salt);
    }
    if (role) {
      data.role = role;
    }

    return this.prisma.users.update({
      data,
      where: {
        id,
      },
    });
  }
  async delete(id: number) {
    await this.exists(id);
    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
  async exists(id: number) {
    if (
      !(await this.prisma.users.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuario do ${id} nao existe!`);
    }
  }
}
