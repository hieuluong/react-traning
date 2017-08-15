import { EventEmitter } from "events";
import dispatcher from "./dispatcher";

class LoadingModel extends EventEmitter {
   constructor() {
      super();
      this.isLoading = false;
   }

   getStatus() {
      return this.isLoading;
   }

   handleActions(action) {
      this.isLoading = action
      this.emit("change");
   }
}

const loadingModel = new LoadingModel;
dispatcher.register(loadingModel.handleActions.bind(loadingModel));
export default loadingModel;
