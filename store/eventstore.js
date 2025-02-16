import { create } from "zustand";
import { persist } from "zustand/middleware";
import { handleAxiosError } from "@/lib/utils";
import axios from "axios";
import useAuthStore from "./authstores";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const makeAuthenticatedRequest = async (
  method,
  endpoint,
  data = null
) => {
  const authStore = useAuthStore.getState();
  const token = authStore.authToken;
  console.log("token : >> ", token);
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: { Authorization: `Bearer ${token}` },
      ...(data && { data }),
    };
    const response = await axios(config);
    return {
      statusCode: response.status,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
};

const useEventStore = create(
  persist((set, get) => ({
    allevents: [],
    workshops: [],
    setRehydrationComplete: (status) => set({ rehydrationComplete: status }),
    fetchEventAll: async () => {
      const result = await makeAuthenticatedRequest("get", "event");
      if (result && result.statusCode >= 200 && result.statusCode < 300) {
        
        set({ allevents: result.data });
        console.log("Number of events: ", result.data.length);
      } else {
        console.error("Failed to fetch organization:", result);
      }
      return result;
    },
    fetchSubIndustries: async () => {
      const result = await makeAuthenticatedRequest(
        "post",
        "get_sub_industries",
        get().subIndustriesData
      );
      if (result && result.statusCode >= 200 && result.statusCode < 300) {
        set({ subIndustries: result.data });
      } else {
        console.error("Failed to fetch organization:", result);
      }
      return result;
    },
    clearSaverelivantIssuesList: () => set({ saverelivantIssuesList: [] }),   
  }))
);

export default useEventStore;
