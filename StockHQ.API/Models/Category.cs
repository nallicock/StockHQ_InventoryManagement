using System.ComponentModel.DataAnnotations;

namespace StockHQ.API.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        //one category contains many products - need a collection
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
