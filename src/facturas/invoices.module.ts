import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';

@Module({
  controllers: [InvoicesController],
  providers: [],
})
export class InvoicesModule {}