import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { ProductsModule } from './products/products.module';
import { InvoicesModule } from './facturas/invoices.module';

@Module({
  imports: [TodosModule, ProductsModule, InvoicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 