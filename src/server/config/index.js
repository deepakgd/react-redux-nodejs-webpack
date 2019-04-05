const env = process.env.NODE_ENV
let config = {
  env,
}
// mongodb - connection string 
config.mongodbUrl = process.env.MONGODB_URL;

config.timezone = 'Asia/Kolkata'

module.exports = config