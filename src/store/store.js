import { createStore } from 'vuex';
import snackbar from './modules/snackbar';

export const store = createStore({
    modules: {
        snackbar,
    },
    state: {   
        search_text: "",
    },
    getters: {
        getSearchText: state => {
            return state.search_text;
        },
    },
    mutations: {
        SET_SEARCH_TEXT(state, value) {
            state.search_text = value
        },
    },
    actions: {
        setSearchText({commit}, value) {
            commit('SET_SEARCH_TEXT', value)
        },
    }
});


