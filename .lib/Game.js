const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

//properties a game object is intended to have
function Game() {
this.roundNumber = 0;
this.isPlayerTurn = false;
this.enemies = [];
this.currentEnemy;
this.player;
}

Game.prototype.initializeGame = function() {
this.enemies.push(new Enemy('goblin', 'sword'));
this.enemies.push(new Enemy('orc', 'baseball bat'));
this.enemies.push(new Enemy('skeleton', 'axe'));

//keep track of which enemy is fighting player
this.currentEnemy = this.enemies[0];

//prompt user for their name
inquirer
    .prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
    })
    //destructure name from prompt object
    .then (( { name }) => {
        this.player = new Player(name);
        // console.log(this.currentEnemy, this.player);
        //called at the first battle and anytime a new round starts
       this.startNewBattle();
    });
};

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

//responsible for each individual turn in the round
    this.startNewBattle(); 
};

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        //player prompts will go here
        inquirer 
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Attack', 'Use potion']
        })
        .then(({ action })=> {
            if (action === 'Use potion') {
                //follow up prompt here
                if (!this.player.getInventory()) {
                    console.log("you dont have any potions!");
                    return;
                }
                inquirer 
                .prompt({
                    type: 'list',
                    message: 'Which potion would you like to use?',
                    name: 'action',
                    choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                })
                .then(({ action }) => {
                    const potionDetails = action.split(': ');

                    this.player.usePotion(potionDetails[0] - 1);
                    console.log(`You used a ${potionDetails[1]} potion.`);
                });

            }else {
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);
                console.log(`You attacked the ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());
            } 
        });
    } 
    //else {
      //  const damage = this.currentEnemy.getAttackValue();
        //this.player.reduceHealth(damage);
        //console.log(`You were attacked by the ${this.currentEnemy.name}`);
        //console.log(this.player.getHealth());
    //}
};

Game.prototype.checkEndofBattle = function() {
//player uses a potion
//player attempts to use a potion but has empty inventory
//player attacks the enemy
//enemy attacks the player
};


module.exports = Game;