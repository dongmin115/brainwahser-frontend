import axiosInstance from "./axios";

// 채팅방 생성
const createChatRoom = async (character_name: string, chat_name: string) => {
  try {
    const response = await axiosInstance.post("/chats", {
      character_name: character_name,
      chat_name: chat_name,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 채팅방 정보 읽어오기
const readChatRoom = async (chat_id: number) => {
  try {
    const response = await axiosInstance.get(`/chats/${chat_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 채팅 보내기
const sendChat = async (chat_id: number | null, content: string) => {
  if (chat_id === null) {
    console.error("Invalid chat ID");
    return;
  }
  try {
    const response = await fetch(
      `http://0.0.0.0:8000/api/v1/chats/${chat_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ content: content }).toString(),
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 채팅 내역 조회
const getChatHistory = async (chat_id: number) => {
  try {
    const response = await axiosInstance.get(`/chats/${chat_id}/bubbles`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { createChatRoom, readChatRoom, sendChat, getChatHistory };
