import React from 'react'

function Part(props) {
  return (
    <div>
        <h2>{props.part.name}</h2>
        <p>There are <u><b>{props.part.exercises} exercises in this part of course</b></u></p>
    </div>
  )
}

export default Part