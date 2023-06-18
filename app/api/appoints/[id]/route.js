import { connectToDB } from "@/utils/database"
import UserData from "@/models/userData"
// Get Data
export const  GET = async (req,{params}) => {
  try {
    await connectToDB();
    const  UserInfo = await UserData.findById(params.id).populate("creator")
    if(!UserInfo) return new Response("data is not found",{status:404})
    return new Response(JSON.stringify(UserInfo),{status:200});
    
  } catch (error) {  
 return new Response("Faild to fetch the data",{status:500})
  }
}

// patch / update the data
export const PATCH = async (req,{params}) => {
    const {name,email,number,date,time} = await req.json();
    try {
    await connectToDB();
    const  existingUserInfo = await UserData.findById(params.id);
    
    if(!existingUserInfo) return new Response("data is not found",{status:404})
    existingUserInfo.name = name;
    existingUserInfo.email = email;
    existingUserInfo.number = number;
    existingUserInfo.date = date;
    existingUserInfo.time = time;
    await existingUserInfo.save();
    return new Response(JSON.stringify(existingUserInfo),{status:200});
        
    } catch (error) {
        return new Response("Faild to fetch the data",{status:500})
        
    }
}

export const DELETE = async (req,{params})=> {
    try {
        await connectToDB();
        await UserData.findByIdAndRemove(params.id);
        return new Response("the data is deleted successfully",{status:200});
        
      } catch (error) {  
     return new Response("Faild to delte the data the data",{status:500})
      }
}