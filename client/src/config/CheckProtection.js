import { api } from "../middleware/Api";
import { accessToken } from "../config/AccessToken";

export const getUsersProtectionData = async () => {
  try {
    const token = accessToken();

    const response = await api(
      `/members/get_permissions/${token}`,
      "GET",
      {},
      {}
    );
    return response.userData;
  } catch (error) {
    console.error("Error fetching Roles:", error);
    return [];
  }
};
