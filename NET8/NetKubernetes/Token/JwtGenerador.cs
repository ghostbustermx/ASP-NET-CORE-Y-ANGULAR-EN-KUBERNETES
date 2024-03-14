using Microsoft.IdentityModel.Tokens;
using NetKubernetes.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NetKubernetes.Token
{
    public class JwtGenerador : IJwtGenerador
    {
        public string CrearToken(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, usuario.UserName!),
                new Claim("userId", usuario.Id),
                new Claim("email", usuario.Email!)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authnetication from the api backend side2!"));

            var credenciales = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = credenciales,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescription);
            return tokenHandler.WriteToken(token);

        }
    }
}
