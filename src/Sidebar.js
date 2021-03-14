import './Sidebar.css';



export var SMS_TEXT={}
export function Sidebar(props){
  
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