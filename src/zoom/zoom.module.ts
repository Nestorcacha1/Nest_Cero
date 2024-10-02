import { Module } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { ZoomGateway } from './zoom.gateway';

@Module({
  providers: [ZoomGateway, ZoomService],
})
export class ZoomModule {}
