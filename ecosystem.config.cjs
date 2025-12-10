module.exports = {
  apps: [{
    name: "dev-app-manajerku",
    script: "pnpm", 
    args: "run preview",
    cwd: "/var/www/dev/manajerku-fe", 
    interpreter: "none",
    autorestart: true,
    env: {
      NODE_ENV: "production"                
    }
  }]
};
