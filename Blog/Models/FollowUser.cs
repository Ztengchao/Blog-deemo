using System;
using System.Collections.Generic;

namespace Blog.Models
{
    public partial class FollowUser
    {
        public int FollowId { get; set; }
        public int UserId { get; set; }
        public DateTime FollowDate { get; set; }

        public virtual User Follow { get; set; }
        public virtual User User { get; set; }
    }
}
