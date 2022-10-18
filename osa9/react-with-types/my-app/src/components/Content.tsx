import Part from './Part'
import { CoursePart } from "../types";

const Content = ({ courseParts }: {courseParts: Array<CoursePart>}):JSX.Element => {
    return (
        <div>
            <Part courseParts={courseParts} />
        </div>
    )
}

export default Content