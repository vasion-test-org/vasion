require('dotenv').config();

module.exports = {
  token: process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN,
  spaceId: process.env.STORYBLOK_SPACE_ID,
};
