import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    const bmi = calculateBmi(height, weight)
    
    try {
        res.json({
            height, weight, bmi
        })
    } catch (error) {
        res.json({ error: 'malformatted parameters'})
    }
    
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running non port ${PORT}`)
})