using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;

namespace API.Services
{
    public class TokenService(IConfiguration config) : ITokenService
    {
        public string CreateToken(AppUser user)
        {
            //throw new NotImplementedException();

            var tokenKey = config["TokenKey"];
            if (tokenKey.Length < 64) 
                throw new Exception("Your token key needs to e >= 64 charactors");
            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)); // Need to install a package system.identityModel.Tokens.Jwt, Microsoft.identitymodel.tokens

            var claims = new List<Claim>
            {
                new(ClaimTypes.Email, user.Email),
                new(ClaimTypes.NameIdentifier, user.Id),
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            
            var tokenDescription = new SecurityTokenDescriptor
            {
              Subject = new ClaimsIdentity(claims),
              Expires = DateTime.UtcNow.AddDays(7),
              SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}