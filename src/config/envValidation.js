
require('dotenv').config();

const REQUIRED_ENV_VARS = [
    "PUBLIC_SUPABASE_URL",
    "PUBLIC_SUPABASE_ANON_KEY",
    "PRIVATE_SUPABASE_SERVICE_ROLE",
    "PRIVATE_STRIPE_API_KEY"
];

let missingVars = REQUIRED_ENV_VARS.filter(key => !process.env[key]);

if (missingVars.length > 0) {
    console.error(`❌ Missing required environment variables: ${missingVars.join(", ")}`);
    process.exit(1); // Halt execution if env variables are missing
}

console.log("✅ Environment variables validated successfully.");
