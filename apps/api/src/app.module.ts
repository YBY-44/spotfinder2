import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { UsersModule } from './models/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ValetsModule } from './models/valets/valets.module';
import { AdminsModule } from './models/admins/admins.module';
import { AddressesModule } from './models/addresses/addresses.module';
import { BookingsModule } from './models/bookings/bookings.module';
import { GaragesModule } from './models/garages/garages.module';
import { SlotsModule } from './models/slots/slots.module';
import { ManagersModule } from './models/managers/managers.module';
import { BookingTimelinesModule } from './models/booking-timelines/booking-timelines.module';
import { CompaniesModule } from './models/companies/companies.module';
import { ReviewsModule } from './models/reviews/reviews.module';
import { ValetAssignmentsModule } from './models/valet-assignments/valet-assignments.module';
import { VerificationsModule } from './models/verifications/verifications.module';
import { CustomersModule } from './models/customers/customers.module';
import { StripeModule } from './models/stripe/stripe.module';
// TODO: move this to uttl lib
const MAX_AGE = 24 * 60 * 60;
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: MAX_AGE },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        // numberScalarMode: 'integer',
      },
    }),
    PrismaModule,
    StripeModule,
    UsersModule,
    ValetsModule,
    ValetAssignmentsModule,
    AdminsModule,
    AddressesModule,
    BookingTimelinesModule,
    BookingsModule,
    GaragesModule,
    ReviewsModule,
    SlotsModule,
    ManagersModule,
    CompaniesModule,
    CustomersModule,
    VerificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
