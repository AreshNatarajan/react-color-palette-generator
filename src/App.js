import React, { useState } from 'react';
import './App.css';
import { FaCopy } from 'react-icons/fa';
import { AiOutlineReload } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css'

const getRandomColor = () => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};

const App = () => {
  const [colors, setColors] = useState(generateColors());
  const [isOpen, setIsOpen] = useState(false)

  function generateColors() {
    return Array.from({ length: 10 }, () => ({
      hex: getRandomColor(),
    }));
  }

  const handleGenerateNewColors = () => {
    setColors(generateColors());
  };

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex).then(() => {
      setIsOpen(true)
      setTimeout(()=>{
        setIsOpen(false)
      },1000)
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };
  return (
    <>
    <div style={{display:!isOpen ? 'none' : 'flex'}} className=' mdl min-vh-100' >
      <h3 className='text-dark fs-3 copied w-md-25 w-50 rounded-2 h-25 bg-white d-flex align-items-center justify-content-center' >Color Copied</h3>
    </div>
    <div  className="App min-vh-100 d-flex flex-column align-items-center justify-content-center gap-3 bg-dark ">
      <h1 className='m-0 display-1 fw-2 text-white' >Random Color Palette</h1>
      <div className="palette">
        {colors.map((color) => (
          <div 
            key={color.hex} 
            className="color-box" 
            style={{ backgroundColor: color.hex }} 
            onClick={() => handleCopyColor(color.hex)}
          >
            <p className='m-0 d-flex align-items-center justify-content-center gap-2 ' >{color.hex} <span><FaCopy/></span></p>
          </div>
        ))} 
      </div>
      <button className='btn btn-primary fs-5 d-flex align-items-center p-2' onClick={handleGenerateNewColors}><AiOutlineReload/></button>
    </div>
    </>
   
  );
};

export default App;
