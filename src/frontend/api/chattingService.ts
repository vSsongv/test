import { Chatting, Mentee } from './api';
import defaultProfile from '../assets/images/defaultProfile.svg';
import { Languages } from '../utils/Languages';

export interface CounterPartInfo {
  profile: string;
  chat: [];
}

export interface QuestionProp {
  title: string;
  content: string;
  updatedAt: string;
  language: string;
  content_image: any[];
  nickname: string;
}

export const EnterChattingRoom = async (roomId: string): Promise<CounterPartInfo | boolean> => {
  try {
    const res = await Chatting.enterChattingRoom(roomId);
    const userInfo = {
      profile: res.data.result.image ? process.env.REACT_APP_BASE_URL + res.data.result.image : defaultProfile,
      chat: res.data.result.chat,
    };
    console.log(res);
    return userInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const SendMessage = async (roomId: string, nickname: string, message: string): Promise<boolean> => {
  try {
    const res = await Chatting.sendMessage(roomId, nickname, message);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const SendImage = async (roomId: string, chattingContents: FormData): Promise<boolean> => {
  try {
    const res = await Chatting.sendImage(roomId, chattingContents);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const GetSpecificQuestion = async (mentoringid: string): Promise<QuestionProp | boolean> => {
  try {
    const res = await Mentee.getSpecificQuestion(mentoringid);
    const content_image = Object.values(res.data.result.content_image);
    const questionInfo = {
      title: res.data.result.title,
      content: res.data.result.content,
      updatedAt: res.data.result.updatedAt.slice(11, 20),
      language: Languages[res.data.result.language],
      content_image: content_image,
      nickname: res.data.result.nickname,
    };
    return questionInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};
