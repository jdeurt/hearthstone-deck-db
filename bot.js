/*
    Hearthstone Deck Database for Discord
    created by Sharky

    http://sharky.tf
*/

const config = require("./config.json");

const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client();

bot.on("ready", () => {
    console.log("Login successful!");
    console.log(`
        USAGE:\n
        \t{{aggro paladin deckcode}} sets the deck code for aggro paladin to deckcode\n
        \t{{aggro paladin}} sends the deck code for aggro paladin
    `);
});

bot.on("message", msg => {
    if(msg.author.id != bot.user.id) return;
    let deckData = JSON.parse(fs.readFileSync("./decks.json", "utf8"));
    let decks = msg.content.match(/{{.*?}}/g);
    if(!decks) return;
    decks.forEach(inBracket => {
        let cmd = inBracket.replace(/{/g, "").replace(/}/g, "");
        let args = cmd.split(" ");

        if(args.length < 2) return;

        let deck = {};
        deck.name = args[0].toLowerCase();
        deck.hero = args[1].toLowerCase();
        if(!deckData[deck.hero]) deckData[deck.hero] = {};

        if(args.length > 2) {
            deck.code = args[2];
            deckData[deck.hero][deck.name] = deck.code;
            console.log(deckData[deck.hero][deck.name]);
            fs.writeFile("./decks.json", JSON.stringify(deckData), err => {
                if (err) console.error(err);
            });
            msg.channel.send(`
                \`\`\`Successfully added ${deck.name} ${deck.hero} to the decklist\`\`\`
            `);
        }

        else {
            if(!deckData[deck.hero][deck.name]) msg.channel.send("\`\`\`Deck not found :(\`\`\`");
            else {
                deck.code = deckData[deck.hero][deck.name];
                msg.channel.send(`
                    \`\`\`${deck.code}\`\`\`
                `);
            }
        }
    });
});

bot.login(config.token);