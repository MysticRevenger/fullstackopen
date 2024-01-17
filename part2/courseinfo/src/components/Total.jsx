
function Total(props) {
let total = props.parts.reduce((sum, current) => sum + current.exercises, 0)

  return (
    <div>
      <p>
        There are total:{" "}
        <u>
          <b>{total}</b>
        </u>{" "}
        exerciese
      </p>
    </div>
  );
}

export default Total;
