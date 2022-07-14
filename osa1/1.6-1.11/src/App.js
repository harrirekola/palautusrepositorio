import { useState } from 'react'

const Header = ({ text }) => <div><h1>{text}</h1></div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Opinion = ({ increaseGood, increaseNeutral, increaseBad }) => {
  return (
    <div>
      <p>
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      </p>
    </div>
  )
}

const Average = ({ good, bad, allVotes }) => {
  return (
    (good + bad * -1) / allVotes 
  )
}

const Positive = ({ good, allVotes }) => {
  return (
    (100.0 * good / allVotes) + "%"
  )
}

const StatisticsLine = ({ text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>
  
)

const Statistics = ({ good, neutral, bad, allVotes}) => {
  const positive = <Positive good={good} allVotes={allVotes}/>
  const average = <Average good={good} bad={bad} allVotes={allVotes}/>
  
  if (allVotes == 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  } else {
    return(
  <table>
    <tbody>
      <StatisticsLine text='good' value={good}/>
      <StatisticsLine text='neutral' value={neutral}/>
      <StatisticsLine text='bad' value={bad}/>
      <StatisticsLine text='all' value={allVotes}/>
      <StatisticsLine text='average' value={average}/>
      <StatisticsLine text='positive' value={positive}/>
    </tbody>
  </table>
  )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allVotes, setAll] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
    setAll(allVotes + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setAll(allVotes + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
    setAll(allVotes + 1)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Opinion 
      increaseGood={increaseGood} 
      increaseNeutral={increaseNeutral} 
      increaseBad={increaseBad}/>
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} allVotes={allVotes}/>     
    </div>
  )
}

export default App