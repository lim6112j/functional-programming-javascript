export default class Kosac {
  constructor(id, name, address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getAddress() {
    return this.address;
  }
}