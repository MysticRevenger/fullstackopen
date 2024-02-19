import express from "express"
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors"
const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

morgan.token('content', (request) =>
    request.method === 'POST' && request.body.name
        ? JSON.stringify(request.body)
        : null
)

// add this middleware to read post request body
app.use(express.text());

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/api/persons", (req, res) => {
    res.status(200).json(persons)
})

app.get("/info", (req, res) => {
    const currentTime = new Date().toString()

    res.status(200).send(
        `<div>
            <p>Phonebook has info for ${persons.length} people</p>
        </div>
        <div>
            <p>${currentTime}</p>
        </div>
        `
    )
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    res.status(200).json(person)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id === id)
    res.status(204).end()
})

function generateId() {
    const min = 100000; // Minimum value for the ID range
    const max = 999999; // Maximum value for the ID range
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomId;
}

app.post("/api/persons", (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body.number || !body.name) {
        return res.status(400).json({
            error: "content-missing"
        });
    }

    const check = persons.find(person => person.name === body.name);
    if (check) {
        return res.status(400).json({
            error: "person existed"
        });
    }

    const person = {
        number: body.number,
        name: body.name,
        id: generateId()
    };
    persons = persons.concat(person);
    res.status(200).json(person);
});

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})

