module.exports = {
  apps: [{
    name: "dev-app-manajerku",
    cwd: "/var/www/dev/manajerku-fe",
    script: "serve",
    env: {
      PM2_SERVE_PATH: './dist',
      PM2_SERVE_PORT: 4173,
      PM2_SERVE_SPA: 'true',
      NODE_ENV: "development"
    }
  }]
};