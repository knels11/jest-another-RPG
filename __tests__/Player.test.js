const Player = require('../.lib/Player');
//imports Potion() constructor into test, establishing Potion as a usable variable
const Potion = require('../.lib/Potion');

//mocks/replaces the constructor's implementation with our faked data
jest.mock('../.lib/Potion');
console.log(new Potion());

test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

//we're checking that player.getStats() returns an object w 4 props
test('gets players stats as an object', () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');
    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});
//get info about Player's health
test("gets player's health value", () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});
//updating the value of our Player health halfway through the test to check for both true and false conditions
test('checks if player is alive or not', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();
    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});
//see if the correct amount of health is being subtracted from the Player health prop
test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);
    expect(player.health).toBe(oldHealth - 5);
    
    player.reduceHealth(99999);
    expect(player.health).toBe(0);
});
//verifies a player's attack value within range
test("gets player's attack value", () => {
    const player = new Player('Dave');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});
//check that a Potion was added correctly
test('adds a potioin to the inventory', () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', () => {
    const player = new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
});