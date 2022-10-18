import { CoursePart } from "../types";

const assertNever = (value:never) :never =>{
    throw new Error(
      `Unhandled discriminated union menber: ${JSON.stringify(value)}`
    );
  };

const Part = ({ courseParts }: {courseParts: Array<CoursePart>}) => {
        return (
            <>
            {
            courseParts.map(part => {
                switch(part.type) {
                    case "normal": {
                        return (
                            <div>
                                <h2>{part.name} {part.exerciseCount}</h2>
                                <p>{part.description}</p>
                            </div>
                        )
                    }
                    case "groupProject": {
                        return (
                            <div>
                                <h2>{part.name} {part.exerciseCount}</h2>
                                <p>Project exercises {part.groupProjectCount}</p>
                            </div>
                        )
                    }
                    case "submission": {
                        return (
                            <div>
                                <h2>{part.name} {part.exerciseCount}</h2>
                                <p>{part.description}</p>
                                <p>{part.exerciseSubmissionLink}</p>
                            </div>
                        )
                    }
                    case "special": {
                        return (
                            <div>
                                <h2>{part.name} {part.exerciseCount}</h2>
                                <p>{part.description}</p>
                                <b>{part.requirements.join(", ")}</b>
                            </div>
                        )
                    }
                    default: {
                        return assertNever(part)
                    }
                }
            })
        }
        </>
        )
}

export default Part;