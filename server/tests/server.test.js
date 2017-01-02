const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


// Add some seed data for tests, default completed is false
const todosExample = [
  {_id: new ObjectID(), 
   text: 'First test todo'},
  {_id: new ObjectID(), 
    text: 'Second test todo', 
    completed: true, 
    completedAd: 333}
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


describe('DELETE /todos/:id', () => {
  
  it('delete todo doc based on id', done => {
    var idToDelete = todosExample[0]._id.toHexString();
    
    request(app)
      .delete(`/todos/${idToDelete}`)
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
  
  
  it('should return 404 if todo not found', done => {
    const randomId = new ObjectID().toHexString();
    
    request(app)
      .delete(`/todos/${randomId}`)
      .expect(404)
      .end(done);
  });
  
  
  it('should return 404 for invalid Object Id', done => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
  
});


describe('PATCH /todos/:id', () => {
  
  it('update completed status to true', done => {
    var idToUpdate = todosExample[0]._id.toHexString();
    
    request(app)
      .patch(`/todos/${idToUpdate}`)
      .send({completed: true, text: 'Updated text'})
      .expect(200)
      .expect(res => {
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.text).toBe('Updated text');
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });
  
  
  it('update completed status to false', done => {
    var idToUpdate = todosExample[1]._id.toHexString();
    
    request(app)
      .patch(`/todos/${idToUpdate}`)
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
