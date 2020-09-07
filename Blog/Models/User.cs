using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public string PasswordHash { get; set; }
        [JsonIgnore]
        public Guid Salt { get; set; }
        public string ProfilePhoto { get; set; }


        [JsonIgnore]
        public virtual ICollection<Article> Article { get; set; }

        [JsonIgnore]
        public virtual ICollection<Comment> Comment { get; set; }

        [JsonIgnore]
        public virtual ICollection<FollowUser> FollowUserFollow { get; set; }

        [JsonIgnore]
        public virtual ICollection<FollowUser> FollowUserUser { get; set; }

        [JsonIgnore]
        public virtual ICollection<StarArticle> StarArticle { get; set; }
    }
}
