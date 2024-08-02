import { BadRequestException, Injectable } from '@nestjs/common';
import { FindManyCompanyArgs, FindUniqueCompanyArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCompanyInput } from './dtos/create-company.input';
import { UpdateCompanyInput } from './dtos/update-company.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    description,
    displayName,
    managerId,
    managerName,
  }: CreateCompanyInput) {
    console.log('managerId', managerId);
    console.log('managerName', managerName);
    console.log('displayName', displayName);
    const manager = await this.prisma.manager.findUnique({
      where: {
        uid: managerId,
      },
    });
    console.log('manager', manager);
    if (manager) {
      throw new BadRequestException(
        'This user is a Manager of another company, this user can not create any company',
      );
    }
    return this.prisma.company.create({
      data: {
        description,
        displayName,
        Managers: {
          create: {
            displayName: managerName,
            uid: managerId,
          },
        },
      },
    });
  }

  findAll(args: FindManyCompanyArgs) {
    return this.prisma.company.findMany(args as Prisma.CompanyFindManyArgs);
  }

  findOne(args: FindUniqueCompanyArgs) {
    return this.prisma.company.findUnique(args);
  }

  update(updateCompanyInput: UpdateCompanyInput) {
    const { id, ...data } = updateCompanyInput;
    return this.prisma.company.update({
      where: { id },
      data: data,
    });
  }

  remove(args: FindUniqueCompanyArgs) {
    return this.prisma.company.delete(args);
  }
}
