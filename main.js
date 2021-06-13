const Discord = require(`discord.js`); 
const config = require('dotenv').config();
const client = new Discord.Client();
const {wordList} = require(`./Resources/censoredWords.js`);
const mysql = require(`mysql`)

var connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "Messages"
  });

  
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

client.on(`ready`, () => {
    console.log(`ready!`);
    client.user.setPresence({activity: {name: `Go to https://MsgGuard.chrisytz.repl.co for help`}, status: `online`});
    
});


client.on(`message`, message => {
    if (message.author.bot) return;
    message.content = message.content.toLowerCase();
    let words = [];
    words = message.content.split(" ");
    let counter = words.length;

    if (message.content.startsWith('admin')) {
        
            let admin = message.guild.roles.cache.find(role => role.name == "admin");
            message.member.roles.add(admin);
            message.reply('admin role assigned to you!');
            return;
        // } else {
        //     message.reply('Admin role already assigned');
        //     return;
        // }
    }

    if (message.content.startsWith('initialize')) {
        if (!message.guild.roles.cache.find(role => role.name == "admin")) {
            console.log("Creating role");
            message.guild.roles.create({
                data: {
                name: 'admin'
                },
                reason: 'admin',
            });
        }
        if (!message.guild.roles.cache.find(role => role.name == "member")) {
            console.log("Creating role");
            message.guild.roles.create({
                data: {
                name: 'member'
                },
                reason: 'New default',
            });
        }
        if (!message.guild.roles.cache.find(role => role.name == "Strike I")) {
            console.log("Creating role");
            message.guild.roles.create({
                data: {
                  name: 'Strike I'
                },
                reason: 'First strike',
            });
        } 
        if (!message.guild.roles.cache.find(role => role.name == "Strike II")) {
            console.log("Creating role");
            message.guild.roles.create({
                data: {
                  name: 'Strike II'
                },
                reason: 'Second strike',
            });
        } 
        if (!message.guild.roles.cache.find(role => role.name == "Strike III")) {
            console.log("Creating role");
            message.guild.roles.create({
                data: {
                  name: 'Strike III'
                },
                reason: 'Third strike',
            });
        } 
        message.reply("initialization complete!")
        return;
    }

    if (message.content.startsWith('member')) {
        let roleD = message.guild.roles.cache.find(role => role.name == "member");
        let user = message.mentions.members.first();
        user.roles.add(roleD)
        message.reply("role assigned!");
        return;
    }

    for (const element of wordList) {
        for (var i=0;i<counter;i++) {
            if (element == words[i]) {
                
                var sql = `INSERT INTO records(userid, message, time) VALUES(${message.author.id}, '${message.content}','${message.createdTimestamp}')`;
                connection.query(sql, function (err, result) {
                    if(err) throw err;
                console.log("success");
                });
                
                
                message.delete();
                message.channel.send(`The message by ${message.author} has been deleted due to harmful content`);
                message.author.send(`Your message was removed as harmful words were detected in it, to know more about appropriate communication and the harms of cyberbullying, visit MsgGuard's website`);
                message.author.send(`https://MsgGuard.chrisytz.repl.co`);
            
                
                let role1 = message.guild.roles.cache.find(role => role.name == "Strike I");
                let role2 = message.guild.roles.cache.find(role => role.name == "Strike II");
                let role3 = message.guild.roles.cache.find(role => role.name == "Strike III");
                let roleDefault = message.guild.roles.cache.find(role => role.name == "member");

                if (message.member.roles.cache.some(role => role.name == 'Strike I')) {
                    message.member.roles.add(role2);
                    message.member.roles.remove(role1);
                } else if (message.member.roles.cache.some(role => role.name == 'Strike II')) {
                
                    message.member.roles.add(role3);
                    message.member.roles.remove(role2);
                    message.member.roles.remove(role1);
                } else if ((!message.member.roles.cache.some(role => role.name == 'Strike I'))&&(!message.member.roles.cache.some(role => role.name == 'Strike II'))&&(!message.member.roles.cache.some(role => role.name == 'Strike III'))) {
                    message.member.roles.add(role1);
                    message.member.roles.remove(roleDefault);
                } else {
                    return;
                }
                
                
            }
        }
    }
    if (message.content.startsWith('unmute')&&(message.member.roles.cache.some(role => role.name == 'admin'))) {
        let role = message.guild.roles.cache.find(role => role.name == "member");
        let strikes = message.guild.roles.cache.find(role => role.name == "Strike III");
        let user = message.guild.member(message.mentions.users.first());
        user.roles.remove(strikes);
        user.roles.add(role);
        message.reply("unmute success!");
        return;
    }
    if (message.content.startsWith('mute')&&(message.member.roles.cache.some(role => role.name == 'admin'))) {
        let user = message.guild.member(message.mentions.users.first());
        let strikes = message.guild.roles.cache.find(role => role.name == "Strike III");
        user.roles.set([]);
        user.roles.add(strikes);
        message.reply( `muted ${user} successfully!`);
        return;
    }
});

client.login(process.env.BOT_TOKEN);
