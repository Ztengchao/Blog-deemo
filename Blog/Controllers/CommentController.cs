using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Blog.Common;
using Blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly BlogDataContext _blogDataContext;
        public CommentController(BlogDataContext blogDataContext)
        {
            _blogDataContext = blogDataContext;
        }


        [Route("api/comment/add")]
        [HttpPost]
        public ActionResult AddComment([FromBody] Comment comment)
        {
            if (HttpContext.Session.GetInt32("userId") == null ||
                comment.UserId != HttpContext.Session.GetInt32("userId"))
            {
                return Ok(Result.Fail("登录信息已过期，请重新登录"));
            }

            var article = _blogDataContext.Article.Find(comment.ArticleId);
            if (article == null)
            {
                return Ok(Result.Fail("找不到所评论的文章"));
            }

            comment.DeliverDate = DateTime.Now;
            _blogDataContext.Add(comment);
            article.CommitCount++;
            _blogDataContext.Update(article);
            try
            {
                _blogDataContext.SaveChanges();
            }
            catch
            {
                return Ok(Result.Fail("保存评论失败"));
            }

            return Ok(Result.Success(comment));
        }

        [Route("api/comment/find")]
        [HttpGet]
        public ActionResult FindComment(int articleId, int page, int countPerPage)
        {
            if (page == 0)
            {
                page = 1;
            }

            var article = _blogDataContext.Article.Find(articleId);
            if (article == null)
            {
                return Ok(Result.Fail("未找到该文章"));
            }

            var data = _blogDataContext.Comment
                .Where(i => i.ArticleId == articleId)
                .OrderByDescending(i => i.Id)
                .Skip(countPerPage * (page - 1))
                .Take(countPerPage);
            var TotalComments = _blogDataContext.Comment
                .Where(i => i.ArticleId == articleId).Count();

            return Ok(Result.Success(new
            {
                Comments = data.Select(i => new
                {
                    i.User.ProfilePhoto,
                    i.User.Nickname,
                    i.UserId,
                    i.Content,
                    i.DeliverDate,
                }),
                TotalComments,
            }));
        }
    }
}
