
import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {

  const otp_value= 5;
  const [inputArr, setInputArr]= useState(
    new Array(otp_value).fill(''));

  const refArr= useRef([]);  //same as getElementById in DOM mkdel 
  
  const handleChange= (value, index)=>{ 
   if(isNaN(value)) return;

   //make a new array and copy prev arr to new arra
   const newArr= [...inputArr];    
   const newValue= value.trim()         //remove Whitespaces from both end of the inp string     
   newArr[index]= newValue.slice(-1);      //value only taking last input 
   setInputArr(newArr);

   newValue && refArr.current[index+1]?.focus();  //if 1st value is fill go to next value
  }

//to focus on 1st input element when page is render 1st timewe use useEffect
useEffect(()=>{
   refArr.current[0]?.focus();
},[])

//user press backspace in OTP-inputs field
const handleKeyPressed= (e, index)=>{

//if my input box is emty then only i want to move previus one  
  if(!e.target.value && e.key == 'Backspace'){  
    refArr.current[index - 1].focus();
  }
}

  return (
    <>
    <h2>Validate OTP</h2>

    {inputArr.map((input, index)=>{
      return(
       <input className='inp-fieled' type='text' 
       value={inputArr[index]} key={index}
       onChange={(e)=>handleChange(e.target.value, index)}
       ref={(input)=> (refArr.current[index]= input)}   //store 1st value of input
       onKeyDown={(e)=>handleKeyPressed(e,index)}   //when key pressed
       
       />
      );
    })}

    </>
  )
}

export default App
