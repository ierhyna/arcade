import game from "../game";

export default class Item {

    constructor(data) {
        if (data && typeof data !== "object"){
            throw new Error("Item class properties must be provided as an object\n");
        }
        this.title = data.item || "Item";
        this.description = data.description || "Description";
        this.value = data. value || 1;
        this.rarity = data.rarity || "common";
        this.type = data.type || "object";
    }

    props(data) {
        if (!data) return this;

        Object.assign(this, data)
        // this.title = data.title;
        // this.description = data.description;
        // this.value = data.value;
        // this.rarity = data.rarity;
        // this.type = data.type;
    }


}