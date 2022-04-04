import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { List, message, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
import './Notifications.css'
import axios from 'axios';

const Notifications = ({setActiveTabKey2,refresh,setRefresh}) => {
    const [data, setData] = useState([]);
    const token=localStorage.getItem('token')
    useEffect(() => {
      axios.get(`http://localhost:8000/api/admin/comptesToApprouve`,{headers: {"Authorization" : `Bearer ${token}`}})
      .then(response => {
        setData(response.data)
      });
    }, [refresh]);
  

  return (
    <div className="notifcation">
        <List >
      <VirtualList
        data={data}
        itemHeight={47}
        itemKey="email"
      >
        {item => (
          <a className="notifLink" href onClick={()=>{
            window.dispatchEvent(
              new KeyboardEvent("keydown", {
                altKey: false,
                code: "Escape",
                ctrlKey: false,
                isComposing: false,
                key: "Escape",
                location: 0,
                metaKey: false,
                repeat: false,
                shiftKey: false,
                which: 27,
                charCode: 0,
                keyCode: 27,
              })
            );
            setActiveTabKey2('Comptes_To_Approuve')}}>   
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.photo} style={{marginLeft:"10px"}}/>}
              title={item.lastName+" "+item.firstName}
              description={item.email}
            />
            <div className="notifApprouve" style={{marginBottom:"22px", marginRight:"10px"}}><a href style={{marginRight:"10px"}} onClick={()=>{
                      let req={
                        role:1
                      }
                      axios.put(`http://localhost:8000/api/admin/approuverCompte/${item.id}`,req,{headers: {"Authorization" : `Bearer ${token}`}}).then(response => {
                        setRefresh(refresh+2)
                    })
                    }}> Approuve </a> <a href style={{}} onClick={()=>{
                      axios.delete(`http://localhost:8000/api/admin/supprimerCompte/${item.id}`,{headers: {"Authorization" : `Bearer ${token}`}}).then(response => {
                        setRefresh(refresh+2)
                    })
                    }} > Delete </a> </div>
          </List.Item>
          </a>
        )}
      </VirtualList>
    </List>
    </div>
  )
}

export default Notifications
