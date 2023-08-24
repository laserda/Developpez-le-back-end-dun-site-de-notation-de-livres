using System.ComponentModel.DataAnnotations;

namespace Back_end_net.DTO
{
    public class SignInDTO
    {
        [Required(ErrorMessage = "Veuillez saisir le mail")]
        public string? Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
