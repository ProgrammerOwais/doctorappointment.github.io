"use client";
import Form from "@/components/Form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Appointment = () => {
  const [submitting, setSubmitting] = useState(false);
  const {data : session} = useSession();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
    date: "",
    time: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("The user data is: ", userData);
    try {
      const res = await fetch("api/appoints/new", {
        method: "POST",
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          number: userData.number,
          date: userData.date,
          time: userData.time,
          userId: session?.user.id
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
    });
  };
  return (
    <div>
    <h1 className="appointment-heading">Take Appointment</h1>
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

export default Appointment;
