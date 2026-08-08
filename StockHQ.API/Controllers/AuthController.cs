using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using StockHQ.API.DTOs;
using StockHQ.API.Interfaces;

namespace StockHQ.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //asp removes controller from AuthController, so path is api/auth
    //auth controller > service interface > service
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(
                request.Email,
                request.Password);

            if(!result.Succeeded)
            {
                return BadRequest("Registration failed: " + result.Errors);
            }

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var token = await _authService.LoginAsync(
                request.Email,
                request.Password);

            if (token == null)

            {
                return Unauthorized("Invalid email or password");
            }

            return Ok(new { token });
        }
    }
}
