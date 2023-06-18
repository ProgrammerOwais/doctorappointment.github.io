
import UserData from "@/models/userData";
import { connectToDB } from "@/utils/database";
export const GET = async (request) => {
  try {
    await connectToDB();
    const UserInfo = await UserData.find({}).populate("creator");
    return new Response(JSON.stringify(UserInfo), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch  all UserData", { status: 500 });
  }
};
