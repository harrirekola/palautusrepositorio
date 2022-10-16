const calculateBmi = (height: number, mass: number): string => {
    const heightMeters = height / 100
    const bmi = mass / heightMeters / heightMeters

    if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal (healthy weight)"
    } else if (bmi > 24.9) {
        return "Overweight (unhealthy weight)"
    } else {
        return "Underweight (unhealthy weight)"
    }
}

console.log(calculateBmi(180, 74))