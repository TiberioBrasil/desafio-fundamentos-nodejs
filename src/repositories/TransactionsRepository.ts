import Transaction from '../models/Transaction';

interface ReturnDataDTO {
  transactions: Transaction[];

  balance: Balance;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ReturnDataDTO {
    const returnData: ReturnDataDTO = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return returnData;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    // eslint-disable-next-line no-return-assign
    this.transactions.map(transaction =>
      transaction.type === 'income'
        ? (income += transaction.value)
        : (outcome += transaction.value),
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
