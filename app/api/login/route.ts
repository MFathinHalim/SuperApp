import { NextRequest } from "next/server";
import UserClass from "../../class";
import type { userType } from "@/app/interface";

let usersList: userType[] = [
  {
    id: "RmF0aGlu",
    name: "Fathin",
    password: "RmF0aDFuaGFsMW0=",
    desc: "Halooo semuanya",
    notes: [],
  },
];
const user = new UserClass(usersList);

export async function POST(req: NextRequest) {
  const result = await user.login(req);
  return Response.json(result);
}
