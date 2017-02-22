using System.Web.Http;

namespace SistemaEscolarApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Configure);
        }
    }
}
