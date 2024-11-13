export class ItemShop {
    constructor(
        door, 
        itemDescription, 
        itemsList, 
        itemsContainer
    ) {
        this.door = door;
        this.itemDescription = itemDescription;
        this.items = itemsList;
        this.itemsContainer = itemsContainer;

        setTimeout(() => {
            this.setDoor(true);
        }, 1200);

        this.items.forEach(item => {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('item');
            itemContainer.id = item.id;

            const imgElement = document.createElement('img');
            imgElement.src = `/assets/shop/items/${item.assetPath}`;
            imgElement.alt = '';

            itemContainer.appendChild(imgElement);
            this.itemsContainer.appendChild(itemContainer);
            
            itemContainer.addEventListener('click', () => {
                this.setActiveItem(item);
            });
        });

        this.setActiveItem(Item.itemList[0]);
    }

    setDoor(active = true) {
        this.door.classList.toggle('active', active);
    }    

    setActiveItem(item) {
        item.setActive();

        this.setDoor(false);
        setTimeout(() => {
            const [ title, ex, description ] = this.itemDescription.children;
            title.innerText = item.title;
            ex.innerText = item.ex;
            description.innerText = item.description;

            this.setDoor();
        }, 800);
    }
}

export class Item {
    static idCounter = 0;
    static itemList = [];

    constructor (
        title,
        ex,
        description,
        assetPath
    ) {
        Item.itemList.push(this);
        this.id = `item_${Item.idCounter++}`;

        this.title = title;
        this.ex = ex ? `ex: ${ex}` : '';
        this.description = description;
        this.assetPath = assetPath;
    }

    setActive() {
        Item.itemList.forEach(item => {
            document.getElementById(item.id).classList.remove('active');
        });
        document.getElementById(this.id).classList.add('active');
    }

    static reset() {
        Item.idCounter = 0;
        Item.itemList = [];
    }
}
