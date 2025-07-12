import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import flaskaxiosInstance from "../../Helpers/flaskaxiosInstance";



export const voiceAssitenceResponse = createAsyncThunk(
    "voiceAssitence/response",
    async (data) => {
        try {
            const formData = new FormData();
            formData.append("text", data);

            const response = await flaskaxiosInstance.post("/voiceAssistance", formData);
            if (response.status === 200) {
                return response; // Return the data from the response
            } else {
                console.error("Error in response:", response.statusText);
                throw new Error("Failed to fetch response from Flask");
            }
            // return response.data;


        }
        catch (error) {
            console.error("Error in voiceAssitenceResponse:", error);
            throw error;
        }
    }
)


export const welcomeMessage = createAsyncThunk(
    "voiceAssitence/welcomeMessage",
    async (data) => {
        try {
            const formData = new FormData();
            formData.append("user_info", data);

            const response = await flaskaxiosInstance.post("/voiceAssistance/welcome", formData);
            if (response.status === 200) {
                return response; // Return the data from the response
            } else {
                console.error("Error in response:", response.statusText);
                throw new Error("Failed to fetch response from Flask");
            }
        }
        catch (error) {
            console.error("Error in welcomeMessage:", error);
            throw error;
        }
    }
)






export const clearSession = createAsyncThunk(
    "voiceAssitence/clear",
    async () => {
        try {

            const response = await flaskaxiosInstance.post("/voiceAssistance/clear");
            if (response.status === 200) {
                console.log("------>>>",response)
                return response; // Return the data from the response
            } else {
                console.error("Error in response:", response.statusText);
                throw new Error("Failed to fetch response from Flask");
            }
        }
        catch (error) {
            console.error("Error in welcomeMessage:", error);
            throw error;
        }
    }
)