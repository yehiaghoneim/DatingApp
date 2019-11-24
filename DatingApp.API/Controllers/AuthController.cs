using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Model;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;


namespace DatingApp.API.Controllers
{
    
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo,IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDTO)
        {
            userForRegisterDTO.Username =userForRegisterDTO.Username.ToLower();
            if( await _repo.UerExists(userForRegisterDTO.Username))
                return BadRequest("Username already exist");

            var userToCreate=new User
            {
                Username=userForRegisterDTO.Username
            };

            var createdUser=await _repo.Register(userToCreate,userForRegisterDTO.Password);

            return StatusCode(201);    
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login (UserForLoginDto userForLoginDTO)
        {
            var userFromRepo=await _repo.Login(userForLoginDTO.Username,userForLoginDTO.Password);
            if(userFromRepo==null)
                return Unauthorized();


            var claims=new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Username)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8
                                                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor=new SecurityTokenDescriptor{
                Subject= new ClaimsIdentity(claims),
                Expires= DateTime.Now.AddDays(1),
                SigningCredentials=creds
                
            };

            var tokenHandler=new JwtSecurityTokenHandler();
            
            var token=tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token=tokenHandler.WriteToken(token)
            });
        }

    }
}