using Microsoft.AspNetCore.Identity;

namespace StockHQ.API.Interfaces
{
    //controller > authservice > asp.net identity > dbcontext > sql server
    public interface IAuthService
    {
        Task<IdentityResult> RegisterAsync(string email, string password);
        //return JWT string if login succeeds or null if fails
        Task<string?> LoginAsync(string email, string password);
        //interface now has both login and register.
    }
}
