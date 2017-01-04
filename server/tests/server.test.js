const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');


beforeEach(populateUsers);
beforeEach(populateTodos);


describe('POST /todos', () => {
  
  it('should create a new todo', done => {
    var text = 'Test todo text1';
    
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done();
        }
        
        // check in the actual database
        Todo.find({text}).then(todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(err => done(err));
      });
  });
  
  
  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done();
        }
        
        Todo.find().then(todos => {
          expect(todos.length).toBe(2);
          done();
        }).catch(err => done());
      });
  });  
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });
});


describe('GET /todos/:id', () => {
    
  it('should get todo doc based on id', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  
  
  it('should not get todo doc created by other user', done => {
    request(app)
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
  
  
  it('should return 404 if todo not found', done => {
    const randomId = new ObjectID().toHexString();
    
    request(app)
      .get(`/todos/${randomId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
  
  
  it('should return 404 for invalid Object Id', done => {
    request(app)
      .get('/todos/123')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  }); 
});


describe('DELETE /todos/:id', () => {
  
  it('should delete todo doc based on id', done => {
    var idToDelete = todos[0]._id.toHexString();
    
    request(app)
      .delete(`/todos/${idToDelete}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(idToDelete);
      })
      .end((err, res) => {
        if (err) {
          return done();
        }
        
        Todo.findById(idToDelete).then(todo => {
          expect(todo).toNotExist();
          done();
        }).catch(err => done(err));
      });
  });
  
  
  it('should not delete todo by other user', done => {
    var idToDelete = todos[0]._id.toHexString();
    
    request(app)
      .delete(`/todos/${idToDelete}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done();
        }
        
        Todo.findById(idToDelete).then(todo => {
          expect(todo).toExist();
          done();
        }).catch(err => done(err));
      });
  });
  
  
  it('should return 404 if todo not found', done => {
    const randomId = new ObjectID().toHexString();
    
    request(app)
      .delete(`/todos/${randomId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
  
  
  it('should return 404 for invalid Object Id', done => {
    request(app)
      .delete('/todos/123')
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
});


describe('PATCH /todos/:id', () => {
  
  it('should update completed status to true', done => {
    var idToUpdate = todos[0]._id.toHexString();
    
    request(app)
      .patch(`/todos/${idToUpdate}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({completed: true, text: 'Updated text'})
      .expect(200)
      .expect(res => {
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.text).toBe('Updated text');
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });
  
  
  it('should not update todo created by other user', done => {
    var idToUpdate = todos[0]._id.toHexString();
    
    request(app)
      .patch(`/todos/${idToUpdate}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({completed: true, text: 'Updated text'})
      .expect(404)
      .end(done);
  });
  
  
  it('should update completed status to false', done => {
    var idToUpdate = todos[1]._id.toHexString();
    
    request(app)
      .patch(`/todos/${idToUpdate}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({completed: false, text: 'Updated text'})
      .expect(200)
      .expect(res => {
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.text).toBe('Updated text');
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});


describe('GET /users/me', () => {
  
  it('should return user if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  
  
  it('should return 404 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});


describe('POST /users', () => {
  
  it('should create a user', (done) => {
    var email = 'example@example.com';
    var password = '123mnb!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        User.findOne({email}).then(user => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        }).catch(err => done(err));
      });
  });


  it('should return validation errors if request invalid', done => {
    request(app)
      .post('/users')
      .send({
        email: 'and',
        password: '123'
      })
      .expect(400)
      .end(done);
  });


  it('should not create user if email in use', done => {
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: 'Password123!'
      })
      .expect(400)
      .end(done);
  });
});


describe('POST /users/login', () => {
  it('should login user and return auth token', done => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then(user => {
          expect(user.tokens[1]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', done => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then(user => {
          expect(user.tokens.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('DELETE /users/me/token', () => {
  
  it('should remove auth token on logout', done => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then(user => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  }); 
});
