using System;
using System.Collections.Generic;

namespace Blog.Models
{
    public partial class Article
    {
        public Article()
        {
            Comment = new HashSet<Comment>();
            StarArticle = new HashSet<StarArticle>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public DateTime DeliverTime { get; set; }
        public int LoveCount { get; set; }
        public int CommitCount { get; set; }
        public string Content { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<StarArticle> StarArticle { get; set; }
    }
}
