import { create } from "zustand";
import { persist } from "zustand/middleware";
import { customStorage, handleAxiosError } from "@/lib/utils";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const makeApiRequest = async (
  endpoint,
  method = "post",
  payload = null
) => {
  console.log("payload", payload);
  const token = useAuthStore.getState().authToken;
  console.log("API : ", `${API_BASE_URL}${endpoint}`);
  console.log("payload", payload);
  try {
    const config = {
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      url: `http://localhost:3000/api/${endpoint}`,
      ...(payload && { data: payload }),
    };
    const response = await axios(config);
    const { data } = response;
    console.log("Data : ", data);
    return {
      statusCode: response.status,
      message: data.message,
      data: data.data,
      error: null,
    };
  } catch (error) {
    console.log("Error : ", error);

    return handleAxiosError(error);
  }
};


export const makeApiRequest2 = async (
  endpoint,
  method = "post",
  payload = null
) => {
  const token = useAuthStore.getState().authToken;
  try {
    const config = {
      method,
      headers: { Authorization: `Bearer ${token}` },
      url: `${API_BASE_URL}${endpoint}`,
      ...(payload && { data: payload }),
    };
    return await axios(config);
  } catch (error) {
    return handleAxiosError(error);
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      authToken: null,
      userProfile: null,
      activityLogs: [],
      rehydrationComplete: false,
      setRehydrationComplete: (status) => set({ rehydrationComplete: status }),

      // Function to sign up a user and save their record
      signUp: async (user) => {
        const result = makeApiRequest("register", "post", user);

        console.log("API result: ", result);

        if (result.statusCode === 201) {
          const { token } = result.data.user;
          set({ authToken: token });
          customStorage.setItem("authToken", token);
        }
      
        return result;
      },

      verifyEmail: async (payload) =>
        makeApiRequest("auth/email/verify", "post", payload),

      resendEmailOTP: async (payload) =>
        makeApiRequest("auth/otp/resend", "post", payload),

      forgotPassword: async (payload) => {
        const result = makeApiRequest("forgot-password", "post", payload);

        if (result.statusCode === 200) {
          const { token } = result.data.user;
          set({ authToken: token });
          customStorage.setItem("authToken", token);
        }
        return result;
      },

      resetPassword: async (payload) => {
        
        if (payload.password !== payload.confirmPassword) {
          return {
            statusCode: 403,
            message: "Password Mismatch or incorrect",
          };
        }
        return makeApiRequest("auth/password/reset", "post", payload);
      },

      login: async (user) => {
        console.log("Attempting login with user: ", user);
        const result = await makeApiRequest("auth/login", "post", user);
      
        console.log("API result: ", result);

        if (result.statusCode === 200) {
          const { token } = result.access_token;
          set({ authToken: token });
          customStorage.setItem("authToken", token);
        }
      
        console.log("Final result: ", result);
        return result;
      },      

      fetchUserProfile: async () => {
        const result = await makeApiRequest("users/me", "get");
        if (result.statusCode === 200) {
          set({ userProfile: result.data });
          customStorage.setItem("userProfile", result.data);
        }
        return result;
      },

      updateUserProfile: async (data) => {
        const result = await makeApiRequest(`users/me`, "patch", { ...data });
        if (result && result.statusCode >= 200 && result.statusCode < 300) {
          set({ userProfile: { ...get().userProfile, ...data } });
          customStorage.setItem("userProfile", get().userProfile);
        } else {
          console.error("Failed to update user profile", result);
        }
        return result;
      },

      clearAuth: async () => {
        set({ authToken: null, userProfile: null });
        // const settingStore = await useSettingStore.getState();
        // settingStore.sendPendingInteractions();
        customStorage.clear();
      },

      setUserProfile: (newProfile) =>
        set((state) => {
          const updatedProfile =
            typeof newProfile === "function"
              ? newProfile(state.userProfile)
              : newProfile;

          // Save the updated profile to local storage
          customStorage.setItem("userProfile", updatedProfile);

          return { userProfile: updatedProfile };
        }),

      fetchActivityLogs: async () => {
        const result = await makeApiRequest2("activity-logs/me", "get");
        if (result && result.status >= 200 && result.status < 300) {
          set({ activityLogs: result.data });
        } else {
          console.error("Failed to fetch activity logs:", result);
        }
        return result;
      },
    }),
    {
      name: "auth-storage",
      storage: customStorage,
      onRehydrateStorage: () => (state) => {
        // Called after rehydration is complete
        state?.setRehydrationComplete(true);
      },
    }
  )
);

export default useAuthStore;
