# wpx2
## About
wpx2 is a WordPress theme devlopment environment generator. It makes use of Webpack which comes preconfigured with the basics of a modern, productive work environment.

wpx2 is for __LOCAL DEVELOPMENT USE ONLY__! Accidents happen and irreversible damage can be done with this tool. So please do attempt to use it on your production WordPress install. 

## Features
### CSS Preprocessing
Use SASS right out of the box.

### ES6 and Beyond
Utilizing the Babel transpiler, you can take full advantage of modern javascript.

### Auto refresh
Utilize Browsersync to see your changes in the browser automatically and in real time.

#### And more features to come!
## Requirements
You must have Node.js and NPM installed. You can get Node.js [here](https://nodejs.org/). Installing Node.js will also install NPM.

You must have an instance of WordPress running that you can develop against. Don't have one? Check out [this repository](https://github.com/mavance/wordpress_local) if you'd like to spin up a local WordPress stack using Docker.

## Install
`npm install -g wpx2`

## Usage
### Generate a New Theme 
From your WordPress instance's themes folder run `wpx2 new <name>` and follow the prompts. You must provide the URL of your running instance of WordPress to utilize all of wpx2's features.
#### WARNING!!!
I strongly suggest you back up all themes in your themes folder before running this command. If you try to generate a theme with the same name as an existing folder it is possible that folder will be overwritten!

### Change to Your New Theme's Directory
`cd <name>`

### When You're Ready to Develop
`npm run watch`

Webpack will watch for changes in your files and automatically build your bundles and refresh your browser when you save.

If you're not seeing your changes make sure your new theme is the active theme on your WordPress site.

### When You're Ready to Publish
`npm run build`
Webpack will build your bundles and your theme will be ready to deploy!

