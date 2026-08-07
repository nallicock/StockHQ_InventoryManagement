using Microsoft.AspNetCore.Identity;

namespace StockHQ.API.Interfaces
{
    //controller > authservice > asp.net identity > dbcontext > sql server
    public interface IAuthService
    {
        Task<IdentityResult> RegisterAsync(string email, string password);
        Task<bool> LoginAsync(string email, string password);
        //interface now has both login and register.
    }
}
