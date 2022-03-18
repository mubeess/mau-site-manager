import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import Nav from './components/Nav';

function App() {
  const [currIndex,setCurr]=useState(0)
  return (
    <div className='mainAppp'>
      <Nav/>
      <div className='buttonsMenu'>
        <Button onClick={()=>{
          setCurr(0)
        }} type={currIndex==0?'primary':'default'}>Home Page</Button>
        <Button onClick={()=>{
          setCurr(1)
        }} type={currIndex==1?'primary':'default'}>Faculty</Button>
        <Button onClick={()=>{
          setCurr(2)
        }} type={currIndex==2?'primary':'default'}>Departments</Button>
      </div>
      {
        currIndex==0&&(
          <Home/>
        )
      }
   
    </div>
   
  );
}

export default App;
