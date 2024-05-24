import { defineModule } from "direct-vuex";
import { QueryDocumentSnapshot } from "firebase/firestore/lite";

export interface IPainting {
  id: string;
  authorEmail: string;
  authorName: string;
  date: Date;
  description: string;
  imgPath: string;
}

export interface IPaintingsDataState {
  paintingsList: IPainting[] | null;
  lastPaintingDoc: QueryDocumentSnapshot | null;
}

const paintingsDataModule = defineModule({
  state: (): IPaintingsDataState => ({
    paintingsList: null,
    lastPaintingDoc: null,
  }),

  getters: {},

  mutations: {
    setPaintingsList(state, paintingsList: IPainting[] | null) {
      state.paintingsList = paintingsList;
    },
    setLastPaintingDoc(state, lastPaintingDoc: QueryDocumentSnapshot | null) {
      state.lastPaintingDoc = lastPaintingDoc;
    },
  },

  actions: {},

  namespaced: true,
});

export default paintingsDataModule;
