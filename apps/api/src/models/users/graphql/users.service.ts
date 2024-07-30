import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  RegistWithProviderInput,
  RegistWithUserselfInput,
  LoginInput,
  LoginOutput,
} from './dtos/create-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
@Injectable()
export class UsersService {
  // 导入jwt包
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  registWithProvider({ name, uid, type, image }: RegistWithProviderInput) {
    return this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        AuthProvider: {
          create: {
            type,
          },
        },
      },
    });
  }

  async registWithUserself({
    email,
    password,
    name,
    image,
  }: RegistWithUserselfInput) {
    const isExist = await this.prisma.credentials.findUnique({
      where: { email },
    });
    // check the email availability
    if (isExist) {
      throw new BadRequestException('This email has been registed!');
    }
    // hash the password
    const tools = bcrypt.genSaltSync();
    const hashed_pwd = bcrypt.hashSync(password, tools);
    const uid = uuid();
    return this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        Credentials: {
          create: {
            email,
            passwordHash: hashed_pwd,
          },
        },
        AuthProvider: {
          create: {
            type: 'CREDENTIALS',
          },
        },
      },
      include: {
        Credentials: true,
      },
    });
  }
  // 编写用户登录
  async userlogin({ email, password }: LoginInput): Promise<LoginOutput> {
    console.log('User try to Login');
    // 查找用户
    const user = await this.prisma.user.findFirst({
      where: { Credentials: { email } },
      include: {
        Credentials: true,
      },
    });
    // 如果找不到
    if (!user) {
      console.log('Invalid usernanme or password!');
      throw new UnauthorizedException('Invalid usernanme or password!');
    }
    // check password
    const iscorrectPassword = bcrypt.compareSync(
      password,
      user.Credentials.passwordHash,
    );
    // if password incorrect
    if (!iscorrectPassword) {
      console.log('Invalid usernanme or password!');
      throw new UnauthorizedException('Invalid usernanme or password!');
    }
    // generate token
    const jwtToken = this.jwtService.sign(
      { uid: user.uid },
      {
        algorithm: 'HS256',
      },
    );
    // return token
    return { token: jwtToken, user };
  }

  findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args);
  }
  findAll2(args: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(args);
  }

  findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args);
  }

  update(updateUserInput: UpdateUserInput) {
    const { uid, ...data } = updateUserInput;
    return this.prisma.user.update({
      where: { uid },
      data: data,
    });
  }

  remove(args: FindUniqueUserArgs) {
    return this.prisma.user.delete(args);
  }
}
