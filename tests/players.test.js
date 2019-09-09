/**
 * @author  Fabrice Sommavilla <fs@physalix.com>
 * @date    09/09/2019
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe("Players", () => {
    describe("GET /", () => {
        it("should get all players record", (done) => {
            chai.request(app)
                .get('/api/players')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
        it("should get a single player record by id", (done) => {
            const id = 17;
            chai.request(app)
                .get(`/api/players/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not get a single player record", (done) => {
            const id = 5;
            chai.request(app)
                .get(`/api/players/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it("should delete a single player record by id", (done) => {
            const id = 17;
            chai.request(app)
                .delete(`/api/players/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});