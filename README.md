# React Page Editor Concept

### CMS editor like Gutenberg in vanilla React

After reading through the Gutenberg source, I was impressed by how easy conceptually it was to build a component-based CMS in React, but disappointed by all the overrides that Gutenberg did to make it happen.  Creating your own components in Gutenberg was surprisingly difficult and unlike creating vanilla React components.

So I created this basic proof of concept, demonstrating a component based page editor build on React/Redux like Gutenberg, except where the custom components you create to build out editor functionality can be *anything at all* so long as they take and export the same shape of data.  It's just vanilla React.  And it works great.

## Running it

> Fair warning: the app has no validation whatsoever so it's really easy to break.
> It's a proof-of-concept editor architecture, not a well-written website.

Run `migrate_db.sql` to create your database.  (I assume you have mysql running on your system).
Then run `yarn start` in both the `client` and `server` directories.  The client will automatically open.  You can go to /admin/ to play around.

Please note that "Create Page," and "Delete Page" currently don't do anything on the dashboard.  You can easily do that in Sequel Pro or something...the point of this project wasn't to demonstrate that React can create forms, so I never bothered finishing it.


## Adding components

Try adding components based on what you can see in the `cms` directory of the client.  Basically you need a component to render its final form, and compoent to render it in the editor.  `index.js` in the cms directory just registered components to a particular tag name like `h1-header`.