// const http = require('http');

// let notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true,
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false,
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true,
//   },
// ];
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' });
//   response.end(JSON.stringify(notes));
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
const reqLogger = (req, res, next) => {
  console.log('method', req.method);
  console.log(req.path);
  console.log(req.body);
  console.log('-----------------------');
  next();
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(reqLogger);
// app.use(morgan());

// let notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true,
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false,
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true,
//   },
// ];
// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>');
// });

// app.get('/api/notes', (request, response) => {
//   response.json(notes);
// });

// app.post('/api/notes', (request, response) => {
//   const note = request.body;
//   if (!note.content) {
//     return response.status(400).json({
//       error: 'content is missing',
//     });
//   }

//   const genrateMaxId = () =>
//     notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;

//   note.id = genrateMaxId();
//   const maxID = (note.id = maxID + 1);
//   const newNote = {
//     id: note.id,
//     content: note.content,
//     important: Boolean(note.important) || false,
//   };
//   notes.concat(newNote);
//   response.json(newNote);
// });

// app.get('/api/notes/:id', (request, response) => {
//   const id = request.params.id;
//   const note = notes.find((note) => note.id === Number(id));
//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end();
//   }
// });

// app.delete('/api/notes/:id', (request, response) => {
//   const id = request.params.id;
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// });

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', function (req, res) {
  res.json(persons);
});

app.get('/api/info', function (req, res) {
  const numberOfRecords = persons.length;
  const time = new Date().toString();

  res.send(
    `<div>
      <p>There are ${numberOfRecords} records in phone book</p>
      <h3>${time}</h3>
    </div>`
  );
});

app.get('/api/persons/:id', function (req, res) {
  const id = req.params.id;
  const record = persons.find((person) => person.id === id);
  if (!record) {
    return res.status(400).json({
      error: `person with ${id} does not exist`,
    });
  }

  res.json(record);
});

app.delete('/api/persons/:id', function (req, res) {
  const id = req.params.id;
  const record = persons.find((person) => person.id === id);
  if (!record) {
    return res.status(400).json({
      error: `person with ${id} does not exist`,
    });
  }
  persons = persons.filter((person) => person.id !== id);
  res.json({
    message: `record with ${id} is deleted sucessfully`,
  });
});

app.put('/api/persons/:id', function (req, res) {
  const id = req.params.id;
  const record = req.body;
  if (!persons.find((per) => per.id === id)) {
    return res.status(400).json({
      error: `person with ${id} does not exist`,
    });
  }

  persons.filter((rec) => rec.id !== id);
  const newRecord = {
    id,
    name: record.name,
    number: record.number,
  };
  person.concate(newRecord);

  res.json({
    messaage: 'record updated successfully',
  });
});

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const personNameExists = (name) => {
  const found = persons.find((rec) => {
    console.log(name, rec.name);
    return rec.name.trim().toLowerCase() === name.trim().toLowerCase();
  });
  return found;
};

app.post('/api/persons', function (req, res) {
  const record = req.body;
  const id = getRandomInt(1000);
  const perExist = personNameExists(record.name);
  //console.log(perExist);
  if (perExist) {
    return res.json({
      message: `person with name ${record.name} already exists`,
    });
  }
  const newRecord = {
    id,
    name: record.name,
    number: record.number,
  };
  persons = persons.concat(newRecord);

  res.json(persons);
});

app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
