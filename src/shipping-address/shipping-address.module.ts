import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddressController } from './shipping-address.controller';
import { ShippingAddress, ShippingAddressSchema } from './models/shipping-address';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShippingAddress.name, schema: ShippingAddressSchema },
    ]),
  ],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService],
  exports: [ShippingAddressService],
})
export class ShippingAddressModule {}
