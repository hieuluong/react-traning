import { EventEmitter } from "events";
import { Dispatcher } from "flux";

class LoadingModel extends EventEmitter {
   constructor() {
      super();
      this.isLoadingAll = false;
      this.show = null;
      this.dispatcher = null;
   }
}

const loadingModel = new LoadingModel;
loadingModel.show = function show(params) {
   switch (params) {
      default:
         loadingModel.isLoadingAll = !loadingModel.isLoadingAll;
         break;
   }
   loadingModel.emit("change");
};

loadingModel.dispatcher = new Dispatcher();
// loadingModel.dispatcher.register(loadingModel.handleActions.bind(loadingModel));
export default loadingModel;
