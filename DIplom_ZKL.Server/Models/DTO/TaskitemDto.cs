namespace DIplom_ZKL.Server.Models.DTO
{
    public class TaskitemDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid Author { get; set; }
        public int StatementId { get; set; }
        public Guid AuthorId { get; set; }
    }
}
