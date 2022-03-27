import React from 'react'
import Image from 'rc-image'
import { Form, Input, Upload, Button } from 'antd'
import './Profile.css'
import { RiEdit2Line } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Profile = () => {
    const [lastName,setLastName] = useState([])
    const [firstName,setFirstName] = useState([])
    const [email,setEmail] = useState([])
    const [speciality,setSpeciality] = useState([])
    const [phone,setPhone] = useState([])
    const [image,setImage] = useState([])
    useEffect(()=>{
        const token=localStorage.getItem('token')
        axios.get(`http://localhost:8000/api/employe/userProfil`,{headers: {"Authorization" : `Bearer ${token}`}}).then(response => {
            setEmail(response.data[0].email);
            setFirstName(response.data[0].firstName);
            setLastName(response.data[0].lastName);
            setPhone(response.data[0].phone);
            setSpeciality(response.data[0].speciality);
            setImage(response.data[0].photo);
        })
    },[])
    const upload = ({ fileList }) => {
    //     const token=localStorage.getItem('token')
    //     let data = new FormData();
    //     data.append('photo', fileList[0]);
        // let data={
        //     photo:fileList[0]
        // }
        // axios.post(`http://localhost:8000/api/employe/updatePhoto`,data,{headers: {"Authorization" : `Bearer ${token}`,
        // 'Content-Type': `multipart/form-data`}})
        // .then(response => {
        //     console.log(response.data);
        // });

        // console.log('fileList', fileList[0]);

        // you store them in state, so that you can make a http req with them later
        // this.setState({ fileList });
      };
  return (
    <div className="profile">
        <div>
        <Image
        className="img"
        src={image}
        />
        <Upload className="edit"
            
            action="http://localhost:3000/profile"
            listType="picture"
            accept=".png,.jpeg,.jpg"
            showUploadList={false}
            onChange={upload}
            beforeUpload={file => {}}
        >
         <Button  shape="circle" icon={<RiEdit2Line/>}></Button>
        </Upload>
        </div>
        <div className="profileForm">
        <Form
          layout="vertical"
          scrollToFirstError
        //   form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
            <Form.Item
                label="LastName"
                name="lastName"
            >
                <Input bordered={false} className="ii" placeholder={lastName}/>
            </Form.Item>

            <Form.Item
                label="FirsName"
                name="firsName"
            >
                <Input bordered={false} className="ii" placeholder={firstName}/>
            </Form.Item>

            <Form.Item
            name="email"
            label="E-mail"
        >
            <Input bordered={false} className="ii" placeholder={email}/>
        </Form.Item>
        
            <Form.Item
                label="Old Password"
                name="old_password"
            >
                <Input.Password bordered={false} className="ii" placeholder="********"/>
            </Form.Item>

            <Form.Item
            name="new_password"
            label="New Password"
        >
            <Input.Password bordered={false} className="ii" placeholder="********"/>
        </Form.Item>


            
        <Form.Item
            name="phone"
            label="Phone Number"
        >
            <Input bordered={false} className="ii" placeholder={phone}/>
        </Form.Item>

        <Form.Item
            name="speciality"
            label="Speciality"
        >
            <Input bordered={false} className="ii" placeholder={speciality}/>
        </Form.Item>
        <Button type="primary" htmlType="submit">
                Next
            </Button>
        </Form>
        </div>
    </div>
  )
}

export default Profile
