import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/plusicon";
import { ShareIcon } from "../icons/shareicon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

export  function Dashboard() {
  const[modalOpen,setModalOpen]=useState(false)
  const {contents,refresh}=useContent()
  useEffect(()=>{
    refresh()

  },[])
  return <>
    <div >
      <Sidebar/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModal open={modalOpen} OnClose={()=>{setModalOpen(false)}}/>
      <div className=" flex justify-end gap-4">
      <Button OnClick={()=>{setModalOpen(true)}}
      variant="primary" text="Addcontent" startIcon={<PlusIcon />} ></Button>
    
      <Button OnClick={async ()=>{
        const response =await axios.post(`${BACKEND_URL}api/v1/brain/share`,{
        share:true
        },{
          headers:{
            "Authorization":localStorage.getItem("token")
          }
        })
        const shareUrl=`http://localhost:5173/share/${response.data.hash}`
      alert(shareUrl)
      }}
      
      
      variant="secondary" text="Share Brain" startIcon={<ShareIcon />}></Button>
      </div>
      <div className="flex gap-4 flex-wrap">
        {contents.map(({title,link,type})=><Card 
        type={type} 
        link={link} 
        title={title}
        />)}
    </div>
    </div>
    </div>
  </>
}