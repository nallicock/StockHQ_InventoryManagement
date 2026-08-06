using StockHQ.API.Interfaces;
using StockHQ.API.Models;

namespace StockHQ.API.Services
{
    public class ProductService : IProductService
    {

            //looking at the interface not implementation
            private readonly IProductRepository _repository;

            public ProductService(IProductRepository repository)
            {
            //when creating a ProductService, pass through an IProductRepository
                _repository = repository;
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
                await _repository.AddAsync(product);
            }

            public async Task DeleteProductAsync(int id)
            {
                await _repository.DeleteAsync(id);
            }
        }
}
