const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


// Add some seed data for tests
const todosExample = [
  {_id: new ObjectID(), text: 'First test todo'},
  {_id: new ObjectID(), text: 'Second test todo'}
];


beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todosExample);
  }).then(() => done());
});


describe('POST /todos', () => {
  
  it('should create a new todo', done => {
    var text = 'Test todo text1';
    
    request(app)
      .post('/todos')
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
          console.log('todos', todos);
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(err => done(err));
      });
  });
  
  
  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
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
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});


describe('GET /todos/:id', () => {
    
  it('should get todo doc based on id', done => {
    request(app)
      .get(`/todos/${todosExample[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todosExample[0].text);
      })
      .end(done);
  });
  
  
  it('should return 404 if todo not found', done => {
    const randomId = new ObjectID().toHexString();
    
    request(app)
      .get(`/todos/${randomId}`)
      .expect(404)
      .end(done);
  });
  
  
  it('should return 404 for invalid Object Id', done => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
  
});
