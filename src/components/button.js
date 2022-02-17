import React, { useState, Component } from "react";
import "./change_button.css";

// class ChangeButton extends Component{
//     constructor(props){
//       super(props);
//       this.state={
//         btnTxt:'Login'
//       }
//     }

//     render(){
//       const {btnTxt}=this.state;
//       return(
//         <div className='button-container' onClick={()=>{ this.setState({btnTxt:btnTxt==='Login'?'Logout':'Login'})}}>
//           <span>{btnTxt}</span>
//         </div>
//       )
//     }
// }

// export default ChangeButton;
export default function ChangeButton(props) {
  const start=props.startText
  const end= props.endText
  const [status, setStatus] = useState(start);
  return (
    <div
      className="button-container"
      onClick={() => {
        setStatus(status===start?end:start)
      }}
    >
      <span>{status}</span>
    </div>
  );
}
