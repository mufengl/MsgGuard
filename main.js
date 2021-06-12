const Discord = require(`discord.js`); 
const client = new Discord.Client();
const {wordList} = require(`./Resources/censoredWords.js`);


client.on(`ready`, () => {
    console.log(`ready!`);
    client.user.setPresence({activity: {name: `Go to LINK for help`}, status: `online`});
    
});


client.on(`message`, message => {
    if (message.author.bot) return;
    message.content = message.content.toLowerCase();
    let words = [];
    words = message.content.split(" ");
    let counter = words.length;

    if (message.content.startsWith('admin')) {
        
        if (message.guild.roles.cache.find(role => role.name == "admin").members.size = 1) {
            message.reply('Admin role already assigned');
            return;
        } else {
            message.member.roles.add(admin);
        }
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

    if (message.content.startsWith('assign roles')&&(message.member.roles.cache.some(role => role.name == 'admin'))) {
        let role = message.guild.roles.cache.find(role => role.name == "member");
        message.guild.members.cache.forEach(member => member.roles.add(role));
        message.reply("roles assigned!");
        return;
    }

    for (const element of wordList) {
        for (var i=0;i<counter;i++) {
            if (element == words[i]) {
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


client.login(`ODUzMDc1NzM2NDQ0Nzk2OTM5.YMQGsA.nEDtGDA12r6F_YwS9ANVNPWBm3Q`);
