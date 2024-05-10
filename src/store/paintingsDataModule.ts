import { defineModule } from "direct-vuex";

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
}

const paintingsDataModule = defineModule({
  state: (): IPaintingsDataState => ({
    paintingsList: null,
  }),

  getters: {},

  mutations: {
    setPaintingsList(state, paintingsList: IPainting[] | null) {
      state.paintingsList = paintingsList;
    },
  },

  actions: {},

  namespaced: true,
});

export default paintingsDataModule;
