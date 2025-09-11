/*import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';*/
import './alert.css'
 
function AlertDismissible() {
  // const [show, setShow] = useState(true);
  const fn = ()=>{  
    setShow('')
  }
  return (
    
    //   <Alert show={show} variant="success">
    //     <Alert.Heading>My Alert</Alert.Heading>
    //     <p>
    //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
    //       lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
    //       fermentum.
    //     </p>
    //     <hr />
    //     <div className="d-flex justify-content-end">
    //       <Button onClick={() => setShow(false)} variant="outline-success">
    //         Close me
    //       </Button>
    //     </div>
    //   </Alert>
   <>
     <div className="msg">
       <span><button type="button" onClick={fn}>X</button></span>
      <h1>wellcome!</h1><br /><hr />
      <p>this is your first sesiion</p>
     </div>
    </>
  );
}

export default AlertDismissible;