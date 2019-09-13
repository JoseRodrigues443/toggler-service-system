using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using TogglerApi.Context;


namespace TogglerApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // Register the Swagger services
            services.AddSwaggerDocument(config =>
                {
                    config.PostProcess = document =>
                    {
                        document.Info.Version = "v1";
                        document.Info.Title = "Toggler API";
                        document.Info.Description = "A toggler API ASP.NET Core web API";
                        document.Info.TermsOfService = "None";
                        document.Info.Contact = new NSwag.OpenApiContact
                        {
                            Name = "José Miguel Rodrigues",
                            Email = "josemiguel443@gmail.com",
                            Url = "https://joserodrigues443.github.io"
                        };
                        document.Info.License = new NSwag.OpenApiLicense
                        {
                            Name = "Use under GPL 3",
                            Url = "https://www.gnu.org/licenses/gpl-3.0.en.html"
                        };
                    };
                });

            // Register Database context
            services.AddDbContext<ToggleContext>(opt =>
                opt.UseInMemoryDatabase("ToggleList"));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }


            // Register the Swagger generator and the Swagger UI middlewares
            app.UseOpenApi();
            app.UseSwaggerUi3();


            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
