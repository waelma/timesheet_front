import {React, useState, useEffect} from 'react'
import { Table, Image, Input, Button, Space, Dropdown, Select} from 'antd';
import "./ComptesList.css"
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
const ComptesList = ({setRefresh, refresh}) => {
    const { Option } = Select;
    let [ch,setCh]=useState('');
    let [dataSource,setDataSource]=useState([]);
    let [data,setData]=useState();
    const token=localStorage.getItem('token')
      useEffect(()=>{
      axios.get(`http://localhost:8000/api/admin/listComptes`,{headers: {"Authorization" : `Bearer ${token}`}}).then(response => {
          let t= []
          response.data.map(x=>{
            let y={
              firstName:x.firstName,
              key: x.id,
              photo:     <Image
              width={50}
              src={x.photo}
            />,
  
              lastName: x.lastName,
              date: x.email_verified_at,
              phone:x.phone,
              speciality:x.speciality,
              email: x.email,
              role:   <> 
                        <Select defaultValue={x.role} onChange={(e)=>{x.role=e}} style={{ width: 100 }} >
                          <Option value="1">Employe</Option>
                          <Option value="2">Chef projet</Option>
                        </Select>
                      </>,
                    action:<>
                      <Button type="primary"  style={{backgroundColor:"#F1C40F", borderColor:"#F1C40F"}} onClick={()=>{
                        let req={
                          role:x.role
                        }
                        axios.put(`http://localhost:8000/api/admin/setRole/${x.id}`,req,{headers: {"Authorization" : `Bearer ${token}`}}).then(response => {
                          console.log(response.data)
                          setRefresh(refresh+2)
                      })
                      }}>
                        Save Change
                      </Button>
                      <Button type="primary" style={{backgroundColor:"#E74C3C ", borderColor:"#E74C3C "}} onClick={()=>{
                        let req={
                          role:x.role
                        }
                        axios.delete(`http://localhost:8000/api/admin/supprimerCompte/${x.id}`,{headers: {"Authorization" : `Bearer ${token}`}}).then(response => {
                          console.log(response.data)
                          setRefresh(refresh+2)
                      })
                      }}>
                        Delete
                      </Button>
                   </>
            }
            t.push(y);
          })
          setDataSource(t)
          setData(t)
      })
      },[refresh])
      
  
      const searchFirstName=(data)=> {
          if(data.firstName.toUpperCase().indexOf(ch.toUpperCase())===-1){
            return false
          }
          return true
      }
      const searchLastName=(data)=> {
        if(data.lastName.toUpperCase().indexOf(ch.toUpperCase())===-1){
          return false
        }
        return true
    }
    const searchEmail=(data)=> {
      if(data.email.toUpperCase().indexOf(ch.toUpperCase())===-1){
        return false
      }
      return true
  }
  
    const searchPhone=(data)=> {
      if(String(data.phone).indexOf(ch)===-1){
        return false
      }
      return true
  }
        const columns = [
          {
              title: 'Photo',
              dataIndex: 'photo',
              key: 'photo',
            },
          {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName',
            filterDropdown: 
            <div className="filter">
              <Input className="filterInp" onBlur={(e)=>{setCh(e.target.defaultValue)}}></Input>
              <button type="submit" onClick={()=>{
                dataSource=data
                setDataSource(dataSource.filter(searchFirstName));
                }}> filter </button>
            </div>
          },
          {
              title: 'LastName',
              dataIndex: 'lastName',
              key: 'lastName',
              filterDropdown: 
              <div className="filter">
                <Input className="filterInp" onBlur={(e)=>{setCh(e.target.defaultValue)}}></Input>
                <button type="submit" onClick={()=>{
                  dataSource=data
                  setDataSource(dataSource.filter(searchLastName));
                  }}> filter </button>
              </div>
            },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filterDropdown: 
            <div className="filter">
              <Input className="filterInp" onBlur={(e)=>{setCh(e.target.defaultValue)}}></Input>
              <button type="submit" onClick={()=>{
                dataSource=data
                setDataSource(dataSource.filter(searchEmail));
                }}> filter </button>
            </div>
          },
          {
              title: 'Phone',
              dataIndex: 'phone',
              key: 'phone',
              defaultSortOrder: 'descend',
              filterDropdown: 
              <div className="filter">
                <Input className="filterInp" onBlur={(e)=>{setCh(e.target.defaultValue)}}></Input>
                <button type="submit" onClick={()=>{
                  dataSource=data
                  setDataSource(dataSource.filter(searchPhone));
                  }}> filter </button>
              </div>
            },
          {
              title: 'Speciality',
              dataIndex: 'speciality',
              key: 'speciality',
            },
          {
              title: 'Creation date',
              dataIndex: 'date',
              key: 'date',
              sorter: (a, b) => a.key - b.key,
            },
            {
              title: 'Role',
              dataIndex: 'role',
              key: 'role',
            },
            {
              title: 'Action',
              dataIndex: 'action',
              key: 'action',
            },
        ];
  
  return (
    <div style={{textAlign:"center"}}>
        <h1>Comptes List</h1>
        <div className="comptesListTab">
            <Table dataSource={dataSource} columns={columns} />
        </div>
    </div>

  )
}

export default ComptesList
