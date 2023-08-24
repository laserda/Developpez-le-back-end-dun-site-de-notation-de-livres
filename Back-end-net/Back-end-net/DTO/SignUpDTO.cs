using System.ComponentModel.DataAnnotations;

namespace Back_end_net.DTO
{
    public class SignUpDTO
    {
       
        [Required(ErrorMessage = "Veuillez saisir le mail")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le mot de passe")]
       // [Compare("ConfirmPasswords", ErrorMessage = "Le 'Mot de passe' et le 'Mot de passe de confirmation' ne sont pas identique")]
        public string? Password { get; set; }

        //[Required(ErrorMessage = "Veuillez saisir le mot de passe de confirmation")]
        //public string? ConfirmPasswords { get; set; }
    }
}
