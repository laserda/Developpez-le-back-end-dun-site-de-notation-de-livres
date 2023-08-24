using Back_end_net.Data;
using Back_end_net.DTO;
using Back_end_net.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Back_end_net.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser>? _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public UserRepository(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration,
            RoleManager<IdentityRole> roleManager
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
        }


        public async Task<IdentityResult> SignUpAsync(SignUpDTO signUpDTO)
        {
            var user = new ApplicationUser
            {
                UserName = signUpDTO.Email,
                Email = signUpDTO.Email
            };

            return await _userManager.CreateAsync(user, signUpDTO.Password);
        }

        public async Task<UserToken> GenerateTokenAsync(SignInDTO signInDTO)
        {
            if (signInDTO == null) return null;
            var user = await _userManager.FindByNameAsync(signInDTO.Email);
            if (user == null) return null;

            var authClains = new List<Claim>
            {
                new Claim(ClaimTypes.Name, signInDTO.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var authSigninkey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(1),
                claims: authClains,
                signingCredentials: new SigningCredentials(authSigninkey, SecurityAlgorithms.HmacSha256Signature)
            );

            var strToken = new JwtSecurityTokenHandler().WriteToken(token);

            return new UserToken
            {
                Token = strToken,
                userId = user.Id
            };
        }

        public async Task<UserToken> LoginAsync(SignInDTO signInDTO)
        {
            var result = await _signInManager.PasswordSignInAsync(signInDTO.Email, signInDTO.Password, false, false);
            if (!result.Succeeded)
            {
                return null;
            }

            return await GenerateTokenAsync(signInDTO);
        }

        public async Task<UserToken> LoginWithUserNameAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return null;
            }


            var authClains = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var authSigninkey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(1),
                claims: authClains,
                signingCredentials: new SigningCredentials(authSigninkey, SecurityAlgorithms.HmacSha256Signature)
            );

            var strToken = new JwtSecurityTokenHandler().WriteToken(token);

            return new UserToken
            {
                Token = strToken,
                userId = user.Id
            };
        }
    }
}
