import { create } from "zustand";
import { persist } from "zustand/middleware";
import { handleAxiosError } from "@/lib/utils";
import axios from "axios";
import useAuthStore from "./authstores";
import { Speaker } from "lucide-react";

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
    addedevents: {},
    workshops: [],
    addedWorkshop: {},
    addedTickes: [],
    setRehydrationComplete: (status) => set({ rehydrationComplete: status }),
    
    createEvent: async (eventData) => {
      const result = await makeAuthenticatedRequest("post", "event", eventData);
      if (result && result.status >= 200 && result.status < 300) {
        set({
          addedevents: result.data,
        });
        console.log("Event created successfully:", result.data);
      }
      return result;
    },

    createEventorWorkshopTicket: async (eventData) => {
      console.log("Data : ", eventData);
      const result = await makeAuthenticatedRequest("post", "event", eventData);
      if (result && result.statusCode >= 200 && result.statusCode < 300) {
        set({
          addedevents: result.data
        });
      }
      return result;
    }, 

    createTicket: async (tickData) => {
      console.log("Data : ", tickData);
      const result = await makeAuthenticatedRequest("post", "ticket", tickData);
      if (result && result.statusCode >= 200 && result.statusCode < 300) {
        set({
          addedTickes: result.data
        });
      }
      return result;
    }, 

    createWorkShore: async (workshopData) => {
      const result = await makeAuthenticatedRequest("post", "workshop", workshopData);
      console.log("result : ", result);
      if (result && result.statusCode >= 200 && result.statusCode < 300) {
        set(state => ({
          addedevents: result.data
        }));
      }
      return result;
    },

    fetchEventAll: async () => {
      const result = await makeAuthenticatedRequest("get", "event");
      if (result && result.statusCode >= 200 && result.statusCode < 300) {
        set({ allevents: result.data });
        console.log("Number of events: ", result.data.length);
      } else {
        console.error("Failed to fetch events:", result);
      }
      return result;
    },

    clearEvents: () => set({ allevents: [] }),
  }))
);

export default useEventStore;