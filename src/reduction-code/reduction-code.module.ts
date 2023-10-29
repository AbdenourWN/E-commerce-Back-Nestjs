import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReductionCodeController } from './reduction-code.controller';
import { ReductionCodeService } from './reduction-code.service';
import { ReductionCode, ReductionCodeSchema } from './models/reduction-code';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReductionCode.name, schema: ReductionCodeSchema },
    ]),
  ],
  controllers: [ReductionCodeController],
  providers: [ReductionCodeService],
})
export class ReductionCodeModule {}
