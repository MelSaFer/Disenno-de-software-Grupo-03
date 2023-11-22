import { EVENT_TYPE } from "./EVENT_TYPE";

export interface Component {
    schedule(EventType : EVENT_TYPE): string;
}