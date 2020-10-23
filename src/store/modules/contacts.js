import { LocalContacts } from "@/services/LocalContacts";

const state = {
  contacts: []
};

const getters = {
  contacts(state) {
    return state.contacts;
  },
  contactById(state) {
    return (id) => state.contacts.find(contact => contact.id === id);
  }
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

  ADD_CONTACT_FIELD(state, { contactId, field }) {
    const contact = state.contacts.find(c => c.id === contactId);
    contact.fields.push(field);
  },
  REMOVE_CONTACT_FIELD(state, { contactId, fieldId }) {
    const contact = state.contacts.find(c => c.id === contactId);
    const fieldIdx = contact.fields.findIndex(({ id }) => id === fieldId);
    contact.fields.splice(fieldIdx, 1);
  },
  UPDATE_CONTACT_FIELD(state, { contactId, field }) {
    const contact = state.contacts.find(c => c.id === contactId);
    const fieldIdx = contact.fields.findIndex(({ id }) => id === field.id);
    contact.fields[fieldIdx] = { ...field };
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

  addContactField({ commit, getters }, { contactId, field }) {
    const newField = {
      id: Date.now(),
      ...field
    };

    commit('ADD_CONTACT_FIELD', {
      field: newField,
      contactId
    });
    LocalContacts.save(getters.contacts);
  },

  removeContactField({ commit, getters }, payload) {
    commit('REMOVE_CONTACT_FIELD', payload);
    LocalContacts.save(getters.contacts);
  },

  updateContactField({ commit, getters }, payload) {
    commit('UPDATE_CONTACT_FIELD', payload);
    LocalContacts.save(getters.contacts);
  },
};

export const contacts = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
