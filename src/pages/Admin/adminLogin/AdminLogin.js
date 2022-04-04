import React from 'react';
import { Form, Input, Button} from 'antd';
import "./AdminLogin.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
    let navigate = useNavigate();
    const onFinish=(values)=>{
        let data={
            email:values.email,
            password:values.password
        }
        axios.post(`http://localhost:8000/api/admin/login`,data)
        .then(response => {
            console.log(response.data);
            if(response.status===200){
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('role',response.data.role);
                navigate("/admin/dashbord");
            }
    });
};
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <div className="AdminLogin">
        <h2 style={{color:"#53565d"}}>Login</h2>
      <Form
                className="adminloginform"
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item 
                    name="email"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    ]}
                >
                    <Input placeholder="Enter Email" />
                </Form.Item>



        <Form.Item className=""
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
                >
            <Input.Password placeholder="Enter Password"/>
                
        </Form.Item>
                
                <Form.Item
                >
                    <Button type="primary" htmlType="submit" className="">
                    Log in
                    </Button>
                </Form.Item>
                </Form>
    </div>
  )
}

export default AdminLogin
