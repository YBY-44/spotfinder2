import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args';
import {
  RegistWithProviderInput,
  RegistWithUserselfInput,
  LoginInput,
  LoginOutput,
} from './dtos/create-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  // @AllowAuthenticated()
  @Mutation(() => LoginOutput)
  async userLogin(
    @Args('userLoginInput')
    args: LoginInput,
  ) {
    return await this.usersService.userlogin(args);
  }

  @AllowAuthenticated()
  @Query(() => User)
  async i_am(@GetUser() user: GetUserType) {
    return await this.usersService.findOne({ where: { uid: user.uid } });
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async registUserwithUserself(
    @Args('registWithUserselfInput')
    args: RegistWithUserselfInput,
  ) {
    return await this.usersService.registWithUserself(args);
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async registUserwithProvider(
    @Args('registWithProviderInput')
    args: RegistWithProviderInput,
  ) {
    return this.usersService.registWithProvider(args);
  }

  @AllowAuthenticated('admin')
  @Query(() => [User], { name: 'users' })
  findAll(@Args() args: FindManyUserArgs) {
    console.log('Admin we find for you for all uid.');
    return this.usersService.findAll(args);
  }
  @AllowAuthenticated()
  @Query(() => User, { name: 'user' })
  findOne(@Args() args: FindUniqueUserArgs, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.where.uid);
    return this.usersService.findOne(args);
  }

  // @AllowAuthenticated()
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') args: UpdateUserInput,
    @GetUser() user: GetUserType,
  ) {
    const userInfo = await this.prisma.user.findUnique({
      where: { uid: args.uid },
    });
    console.log(userInfo);
    checkRowLevelPermission(user, user.uid);
    return this.usersService.update(args);
  }

  // @AllowAuthenticated()
  @Mutation(() => User)
  async removeUser(
    @Args() args: FindUniqueUserArgs,
    @GetUser() user: GetUserType,
  ) {
    const userInfo = await this.prisma.user.findUnique(args);
    console.log(userInfo);
    checkRowLevelPermission(user, user.uid);
    return this.usersService.remove(args);
  }
}
