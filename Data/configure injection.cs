public void ConfigureServices(IServiceCollection services)
{
    // Database context
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(
            Configuration.GetConnectionString("DefaultConnection")));

    // Identity configuration
    services.AddIdentity<ApplicationUser, IdentityRole>()
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

    // Add MVC services
    services.AddControllersWithViews();

    // Session and cookie setup (for user authentication)
    services.AddSession();
    services.AddAuthentication()
            .AddCookie(options => 
            {
                options.LoginPath = "/Account/Login"; // Redirect to login page if not authenticated
                options.AccessDeniedPath = "/Account/AccessDenied"; // Redirect to access denied page
            });
}
