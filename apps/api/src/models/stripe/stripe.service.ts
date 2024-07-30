import Stripe from 'stripe';

import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe-session.dto';
import { toTitleCase } from 'src/common/auth/util';

@Injectable()
export default class StripeService {
  public stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  async createStripeSession({
    totalPriceObject,
    uid,
    bookingData,
  }: CreateStripeDto) {
    if (!totalPriceObject) {
      console.log('totalPriceObj is null');
      return;
    }
    if (!uid) {
      console.log('uid is null');
      return;
    }
    if (!bookingData) {
      console.log('bookingData is null');
      return;
    }
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: Object.entries(totalPriceObject)
        .filter(([, price]) => price > 0)
        .map(([name, price]) => ({
          quantity: 1,
          price_data: {
            product_data: {
              name: toTitleCase(name),
            },
            currency: 'usd',
            unit_amount: price * 100,
          },
        })),
      mode: 'payment',
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      metadata: {
        uid,
        bookingData: JSON.stringify(bookingData),
      },
    });

    return { sessionId: session.id };
  }
}
