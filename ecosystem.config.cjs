
module.exports = {
  apps : [{
    name   : "dev-app-manajerku",
    script : "pnpm",
    args   : "run preview",
    // Optional: Ensure it restarts on crashes
    autorestart: true,
    // Optional: Specify environment variables, such as a port
    env: {
      PORT: 4173, // Default Vite preview port
      // NODE_ENV: "production",
    }
  }]
};