
import Part from './Part'

function Content(props) {
  return (
    <div>
       {props.parts.map(part => <Part key={part.name} part={part} />)}
    </div>
  )
}

export default Content