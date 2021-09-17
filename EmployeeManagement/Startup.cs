using EmployeeManagement.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace EmployeeManagement
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
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            //// var configuration = new ConfigurationBuilder()
            //  .SetBasePath(Directory.GetCurrentDirectory())
            //  .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            //  .Build();

            services.AddEntityFrameworkSqlServer();
            //services.AddControllers();
            services.AddDbContextPool<EmployeeContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Default")));

            //services.AddDbContextPool<EmployeeContext>((serviceProvider, optionsBuilder) =>
            //{
            //    optionsBuilder.UseSqlServer(Configuration.GetConnectionString("Default"));
            //    optionsBuilder.UseInternalServiceProvider(serviceProvider);
            //});


   //         services.AddEntityFramework()
   //   .AddSqlServer()
   //   .AddDbContext<FirstAppDemoDbContext>

   //(option => option.UseSqlServer(Configuration["database:connection"]));
            //var builder = new DbContextOptionsBuilder<EmployeeContext>();

            //var connectionString = configuration.GetConnectionString("Default");

            //builder.UseSqlServer(connectionString);

            services.AddAutoMapper(typeof(Startup));
            //            services.addcontrollerswithviews()
            //    .addnewtonsoftjson(options =>
            //    options.serializersettings.referenceloophandling = newtonsoft.json.referenceloophandling.ignore
            //);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors(builder => builder
             .AllowAnyHeader()
             .AllowAnyMethod()
             .SetIsOriginAllowed((host) => true)
             .AllowCredentials()
             );
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapControllerRoute(
            //        name: "default",
            //        pattern: "{controller}/{action=Index}/{id?}");
            //});
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
