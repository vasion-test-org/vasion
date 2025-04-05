const StoryblokClient = require("storyblok-js-client");
require("dotenv").config();

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
  endpoint: "https://api-us.storyblok.com/v1"
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

// Set your datasource slug here
const DATASOURCE_SLUG = "image_border";

const applyImageBorderOptionToCards = async () => {
  try {
    const res = await Storyblok.get(`spaces/${spaceId}/components/`);
    const cardComponents = res.data.components.filter(component =>
      component.name.toLowerCase().includes("card")
    );

    for (const component of cardComponents) {
      if (!component.schema.image_border) {
        component.schema.image_border = {
          type: "option",
          use_datasource: true,
          datasource_slug: DATASOURCE_SLUG,
          default_value: "6px",
          pos: 99
        };

        await Storyblok.put(`spaces/${spaceId}/components/${component.id}`, { component });
        console.log(`✅ Added image_border to: ${component.name}`);
      } else {
        console.log(`ℹ️ image_border already exists on: ${component.name}`);
      }
    }
  } catch (err) {
    console.error("❌ Error updating card components:", err.response?.statusText || err.message);
  }
};

applyImageBorderOptionToCards();
