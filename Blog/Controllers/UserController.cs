using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Blog.Models;
using Blog.Common;
using Microsoft.AspNetCore.Http;

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

            if (_blogDataContext.User.FirstOrDefault(i => i.Username == user.Username) != null)
            {
                return Ok(Result.Fail("该用户已存在"));
            }

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

        /// <summary>
        /// 登录接口
        /// </summary>
        /// <param name="signInInfor"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/User/SignIn")]
        public ActionResult SignIn([FromBody] SignInInfor signInInfor)
        {
            var user = _blogDataContext.User.FirstOrDefault(i => i.Username == signInInfor.Username);
            if (user != null)
            {
                byte[] passwordAndSaltBytes = System.Text.Encoding.UTF8.GetBytes(signInInfor.Password + user.Salt.ToString());
                byte[] hashBytes = new System.Security.Cryptography.SHA256Managed().ComputeHash(passwordAndSaltBytes);
                if (Convert.ToBase64String(hashBytes) == user.PasswordHash.Trim())
                {
                    HttpContext.Session.SetInt32("userId", user.Id);
                    return Ok(Result.Success(new
                    {
                        Name = user.Nickname ?? user.Username,
                        UserId = user.Id
                    }));
                }
            }

            return Ok(Result.Fail("用户名或密码错误"));
        }

        public class SignInInfor
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        /// <summary>
        /// 登出
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/User/Logout")]
        public ActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok(Result.Success());
        }
    }
}
