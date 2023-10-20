import axios from "axios";
import { ServerUrl } from "../config/ServerUrl";
import { accessToken } from "../config/AccessToken";

// Define your refreshToken function to get a new token
const refreshToken = async () => {
  // Your logic here to refresh the token
  // You might make a request to your server to refresh the token
  // and return the refreshed token
};

export const api = async (url, method, headers = {}, data = {}) => {
  try {

     const token = accessToken();

    const requestHeaders = {
      Authorization: token ? `Bearer ${token}` : "",
      ...headers,
    };

    // Add the token to the request headers if it exists in local storage
    const config = {
      method,
      url: ServerUrl + url,
      data,
      headers: requestHeaders,
    };

    const response = await axios(config);

    if (response.data && response.data.tokenExpired) {
      const refreshedToken = await refreshToken(); // Use your refreshToken logic

      const refreshedHeaders = {
        ...requestHeaders,
        Authorization: `Bearer ${refreshedToken}`,
      };

      const refreshedConfig = {
        ...config,
        headers: refreshedHeaders,
      };

      const refreshedResponse = await axios(refreshedConfig);
      return refreshedResponse.data;
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    throw new Error(errorMessage);
  }
};