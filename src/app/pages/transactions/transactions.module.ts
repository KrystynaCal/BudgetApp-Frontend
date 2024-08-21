import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [TransactionListComponent, AddTransactionComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule
  ]
})
export class TransactionsModule { }
