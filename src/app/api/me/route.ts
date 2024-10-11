import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("meme");
  const accessToken = req.headers.get("autorization");
  console.log("accessToken:", accessToken);
  if (!accessToken) {
    //middleware 에서 accessToken이 없을 경우 재발급후 cookie 에 저장후 요청 진행하기때문에
    //refrestToken이 있다면 , 여기를 타면안되는데 현재 여기로 오고있음.
    //반면 , create post 같은 경우에는 잘 작동됨
    console.log("hit2");
    return NextResponse.json({ message: "Unauthorized 1 " }, { status: 401 });
  }
  try {
    console.log("accesstoken value:", accessToken);
    const user = jwt.verify(accessToken, process.env.JWT_SECRET!);
    console.log("user:", user);
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ message: "Unauthorized 2" }, { status: 401 });
  }
}
