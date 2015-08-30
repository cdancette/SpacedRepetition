#Spaced Repetition

## Usage
### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com) (for dev)

### Installation
1. Clone the repository:
2. Install the NodeJS dependencies: `npm install`.
3. Install the Bower dependencies: `bower install`.
4. Run the gulp build task: `gulp build`.
5. Run the gulp run task: `gulp run`. This will build any changes made automatically,

### Development
Continue developing the dashboard further by editing the `src` directory. With the `gulp` command, any file changes made will automatically be compiled into the specific location within the `dist` directory.

#### Modules & Packages
By default, rdash-angular includes [`ui.bootstrap`](http://angular-ui.github.io/bootstrap/), [`ui.router`](https://github.com/angular-ui/ui-router) and [`ngCookies`](https://docs.angularjs.org/api/ngCookies). 

If you'd like to include any additional modules/packages not included with rdash-angular, add them to your `bower.json` file and then update the `src/index.html` file, to include them in the minified distribution output.


### Packaging the app

You have to package on the OS you want to distribute the app.

Make a directory with the files : 
* dist directory
* package.json

Then install npm dependancies (npm install --production)

zip all files

Change extension from .zip to .n : there is the package.
You can run it with the nw binary.

Made with RDash-angular (https://github.com/rdash/rdash-angular)
