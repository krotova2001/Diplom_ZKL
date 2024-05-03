namespace DIplom_ZKL.Server.Models
{
    public partial class Project
    {

        public Guid Id { get; set; }

        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public virtual ICollection<User>? UserNavigation { get; set; } 

        public virtual ICollection<Taskitem>? TaskitemNavigation { get; set; }
    }
}
