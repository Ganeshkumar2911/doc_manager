const state = {
    snackbar: {
        show: false,
        message: '',
        color: 'success'
    }
};

const getters = {
    snackbar: state => state.snackbar
};

const mutations = {
    SHOW_SNACKBAR(state, payload) {
        state.snackbar = {
            show: true,
            message: payload.message || '',
            color: payload.color || 'success'
        };
    },
    CLOSE_SNACKBAR(state) {
        state.snackbar.show = false;
    },
    HIDE_SNACKBAR(state) {
        state.snackbar.show = false;
    }
};

const actions = {
    showSnackbar({ commit }, payload) {
        commit('SHOW_SNACKBAR', payload);
    },
    closeSnackbar({ commit }) {
        commit('CLOSE_SNACKBAR');
    },
    hideSnackbar({ commit }) {
        commit('HIDE_SNACKBAR');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

