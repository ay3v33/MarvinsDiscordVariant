const { SlashCommandBuilder } = require('discord.js');
const Guild = require('../../models/guild');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('post')
		.setDescription('Post a message from database.')
		.addStringOption(option =>
			option
				.setName('phrase')
				.setDescription('The phrase you set for the message.')
				.setRequired(true)
		),
	async execute(interaction) {
		const phraseOp = interaction.options.getString('phrase');
		const data = await Guild.findOne({ where: { phrase: phraseOp } });
		let msglink = '';
		let public = '';
		let usrsentid = '';
		let usrsent = '';
		let createdAt = '';

		if(data != null) {
			usrsentid = data.dataValues.usersentid;
			usrsent = interaction.client.users.cache.find(user => user.id === usrsentid);
			let createdAt = data.dataValues.createdAt;
			msglink = data.dataValues.imglink;
			public = data.dataValues.public;
			createdAt = createdAt.toString();
			if(public) {
				await interaction.reply(`${msglink} - ${usrsent} on ${createdAt.slice(0, 15)}`);
			}
			else {
				await interaction.reply('Access denied buster!');
			}
		}
		else {
			await interaction.reply('This phrase doesn\'t exist bozo.');
		}
	},
};