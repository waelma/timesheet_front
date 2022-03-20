import React from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import './FormRegister.css';
import axios from "axios";

const FormRegister = ({form,setx,setCurrent}) => {

    const onFinish = (values) => {
        setx(values)
        axios.get(`http://localhost:8000/api/employe/confirmAcc`, {
          params: {
            email: values.email
          }
        }).then(res=> console.log(res.data))
        setCurrent(1);
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const pwdValidator = (pwd) => {
        const str=pwd
        if (str.match( /[0-9]/g) && 
        str.match( /[A-Z]/g) && 
        str.match(/[a-z]/g) && 
        str.match( /[^a-zA-Z\d]/g) &&
        str.length >= 8)  
          return true
        else 
          return false 
      };
    
      return (
        <>
        <div className="btn">
          <Button icon={<FcGoogle/>}  className="Google"><span className="btnText">Continue with Google</span></Button>
          <Button icon={<AiFillGithub/>} className="GitHub" ><span className="btnText">Continue with GitHub</span></Button>
        </div>
        <div id="ligne"><hr className="x left"/><span>OR</span><hr className="x right"/></div>
        <Form
          scrollToFirstError
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="LastName"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please input your LastName!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="FirsName"
            name="firsName"
            rules={[
              {
                required: true,
                message: 'Please input your FirsName!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
        name="email"
        label="E-mail"
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
        <Input />
      </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!pwdValidator(value)) {
                    return Promise.reject(new Error('Invalide password !'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


          
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="speciality"
        label="Speciality"
        rules={[
          {
            required: true,
            message: 'Please input your phone speciality!',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form>
        </>
      );
      
}

export default FormRegister
