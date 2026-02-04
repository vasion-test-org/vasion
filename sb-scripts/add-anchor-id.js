const StoryblokClient = require('storyblok-js-client');
const config = require('./config');

const Storyblok = new StoryblokClient({
  oauthToken: config.token,
  endpoint: 'https://api-us.storyblok.com/v1',
});

const addAnchorIdField = async () => {
  try {
    const res = await Storyblok.get(`spaces/${config.spaceId}/components/`);

    for (const component of res.data.components) {
      // Skip if component already has anchor_id field
      if (component.schema.anchor_id) {
        // console.log(
        //   `⏭️  Skipping component ${component.name} - already has anchor_id field`
        // );
        continue;
      }

      // Add anchor_id field to the component schema
      component.schema.anchor_id = {
        type: 'text',
        pos: 0, // Add at the beginning of the schema
        display_name: 'Anchor ID',
        description: 'Unique identifier for the component, used for anchor links',
        required: false,
        regex: '^[a-z0-9-]+$', // Only allow lowercase letters, numbers, and hyphens
        regex_error: 'Anchor ID can only contain lowercase letters, numbers, and hyphens',
      };

      // Update the component
      await Storyblok.put(`spaces/${config.spaceId}/components/${component.id}`, {
        component,
      });
      // console.log(`✅ Added anchor_id field to component: ${component.name}`);
    }

    // console.log('✨ Finished adding anchor_id field to all components');
  } catch (err) {
    // console.error(
    //   '❌ Error adding anchor_id field:',
    //   err.response?.statusText || err.message
    // );
  }
};

addAnchorIdField();
