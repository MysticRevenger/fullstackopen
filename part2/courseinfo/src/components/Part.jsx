

function Part(props) {
  return (
    <div>
        <h3>{props.part.name}</h3>
        <p>There are <u><b>{props.part.exercises} exercises in this part of course</b></u></p>
    </div>
  )
}

export default Part