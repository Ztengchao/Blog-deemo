using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Blog.Common;

namespace Blog.Controllers
{
    [ApiController]
    public class EditorController : ControllerBase
    {
        /// <summary>
        /// 上传图片接口
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("api/editor/uploadImg")]
        public ActionResult UploadImg()
        {
            var userID = HttpContext.Session.GetInt32("userId");
            if (userID == null)
            {
                return Ok(Result.Fail("登录信息已过期，请重新登录"));
            }

            var file = Request.Form.Files[0];
            if (file.Length > 10485760)
            {
                return Ok(Result.Fail("图片不得超过10MB"));
            }
            var filename = Guid.NewGuid() + "." + file.FileName.Split(".")[1];
            var path = Program.Configuration["imgLocation"] + $"\\{userID}";
            try
            {
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                using (FileStream fs = System.IO.File.Create(path + "\\" + filename))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
            }
            catch
            {
                return Ok(Result.Fail("图片保存失败"));
            }
            return Ok(Result.Success(new { @default = Program.Configuration["url"] + $"/api/img/{userID}/{filename}" }));
        }
    }
}
