import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking } from './entity/booking.entity';
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dtos/find.args';
import { CreateBookingInput } from './dtos/create-booking.input';
import { UpdateBookingInput } from './dtos/update-booking.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Slot } from 'src/models/slots/graphql/entity/slot.entity';
import { Customer } from 'src/models/customers/graphql/entity/customer.entity';
import { BookingTimeline } from 'src/models/booking-timelines/graphql/entity/booking-timeline.entity';
import { ValetAssignment } from 'src/models/valet-assignments/graphql/entity/valet-assignment.entity';
import { BadRequestException } from '@nestjs/common';
import { AggregateCountOutput } from 'src/common/dtos/common.input';
import { BookingWhereInput } from './dtos/where.args';
import { Prisma } from '@prisma/client';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Booking)
  createBooking(
    @Args('createBookingInput') args: CreateBookingInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.customerId);
    return this.bookingsService.create(args);
  }

  @Query(() => [Booking], { name: 'bookings' })
  findAll(@Args() args: FindManyBookingArgs) {
    return this.bookingsService.findAll(args);
  }

  @Query(() => Booking, { name: 'booking' })
  findOne(@Args() args: FindUniqueBookingArgs) {
    return this.bookingsService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Booking)
  async updateBooking(
    @Args('updateBookingInput') args: UpdateBookingInput,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: args.id },
    });
    checkRowLevelPermission(user, booking.customerId);
    return this.bookingsService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Booking)
  async removeBooking(
    @Args() args: FindUniqueBookingArgs,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique(args);
    checkRowLevelPermission(user, booking.customerId);
    return this.bookingsService.remove(args);
  }
  // 对于Valet的booking
  @AllowAuthenticated('valet')
  @Query(() => [Booking], { name: 'bookingsForValet' })
  async bookingsForValet(
    @Args() args: FindManyBookingArgs,
    @GetUser() user: GetUserType,
  ) {
    // 搜索公司以及相应的泊车员信息
    const company = await this.prisma.company.findFirst({
      where: { Valets: { some: { uid: user.uid } } },
    });
    // 返回所有的泊车公司
    return this.bookingsService.findAll({
      ...args,
      where: {
        ...args.where,
        Slot: { is: { Garage: { is: { companyId: { equals: company.id } } } } },
      },
    });
  }
  // 对于客户的预定
  @AllowAuthenticated()
  @Query(() => [Booking], { name: 'bookingsForCustomer' })
  bookingsForCustomer(
    @Args() args: FindManyBookingArgs,
    @GetUser() user: GetUserType,
  ) {
    return this.bookingsService.findAll({
      ...args,
      where: { ...args.where, customerId: { equals: user.uid } },
    });
  }
  // 对于车位的预定
  @AllowAuthenticated('manager', 'admin')
  @Query(() => [Booking], { name: 'bookingsForGarage' })
  async bookingsForGarage(
    @Args()
    { cursor, distinct, orderBy, skip, take, where }: FindManyBookingArgs,
    @GetUser() user: GetUserType,
  ) {
    const garageId = where.Slot.is.garageId.equals;
    if (!garageId) {
      throw new BadRequestException('Pass garage id in where.Slot.is.garageId');
    }
    const garage = await this.prisma.garage.findUnique({
      where: { id: garageId },
      include: { Company: { include: { Managers: true } } },
    });

    checkRowLevelPermission(
      user,
      garage.Company.Managers.map((manager) => manager.uid),
    );

    return this.bookingsService.findAll({
      cursor,
      distinct,
      orderBy,
      skip,
      take,
      where: {
        ...where,
        Slot: { is: { garageId: { equals: garageId } } },
      },
    });
  }
  // 预定的数量
  @Query(() => AggregateCountOutput)
  async bookingsCount(
    @Args('where', { nullable: true, type: () => BookingWhereInput })
    where: BookingWhereInput,
  ) {
    const bookings = await this.prisma.booking.aggregate({
      where: where as Prisma.BookingWhereInput,
      _count: { _all: true },
    });
    return { count: bookings._count._all };
  }

  // 查看当前booking的所有slot
  @ResolveField(() => Slot)
  slot(@Parent() booking: Booking) {
    return this.prisma.slot.findFirst({ where: { id: booking.slotId } });
  }

  // 查看当前booking的所有客户
  @ResolveField(() => Customer)
  customer(@Parent() booking: Booking) {
    return this.prisma.customer.findFirst({
      where: { uid: booking.customerId },
    });
  }
  // 查看当前booking的所有bookingTimeline
  @ResolveField(() => [BookingTimeline])
  bookingTimeline(@Parent() booking: Booking) {
    return this.prisma.bookingTimeline.findMany({
      where: { bookingId: booking.id },
    });
  }
  // 查看当前booking的所有valet
  @ResolveField(() => ValetAssignment, { nullable: true })
  valetAssignment(@Parent() booking: Booking) {
    return this.prisma.valetAssignment.findFirst({
      where: { bookingId: booking.id },
    });
  }
}
