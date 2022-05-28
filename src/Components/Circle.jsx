import randColor from '../FUNCTIONS/randColor'

function Circle({ ref1, ref2, ref3 }) {
  return (
    <div>
      <div
        ref={ref1}
        className='circle'
        style={{ backgroundColor: randColor() }}
      ></div>
      <div
        ref={ref2}
        className='circle'
        style={{ backgroundColor: randColor() }}
      ></div>
      <div
        ref={ref3}
        className='circle'
        style={{ backgroundColor: randColor() }}
      ></div>
    </div>
  )
}

export default Circle
