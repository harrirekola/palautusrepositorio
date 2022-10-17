import express from 'express';
import { calculateBmi } from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    
    try {
        res.json({
            height, weight, bmi
        });
    } catch (error) {
        res.json({ error: 'malformatted parameters'});
    }
    
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if(!req.body.target || !req.body.daily_exercises) {
        res.json({ error: 'parameters missing'});
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        res.json(calculateExercises(req.body.daily_exercises, req.body.target));
    } catch (error) {
        res.json({ error: 'malformatted parameters'});
    }
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});