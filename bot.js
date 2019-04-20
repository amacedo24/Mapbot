const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
const gyms = require ("./gyms.json");


client.on("message", async message => {

    if(message.content.indexOf('!') !== 0) return;
	
    const args = message.content.split(' ');
    const command = args.shift();
        

	
	
	if(command == '!map'){
		var gyminput = args.join(" ").toLowerCase();
		var gymdb = gyms.gym;
		var found = 0;
		
		for(var gym in gymdb){
			if(gymdb[gym].gymname.toLowerCase().includes(gyminput)){
			   message.channel.send("**" +gymdb[gym].gymname 
									       +": **" +gymdb[gym].links);
				found = 1;
				break;
			}
		}
		if(found == 0){
			message.channel.send("Gym Not Found");
		}
 	}
	
	if(command == '!team'){
		var role = args.shift();
		var member = message.member;

		
		switch(role){
            case 'valor':
				role = message.guild.roles.find(r => r.name === "Valor");
				break;
            case 'mystic':
				role = message.guild.roles.find(r => r.name === "Mystic");
				break;
            case 'instinct':
				role = message.guild.roles.find(r => r.name === "Instinct");
				break;
            default:
				message.channel.send('Team not Found! Please try joining Valor, Mystic or Instinct. ex.!team Valor' );
				return;
          }
		  
		member.addRole(role).catch(console.error);
 	}
	
	
	
	
	if((command === "!purge")&&(message.author.id == '327162272990363648')) {
		// This command removes all messages from all users in the channel, up to 100.
		
		// get the delete count, as an actual number.
		const deleteCount = parseInt(args[0], 10);
		
		// Ooooh nice, combined conditions. <3
		if(!deleteCount || deleteCount < 2 || deleteCount > 100)
		  return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
		
		// So we get our messages, and delete them. Simple enough, right?
		const fetched = await message.channel.fetchMessages({count: deleteCount});
		message.channel.bulkDelete(fetched)
		  .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	}

});


client.login(process.env.BOT_TOKEN);
