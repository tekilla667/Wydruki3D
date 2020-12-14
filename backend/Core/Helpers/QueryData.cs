namespace Core.Helpers
{
    public class QueryData
    {
        public int prodId { get; set; } = 0;
        public int productsPerPage { get; set; } = 0;
        public int currentPageIndex { get; set; } = 0;
        public int maxPagesCount { get; set; } = 0;
        public int typeIdSearch { get; set; } = 0;
        public int priceSort { get; set; } = 0;
        public string name { get; set; } = null;

    }
}