import './App.css';
import React, {useState} from 'react'
import { Stage, Layer,Rect, Text, Line,Image } from 'react-konva';
import useImage from 'use-image'

var SMS_NO=0

var SMS_TEXT={}
const PlusImage = ({x,y,handleClick}) => {
  const [image] = useImage('plus.png');
  return <Image image={image} x={x} y={y} onClick={handleClick}/>;
};

class Rectangle2 extends React.Component{
  constructor(props){
    super(props)
    this.state={x:props.x,y:props.y,text:'Rectangle'+props.number.toString(),color:'Red',newxy:props.newxy,number:props.number,childs:0,text_color:'white'}
    this.handleClick = this.handleClick.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
    this.incrementChild = this.incrementChild.bind(this);
    this.dragMove = this.dragMove.bind(this);
  }

  
  handleClick(){

    this.props.setBoxType(this.props.type)


    }


  handleClickPlus(){
  if (this.state.childs<1){
    this.state.newxy(this.state.x,this.state.y+140,this.state.number+1,'action',this.incrementChild)
    

  }
  }
  incrementChild(){
    this.setState({childs:this.state.childs+1})
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
          draggable
          closed
          stroke="black"
        />
        )
    }
    plusImage(){
      return (<PlusImage x={parseInt(this.state.x)+88} y={parseInt(this.state.y)+95} handleClick={this.handleClickPlus}/>)

    }
    dragMove(e){
      this.setState({x:e.target.x(),y:e.target.y()})
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
         onClick={this.handleClick}
         draggable
         onDragMove={this.dragMove}
         />

      <Text text={this.state.text}  fontSize={15} x={parseInt(this.state.x)+50} y={parseInt(this.state.y)+40} fill={this.state.text_color} onClick={this.handleClick}/>
        {this.drawLine()}
        {this.plusImage()}
      
      </>
      )
    }
}
class Contacts extends Rectangle2{
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
      super.handleClick()
      if (this.props.type=='action'){
      
      this.props.setSmsNo(this.state.sms_no)

      
      this.smsChanger(this.state.sms_no)
    }
  }
}
class Complete extends Rectangle2{
 
    componentDidMount() { 
      this.setState({text:'Marked Complete'})
      this.setState({color:'darkgrey'})
      this.setState({text:'Marked Complete'})
     }
  plusImage(){
    return null
  }
}
class Delay extends Rectangle2{
 
    componentDidMount() { 
      let delay_type=this.props.delay_type
      if (parseInt(this.props.duration)===1){
        delay_type= (this.props.delay_type === 'days') ? 'day':'hour'
      }
      
      this.setState({text:'Wait for '+this.props.duration+' '+delay_type})
      
      this.setState({color:'Yellow'})
      this.setState({text_color:'black'})
     }
}
class Condition extends Rectangle2{
      constructor(props){
        super(props)
        this.yesHandleClickPlus = this.yesHandleClickPlus.bind(this);
        this.noHandleClickPlus = this.noHandleClickPlus.bind(this);
        this.yesLine = this.yesLine.bind(this);
        this.noLine = this.noLine.bind(this);
    
        }
 
      componentDidMount() { 
      this.setState({text: this.props.condition_type+' SMS'})
      
      this.setState({color:'Blue'})
      this.setState({yesblock:false,noblock:false})

     }
      yesHandleClickPlus(){
        if ((this.state.childs<2) &&  (!this.state.yesblock)){
          this.state.newxy(this.state.x-150,this.state.y+140,this.state.number+1,'action',this.incrementChild)
          this.setState({'yesblock':true})
          }
      }
      noHandleClickPlus(){
        if ((this.state.childs<2) &&  (!this.state.noblock)){
          this.state.newxy(this.state.x+90,this.state.y+140,this.state.number+1,'action',this.incrementChild)
          this.setState({'noblock':true})
          }
      }
      yesLine(){
        if (this.state.yesblock)
        {
        return(
            <Line
          x={this.state.x+15}
          y={this.state.y+100}
          points={[20, 0,10,40]}
          draggable
          closed
          stroke="black"
        />   
        )
      }
      return null

      }

      noLine(){
        if (this.state.noblock)
        {
        return(
          <Line
            x={this.state.x+150}
            y={this.state.y+100}
            points={[20, 0,35,40]}
            closed
            draggable
            stroke="black"
          />
        )
      }
      return null

      }

      drawLine(){
    if (this.state.childs<1) {
      return null
      }
      return(
        <>    
        {this.yesLine()}
        {this.noLine()}

        </>
        )
    }
    plusImage(){
      return (<>
      <PlusImage x={parseInt(this.state.x)+20} y={parseInt(this.state.y)+95} handleClick={this.yesHandleClickPlus}/>
      <PlusImage x={parseInt(this.state.x)+158} y={parseInt(this.state.y)+95} handleClick={this.noHandleClickPlus}/>
      </>
      )


    }
}
function Sidebar(props){
  
  const smsChange=(e)=>{
      SMS_TEXT[props.current_sms_no]=e.target.value
  
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
    if (props.type=="action"){
        return (
        <div>
            <h3> SMS {props.current_sms_no}</h3>
          <form>
            <textarea  placeholder='sms_text' id='smstext' rows="6" maxLength="160" onChange={smsChange}  value={SMS_TEXT[props.current_sms_no]}></textarea>
          </form>
        </div>
      )
    }
    if (props.type=="delay"){
      return (<h3>Delay</h3>)
    }
    else{
      return (<h3> Marked Complete</h3>)
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
  const [action_trigger,setActionTrigger]=useState({})
  const [delay,setDelay]=useState({'type':'days','duration':1})
  const [condition,setCondition]=useState({type:'Read'})
    const closeModal=()=>{
      setModalClose(true)
    }
    

  const actionYes=(type)=>{
    const tempFlowchart2=flowchart2
    const temp_action=(action_trigger[0])
    action_trigger[1]()
    temp_action['type']=type
    if (type === 'delay'){
      temp_action['delay_type']=delay['type']
      temp_action['duration']=delay['duration']
    }
    if (type === 'condition'){
      temp_action['condition_type']=condition.type

    }
    tempFlowchart2.push(temp_action)
     
     
    updateFlowchart2([...flowchart2])
    
     closeModal()
  }
  const delayTypeChange=(e)=>{
    const tempdelay=delay
    tempdelay.type=e.target.value
    setDelay(tempdelay)
    
  }
  const delayNumberOnChange=(e)=>{
    const tempdelay=delay
    tempdelay.duration=e.target.value
    setDelay(tempdelay)
    
  }
 const conditionTypeChange=(e)=>{
    const tempcondition=condition
    tempcondition.type=e.target.value
    setCondition(tempcondition)
  }
  const askDelay = ()=>{
    return (
    <> 
      <br />
        <br />
        <p>Wait For?</p>
        <form>
          <input type="radio"  name="delay_type" value="days" onClick={delayTypeChange}/>
          <label hmtlFor="days">days</label>
          <input type="radio" name="delay_type" value="hours" onClick={delayTypeChange}/>
          <label htmlFor="hours">hours</label>
        <input type="number"  onChange={delayNumberOnChange}/>
        </form>
        <button onClick={()=>actionYes('delay')} className='actionyesbutton'>Wait</button>
         <br />
        <br />
         <h3>Or </h3>)
         </>)
  }
  const ConditionInput = ()=>{
    return(
        <>
          <br/>
          <br/>
          <p> Read or Click SMS?</p>
          <form>
          <input type="radio" name="condition" value="Read" onClick={conditionTypeChange}/>
          <label hmtFor="Read">Read</label>
          <input type="radio" name="condition" value="Click" onClick={conditionTypeChange}/>
          <label htmlFor="Click">Click</label>
          <br/>
           
        </form>
        <button onClick={()=>actionYes('condition')} className='actionyesbutton'>Condition</button>
          <br/>
          <br/>
        </>
      )
  }
  const Modal=(props)=>{
    if (modal_closed){
      return null
    }


    return (
      <div className='modal'>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={()=>actionYes('action')} className='actionyesbutton'>Yes</button>
        <br />
        <br />
        <h3>Or </h3>
          {askDelay()}
        <br />
        <br />
        {ConditionInput()}
        <p>Mark Complete?</p>
        <button onClick={()=>actionYes('complete')} className='actionyesbutton'>Complete</button>
        <button onClick={ closeModal} className='closebutton'>x</button>
      </div>
      )
  }

  
   const newxy=(x,y,index,type,incrementChild)=>{
      
     setModalClose(false)
     setActionTrigger([{x:x, y:y,number:index,newxy:newxy,childs:0,type:type},incrementChild])
    
  }


  const [flowchart2,updateFlowchart2]=useState([{x:1000, y:10,number:0,newxy:newxy,childs:0}])
  const [boxType,setBoxType]=useState('start')
  const [current_sms_no,setSmsNo]=useState(0)
  const rectangles = flowchart2.map((item,index)=> {
    if (index==0){
      return <Contacts x={item.x} y={item.y} number={index} newxy={newxy} type='start' setBoxType={setBoxType} childs={item.childs} setSmsNo={setSmsNo}/>
    }
    if (item.type == 'action'){
      return <Action x={item.x} y={item.y} number={index} newxy={newxy} type={item.type} setBoxType={setBoxType} childs={item.childs} setSmsNo={setSmsNo}/>
    }
    if (item.type == 'complete'){
      return <Complete x={item.x} y={item.y} number={index} newxy={newxy} type={item.type} setBoxType={setBoxType} childs={item.childs} />
    }
    if (item.type == 'delay'){
      return <Delay x={item.x} y={item.y} number={index} newxy={newxy} type={item.type} setBoxType={setBoxType} childs={item.childs} delay_type={item.delay_type} duration={item.duration}/>
    }
    if (item.type == 'condition'){
      return <Condition x={item.x} y={item.y} number={index} newxy={newxy} type={item.type} setBoxType={setBoxType} childs={item.childs} condition_type={item.condition_type}/>
    }
    else{
      return <Rectangle2 x={item.x} y={item.y} number={index} newxy={newxy} type={item.type} setBoxType={setBoxType} childs={item.childs} setSmsNo={setSmsNo}/>
    }
  })

return(
  <>
  
  <Sidebar  type={boxType} current_sms_no={current_sms_no}/>
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
