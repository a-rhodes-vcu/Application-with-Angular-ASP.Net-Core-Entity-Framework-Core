using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace quiz_backend.Controllers
{
    public class Credentials
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }

    [Produces ("application/json")]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        readonly UserManager<IdentityUser> userManager;
        readonly SignInManager<IdentityUser> signInManager;
        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Credentials credentials)

        {
            var user = new IdentityUser { UserName = credentials.Email, Email = credentials.Email };
            var result = await userManager.CreateAsync(user, credentials.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await signInManager.SignInAsync(user, isPersistent: false);
            return Ok(CreateToken(user));


        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {

            var result = await signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, false, false);
            if (!result.Succeeded)
                return BadRequest();

            var user = await userManager.FindByEmailAsync(credentials.Email);
            return Ok(CreateToken(user));
        }

        string CreateToken(IdentityUser user)

        {
            var claims = new Claim[]
               {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id)
               };

            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            var signingCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);

        }

       
    }
}
