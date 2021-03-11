import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect,useState } from 'react'
import { Stage, Layer,Rect, Text } from 'react-konva';


function AddRect(props){
 const handleClick = (e) => {
    // logs clicked Konva.Circle instance
    let numbers=[...props.numbers]
    if (numbers[props.number+1]){
      const temp=numbers[props.number+1]
      temp.push(0)
      console.log(temp)


  }
  else{
    console.log('yes')

    numbers.push([numbers.length])

    const temp=numbers[props.number]
    props.addRectangle(numbers);
  }
  }

  

  return(
      <>
      <Layer>
        
        <Rect
          x={parseInt(props.x)}
          y={parseInt(props.y)}
          width={200}
          height={100}
          fill={props.color}
          shadowBlur={5}
         onClick={handleClick}/>
      </Layer>
      <Layer>
      <Text text={props.text+props.number} fontSize={15} x={parseInt(props.x)+10} y={parseInt(props.y)+10} fill="black"/>
      </Layer>
      </>
    )


}


function App() {
const [numbers,setNumbers] = useState([[0]])
const listItems = numbers.map((number,index) => {
  const a=()=><AddRect key={index} number={index} x='100' y={50*number[0]} text="Rect" addRectangle={setNumbers} numbers={numbers} color="red"/>
  const b=()=><>
    <AddRect key={index} number={index} x='100' y={50*number[0]} text="Rect" addRectangle={setNumbers} numbers={numbers} color="yellow"/>
    <AddRect key={index.toString()+'_a'} number={index} x='150' y={50*number[0]} text="Rect" addRectangle={setNumbers} numbers={numbers} color="yellow"/>
    </>
  if (number.length==1){
    return a()
  }
  else{
    return b()
  }
}



);


return (
   <Stage width={window.innerWidth} height={window.innerHeight*3}>
      {listItems}
    </Stage>
  )

}

export default App;
