import { LocalContacts } from "@/services/LocalContacts";

const state = {
  contacts: [],
  history: [],
  historyActual: null,
  historyStep: -1, // initial
};

const getters = {
  contacts(state) {
    return state.contacts;
  },
  contactById(state) {
    return (id) => state.contacts.find(contact => contact.id === id);
  },
  history(state) {
    return state.history
  },
  historyStep(state) {
    return state.historyStep
  },
  historyActual(state) {
    return state.historyActual
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
  SET_CONTACT_FIELDS(state, { contactId, fields }) {
    const contact = state.contacts.find(({ id }) => id === contactId);
    contact.fields = [ ...fields ];
  },

  PUSH_HISTORY(state, step) {
    state.history.push(step);
  },
  SPLICE_HISTORY(state) {
    state.history.length = state.historyStep + 1;
  },
  SAVE_ACTUAL_HISTORY(state, fields) {
    state.historyActual = fields;
  },
  CLEAR_HISTORY(state) {
    state.history = [];
    state.historyActual = null;
    state.historyStep = -1;
  },
  SET_STEP_HISTORY(state, stepNum) {
    state.historyStep = stepNum;
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

    commit('ADD_CONTACT', contact);
  },

  removeContact({ commit }, id) {
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
  },

  removeContactField({ commit, getters }, payload) {
    commit('REMOVE_CONTACT_FIELD', payload);
  },

  updateContactField({ commit, getters }, payload) {
    commit('UPDATE_CONTACT_FIELD', payload);
  },

  saveHistory({ commit, getters }, { contactId, actionType }) {
    const contact = getters.contactById(contactId);
    const step = {
      fields: contact.fields.map(f => ({ ...f })),
      actionType
    };

    if (getters.historyStep !== getters.history.length) {
      commit('SPLICE_HISTORY');
    }

    commit('PUSH_HISTORY', step);
    commit('SET_STEP_HISTORY', getters.history.length - 1);
  },

  saveHistoryActual({ commit, getters }, contactId) {
    const contact = getters.contactById(contactId);
    const actualFields = contact.fields.map(f => ({ ...f }))
    commit('SAVE_ACTUAL_HISTORY', actualFields);
  },

  clearHistory({ commit }) {
    commit('CLEAR_HISTORY');
  },

  stepBackHistory({ getters, dispatch, commit }, contactId) {
    const { fields } = getters.history[getters.historyStep];

    commit('SET_CONTACT_FIELDS', { contactId, fields});
    commit('SET_STEP_HISTORY', getters.historyStep - 1);
  },

  stepNextHistory({ getters, dispatch, commit }, contactId) {
    const step = getters.historyStep + 1;
    const historyStep = getters.history[step + 1];
    const fields = historyStep ? historyStep.fields : getters.historyActual;

    commit('SET_CONTACT_FIELDS', { contactId, fields });
    commit('SET_STEP_HISTORY', step);
  },
};

export const contacts = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
