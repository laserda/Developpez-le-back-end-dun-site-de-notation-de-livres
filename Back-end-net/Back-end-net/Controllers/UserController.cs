using Back_end_net.DTO;
using Back_end_net.Models;
using Back_end_net.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Back_end_net.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserRepository _userRepository;

        public UserController(
            IUserRepository userRepository
        )
        {
            _userRepository = userRepository;
        }
                        

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(SignUpDTO signUpDTO)
        {
            var result = await _userRepository.SignUpAsync(signUpDTO);

            if (result.Succeeded)
            {
                return new OkObjectResult(new ErrorMessage
                {
                    Message = $"Création reussi"
                });
            }

            return Unauthorized(result);
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(SignInDTO signInDTO)
        {
            var userToken = await _userRepository.LoginAsync(signInDTO);

            if (userToken == null)
            {
                return new BadRequestObjectResult(new ErrorMessage
                {
                    Message = $"Login / Mot de passe incorrect."
                });
            }
            return new OkObjectResult(userToken);
        }


    }
}
