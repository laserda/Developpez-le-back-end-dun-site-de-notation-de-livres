using Back_end_net.DTO;
using Back_end_net.Models;
using Microsoft.AspNetCore.Identity;

namespace Back_end_net.Repositories
{
    public interface IUserRepository
    {
        Task<UserToken> LoginAsync(SignInDTO signInDTO);
        Task<IdentityResult> SignUpAsync(SignUpDTO signUpDTO);
    }
}
