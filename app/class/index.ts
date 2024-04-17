import type { userType } from "../interface";
import type { NextRequest } from "next/server";

//* Let's make the Sign In and Sign Up!
class UserClass {
  users: userType[];
  constructor(users: userType[]) {
    this.users = users;
  }

  async login(request: NextRequest) {
    const { name, password } = await request.json();
    console.log(btoa(password));

    const userIndex = this.users.findIndex(
      (u) => u.name === name && u.password === btoa(password) //? btoa tugasnya menconvert string->base64
    );

    if (userIndex !== -1) {
      return {
        code: 200, //? 200: OK
        id: this.users[userIndex].id,
        name: this.users[userIndex].name,
        desc: this.users[userIndex].desc,
      };
    }
    return {
      code: 401,
      message: "Username or Password is wrong",
    };
  }
  async signup(request: NextRequest) {
    const { name, desc, password } = await request.json();
    if (this.users.some((user) => user.name === name)) {
      return { code: 409, message: "username already taken" }; //? If already exist, then 409: Conflict
    }
    const generatedId = btoa(name);
    this.users.push({
      id: generatedId,
      name: name,
      password: btoa(password),
      desc: desc,
      notes: [],
    });

    return {
      code: 200, //? 200: OK
      message: "Sign Up Complete!",
    };
  }
}

export default UserClass;
