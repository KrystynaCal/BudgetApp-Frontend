import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService, TransactionCreateDto } from '../../../services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  categoryId!: number;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.transactionForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    // Retrieve categoryId from the route parameters
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transactionData: TransactionCreateDto = this.transactionForm.value;
      this.transactionService
        .saveTransaction(transactionData, this.categoryId)
        .subscribe({
          next: (response) => {
            console.log('Transaction successfully created:', response);
            this.router.navigate([`categories/${this.categoryId}/transactions`]);
          },
          error: (error) => {
            console.error('Error creating transaction:', error);
          }
        });
    }
  }
  onSubmitAndAddAnother(): void {
    if (this.transactionForm.valid) {
      const transactionData: TransactionCreateDto = this.transactionForm.value;
      this.transactionService.saveTransaction(transactionData, this.categoryId).subscribe({
        next: (response) => {
          console.log('Transaction successfully created:', response);
          this.transactionForm.reset();
        },
        error: (error) => {
          console.error('Error creating transaction:', error);
        }
      });
    }
  }
}
