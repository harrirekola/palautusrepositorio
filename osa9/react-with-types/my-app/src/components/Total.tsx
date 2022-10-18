interface ContentProps {
    name: string,
    exerciseCount: number
}

const Total = ({ courseParts }: {courseParts: Array<ContentProps>}) => (
    <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
)

export default Total