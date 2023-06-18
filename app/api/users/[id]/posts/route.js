import { connectToDB } from "@/utils/database";
import UserData from "@/models/userData";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const userInfo = await UserData.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(userInfo), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch  all userInfo", { status: 500 });
  }
};
