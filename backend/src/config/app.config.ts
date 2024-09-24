export default () => ({
  APP_PORT: parseInt(process.env.PORT, 10) || 3000,
  APP_NAME: process.env.APP_NAME || 'nestjs',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/nest',
  JWT_SECRET: process.env.JWT_SECRET || 'default-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
});
