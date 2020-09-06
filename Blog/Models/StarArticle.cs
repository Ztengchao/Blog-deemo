using System;
using System.Collections.Generic;

namespace Blog.Models
{
    public partial class StarArticle
    {
        public int UserId { get; set; }
        public int ArticleId { get; set; }
        public DateTime StarDate { get; set; }

        public virtual Article Article { get; set; }
        public virtual User User { get; set; }
    }
}
