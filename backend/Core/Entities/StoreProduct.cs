namespace Core.Entities
{
    public class StoreProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int Price { get; set; }
        public int TypeId { get; set; }
        public string Description { get; set; }
        public string PictureUrl { get; set; }


    }
}