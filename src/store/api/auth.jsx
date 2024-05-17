import axios from "axios";

export const getUserData = async (username, password) => {
  try {
    const res = await axios.post("https://dummyjson.com/auth/login", {
      username: username,
      password: password,
    });

    const token = res?.data?.token;
    const img = res?.data?.image;
    const userName = res.data?.firstName + res.data?.lastName;

    localStorage.setItem("userName", userName);
    localStorage.setItem("img", img);

    if (!token || token.length === 0) {
      alert("enter the correct email or password");
    } else {
      localStorage.setItem("userToken", token);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("dumb ass something wrong");
  }
};
