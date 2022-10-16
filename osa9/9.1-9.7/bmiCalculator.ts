interface bmiValues {
    value1: number,
    value2: number
}

const parseArguments = (args: Array<string>): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const calculateBmi = (height: number, mass: number) => {
    const heightMeters = height / 100
    const bmi = mass / heightMeters / heightMeters

    if (bmi >= 18.5 && bmi <= 24.9) {
        console.log("Normal (healthy weight)")
    } else if (bmi > 24.9) {
        console.log("Overweight (unhealthy weight)")
    } else {
        console.log("Underweight (unhealthy weight)")
    }
}

try {
    const { value1, value2 } = parseArguments(process.argv)
    calculateBmi(value1, value2)
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}