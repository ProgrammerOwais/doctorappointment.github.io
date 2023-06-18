"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  
  const [userData, setUserData] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const userInfo = async () => {
      const res = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setUserData(data);
    };
    userInfo();
    console.log("function is executed");
  }, []);
  const handleEdit = (user)=>{
    router.push(`/update?id=${user._id}`)
    
  }
  const handleDelete = async (user)=>{
    const isConfirm =  confirm("Are you sure , do you wanna delete this")
    if(isConfirm) {
      try {
        await fetch(`api/appoints/${user._id.toString()}`,{method: 'DELETE'})
        const filteredPost = userData.filter((data)=> data._id !== user._id)
        setUserData(filteredPost);
        
      } catch (error) {
        console.log("the error while deleting the specific post", error)
        
      }
    }
    
  }
  // console.log("user data is: ",userData);
  return (
    <div className="cards-div">
        {userData.map((user) => (
           <div className="appointment-cards">
            
     <hr className="hr" />
            
            <h2 className="name">Name: {user.name}</h2>
            <h2 className="email">Email: {user.email}</h2>
             <h2 className="number"> Phone {user.number}</h2>
             <h2 className="date">Date: {user.date.replace("T00:00:00.000Z","")}</h2>
             <h2 className="time">Time: {user.time}</h2>
            <div className="user-action">
              <button onClick={()=> handleEdit(user)} className="edit">Edit</button>
              <button onClick={()=> handleDelete(user)} className="delete">X</button>
             </div>
           </div>
        ))}
    </div>
  );
};
export default Profile;
