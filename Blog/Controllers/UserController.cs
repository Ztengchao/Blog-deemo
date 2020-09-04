using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Blog.Models;
using Newtonsoft.Json;
using System.Text.Json;
using Blog.Common;

namespace Blog.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly BlogDataContext _blogDataContext;
        public UserController(BlogDataContext blogDataContext)
        {
            _blogDataContext = blogDataContext;
        }

        /// <summary>
        /// 注册接口
        /// </summary>
        /// <param name="signUpInfor"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/User/SignUp")]
        public ActionResult SignUp([FromBody] SignUpInfor signUpInfor)
        {
            User user = new User()
            {
                Username = signUpInfor.Username,
                Nickname = signUpInfor.Nickname,
                Salt = Guid.NewGuid()
            };
            //加盐储存密码
            var salt = user.Salt.ToString();
            byte[] passwordAndSaltBytes = System.Text.Encoding.UTF8.GetBytes(signUpInfor.Password + salt);
            byte[] hashBytes = new System.Security.Cryptography.SHA256Managed().ComputeHash(passwordAndSaltBytes);
            string hashString = Convert.ToBase64String(hashBytes);
            user.PasswordHash = hashString;

            _blogDataContext.Add(user);
            try
            {
                _blogDataContext.SaveChanges();
            }
            catch
            {
                return Ok(Result.Fail("注册失败"));
            }
            return Ok(Result.Success());
        }

        /// <summary>
        /// 用于储存传递的注册信息
        /// </summary>
        public class SignUpInfor
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Nickname { get; set; }
        }
    }
}
