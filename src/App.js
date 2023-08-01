import './App.css';
import BookingForm from './Components/BookingForm';
import { useState } from 'react';

function App() {
  const[facility,setFacility] = useState("");

  const changeFacility=(name)=>{
    setFacility(name);
  }
  console.log(facility)
  return (
    <div className="App">
      <div>
        <button 
        className='App-button'
        style={facility==="Clubhouse"?{backgroundColor:"green"}:{backgroundColor:"gray"}} 
        value="Clubhouse" 
        onClick={(e)=>changeFacility(e.target.value)}
        >Book Club House</button>
        <button 
        className='App-button'
        style={facility==="Tennis Court"?{backgroundColor:"green"}:{backgroundColor:"gray"}}
        value="Tennis Court" 
        onClick={(e)=>changeFacility(e.target.value)}
        >Book Tennis Court</button>
      </div>
      {
        facility?<BookingForm
        facility={facility}
         />
         :null
      }
      
    </div>
  );
}

export default App;
