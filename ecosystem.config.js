/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
const timestamp = new Date().toISOString().slice(0, 10);

module.exports = {
  apps: [
    {
      name: 'server_aws_zeply',
      script: './backend/server.js',
      out_file: `./serverlogs/aws_pm2-out-${timestamp}.log`,
      error_file: `./serverlogs/aws_pm2-err-${timestamp}.log`
    }
  ]
};
