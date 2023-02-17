import { Config, Context } from 'https://edge.netlify.com';

export default async (req, context) {
  console.log('Geo Data ->', context.geo);
  // get the response we are intercepting
  const res = await context.next();
  // render the response as text
  const page = await res.text();

  const newTitle = context.geo?.city
    ? `Looks like your located in ${context.geo.city} 🌐`
    : "Hope you're having a nice day";

  // replace content with customization
  const updatedContent = page
    .replace('Hello there', 'Howdy 🤠')
    .replace('{{title}}', newTitle);

  // serve the customized page
  return new Response(updatedContent, {
    headers: { 'content-type': 'text/html' },
  });
};

