export {};


interface Results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number

}


interface Values {
    value1: Array<number>,
    value2: number
}

const parseArguments = (args: Array<string>): Values => {
    if (args.length < 2) throw new Error('Not enough arguments');

    const hours = args.slice(3);
    const allArgs = args.slice(2).map(Number);

    if (!allArgs.some(isNaN)) {
        return {
            value1: hours.map(Number),
            value2: Number(args[2])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateExercises = (hours: Array<number>, targetValue: number): Results => {

    const sum = hours.reduce((partialSum, a) => partialSum + a, 0);
    let ratingString = '';

    const rating = () => {
        if (sum > 12) {
            ratingString = 'Great';
            return 3;
        } else if (sum < 5) {
            ratingString = 'Not so good';
            return 1;
        } else {
            ratingString = 'Average';
            return 2;
        }
    };

    const ratingValue = rating();

    const targetSuccess = () => {
        if (ratingValue >= targetValue) {
            return true;
        } else {
            return false;
        }
    };

    return{
        periodLength: hours.length,
        trainingDays: hours.filter(x => x > 0).length,
        success: targetSuccess(),
        rating: ratingValue,
        ratingDescription: ratingString,
        target: targetValue,
        average: sum / hours.length
    };
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    calculateExercises(value1, value2);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
  console.log(errorMessage);
}

export default calculateExercises;