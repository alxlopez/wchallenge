const request = require('supertest');
const app = require('../api')
let token = '';
/**
 * Test user endpoints
 */

describe('POST /users', async() => {
    it('respond with 201 created', done => {
        const body = {
            name: "Alexander",
            lastName: "López Guerrero",
            preferredCurrency: 2,
            username: "alopez",
            password: "Alopez123"
        }
        request(app)
            .post('/api/v1/user')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
    it('respond with 500 - Duplicate entry', done => {
        const body = {
            name: "Alexander",
            lastName: "López Guerrero",
            preferredCurrency: 2,
            username: "alopez",
            password: "Alopez123"
        }
        request(app)
            .post('/api/v1/user')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
    it('respond with 403 Forbidden - Invalid password', done => {
        const body = {}
        request(app)
            .post('/api/v1/user')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('GET /user', () => {
    it('respond with json containing a list of all users', done => {
        request(app)
            .get('/api/v1/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /user/:id', () => {
    it('respond with json containing a single user', done => {
        request(app)
            .get('/api/v1/user/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            //.expect(200, done)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Test auth endpoint
 */

 describe('POST /auth/login', () => {
    it('respond with json containing a single user', done => {
        const body = {
            name: "Alexander",
            lastName: "López Guerrero",
            preferredCurrency: 2,
            username: "alopez",
            password: "Alopez123"
        }
        request(app)
            .post('/api/v1/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});