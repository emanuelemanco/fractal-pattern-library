# Pattern library

Dependencies:

Local system needs the following installed to run / generate the pattern libray

Node v4.4.7+ [https://nodejs.org/en/](https://nodejs.org/en/)
Gulp [https://gulpjs.com/](https://gulpjs.com/)
Fractal CLI [https://fractal.build/](https://fractal.build/)

note: make sure 'gulp' is in your system path so you can run from the terminal/command line.

After cloning repository, install node modules.

`npm install`

To compile and run local dev server:

`gulp`

Served here: [http://localhost:3000](http://localhost:3000)

To build static/compiled version of pattern library (also minifies CSS and JS):

`gulp build --production`

OPTIONAL

There is a task set up that will copy the compiled CSS and JS to another folder in the project if required - dependant on project. Configure in Gulp file as required.

To copy CSS and JS assets to the relevant Umbraco folders (/css /scripts):

note - run after previous build step

`gulp copy_assets`

TEST SERVER

Deployed to The Teams Digitalocean 'Development' droplet.

SSH user
teamdeveloper
7u=rEp@The5r

http://preview.theteam.co.uk/nsi-corporate/

theteam
N$3reRuPruPa
