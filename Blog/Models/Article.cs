using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual ICollection<Comment> Comment { get; set; }
        [JsonIgnore]
        public virtual ICollection<StarArticle> StarArticle { get; set; }
    }
}
