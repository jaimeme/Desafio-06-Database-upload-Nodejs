import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find();
    const incomes = transactions.filter(transaction => {
      return transaction.type === 'income';
    });

    const outcomes = transactions.filter(transaction => {
      return transaction.type === 'outcome';
    });
    const totalIncomes = incomes.reduce(
      (accumulator, { value }) => Number(accumulator) + Number(value),
      0,
    );

    const totalOutcomes = outcomes.reduce(
      (accumulator, { value }) => Number(accumulator) + Number(value),
      0,
    );

    const balance = {
      income: totalIncomes,
      outcome: totalOutcomes,
      total: totalIncomes - totalOutcomes,
    };
    return balance;
  }
}

export default TransactionsRepository;
