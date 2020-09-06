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
    public class ArticleController : ControllerBase
    {

        private readonly BlogDataContext _blogDataContext;
        public ArticleController(BlogDataContext blogDataContext)
        {
            _blogDataContext = blogDataContext;
        }

        /// <summary>
        /// 通过时间排序获取文章展示在首页上
        /// </summary>
        /// <param name="index"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/article/getArticleByDate")]
        public ActionResult GetArticleByDate(int index, int count, string searchTitle = "")
        {
            var totalCount = _blogDataContext.Article.Count();
            if (index >= totalCount)
            {
                return Ok(Result.Fail("已经加载到末尾"));
            }
            var articles = _blogDataContext.Article
                .OrderByDescending(i => i.Id)
                .Where(i => i.Title.Contains(searchTitle))
                .Skip(index)
                .Take(count)
                .ToArray();
            return Ok(Result.Success(articles));
        }

        [HttpPost]
        [Route("api/article/EditArticle")]
        public ActionResult EditArticle([FromBody] Article article)
        {
            var userId = HttpContext.Session.GetInt32("userId");
            if (userId == null)
            {
                return Ok(Result.Fail("登录信息已过期，请重新登录"));
            }

            if (article.Id == 0)
            {
                //id为-1是添加文章
                article.UserId = userId.Value;
                article.DeliverTime = DateTime.Now;
                _blogDataContext.Add(article);
            }
            else
            {
                //id不为-1是修改文章
                var oldArticle = _blogDataContext.Article.Find(article.Id);
                if (oldArticle == null)
                {
                    return Ok(Result.Fail("未找到修改的文章，请退出重试"));
                }
                else if (oldArticle.UserId != article.UserId)
                {
                    return Ok(Result.Fail("修改的文章不属于当前用户"));
                }

                oldArticle.Title = article.Title;
                oldArticle.Content = article.Content;
                _blogDataContext.Article.Update(oldArticle);
            }

            try
            {
                _blogDataContext.SaveChanges();
            }
            catch (Exception e)
            {
                return Ok(Result.Fail(e.Message));
            }

            return Ok(article);
        }
    }
}
