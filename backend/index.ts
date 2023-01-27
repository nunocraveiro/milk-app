import express from 'express';
import cors from 'cors';
import milkData from './data.json';
 
const app: express.Application = express();

app.use(cors());
app.use(express.json());

const port: number = 3001;
 
app.get('/', (_req, _res) => {
    _res.json(milkData);
});

app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});