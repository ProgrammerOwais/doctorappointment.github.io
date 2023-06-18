import UserData from "@/models/userData";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { name, email, number, date, time,userId } = await req.json();
  try {
    await connectToDB();
    // creator: userId,
    const newUser = new UserData({
      creator: userId,
      name,
      email,
      number,
      date,
      time,
    });
    newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response("the failed while posting user data: ", {
      status: 500,
    });
  }
};
