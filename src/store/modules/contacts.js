import { LocalContacts } from "@/services/LocalContacts";

const state = {
  contacts: []
};

const getters = {
  contacts(state) {
    return state.contacts;
  },
};

const mutations = {
  SET_CONTACTS(state, contacts) {
    state.contacts = contacts;
  },
  ADD_CONTACT(state, contact) {
    state.contacts.push(contact);
  },
  REMOVE_CONTACT(state, id) {
    const idx = state.contacts.findIndex(contact => contact.id === id);
    state.contacts.splice(idx, 1);
  },
};

const actions = {
  addContact({ commit }, name) {
    const id = Date.now();
    const contact = {
      id,
      name,
      fields: []
    };

    LocalContacts.create(contact);
    commit('ADD_CONTACT', contact);
  },

  removeContact({ commit }, id) {
    LocalContacts.remove(id);
    commit('REMOVE_CONTACT', id);
  },

  loadContacts({ commit }) {
    const contacts = LocalContacts.getAll();

    commit('SET_CONTACTS', contacts);
  },
};

export const contacts = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
