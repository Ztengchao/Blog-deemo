using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Common
{
    public static class Result
    {
        /// <summary>
        /// 执行成功
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static object Success(object data = null) => new { success = true, data };
        /// <summary>
        /// 执行失败
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static object Fail(string message = "") => new { success = false, message };
    }
}
