import { useState } from "react";


export const Button = ({ text, onChange }) => {
  return <button onClick={onChange}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
      )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let count =  good + neutral + bad
  let average = (good - bad) / count
  let positive = (good / count) * 100

  if (count === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={count} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </tbody>
    </table>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  

  const onChangeGood = () => setGood(good + 1)
  const onChangeNeutral = () => setNeutral(neutral + 1)
  const onChangeBad = () => setBad(bad + 1)

  return (
    <>
    <h1>Give feedback!</h1>
      <Button onChange={onChangeGood} text="good" />
      <Button onChange={onChangeNeutral} text="neutral"/>
      <Button onChange={onChangeBad} text="bad"/>
      <br />
      <br />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
