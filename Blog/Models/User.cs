using System;
using System.Collections.Generic;

namespace Blog.Models
{
    public partial class User
    {
        public User()
        {
            Article = new HashSet<Article>();
            Comment = new HashSet<Comment>();
            FollowUserFollow = new HashSet<FollowUser>();
            FollowUserUser = new HashSet<FollowUser>();
            StarArticle = new HashSet<StarArticle>();
        }

        public int Id { get; set; }
        public string Nickname { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public Guid Salt { get; set; }
        public string ProfilePhoto { get; set; }

        public virtual ICollection<Article> Article { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<FollowUser> FollowUserFollow { get; set; }
        public virtual ICollection<FollowUser> FollowUserUser { get; set; }
        public virtual ICollection<StarArticle> StarArticle { get; set; }
    }
}
