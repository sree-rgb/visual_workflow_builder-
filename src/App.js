import logo from './logo.svg';
import './App.css';
import React, {useState } from 'react'
import { Stage, Layer,Rect, Text, Line,Image } from 'react-konva';
import useImage from 'use-image'

var SCALE=1
var SMS_NO=0
var CURRENT_SMS_NO=0
var SMS_TEXT={}
const PlusImage = ({x,y,handleClick}) => {
  const [image] = useImage('plus.png');
  return <Image image={image} x={x} y={y} onClick={handleClick}/>;
};

class Rectangle2 extends React.Component{
  constructor(props){
    super(props)
    this.state={x:props.x,y:props.y,text:'Rectangle'+props.number.toString(),color:'Red',newxy:props.newxy,number:props.number,childs:0}
    this.handleClick = this.handleClick.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
  }
  smsChanger(smsno){
    const sms=document.getElementById('smstext')
    if (SMS_TEXT[smsno]==undefined){
      sms.value=''
    
    }
  else{
    sms.value=SMS_TEXT[smsno]
  }
  }
  handleClick(){

    this.props.setBoxType(this.props.type)
    if (this.props.type=='action'){
      CURRENT_SMS_NO=this.state.sms_no
      this.smsChanger(this.state.sms_no)
    }

    }


  handleClickPlus(){
  if (this.state.childs<1){
    this.state.newxy(this.state.x,this.state.y+140,this.state.number+1,'action','test')
    this.setState({childs:this.state.childs+1})
  }
  }
  drawLine(){
    if (this.state.childs<1) {
      return null
      }
      return(    
        <Line
          x={this.state.x}
          y={this.state.y+100}
          points={[100, 0,100,40]}
          closed
          stroke="black"
        />
        )
    }
    

  render(){
    return(
     <>
      
        
        <Rect
          x={parseInt(this.state.x)}
          y={parseInt(this.state.y)}
          width={200}
          height={100}
          fill={this.state.color}
          shadowBlur={5}
         onClick={this.handleClick}/>

      <Text text={this.state.text} fontSize={15} x={parseInt(this.state.x)+50} y={parseInt(this.state.y)+40} fill="white" onClick={this.handleClick}/>
        {this.drawLine()}
      <PlusImage x={parseInt(this.state.x)+88} y={parseInt(this.state.y)+95} handleClick={this.handleClickPlus}/>
      </>
      )
    }
}
class Contacts extends Rectangle2{
  constructor(props){
    super(props)
    
  }
    componentDidMount() { 
      this.setState({color:'grey'})
      this.setState({text:'Selected Contacts'})
      
     }
}
class Action extends Rectangle2{
  constructor(props){
    super(props)
    this.state={sms_no:SMS_NO,...this.state}
    
  }
    componentDidMount() { 

      this.setState({color:'green'})
      this.setState({text:'Send SMS '+SMS_NO})
      SMS_NO+=1
     }
}


function Sidebar(props){



  
  const smsChange=(e)=>{
      SMS_TEXT[CURRENT_SMS_NO]=e.target.value
  
    }
    
    

  const contents=()=>{
    if (props.type=='start'){
      return (
      <div>
      <h3>Select Contacts</h3>
        <select id="contacts" name="contacts" size="4" multiple>
          <option value="contact1" selected>Contact 1</option>
          <option value="contact2" selected>Contact 2</option>
          <option value="contact3" selected>Contact 3</option>
          <option value="contact4" selected>Contact 4</option>
        </select>
      </div>
      )
    }
    else{
        return (
        <div>
            <h3> SMS {CURRENT_SMS_NO}</h3>
          <form>
            <textarea  placeholder='sms_text' id='smstext' rows="6" maxLength="160" onChange={smsChange}  value={SMS_TEXT[CURRENT_SMS_NO]}></textarea>
          </form>
        </div>
      )
    }
    }

  
  return (
  <div className='sidebar'>
     {contents()}
  </div>
  )
}



function Temp(){
  const [modal_closed,setModalClose]=useState(true)

  const Modal=(props)=>{
    if (modal_closed){
      return null
    }
    const closeModal=()=>{
      setModalClose(true)
    }


    return (
      <div className='modal'>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={ closeModal} className='closebutton'>X</button>
      </div>
      )
  }

   const newxy=(x,y,index,type,...theArgs)=>{
    const tempFlowchart=flowchart2
     setModalClose(false)
     tempFlowchart.push({x:x, y:y,number:index,newxy:newxy,type:type})
     updateFlowchart2([...flowchart2])
    
  }


  const [flowchart2,updateFlowchart2]=useState([{x:1000, y:10,number:0,newxy:newxy}])
  const [boxType,setBoxType]=useState('start')
  const rectangles = flowchart2.map((item,index)=> {
    if (index==0){
      return <Contacts x={item.x} y={item.y} number={index} newxy={newxy} type='start' setBoxType={setBoxType}/>
    }
    if (item.type == 'action'){
      return <Action x={item.x} y={item.y} number={index} newxy={newxy} type={item.type} setBoxType={setBoxType}/>
    }
    else{
      return <Rectangle2 x={item.x} y={item.y} number={index} newxy={newxy} type={item.type} setBoxType={setBoxType}/>
    }
  })

return(
  <>

  <Sidebar  type={boxType}/>
  <Stage width={window.innerWidth} height={window.innerHeight*3} className='stage'>
  <Layer>
    {rectangles}
  </Layer>
  </Stage>
  <Modal title="Action" content="Create new action to send sms?"/>
  </>
)
}

function App() {
  return (
  <Temp/>
  )

 }

export default App;
