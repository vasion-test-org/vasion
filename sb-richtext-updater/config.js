require("dotenv").config();

module.exports = {
  token: process.env.STORYBLOK_OAUTH_TOKEN,
  spaceId: process.env.STORYBLOK_SPACE_ID
};
