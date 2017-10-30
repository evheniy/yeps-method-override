const App = require('yeps');
const chai = require('chai');
const chaiHttp = require('chai-http');
const srv = require('yeps-server');
const Router = require('yeps-router');
const bodyParser = require('yeps-bodyparser');
const methodOverride = require('..');

const wrapper = require('yeps-express-wrapper');
const expressBodyParser = require('body-parser');

const { expect } = chai;

chai.use(chaiHttp);
let app;
let server;

describe('YEPS method override test', async () => {
  beforeEach(() => {
    app = new App();
    server = srv.createHttpServer(app);
  });

  afterEach(() => {
    server.close();
  });

  it('should test origin method', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;

    app.then(async (ctx) => {
      isTestFinished1 = true;

      ctx.res.statusCode = 200;
      ctx.res.end(ctx.req.method);
    });

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
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

    app.then(async (ctx) => {
      isTestFinished1 = true;

      ctx.res.statusCode = 200;
      ctx.res.end(ctx.req.method);
    });

    await chai.request(server)
      .get('/')
      .type('json')
      .send({ _method: 'post' })
      .then((res) => {
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

    app.then(async (ctx) => {
      isTestFinished1 = true;

      ctx.res.statusCode = 200;
      ctx.res.end(ctx.req.method);
    });

    await chai.request(server)
      .get('/')
      .type('form')
      .send({ _method: 'post' })
      .then((res) => {
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

    app.then(async (ctx) => {
      isTestFinished1 = true;

      ctx.res.statusCode = 200;
      ctx.res.end(ctx.req.method);
    });

    await chai.request(server)
      .get('/')
      .type('json')
      .send({ _method: 'post' })
      .then((res) => {
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

    app.then(async (ctx) => {
      isTestFinished1 = true;

      ctx.res.statusCode = 200;
      ctx.res.end(ctx.req.method);
    });

    await chai.request(server)
      .get('/')
      .set('x-http-method-override', 'post')
      .send({ _method: 'post' })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('POST');
        isTestFinished2 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
  });

  it('should test yeps router', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;

    app.then(methodOverride());

    const router = new Router();

    router.post('/').then(async (ctx) => {
      isTestFinished1 = true;

      ctx.res.statusCode = 200;
      ctx.res.end(ctx.req.method);
    });

    app.then(router.resolve());

    await chai.request(server)
      .get('/')
      .set('x-http-method-override', 'post')
      .send({ _method: 'post' })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('POST');
        isTestFinished2 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
  });
});
