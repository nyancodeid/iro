export default class Storage {
  constructor(key) {
    this.key = key;
    this.data = null;
  }

  read () {
    const value = localStorage.getItem(this.key);

    if (value === null) {
      return null;
    }

    this.data = JSON.parse(value);
  }

  write () {
    if (this.data !== null) {
      localStorage.setItem(this.key, JSON.stringify(this.data));
    }
  }

}