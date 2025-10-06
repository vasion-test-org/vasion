const StoryblokClient = require('storyblok-js-client');
require('dotenv').config();

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN,
  endpoint: 'https://api-us.storyblok.com/v1',
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

const richTextClasses = {
  'Body Medium': 'bodyMd',
  'Body Medium Bold': 'bodyMd bold',
  'Body Small': 'bodySm',
  'Body Small Bold': 'bodySm bold',
  'Body Large Bold': 'bodyLrg bold',
  'Body Large': 'bodyLrg',
  'Body XL': 'bodyXl',
  'Body XL Bold': 'bodyXl bold',
  'Tag': 'tag',
  'Tag Bold': 'tag bold',
  'Tag Light': 'tagLight',
  'Eyebrow': 'eyebrow',
};

const applyRichTextClasses = async () => {
  try {
    const res = await Storyblok.get(`spaces/${spaceId}/components/`);

    for (const component of res.data.components) {
      let updates = false;

      for (const key of Object.keys(component.schema)) {
        const field = component.schema[key];
        if (field.type === 'richtext') {
          field.style_options = Object.entries(richTextClasses).map(
            ([name, value]) => ({
              name,
              value,
            })
          );
          updates = true;
        }
      }

      if (updates) {
        await Storyblok.put(`spaces/${spaceId}/components/${component.id}`, {
          component,
        });
        // console.log(`✅ Updated component: ${component.name}`);
      }
    }
  } catch (err) {
    // console.error(
    //   '❌ Error applying rich text classes:',
    //   err.response?.statusText || err.message
    // );
  }
};

applyRichTextClasses();
