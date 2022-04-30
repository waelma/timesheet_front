import {React, useState, useCallback, useEffect} from 'react'
import { Input, Button, Tag } from "antd";
import VirtualList from 'rc-virtual-list';
import { AiOutlineClose } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BsArrowReturnLeft } from "react-icons/bs";

const CreateBacklog = ({setCurrent}) => {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    let [task,setTask]=useState('');
  const [data, setData] = useState(['Burns Bay Road','Downing Street','Wall Street','Wael Ma']);
  useEffect(()=>{
    console.log(data)
  })
  return (
    <div>
      <div>
      <div style={{display:"flex"}}>
          <h1 style={{ fontWeight: "bold" }}>Create project backlog</h1>
          <BsArrowReturnLeft style={{position:"absolute", right:'30px',fontSize:'20px', cursor: "pointer"}}
      onClick={() => {
        setCurrent(1);
      }}></BsArrowReturnLeft>
      </div>
          <p style={{ fontSize: "16px" }}>
            Enter your project's main tasks. You can change these and add more later.
          </p>
          <br></br>
          <div style={{ width: "50%", display: "grid" }}>
            <span style={{ fontWeight: "bold" }}>Task name</span>
            <Input
            onBlur={(x)=>{setTask(x.target.defaultValue)}}
              placeholder="Task name"
              style={{ borderRadius: "4px", borderColor: "#5499C7" }}
            />
            <br />
            <div>
            <Button 
            onClick={()=>{
                const inp=document.getElementById('inputRef')
                if(task && data.findIndex(x => x.toUpperCase().split(" ").join("")===task.toUpperCase().split(" ").join("") )===-1){
                    data.push(task);
                    forceUpdate(); 
                }
            }} 
          style={{width:'30%', backgroundColor:'#28B463', color:'white', borderRadius:'4px', left:'40%', borderColor:"white"}}
          >Add</Button>
            <Button
              onClick={() => {
                setCurrent(3);
              }}
              style={{
                width: "30%",
                backgroundColor: "#5499C7",
                color: "white",
                left: "40%",
                borderRadius: "4px",
              }}
            >
              Next
            </Button>
            </div>
            <br />
            <InfiniteScroll
              height={'160px'}
              dataLength={data.length}
            >
            {data.map((t) => (
                <Tag
                closable
                visible={true}
                onClose={() => {setData(data.filter(x => x !== t));
                forceUpdate(); }}
                style={{marginBottom:'4px', width:'97%',height:'25px', borderRadius:'5px', backgroundColor:"#D0D3D4"}}
                >
                  {t}
                </Tag>
            ))}
            </InfiniteScroll>
          </div>
        </div>
    </div>
  )
}

export default CreateBacklog
