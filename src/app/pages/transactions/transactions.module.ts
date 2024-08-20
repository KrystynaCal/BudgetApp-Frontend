import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';



@NgModule({
  declarations: [TransactionListComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
  ]
})
export class TransactionsModule { }
