import {Component, OnInit} from '@angular/core';
import {Account, Transaction, TransactionRequest, TransactionResponse} from '../api/Api';
import {UserService} from '../services/user-service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[];

  constructor(private userService: UserService) {
    const request: TransactionRequest = {n: 100, stored: false};
    this.userService.getTransactions(request, this.userService.getIbans()).subscribe((response: TransactionResponse[]) => {
      this.transactions = this.userService.sortTransactions(response);
      this.transactions.map((trans: Transaction) => {
        trans.timestamp = new Date(trans.timestamp);
      });
    });
  }

  ngOnInit(): void {
  }

}

