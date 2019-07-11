class Dice {
  constructor() {
    this.point = 0;
    this.pickItem = this.pickItem.bind(this);
    this.pickImage = this.pickImage.bind(this);
    this.pickRandom = this.pickRandom.bind(this);
    this.getPoint = this.getPoint.bind(this);
    this.setPoint = this.setPoint.bind(this);
  }

  pickItem(value) {
    let item = "";
    switch (value) {
      case 0:
        item = "huou";
        break;
      case 1:
        item = "bau";
        break;
      case 2:
        item = "tom";
        break;
      case 3:
        item = "ga";
        break;
      case 4:
        item = "cua";
        break;
      case 5:
        item = "ca";
        break;
    }
    return item;
  }
  pickImage() {
    let imgLink = `images/${this.pickItem(this.point)}.jpg`;
    var x = document.createElement("IMG");
    x.className = "item-img";
    x.setAttribute("src", imgLink);
    x.setAttribute("alt", "The Pulpit Rock");
    return x;
  }
  pickRandom() {
    let number = Math.floor(Math.random() * 6);
    return number;
  }

  setPoint(point) {
    this.point = point;
    this.pickImage(point);
  }

  getPoint() {
    return this.point;
  }
}
