class Handler {
    constructor() {
        this.enemies = [];
        this.objects = [];

        this.enemyRemoved = false;
        this.enemyIndexToRemove = -1;

        this.objectRemoved = false;
        this.objectIndexToRemove = -1;

    }

    addEnemy(enemy) {
        // this.enemies.splice(0, 0, enemy);
        this.enemies.push(enemy)

    }

    removeEnemy(id) {
        // let temp = [...this.enemies];
        // console.log(temp)
        this.enemyIndexToRemove = this.enemies.findIndex(enemy => {
            return enemy.id === id;
        });

        // console.log("enemyIndexToRemove ", this.enemyIndexToRemove)
        this.enemies.splice(this.enemyIndexToRemove, 1);
        // console.log(temp)
        // temp[enemyIndexToRemove].renderDisplay();

        // if (this.enemies.length >= 1) {
        //     this.enemyRemoved = true;
        //     // console.log("enemyRemoved changed to true")
        // }
    }

    renderEnemies(time) {
        // console.log("length: ", this.enemies.length)
        if (this.enemies.length > 0) {
            // console.log("here")
            // for (let i = 0; i < this.enemies.length; i++) {

            //     // console.log("rendering at index", i)
            //     this.enemies[i].render();

            //     if (this.enemyRemoved) {
            //         // console.log("length after removing: " + this.enemies.length)
            //         // console.log("rendering at index " + i + " again");
            //         // console.log("enemyIndexToRemove: " + this.enemyIndexToRemove)
            //         this.enemies[i].render();
            //         this.enemyRemoved = false;
            //         // continue;
            //     }
            //     // console.log(i, this.objects[i].id)
            // }

            for (let i = this.enemies.length - 1; i >= 0; i--) {

                // console.log("rendering at index", i)
                this.enemies[i].render(time);
            }
        }

    }


    addObject(object) {
        // this.objects.splice(0, 0, object);
        this.objects.push(object)

    }

    removeObject(id) {

        let temp = [...this.objects];

        this.objectIndexToRemove = this.objects.findIndex(object => {
            return object.id === id;
        });

        // console.log("enemyIndexToRemove ", this.enemyIndexToRemove)
        this.objects.splice(this.objectIndexToRemove, 1);
        // console.log(temp)
        // temp[enemyIndexToRemove].renderDisplay();
        // console.log(temp)

        // if (this.objects.length >= 1) {
        //     this.objectRemoved = true;
        //     console.log("enemyRemoved changed to true")
        // }
    }

    renderObjects() {

        if (this.objects.length > 0) {
            // console.log("length: ", this.objects.length)
            // for (let i = 0; i < this.objects.length; i++) {

            //     console.log("rendering at index", i)
            //     this.objects[i].render();

            //     if (this.objectRemoved) {
            //         console.log("length after removing: " + this.objects.length)
            //         console.log("rendering at index " + i + " again");
            //         this.objects[i].render();
            //         this.objectRemoved = false;
            //     }
            // }

            for (let i = this.objects.length - 1; i >= 0; i--) {

                    this.objects[i].render();
            }
        }
    }

    getEnemies() {
        return this.enemies;
    }

    getObjects() {
        return this.objects;
    }

    clear() {
        this.enemies = [];
        this.objects = [];
    }



    render(time) {
        this.renderEnemies(time);
        this.renderObjects();
    }

    renderDisplay() {
        this.enemies.forEach(enemy => {
            enemy.renderDisplay();
        });

        this.objects.forEach(object => {
            object.renderDisplay();
        });
    }
}

export default Handler;