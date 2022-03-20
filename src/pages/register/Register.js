import React from 'react'
import 'antd/dist/antd.css';
import './Register.css';
import './AdminApprouve';
import { useState } from 'react';
import { Steps, Button, message ,Form} from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import FormRegister from './FormRegister';
import EmailVerification from './EmailVerification';
import AdminApprouve from './AdminApprouve';


const Register = () => {
  // const [lastName,setLastName]= useState('');
  // const [firstName,setFirstName]= useState('');
  // const [phone,setPhone]= useState('');
  // const [email,setEmail]= useState('');
  // const [password,setPassword]= useState('');
  // const [c_password,setCPassword]= useState('');
  // const [speciality,setSpeciality]= useState('');

  const [form] = Form.useForm()
  const [x,setx]= useState();

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const { Step } = Steps;

const steps = [
  {
    title: 'Register',
    content: <FormRegister  form={form} setx={setx} setCurrent={setCurrent} />,
  },
  {
    title: 'Verfication mail',
    content: <EmailVerification x={x} setCurrent={setCurrent}/>,
  },
  {
    title: 'Admin approuve',
    content: <AdminApprouve/>,
  },
];


  
  return (
    <div className="container">
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" >{steps[current].content}</div>
    </div>
  )
}

export default Register

