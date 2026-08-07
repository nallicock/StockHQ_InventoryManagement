using StockHQ.API.Models;

namespace StockHQ.API.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product?> GetProductByIdAsync(int id);
        Task<Product> CreateProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(int id);
        Task ReceiveStockAsync(int productId, int quantity);
        Task SellStockAsync(int id, int quantity);
        Task<IEnumerable<InventoryTransaction>> GetInventoryHistoryAsync(int productId);
    }
}
