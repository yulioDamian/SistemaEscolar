using Microsoft.Owin;
using Microsoft.AspNet.SignalR;
using Owin;

[assembly: OwinStartup(typeof(SistemaEscolarApi.Startup))]

namespace SistemaEscolarApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var hubConfiguration = new HubConfiguration();
            hubConfiguration.EnableDetailedErrors = true;

            app.MapSignalR(hubConfiguration);
        }
    }
}
