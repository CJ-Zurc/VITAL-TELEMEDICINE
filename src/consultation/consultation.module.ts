import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';

@Module({
  providers: [ConsultationService]
})
export class ConsultationModule {}
