export class LocalContacts {
  static tableName = 'contactsModel';

  static create(instance) {
    const contacts = this.getAll();
    contacts.push(instance);
    this.save(contacts);
  }

  static get(id) {
    return this.getAll().find(contact =>  contact.id === id);
  }

  static getAll() {
    const stored = localStorage.getItem(this.tableName);

    if (!stored) return [];

    try {
      return JSON.parse(stored);
    } catch (e) {
      this.save([]);
      return [];
    }
  }

  static update(id, newData) {
    const contacts = this.getAll().map((contact) => {
      return contact.id !== id
        ? contact
        : { ...contact, ...newData };
    });
    this.save(contacts);
  }

  static remove(id) {
    const contacts = this.getAll().filter(contact => contact.id !== id);
    this.save(contacts);
  }

  static save(contacts) {
    localStorage.setItem(this.tableName, JSON.stringify(contacts));
  }
}
