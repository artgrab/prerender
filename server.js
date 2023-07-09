#!/usr/bin/env node
require('dotenv').config();
var prerender = require('./lib');

var server = prerender({
  chromeLocation: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  chromeFlags: [
    '--no-sandbox',
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--hide-scrollbars',
  ],
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
server.use(prerender.blockResources());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(require('prerender-aws-s3-cache'));

server.start();
