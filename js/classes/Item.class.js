import game from "../game";

export default class Item {

    constructor() {
        this.title = "Item";
        this.description = "Description";
        this.value = 1;
        this.rarity = "common";
        this.type = "object";
    }

    props(data) {
        if (!data) return this;

        this.title = data.title;
        this.description = data.description;
        this.value = data.value;
        this.rarity = data.rarity;
        this.type = data.type;
    }


}