export default class Item {
    constructor(data = {}) {
        if (data && typeof data !== "object") {
            throw new Error("Item class properties must be provided as an object\n");
        }
        this.title = data.title || "Item";
        this.description = data.description || "Description";
        this.value = data.value || 1;
        this.rarity = data.rarity || "common";
        this.type = data.type || "object";
    }

    props(data) {
        return data ? Object.assign(this, data) : this
    };
}