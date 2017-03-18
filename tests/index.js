const App = require('yeps');
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const bodyParser = require('yeps-bodyparser');
const methodOverride = require('..');
const expect = chai.expect;
const wrapper = require('yeps-express-wrapper');
const expressBodyParser = require('body-parser');

chai.use(chaiHttp);
let app;

describe('YEPS method override test', async () => {

    beforeEach(() => {
        app = new App();
    });

    it('should test origin method', async () => {
        let isTestFinished1 = false;
        let isTestFinished2 = false;

        app.then(async ctx => {
            isTestFinished1 = true;

            ctx.res.statusCode = 200;
            ctx.res.end(ctx.req.method);
        });

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('GET');
                isTestFinished2 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
    });

    it('should test yeps body parser json', async () => {
        let isTestFinished1 = false;
        let isTestFinished2 = false;

        app.then(bodyParser());
        app.then(methodOverride());

        app.then(async ctx => {
            isTestFinished1 = true;

            ctx.res.statusCode = 200;
            ctx.res.end(ctx.req.method);
        });

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .type('json')
            .send({ _method: 'post'})
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('POST');
                isTestFinished2 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
    });

    it('should test yeps body parser', async () => {
        let isTestFinished1 = false;
        let isTestFinished2 = false;

        app.then(bodyParser());
        app.then(methodOverride());

        app.then(async ctx => {
            isTestFinished1 = true;

            ctx.res.statusCode = 200;
            ctx.res.end(ctx.req.method);
        });

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .type('form')
            .send({ _method: 'post'})
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('POST');
                isTestFinished2 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
    });

    it('should test express body parser json', async () => {
        let isTestFinished1 = false;
        let isTestFinished2 = false;

        app.then(wrapper(expressBodyParser.json()));
        app.then(methodOverride());

        app.then(async ctx => {
            isTestFinished1 = true;

            ctx.res.statusCode = 200;
            ctx.res.end(ctx.req.method);
        });

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .type('json')
            .send({ _method: 'post'})
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('POST');
                isTestFinished2 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
    });

    it('should test header', async () => {
        let isTestFinished1 = false;
        let isTestFinished2 = false;

        app.then(methodOverride());

        app.then(async ctx => {
            isTestFinished1 = true;

            ctx.res.statusCode = 200;
            ctx.res.end(ctx.req.method);
        });

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .set('x-http-method-override', 'post')
            .send({ _method: 'post'})
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('POST');
                isTestFinished2 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
    });

});
