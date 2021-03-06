const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user/user.model');
const Card = require('../models/card/card.model');

const DEFAULT_USER = {
    name: 'Tim',
    email: 'timnook@leafmail.com',
    password: 'gimmedatbellmoney'
}

const DEFAULT_USER_2 = {
    name: 'Tom',
    email: 'tomnook@leafmail.com',
    password: 'gimmedatbellmoney'
}

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/ac-membership-test-models`
    await mongoose.connect(url, { useNewUrlParser: true });
});

describe('/user', () => {
    beforeEach(async (done) => {
        await User.deleteMany({});
        done();
    })

    describe('GET /all', () => {
        describe('given existing users', () => {
            let res;
            beforeAll(async (done) => {
                await User.deleteMany({});
                let userId = (await User.create(DEFAULT_USER))._id;
                await User.create(DEFAULT_USER_2);
                let card = await Card.create({});
                await User.findByIdAndUpdate(userId, { cardId: card._id });

                res = await supertest(app).get(`/user/all`);
                done();
            });

            test('returns status 200', () => {
                expect(res.status).toBe(200);
            });

            test('returns expected message', () => {
                expect(res.body.status).toBe('success');
                expect(res.body.message).toBe('Retrieved all users');
            });

            test('returns all users', () => {
                expect(res.body.allUsers).toHaveLength(2);
            })

        });
    })

    describe('GET /:id', () => {
        describe('given an existing user', () => {
            let res, userId;
            beforeAll(async (done) => {
                userId = (await User.create(DEFAULT_USER))._id;
                expect(userId).toBeDefined();
                res = await supertest(app).get(`/user/${userId}`);
                done();
            });

            test('returns status 200', () => {
                expect(res.status).toBe(200);
            });

            test('will return expected response', () => {
                expect(res.body.status).toBe('success');
                expect(res.body.user.email).toBe(DEFAULT_USER.email);
            });
        });

        describe('given a non-existent user', () => {
            let res;
            beforeAll(async (done) => {
                const userId = '5fd0bd8c9a34245ac02d4fcc';
                await User.deleteMany({});
                res = await supertest(app).get(`/user/${userId}`);
                done();
            });
            test('returns status 404', () => {
                expect(res.status).toBe(404);
            })

            test('will return expected response', () => {
                expect(res.body.status).toBe('failed');
                expect(res.body.user).not.toBeDefined();
            });

        });
    });

    describe('POST /signup', () => {
        beforeEach(async () => {
            await User.deleteMany({});
        });

        describe('given name, email and password is provided', () => {
            let res;
            beforeAll( async () => {
                res = await supertest(app).post('/user/signup').send(DEFAULT_USER);
            });

            test('returns status 201', () => {
                expect(res.status).toBe(201);
            });

            test('returns expected response', () => {
                expect(res.body.status).toBe('success');
                expect(res.body.message).toBe('User has been signed up');
                expect(res.body.userId).toBeDefined();
            });
        });

        describe('given user with same email already exists', () => {
            let res;
            beforeAll( async () => {
                // Given ... an existing user
                await User.create({ name: 'Isabelle', email: DEFAULT_USER.email, password: 'blah' });
                res = await supertest(app).post('/user/signup').send(DEFAULT_USER);
            });

            test('returns status 500', () => {
                expect(res.status).toBe(500);
            });

            test('returns expected response', () => {
                expect(res.body.status).toBe('failed');
                expect(res.body.message).toBe('Could not create user');
                expect(res.body.userId).not.toBeDefined();
            });
        });
    });

    describe('GET /validate', () => {
        describe('given a vaild email and password', () => {
            let res;
            beforeAll(async (done) => {
                await User.create(DEFAULT_USER);
                res = await supertest(app).put('/user/validate').send({ email: DEFAULT_USER.email, password: DEFAULT_USER.password });
                done();
            });

            test('returns status 200', () => {
                expect(res.status).toBe(201);
            });

            test('returns expected message', () => {
                expect(res.body.status).toBe('success');
                expect(res.body.message).toBe('User has been validated successfully');
                expect(res.body.userId).toBeDefined();
            })
        });

        describe('given a valid email and invalid password', () => {
            let res;
            beforeAll(async (done) => {
                await User.create(DEFAULT_USER);
                res = await supertest(app).put('/user/validate').send({ email: DEFAULT_USER.email, password: 'blah' });
                done();
            });

            test('returns status 403', () => {
                expect(res.status).toBe(403);
            });

            test('returns expected message', () => {
                expect(res.body.status).toBe('failed');
                expect(res.body.message).toBe('User is invalid');
                expect(res.body.userId).not.toBeDefined();
            })
        });

        describe('given an invalid email and password', () => {
            let res;
            beforeAll(async (done) => {
                await User.create(DEFAULT_USER);
                res = await supertest(app).put('/user/validate').send({ email: 'beetroot@purple.com', password: 'purple'});
                done();
            });

            test('returns status 403', () => {
                expect(res.status).toBe(403);
            });

            test('returns expected message', () => {
                expect(res.body.status).toBe('failed');
                expect(res.body.message).toBe('User is invalid');
                expect(res.body.userId).not.toBeDefined();
            })
        });
    });

    describe('/:id/card' , () => {
        describe('GET /', () => {
            // Given ... an existing user
            let userId;
            beforeAll( async (done) => {
                await User.deleteMany({});
                await Card.deleteMany({});
                userId = (await User.create(DEFAULT_USER))._id;
                done();
            });


            describe('can get a user card if exists', () => {
                let res;
                beforeAll(async (done) => {
                    // Given a user with a card
                   let card =  await Card.create({});
                   await User.findByIdAndUpdate(userId, { cardId: card._id });
                   res = await supertest(app).get(`/user/${userId}/card`);
                   done();
                });

                test('will return status 200', () => {
                    expect(res.status).toBe(200);
                });

                test('will return expected response', () => {
                    expect(res.body.status).toBe('success');
                    expect(res.body.message).toBe(`Retrieved card for user ${userId}`);
                    expect(res.body.card).toBeDefined();
                });
            });

            describe('will return error if user card does not exist', () => {
                let res;
                beforeAll(async (done) => {
                    await Card.deleteMany({});
                    res = await supertest(app).get(`/user/${userId}/card`);
                    done();
                });

                test('will return status 404', () => {
                    expect(res.status).toBe(404);
                });

                test('will return expected response', () => {
                    expect(res.body.status).toBe('failed');
                    expect(res.body.message).toBe(`Card could not be found`);
                    expect(res.body.card).not.toBeDefined();
                });
            });
        });

        describe('POST /register', () => {
            describe('given valid userId', () => {
                // Given ... an existing user
                let userId, res;
                beforeAll( async (done) => {
                    await User.deleteMany({});
                    await Card.deleteMany({});

                    userId = (await User.create(DEFAULT_USER))._id;
                    res = await supertest(app).post(`/user/${userId}/card/register`);
                    done();
                });

                test('returns status 201', () => {
                    expect(res.status).toBe(201);
                });

                test('returns expected response', () => {
                    expect(res.body.status).toBe('success');
                    expect(res.body.message).toBe(`Card has been registered for user ${userId}`);
                    expect(res.body.cardId).toBeDefined();
                });
            });

            describe('given invalid userId', () => {
                // Given ... an invalid user
                let userId = '5fd153113d58824f096d92f1';
                let res;
                beforeAll( async (done) => {
                    await User.deleteMany({});
                    await Card.deleteMany({});

                    res = await supertest(app).post(`/user/${userId}/card/register`);
                    done();
                });

                test('returns status 400', () => {
                    expect(res.status).toBe(400);
                });

                test('returns expected response', () => {
                    expect(res.body.status).toBe('failed');
                    expect(res.body.message).toBe(`User does not exist`);
                    expect(res.body.cardId).not.toBeDefined();
                });
            });
        });

        describe('DELETE /remove', () => {});

        describe('PUT /points', () => {
            describe('Can update card points', () => {
                let userId, res, updatedCard;
                beforeAll(async (done) => {
                    // Given a user with a card
                    userId = (await User.create(DEFAULT_USER))._id;
                    let cardId =  (await Card.create({}))._id; // default points is zero
                    await User.findByIdAndUpdate(userId, { cardId });
                    res = await supertest(app).put(`/user/${userId}/card/points`).send({ cardId, pointsToAdd
                        : 2 });
                    updatedCard = await Card.findById(cardId);
                    done();
                });

                test('returns status 201', () => {
                    expect(res.status).toBe(201);
                });
                test('returns expected message', () => {
                    expect(res.body.status).toBe('success');
                    expect(res.body.message).toBe('User points updated');
                });
                test('updates card points by 2', () => {
                    expect(updatedCard.points).toBe(2);
                });
            });
        });
    });

});
