import { Injectable } from '@nestjs/common';
import { FindManyReviewArgs, FindUniqueReviewArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateReviewInput } from './dtos/create-review.input';
import { UpdateReviewInput } from './dtos/update-review.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createReviewInput: CreateReviewInput) {
    return this.prisma.review.create({
      data: createReviewInput,
    });
  }

  findAll(args: FindManyReviewArgs) {
    return this.prisma.review.findMany(args as Prisma.ReviewFindManyArgs);
  }

  findOne(args: FindUniqueReviewArgs) {
    return this.prisma.review.findUnique(args);
  }

  update(updateReviewInput: UpdateReviewInput) {
    const { id, ...data } = updateReviewInput;
    return this.prisma.review.update({
      where: { id },
      data: data,
    });
  }

  remove(args: FindUniqueReviewArgs) {
    return this.prisma.review.delete(args);
  }
}
