using System.ComponentModel.DataAnnotations;

namespace StockHQ.API.Models
{
    public class InventoryTransaction
    {
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        public Product? Product { get; set; }

        [Required]
        public int QuantityChanged { get; set; }

        [Required]
        [StringLength(50)]
        public string Reason { get; set; } = string.Empty;

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
    }
}
