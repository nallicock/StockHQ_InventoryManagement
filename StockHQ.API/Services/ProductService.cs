using StockHQ.API.Interfaces;
using StockHQ.API.Models;
using System.Diagnostics.CodeAnalysis;

namespace StockHQ.API.Services
{
    public class ProductService : IProductService
    {

            //looking at the interface not implementation
        private readonly IProductRepository _repository;
        private readonly IInventoryTransactionRepository _transactionRepository;

            //.NET Core injects an IProductRepository when it creates a ProductService
        public ProductService(
            IProductRepository repository,
            IInventoryTransactionRepository transactionRepository)
        {
            _repository = repository;
            _transactionRepository = transactionRepository;
        }
            
        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            return await _repository.AddAsync(product);
        }

        public async Task UpdateProductAsync(Product product)
        {
            await _repository.UpdateAsync(product);
        }

        public async Task DeleteProductAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task ReceiveStockAsync(int productId, int quantity)
        {
            if (quantity <= 0)
            {
                throw new Exception("Quantity must be greater than 0!");
            }

            var product = await _repository.GetByIdAsync(productId);

            if(product == null)
            {
                throw new Exception("Product not found.");
            }

            product.QuantityInStock += quantity;

            await _repository.UpdateAsync(product);

            var transaction = new InventoryTransaction
            {
                ProductId = product.Id,
                QuantityChanged = quantity,
                Reason = "Received"
            };

            await _transactionRepository.AddAsync(transaction);
        }

        public async Task SellStockAsync(int productId, int quantity)
        {
            if (quantity <= 0)
            {
                throw new Exception("Quantity must be greater than 0!");
            }

            var product = await _repository.GetByIdAsync(productId);

            if(product == null)
            {
                throw new Exception("Product not found.");
            }

            if(product.QuantityInStock < quantity)
            {
                throw new Exception("Not enough stock available.");
            }

            product.QuantityInStock -= quantity;

            await _repository.UpdateAsync(product);

            var transaction = new InventoryTransaction
            {
                ProductId = product.Id,
                QuantityChanged = -quantity,
                Reason = "Sold"
            };

            await _transactionRepository.AddAsync(transaction);
        }

        public async Task<IEnumerable<InventoryTransaction>> GetInventoryHistoryAsync(int productId)
        {
            return await _transactionRepository.GetByProductIdAsync(productId);
        }
    }
}
