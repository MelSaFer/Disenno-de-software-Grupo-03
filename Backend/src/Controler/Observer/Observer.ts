import { Subject } from "./Subject";

export interface Observer {
    update(observable: Subject): void;
  }