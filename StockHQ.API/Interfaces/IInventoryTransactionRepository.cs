using StockHQ.API.Models;

namespace StockHQ.API.Interfaces
{
    public interface IInventoryTransactionRepository
    {
        //only need add and get by id because we should not be able to delete or edit a transaction
        Task AddAsync(InventoryTransaction transaction);
        Task<IEnumerable<InventoryTransaction>> GetByProductIdAsync(int productId);

    }
}
