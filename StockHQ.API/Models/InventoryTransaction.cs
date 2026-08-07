using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace StockHQ.API.Models
{
    public class InventoryTransaction
    {
        public int Id { get; set; }


        //which product changed?
        [Required]
        public int ProductId { get; set; }

        //Navigation property back to the product -- used with Include()
        public Product? Product { get; set; }

        //how much of the quantity changed after the transaction?
        [Required]
        public int QuantityChanged { get; set; }

        //why did the inventory change?
        //sold? damaged? returned? adjustment? received?
        [Required]
        [StringLength(50)]
        public string Reason { get; set; } = string.Empty;

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
    }
}
