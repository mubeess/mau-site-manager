import React, { useEffect, useState } from 'react'
import { message, Skeleton, Upload } from 'antd';
import { Avatar, Button,Input } from 'antd';
import {PlusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal';

export default function Home() {
    const [homeData,setHomeData]=useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [header,setHeadr]=useState('')
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [uploaOptions,setUploadOpt]=useState('')
    const [isloading,setLoading]=useState(true)
    const { TextArea }=Input

    const props = {
        name: 'profile_pic',
        action: `https://modibbo-adama.herokuapp.com/admin/upload-an-image?eventId=${uploaOptions}&eventName=mainEvents&activity=homepage`,
        headers: {
          authorization: 'authorization-text',
        },
        method:'put',
        beforeUpload(){
            const myObj={
                evnt:{
                    header:title,
                    subHeader:header,
                    description:desc
                },
                homeEventType:'mainEvents'
            }
            fetch('https://modibbo-adama.herokuapp.com/admin/create-home-event',{
                method:'PUT',
                headers:{
                  "Content-Type":'application/json'
                },
                body:JSON.stringify(myObj)
              })
              .then(res=>{
                  res.json()
                  .then(data=>{
                     setUploadOpt(data.newlyEvent.evntId)
                  })
              })
        }
        ,
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setHeadr('')
            setTitle('')
            setDesc('')
            loadData()
            handleCancel()
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        
      };

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    const loadData=()=>{
        setLoading(true)
        fetch('https://modibbo-adama.herokuapp.com/admin/get-home-event')
        .then(res => {
            res.json()
                .then(data => {
                    setLoading(false)
                    setHomeData(data.message)
                    console.log(data.message)
                })
        }).catch(err=>{
            setLoading(false)
        })
    }
    useEffect(() => {
      loadData()
    }, [])
    return (
        <div className='mainContainer'>
        <div className='nav'>
        <h4>MAU site manager</h4>
        <Avatar
        style={{
          backgroundColor:'#f9f9f9',
          verticalAlign: 'middle',
          color:'black',
          marginRight:20
        }}
        size="large"
      >
          U
      </Avatar>
        </div>
        
        <div className='mainCont'>
        <div className='heading'>
        <h1>Current Home Data</h1>
        <h1>Edit Data</h1>
        </div>
        
        <div className='homeCont'>
          {
              isloading&&(
                <Skeleton style={{
                    width:'80%',
                    margin:'auto'
                }} active avatar/>
              )
          }

         {
             !isloading&&
             homeData.length>0?homeData[0].mainEvents.map((rec,ind)=>(
                <div className='txt'>
                {rec.image?<img src={rec.image}/>:<h4>No Image Data</h4>}
                <h3>Sub Heading</h3>
               <Input style={{
                   marginTop:10,
                   width:'70%'
               }} placeholder={`${rec.subHeader}`}/>
                <h4>Title</h4>
                <Input style={{
                   marginTop:10,
                   width:'70%'
               }} placeholder={`${rec.header}`}/>
                <p>Description</p>
                <Input style={{
                   marginTop:10,
                   width:'70%',
                   marginBottom:10
               }} placeholder={`${rec.description}`}/>
            </div>
             )):(
                 <div>
                     <h1>Empty</h1>
                 </div>
             )


         }
        
    

         <div className='txt'>
         <PlusCircleOutlined onClick={()=>{
             showModal()
         }} className='myIcon'  style={{
             color:'blue',
             fontSize:40,
             cursor:'pointer'
                 }}/>
         </div>



        </div>
        </div>


        <Modal  title="Add Slider" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <Input onChange={(txt)=>{
           setHeadr(txt.target.value)
       }}  placeholder='Enter Sub-header'/>
       <Input onChange={(txt)=>{
           setTitle(txt.target.value)
       }} style={{marginTop:20}} placeholder='Enter Title'/>
       <TextArea onChange={(txt)=>{
           setDesc(txt.target.value)
       }} style={{marginTop:20,marginBottom:20}} placeholder='Enter Description'/>

<Upload  {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload an Image</Button>
</Upload>
      </Modal>

        </div>
    )
}
