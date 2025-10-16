import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent_granted: boolean;
}

interface MessageState {
  messages: Message[];
  status: "idle" | "sending" | "success" | "error";
}

const initialState: MessageState = {
  messages: [],
  status: "idle",
};

export const sendMessage = createAsyncThunk(
  "messages/send",
  async (data: Message) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
    return data;
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = "sending";
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        state.status = "success";
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default messageSlice.reducer;
