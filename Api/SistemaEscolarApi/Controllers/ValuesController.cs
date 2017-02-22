using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SistemaEscolarApi.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {
        [HttpGet, Route("Value/test")]
        public IHttpActionResult test()
        {
            return Ok("Me la pela el Ivan");
        }
    }
}
