﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace SistemaEscolarApi
{
    public static class WebApiConfig
    {
        public static void Configure(HttpConfiguration configuration){
            configuration.EnableCors();
            configuration.MapHttpAttributeRoutes();
        }
    }
}
