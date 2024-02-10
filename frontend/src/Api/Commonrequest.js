import axios from "axios";

export const commonrequest = async (methods, url, body, header, auth) => {
  
  const admintoken = localStorage.getItem("adminToken");
  const usertoken = localStorage.getItem("userToken")

  let config = {
    method: methods,
    url,
    headers: {},
    data: body,
  };

  if (auth == "admin") {
    config.headers.Authorization = admintoken;
  } else if (auth == "user") {
    config.headers.Authorization = usertoken;

  }

  if (header) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  console.log("config",config);

  // console.log(auth, usertoken);
  // console.log(config);

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    // Handle error
    console.error(error);
    return error;
  }
};
