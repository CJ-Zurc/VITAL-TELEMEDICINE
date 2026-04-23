import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultationModule } from './consultation/consultation.module';
import { ProviderModule } from './provider/provider.module';
import { IntegrationModule } from './integration/integration.module';
import { InternalModule } from './internal/internal.module';

@Module({
  imports: [ConsultationModule, ProviderModule, IntegrationModule, InternalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
