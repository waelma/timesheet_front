import {React, useRef} from 'react'
import Image from 'rc-image'
import { Form, Input, Upload, Button } from 'antd'
import './Profile.css'
import { RiEdit2Line } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Profile = () => {
    const [form] = Form.useForm()
    const [lastName,setLastName] = useState("")
    const [firstName,setFirstName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [speciality,setSpeciality] = useState("")
    const [image,setImage] = useState([])
    const token=localStorage.getItem('token')
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/employe/userProfil`,{headers: {"Authorization" : `Bearer ${token}`}}).then(response => {
            setImage(response.data[0].photo);
            form.setFieldsValue({
                lastName:response.data[0].lastName,
                firstName:response.data[0].firstName,
                email:response.data[0].email,
                speciality:response.data[0].speciality,
                phone:response.data[0].phone
            })
            setFirstName(response.data[0].firstName);
            setLastName(response.data[0].lastName);
            setEmail(response.data[0].email)
        })
    },[image,firstName,lastName,email,phone,speciality])
    const props = {
        name: 'photo',
        action: 'http://localhost:8000/api/employe/updatePhoto',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        showUploadList:false,
        onChange(info) {
            axios.get(`http://localhost:8000/api/employe/userProfil`,{headers: {"Authorization" : `Bearer ${token}`}})
            .then(response => {setImage(response.data[0].photo);})
        }
    
      };
      const onFinish=(values)=>{
        let data={
            email:values.email,
            phone:values.phone,
            firstName:values.firstName,
            lastName:values.lastName,
            speciality:values.speciality
          }
        axios.put(`http://localhost:8000/api/employe/updateProfil`,data,{headers: {"Authorization" : `Bearer ${token}`}}).then(response => {
            console.log(response.data);
            setSpeciality(response.data.speciality)
            setEmail(response.data.email)
        })
      }
      const changePassword=(values)=>{
        let data={
            old_password:values.old_password,
            new_password:values.new_password,
            c_new_password:values.c_new_password,
            email:email
          }
        axios.put(`http://localhost:8000/api/employe/updatePassword`,data,{headers: {"Authorization" : `Bearer ${token}`}}).then(response => {
            console.log(response.data);
        })
      }
  return (
    <div className="profile">
        <div>
        <Image
        className="img"
        src={image}
        />
        <Upload className="edit" {...props}
        >
         <Button  shape="circle" icon={<RiEdit2Line/>}></Button>
        </Upload>
        </div>

        <div className="profileForm">
            <div className="userName">
                <h1>{firstName} {lastName}</h1>
            </div>
        <div>        
        <Form
          layout="vertical"
          scrollToFirstError
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          
          onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
            <Form.Item
                label="LastName"
                name="lastName"
            >
                <Input  bordered={false} className="ii" />
            </Form.Item>

            <Form.Item
                label="FirstName"
                name="firstName"
            >
                <Input bordered={false} className="ii" />
            </Form.Item>

            <Form.Item
            name="email"
            label="E-mail"  
        >
            <Input bordered={false} className="ii" />
        </Form.Item>
            
        <Form.Item
            name="phone"
            label="Phone Number"
        >
            <Input bordered={false} className="ii"/>
        </Form.Item>

        <Form.Item
            name="speciality"
            label="Speciality"
        >
            <Input bordered={false} className="ii"/>
        </Form.Item>
        <Button type="primary" htmlType="submit">
                Save Change
            </Button>
        </Form>
        </div>

        <h3 className="libChangePwd">Change Password</h3>
        <Form
            className="updatePwdForm"
            layout="vertical"
              onFinish={changePassword}
            //   onFinishFailed={onFinishFailed}
            >
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
            name="c_new_password"
            label="Confirm New Password"
        >
            <Input.Password bordered={false} className="ii" placeholder="********"/>
        </Form.Item> 
                

                    <Button className="updatePwdFormBtn" type="primary" htmlType="submit">
                        Save Change
                    </Button>
            </Form>
        </div>
        
    </div>
  )
}

export default Profile
