interface Results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number

}

const calculateExercises = (hours: Array<number>, targetValue: number): Results => {

    const sum = hours.reduce((partialSum, a) => partialSum + a, 0)
    let ratingString = ''

    const rating = () => {
        if (sum > 12) {
            ratingString = 'Great'
            return 3
        } else if (sum < 5) {
            ratingString = 'Not so good'
            return 1
        } else {
            ratingString = 'Average'
            return 2
        }
    }

    const ratingValue = rating()

    const targetSuccess = () => {
        if (ratingValue >= targetValue) {
            return true
        } else {
            return false
        }
    }

    return {
        periodLength: hours.length,
        trainingDays: hours.filter(x => x > 0).length,
        success: targetSuccess(),
        rating: ratingValue,
        ratingDescription: ratingString,
        target: targetValue,
        average: sum / hours.length
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))