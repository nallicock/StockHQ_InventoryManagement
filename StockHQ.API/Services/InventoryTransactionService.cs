using StockHQ.API.Interfaces;
using StockHQ.API.Models;

namespace StockHQ.API.Services
{
    public class InventoryTransactionService : IInventoryTransactionService
    {
        private readonly IInventoryTransactionRepository _repository;

        public InventoryTransactionService(IInventoryTransactionRepository repository)
        {
            _repository = repository;
        }

        public async Task AddTransactionAsync(InventoryTransaction transaction)
        {
            await _repository.AddAsync(transaction);
        }

        public async Task<IEnumerable<InventoryTransaction>> GetProductHistoryAsync(int productId)
        {
            return await _repository.GetByProductIdAsync(productId);
        }
    }
}
