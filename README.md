# YEPS Method Override


[![NPM](https://nodei.co/npm/yeps-method-override.png)](https://npmjs.org/package/yeps-method-override)

[![npm version](https://badge.fury.io/js/yeps-method-override.svg)](https://badge.fury.io/js/yeps-method-override)
[![Build Status](https://travis-ci.org/evheniy/yeps-method-override.svg?branch=master)](https://travis-ci.org/evheniy/yeps-method-override)
[![Coverage Status](https://coveralls.io/repos/github/evheniy/yeps-method-override/badge.svg?branch=master)](https://coveralls.io/github/evheniy/yeps-method-override?branch=master)
[![Linux Build](https://img.shields.io/travis/evheniy/yeps-method-override/master.svg?label=linux)](https://travis-ci.org/evheniy/)
[![Windows Build](https://img.shields.io/appveyor/ci/evheniy/yeps-method-override/master.svg?label=windows)](https://ci.appveyor.com/project/evheniy/yeps-method-override)

[![Dependency Status](https://david-dm.org/evheniy/yeps-method-override.svg)](https://david-dm.org/evheniy/yeps-method-override)
[![devDependency Status](https://david-dm.org/evheniy/yeps-method-override/dev-status.svg)](https://david-dm.org/evheniy/yeps-method-override#info=devDependencies)
[![NSP Status](https://img.shields.io/badge/NSP%20status-no%20vulnerabilities-green.svg)](https://travis-ci.org/evheniy/yeps-method-override)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/evheniy/yeps-method-override/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/evheniy/yeps-method-override.svg)](https://github.com/evheniy/yeps-method-override/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/evheniy/yeps-method-override.svg)](https://github.com/evheniy/yeps-method-override/network)
[![GitHub issues](https://img.shields.io/github/issues/evheniy/yeps-method-override.svg)](https://github.com/evheniy/yeps-method-override/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/evheniy/yeps-method-override.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)


## How to install

    npm i -S yeps-method-override
  
## How to use

### Header x-http-method-override or in body request

    const App = require('yeps');
    const Router = require('yeps-router');
    
    const error = require('yeps-error');
    const logger = require('yeps-logger');
    const server = require('yeps-server');
    
    const bodyParser = require('yeps-bodyparser');
    const methodOverride = require('yeps-method-override');
    
    const app = new App();
    const router = new Router();
    
    app.all([
        error(),
        logger(),
        bodyParser(),
        methodOverride(),
    ]);
    
    app.then(async (ctx) => {
        ctx.res.statusCode = 200;
        ctx.res.end(JSON.stringify(ctx.req.method));
    });
    
    router.get('/').then(async (ctx) => {
       ctx.res.statusCode = 200;
       ctx.res.end('homepage');     
    });
        
    app.then(router.resolve());
        
    server.createHttpServer(app);


#### [YEPS documentation](http://yeps.info/)
