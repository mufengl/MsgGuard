# MsgGuard Set Up Guide

Bot setup: 
1) Add bot to server
2) Enter 'initialize' into any channel where the bot is present
3) Enter 'admin' to make the message author an admin
4) Enter 'member @account' to make the @account a member
5) Go to server settings >> roles >> permissions
6) Find and disable send message in the @everyone role
7) Find and disable send message in the Strike III role
8) (Or, if send message is already disabled, enable send message for member, strike I, and strike II roles)
9) Let everyone communicate freely! The bot will censor keywords and give a strike everytime someone uses it in the form of strike roles
10) After someone reaches strike 3, if the admin wishes, the admin can unmute the person by typing 'unmute @account'
11) The admin can also manually mute someone by typing 'mute @account'

Download notes:
1) Download project
2) Go to Discord Developper Portal to create a bot and copy its token
3) Replace the process.env.TOKEN with your own token
4) Create Mysql database
5) Enter your login information where process.env.DB_USER and process.env.DB_PASS are
6) Enter the words you want to censor into the censoredWords.js file in ../Resources

Additional disclaimer:
By adding the bot, all members are permitting for their messages to be recorded IF they use censored words.
