public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    // Seed roles and user data on application startup
    SeedData.Initialize(app.ApplicationServices, _userManager);

    // Other configurations...
}
