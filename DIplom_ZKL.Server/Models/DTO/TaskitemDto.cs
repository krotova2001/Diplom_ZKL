namespace DIplom_ZKL.Server.Models.DTO
{
    public class TaskitemDto
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public int StatementId { get; set; }
        public string AuthorId { get; set; }
    }
}
