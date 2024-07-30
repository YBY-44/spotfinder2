import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GaragesService } from './garages.service';
import { Garage, SlotTypeCount } from './entity/garage.entity';
import { FindManyGarageArgs, FindUniqueGarageArgs } from './dtos/find.args';
import { CreateGarageInput } from './dtos/create-garage.input';
import { UpdateGarageInput } from './dtos/update-garage.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { Verification } from 'src/models/verifications/graphql/entity/verification.entity';
import { Company } from 'src/models/companies/graphql/entity/company.entity';
import { Address } from 'src/models/addresses/graphql/entity/address.entity';
import { Slot } from 'src/models/slots/graphql/entity/slot.entity';
import {
  AggregateCountOutput,
  LocationFilterInput,
} from 'src/common/dtos/common.input';
import { GarageWhereInput } from './dtos/where.args';
import {
  DateFilterInput,
  GarageFilter,
  MinimalSlotGroupBy,
} from './dtos/search-filter.input';
import { SlotWhereInput } from 'src/models/slots/graphql/dtos/where.args';
import { Prisma } from '@prisma/client';

@Resolver(() => Garage)
export class GaragesResolver {
  constructor(
    private readonly garagesService: GaragesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('manager')
  @Mutation(() => Garage)
  async createGarage(
    @Args('createGarageInput') args: CreateGarageInput,
    @GetUser() user: GetUserType,
  ) {
    // some 关键字 用于查找是否有
    const company = await this.prisma.company.findFirst({
      where: { Managers: { some: { uid: user.uid } } },
    });
    if (!company) {
      throw new BadRequestException(
        'No company associated with the manager id.',
      );
    }

    return this.garagesService.create({ ...args, companyId: company.id });
  }

  @Query(() => [Garage], { name: 'garages' })
  findAll(@Args() args: FindManyGarageArgs) {
    return this.garagesService.findAll(args);
  }

  @Query(() => Garage, { name: 'garage' })
  findOne(@Args() args: FindUniqueGarageArgs) {
    return this.garagesService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Garage)
  async updateGarage(
    @Args('updateGarageInput') args: UpdateGarageInput,
    @GetUser() user: GetUserType,
  ) {
    const garage = await this.prisma.garage.findUnique({
      where: { id: args.id },
      include: { Company: { include: { Managers: true } } },
    });
    checkRowLevelPermission(
      user,
      garage.Company.Managers.map((manager) => {
        return manager.uid;
      }),
    );
    return this.garagesService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Garage)
  async removeGarage(
    @Args() args: FindUniqueGarageArgs,
    @GetUser() user: GetUserType,
  ) {
    const garage = await this.prisma.garage.findUnique({
      where: { id: args.where.id },
      include: { Company: { include: { Managers: true } } },
    });
    checkRowLevelPermission(
      user,
      garage.Company.Managers.map((man) => man.uid),
    );
    return this.garagesService.remove(args);
  }

  @ResolveField(() => Verification, { nullable: true })
  async verification(@Parent() parent: Garage) {
    return this.prisma.verification.findUnique({
      where: { garageId: parent.id },
    });
  }

  // 查找车库
  @Query(() => [Garage], { name: 'searchGarages' })
  async searchGarages(
    @Args('dateFilter') dateFilter: DateFilterInput,
    @Args('locationFilter') locationFilter: LocationFilterInput,
    @Args('slotsFilter', { nullable: true }) slotsFilter: SlotWhereInput,
    @Args('garageFilter', { nullable: true }) args: GarageFilter,
  ) {
    const { start, end } = dateFilter;
    const { ne_lat, ne_lng, sw_lat, sw_lng } = locationFilter;

    let startDate = new Date(start);
    let endDate = new Date(end);
    const currentDate = new Date();

    const diffInSeconds = Math.floor(
      (endDate.getTime() - startDate.getTime()) / 1000,
    );

    if (startDate.getTime() < currentDate.getTime()) {
      // Set startDate as current time
      startDate = new Date();
      const updatedEndDate = new Date(startDate);
      updatedEndDate.setSeconds(updatedEndDate.getSeconds() + diffInSeconds);
      endDate = updatedEndDate;
    }

    if (startDate.getTime() > endDate.getTime()) {
      throw new BadRequestException(
        'Start time should be earlier than the end time.',
      );
    }
    // 构建查询过滤器
    const garageFilters: any = {
      where: {
        Address: {
          lat: { lte: ne_lat, gte: sw_lat },
          lng: { lte: ne_lng, gte: sw_lng },
        },
        Slots: {
          some: {
            ...slotsFilter,
            Bookings: {
              none: {
                OR: [
                  {
                    startTime: { lt: endDate },
                    endTime: { gt: startDate },
                  },
                  {
                    startTime: { gt: startDate },
                    endTime: { lt: endDate },
                  },
                ],
              },
            },
          },
        },
      },
      ...args, // 可选的其他车库过滤条件
    };
    const garages = await this.prisma.garage.findMany(garageFilters);
    console.log('try to search garges:');
    console.log(garages);
    return garages;
  }

  @ResolveField(() => [SlotTypeCount])
  async slotCounts(@Parent() garage: Garage) {
    const slotCounts = await this.prisma.slot.groupBy({
      by: ['type'],
      where: {
        garageId: garage.id,
      },
      _count: {
        type: true,
      },
    });

    return slotCounts.map(({ type, _count }) => ({
      type,
      count: _count.type,
    }));
  }

  @ResolveField(() => [MinimalSlotGroupBy], {
    name: 'availableSlots',
  })
  async availableSlots(
    @Parent() garage: Garage,
    @Args('slotsFilter', { nullable: true }) slotsFilter: SlotWhereInput,
    @Args('dateFilter') dateFilter: DateFilterInput,
  ) {
    const { start, end } = dateFilter;
    const startDate = new Date(start);
    const endDate = new Date(end);

    // 分离过滤器逻辑
    const bookingFilter = {
      OR: [
        {
          startTime: { lt: endDate },
          endTime: { gt: startDate },
        },
        {
          startTime: { gt: startDate },
          endTime: { lt: endDate },
        },
      ],
    };
    // 创建主过滤器对象并使用类型断言
    const slotFilters: any = {
      ...slotsFilter,
      garageId: { equals: garage.id },
      Bookings: {
        none: bookingFilter,
      },
    };
    // 执行Prisma的groupBy查询
    const groupBySlots: any = await this.prisma.slot.groupBy({
      by: ['type'],
      _count: { type: true },
      _min: { pricePerHour: true },
      where: slotFilters,
    });

    return groupBySlots.map(({ _count, type, _min }) => ({
      type,
      count: _count.type,
      pricePerHour: _min.pricePerHour,
    }));
  }

  // 查找company
  @ResolveField(() => Company)
  company(@Parent() garage: Garage) {
    return this.prisma.company.findFirst({ where: { id: garage.companyId } });
  }
  // 查找address
  @ResolveField(() => Address, { nullable: true })
  address(@Parent() garage: Garage) {
    return this.prisma.address.findFirst({ where: { garageId: garage.id } });
  }
  // 查找slots
  @ResolveField(() => [Slot])
  slots(@Parent() garage: Garage) {
    return this.prisma.slot.findMany({ where: { garageId: garage.id } });
  }
  // 生成车库编号
  @Query(() => AggregateCountOutput, {
    name: 'garagesCount',
  })
  async garagesCount(
    @Args('where', { nullable: true, type: () => GarageWhereInput })
    where: GarageWhereInput,
  ) {
    const garages = await this.prisma.garage.aggregate({
      _count: { _all: true },
      where: where as Prisma.GarageWhereInput,
    });
    return { count: garages._count._all };
  }
}
