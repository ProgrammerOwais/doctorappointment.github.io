"use client";
import Form from "@/components/Form";
import { useState,useEffect } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const Update = () => {
  const [submitting, setSubmitting] = useState(false);
  const {data : session} = useSession();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
    date: "",
    time: "",
  });
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("The user data is: ", userData);
    try {
        if(!id) alert("Soryy to say, but it seems your appointment are not yet registered")
      const res = await fetch(`api/appoints/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          number: userData.number,
          date: userData.date,
          time: userData.time,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("the error while posting the data on client side", error);
    } finally {
      setSubmitting(true);
      alert("the data is submitted successfully");
    }
    setUserData({
      ...userData,
      name: "",
      number: "",
      email: "",
      date: "",
      time:"",
    });
  };
  useEffect(()=>{
    const displayData = async ()=> {
        const post = await fetch(`/api/appoints/${id}`);
        const data = await post.json();
        console.log("the data is: ",data)
        setUserData({name:data.name,email:data.email,number:data.number,date:data.date,time:data.time})
    }
    if(id) displayData();
  },[id])
  console.log("the id is: ",id)
  console.log("user data  is: ",userData)
  return (
    <div>
    <h1>Wanna Change Your Appointment</h1>
      { session?.user ? (
 <Form
 userData={userData}
 setUserData={setUserData}
 handleSubmit={handleSubmit}
 submitting={submitting}
/>
      ):(
        <h3>First You will need to sign in</h3>
      )}
     
    </div>
  );
};

export default Update;
