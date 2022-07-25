const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ exercises }) => {
  return (
    <b>
      total of {exercises.reduce((partialSum, a) => partialSum + a.exercises, 0)} exercises
    </b>
  )
}

const Part = ({ name, exercises }) =>
  <p>{name} {exercises}</p>

const Content = ({ parts }) => {
  return (
      <div>
          {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)} 
      </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total exercises={course.parts} />
    </div>
  )
}

export default Course