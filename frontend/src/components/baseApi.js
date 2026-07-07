/**
 * Configuration file for API base URLs.
 * Exports the base URL based on a simple environment check.
 */

// Production/Remote URL (Render deployment)
const baseApi = "https://medi-connect-backend-igce.onrender.com";

// Local Development URL (Default Spring Boot port)
// const baseApi = "http://localhost:8080";

// Export individual URLs for explicit use if needed
export { baseApi };
