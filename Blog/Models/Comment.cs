using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Blog.Models
{
    public partial class Comment
    {
        public Comment()
        {
            InverseCommentNavigation = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public string Content { get; set; }
        public int ArticleId { get; set; }
        public int UserId { get; set; }
        public DateTime DeliverDate { get; set; }
        public int? CommentId { get; set; }

        [JsonIgnore]
        public virtual Article Article { get; set; }
        [JsonIgnore]
        public virtual Comment CommentNavigation { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual ICollection<Comment> InverseCommentNavigation { get; set; }
    }
}
