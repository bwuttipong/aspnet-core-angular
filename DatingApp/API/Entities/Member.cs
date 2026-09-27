using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Member
    {
        public string Id { get; set; } = null!;
        public DateOnly DateOfBirth { get; set; }
        public string? ImageUrl { get; set; }
        public required string DisplayName { get; set; }
        // This is a consistent timezone, no matter where they are in the world.
        // And When we return a valut with UTC time, then our browser's automatically going to convert that into local time.
        public DateTime Created { get; set; } = DateTime.UtcNow; 
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public required string Gender { get; set; }
        public string? Description { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }

        // Navigation property
        [JsonIgnore]
        public List<Photo> Photos { get; set; } = [];

        [JsonIgnore]
        // Navigation property
        [ForeignKey(nameof(Id))]
        public AppUser User { get; set; } = null!;
    }
}

// dotnet ef migrations add MemberEntityAdded
// dotnet ef database update