import { getRepository } from 'typeorm';
import Transactions from '../models/Transaction';
import AppError from '../errors/AppError';

interface RequestDTO {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    // TODO
    const transactionRepository = getRepository(Transactions);
    const checkId = await transactionRepository.findOne({
      where: { id },
    });
    if (!checkId) {
      throw new AppError('Invalid ID', 400);
    }
    await transactionRepository.remove(checkId);
  }
}

export default DeleteTransactionService;
