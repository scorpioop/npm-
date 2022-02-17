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
export default function ChangeButton() {
  const [status, setStatus] = useState("登入");
  return (
    <div
      className="button-container"
      onClick={() => {
        setStatus(status==='登入'?'登出':'登入')
      }}
    >
      <span>{status}</span>
    </div>
  );
}
