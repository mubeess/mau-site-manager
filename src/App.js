import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import Nav from './components/Nav';
import Faculty from './components/Faculty';
import Department from './components/Department';
import Login from './components/Login';
import Users from './components/Users';
import Profile from './components/Profile';

function App() {
  const [currIndex,setCurr]=useState(0)
  const [isLogged,setIslogged]=useState(true)
  const [isloading,setLoading]=useState(true)
  useEffect(()=>{
  const user=window.sessionStorage.getItem('mau-user')
  if(user==null){
  setIslogged(false)
  setLoading(false)
  console.log(user)
  }else{
    setIslogged(true)
    setLoading(false)
    console.log(user)
  }
  setLoading(false)
  },[])
  const setIs=()=>{
    setIslogged(true)
  }
  return (
    <>
    {
      !isloading&&
       isLogged==true?(
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
            <Button onClick={()=>{
          setCurr(3)
        }} type={currIndex==3?'primary':'default'}>Users</Button>
            <Button onClick={()=>{
          setCurr(4)
        }} type={currIndex==4?'primary':'default'}>Profile</Button>
      </div>
      {
        currIndex==0&&(
          <Home/>
        )
      }
      {
        currIndex==1&&(
          <Faculty/>
        )
      }
      {
        currIndex==2&&(
          <Department/>
        )
      }
      {
        currIndex==3&&(
          <Users/>
        )
      }
      {
        currIndex==4&&(
          <Profile/>
        )
      }
    </div>
       ):
       (
        <Login setLoading={setLoading} setIslogged={setIs}/>
       )
    }
    

   
    {
      isloading&&(
        <div className='loadingPage'>
          <img src={require('./assets/mau.png')} alt='mau-logo'/>
        </div>
      )
    }
   </>
  );
}

export default App;
