using System;
using System.Collections.Generic;

namespace Blog.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public Guid Salt { get; set; }
        public string ProfilePhoto { get; set; }
    }
}
