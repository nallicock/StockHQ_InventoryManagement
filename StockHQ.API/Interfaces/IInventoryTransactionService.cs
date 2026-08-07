using StockHQ.API.Models;

namespace StockHQ.API.Interfaces
{
    public interface IInventoryTransactionService
    {
        Task AddTransactionAsync(InventoryTransaction transaction);

        Task<IEnumerable<InventoryTransaction>> GetProductHistoryAsync(int productId);
    }
}
