namespace API.Entities;

// 9. Creating the first entity class
public class AppUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    // public Guid Id { get; set; } = Guid.NewGuid(); // we could use a Guid see more 14. Creating the database
    public required string DisplayName { get; set; }
    public required string Email { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}
