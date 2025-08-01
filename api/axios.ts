import axios from "axios";

export const api = axios.create({
  baseURL: "http:192.168.1.46:8000/api/v1/",

  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    let errorMessage = "An unknown error occurred";

    if (error.response) {
      console.log("Error data:", error.response.data);
      console.log("Error status:", error.response.status);
      console.log("Error headers:", error.response.headers);

      errorMessage = `Server error: ${error.response.status}`;

      if (error.response.data) {
        if (typeof error.response.data === "string") {
          errorMessage += ` - ${error.response.data}`;
        } else if (error.response.data.message) {
          errorMessage += ` - ${error.response.data.message}`;
        } else if (error.response.data.error) {
          errorMessage += ` - ${error.response.data.error}`;
        }
      }
    } else if (error.request) {
      console.log("Error request:", error.request);
      errorMessage = "No response received from server";

      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout - server took too long to respond";
      }
    } else {
      console.log("Error message:", error.message);
      errorMessage = error.message;
    }

    const enhancedError = {
      ...error,
      detailedMessage: errorMessage,
    };

    console.error("Enhanced error details:", enhancedError);

    return Promise.reject(enhancedError);
  }
);
