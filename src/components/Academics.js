import { Select } from 'antd'
import React, { useState } from 'react'
import './acad.css'
export default function Academics({data}) {
    const {Option}=Select
    const [indUnit,setIndUnit]=useState([])
    const [activity,setActivity]=useState('')
  return (
    <div className='acad_cont'>
    <Select onChange={(value)=>{
                 if (value=='sec') {
                     return null
                 }
            const filtered=data.filter(dt=>dt.name==value)
            setIndUnit(filtered)
            setActivity(value)
                //  setLoading2(true)
                //  fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-faculty?facultyId=${value}`)
                //  .then(res => {
                //      res.json()
                //          .then(data => {
                //              setLoading2(false)
                //              setSinFac([data.message])
                //              console.log(data)
                             
                //          })
                //  }).catch(err=>{
                     
                //  })
                }} defaultValue='sec' style={{width:'80%',marginTop:30}}>
                <Option value="sec">Select Unit</Option>
                {
                    data.length>0&&(
                        data.map((fac,ind)=>(
                            <Option value={fac.name} key={fac.name}>{fac.name}</Option>
                        ))
                    )
                }
                
                </Select>
     



                <Select onChange={(value)=>{
                 if (value=='sec') {
                     return null
                 }
                //  setLoading2(true)
                //  fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-faculty?facultyId=${value}`)
                //  .then(res => {
                //      res.json()
                //          .then(data => {
                //              setLoading2(false)
                //              setSinFac([data.message])
                //              console.log(data)
                             
                //          })
                //  }).catch(err=>{
                     
                //  })
                }} defaultValue='sec' style={{width:'80%',marginTop:30}}>
                <Option value="sec">Select Sub-Unit</Option>
                {
                    indUnit.length>0&&(
                        indUnit[0].list.map((fac,ind)=>(
                            <Option value={fac.detail.id} key={fac.detail.name}>{fac.detail.name}</Option>
                        ))
                    )
                }
                
                </Select>
    </div>
  )
}
