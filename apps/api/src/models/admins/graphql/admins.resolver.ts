import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AdminsService } from './admins.service';
import { Admin } from './entity/admin.entity';
import { FindManyAdminArgs, FindUniqueAdminArgs } from './dtos/find.args';
import { CreateAdminInput } from './dtos/create-admin.input';
import { UpdateAdminInput } from './dtos/update-admin.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from 'src/models/users/graphql/entity/user.entity';
import { Verification } from 'src/models/verifications/graphql/entity/verification.entity';
import { AdminWhereInput } from './dtos/where.args';
import { Prisma } from '@prisma/client';

@AllowAuthenticated('admin')
@Resolver(() => Admin)
export class AdminsResolver {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Admin)
  createAdmin(
    @Args('createAdminInput') args: CreateAdminInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid);
    return this.adminsService.create(args);
  }

  @Query(() => [Admin], { name: 'admins' })
  findAll(@Args() args: FindManyAdminArgs) {
    return this.adminsService.findAll(args);
  }

  @AllowAuthenticated('admin')
  @Query(() => Admin, { name: 'admin' })
  findOne(@Args() args: FindUniqueAdminArgs) {
    return this.adminsService.findOne(args);
  }

  @AllowAuthenticated()
  @Query(() => Admin, { name: 'adminMe' })
  adminMe(@GetUser() user: GetUserType) {
    return this.adminsService.findOne({ where: { uid: user.uid } });
  }

  @AllowAuthenticated()
  @Mutation(() => Admin)
  async updateAdmin(
    @Args('updateAdminInput') args: UpdateAdminInput,
    @GetUser() user: GetUserType,
  ) {
    const admin = await this.prisma.admin.findUnique({
      where: { uid: args.uid },
    });
    checkRowLevelPermission(user, admin.uid);
    return this.adminsService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Admin)
  async removeAdmin(
    @Args() args: FindUniqueAdminArgs,
    @GetUser() user: GetUserType,
  ) {
    const admin = await this.prisma.admin.findUnique(args);
    checkRowLevelPermission(user, admin.uid);
    return this.adminsService.remove(args);
  }
  // 管理员查找用户信息
  @ResolveField(() => User, { nullable: true })
  user(@Parent() admin: Admin) {
    return this.prisma.user.findUnique({ where: { uid: admin.uid } });
  }
  // 管理员查找管理员信息
  @ResolveField(() => [Verification])
  verifications(@Parent() parent: Admin) {
    return this.prisma.verification.findMany({
      where: {
        adminId: parent.uid,
      },
    });
  }
  // 在线人数
  @ResolveField(() => Number)
  numberOfVerifacation(@Parent() parent: Admin) {
    return this.prisma.verification.count({
      where: {
        adminId: parent.uid,
      },
    });
  }
  // 管理员数量
  @Query(() => Number, {
    name: 'adminsCount',
  })
  async numberOfAdmin(
    @Args('where', { nullable: true, type: () => AdminWhereInput })
    where: AdminWhereInput,
  ) {
    return this.prisma.admin.count({
      where: where as Prisma.AdminWhereInput,
    });
  }
}
