import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBookingInput } from './dtos/create-booking.input';
import { UpdateBookingInput } from './dtos/update-booking.input';
import { BookingStatus, Prisma, SlotType } from '@prisma/client';
import { generateSixDigitNumber } from 'src/common/auth/util';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  getFreeSlot({
    garageId,
    startTime,
    endTime,
    type,
  }: {
    garageId: number;
    startTime: string | Date;
    endTime: string | Date;
    type: SlotType;
  }) {
    return this.prisma.slot.findFirst({
      where: {
        garageId: garageId,
        type: type,
        Bookings: {
          none: {
            OR: [
              { startTime: { lt: endTime }, endTime: { gt: startTime } },
              { startTime: { gt: startTime }, endTime: { lt: endTime } },
            ],
          },
        },
      },
    });
  }
  async create({
    customerId,
    endTime,
    garageId,
    startTime,
    type,
    vehicleNumber,
    phoneNumber,
    pricePerHour,
    totalPrice,
    valetAssignment,
  }: CreateBookingInput) {
    // 查找当前用户
    const customer = await this.prisma.customer.findUnique({
      where: { uid: customerId },
    });
    // 用户不存在就创建用户
    if (!customer?.uid) {
      await this.prisma.customer.create({
        data: { uid: customerId },
      });
    }
    // 生成通行码
    const passcode = generateSixDigitNumber().toString();
    let startDate: Date;
    let endDate: Date;
    // 开始租赁时间
    if (typeof startTime === 'string') {
      startDate = new Date(startTime);
    }
    // 结束租赁时间
    if (typeof endTime === 'string') {
      endDate = new Date(endTime);
    }
    // 判断该时段是否可用
    const slot = await this.getFreeSlot({
      endTime: endDate,
      startTime: startDate,
      garageId,
      type,
    });
    // 如果不可用
    if (!slot) {
      throw new NotFoundException('No slots found.');
    }
    // 根据事务处理
    return this.prisma.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: {
          endTime: new Date(endTime).toISOString(),
          startTime: new Date(startTime).toISOString(),
          vehicleNumber,
          customerId,
          phoneNumber,
          passcode,
          slotId: slot.id,
          pricePerHour,
          totalPrice,
          ...(valetAssignment
            ? { ValetAssignment: { create: valetAssignment } }
            : null),
        },
      });
      await tx.bookingTimeline.create({
        data: { bookingId: booking.id, status: 'BOOKED' as BookingStatus },
      });

      return booking;
    });
  }

  findAll(args: FindManyBookingArgs) {
    return this.prisma.booking.findMany(args as Prisma.BookingFindManyArgs);
  }

  findOne(args: FindUniqueBookingArgs) {
    return this.prisma.booking.findUnique(args);
  }

  update(updateBookingInput: UpdateBookingInput) {
    const { id, ...data } = updateBookingInput;
    return this.prisma.booking.update({
      where: { id },
      data: data,
    });
  }

  remove(args: FindUniqueBookingArgs) {
    return this.prisma.booking.delete(args);
  }
}
