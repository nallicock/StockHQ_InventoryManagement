using System.ComponentModel.DataAnnotations;

namespace StockHQ.API.DTOs
{
    public class SellStockRequest
    {
        [Range(1, 1000000)]
        public int Quantity { get; set; }
    }
}
