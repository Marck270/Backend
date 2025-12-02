// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
// dotenv.config();

cloudinary.config({
  cloud_name: "dtszoyu1o",
  api_key: 832629173397161,
  api_secret: "3MKzKJAhYrZsoOl9SKtNt1oNxjc"
});

export default cloudinary;