import React, { useEffect } from 'react'
import {Input, Button, Form} from 'antd'
import './EmailVerification.css'
import axios from 'axios'
const EmailVerification = ({x,setCurrent}) => {
  let data={
    email:x.email,
    phone:x.phone,
    firstName:x.firsName,
    lastName:x.lastName,
    password:x.password,
    c_password:x.confirm,
    speciality:x.speciality
  }
  console.log(data)
  const verifier=(values)=>{
    axios.post(`http://localhost:8000/api/employe/register/${values.code}`,data)
    .then(response => {console.log(response.data)
      if(response.data.message==="success"){
        setCurrent(2)
      }else{
        alert("Incorrect code")
      }
    });
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  return (
    <div className="emailVerif">
      <span className="emailVerifText">A confirmation email has been sent to {x.email} check your mail</span><br/>
      <Form
      onFinish={verifier}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      >
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input the code!',
              },
            ]}
          >
            <Input placeholder="Code" className="input"/>
          </Form.Item>
      <Button type="primary" htmlType="submit" >
          Next
      </Button>
      <Button style={{ margin: '0 8px' }} onClick={() => setCurrent(0)}>
          Previous
      </Button>    
      </Form>
    </div>
  )
}

export default EmailVerification
