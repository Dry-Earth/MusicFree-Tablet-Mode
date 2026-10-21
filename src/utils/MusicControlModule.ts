import { NativeModules, NativeEventEmitter } from "react-native";

const { MusicControlModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(MusicControlModule);

export interface ControlEvent {
  action: string;
  payload?: string;
}

export const MusicControl = {
    addListener: (callback: (event: ControlEvent) => void) => {
        return eventEmitter.addListener("MusicControlEvent", callback);
    },
  
    sendEvent: (action: string, payload?: string): Promise<string> => {
        return MusicControlModule.sendControlEvent(action, payload || "");
    },
};

export type MusicControlAction = 
  | "play"
  | "pause"
  | "toggle"
  | "next"
  | "previous"
  | "search"
  | "play-song";
