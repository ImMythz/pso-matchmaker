const { SlashCommandBuilder } = require('@discordjs/builders');
const { retrieveTeam, replyTeamNotRegistered } = require('../services');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('team_name')
        .setDescription('Let you edit the name of your team')
        .addStringOption(option => option.setName('name')
            .setRequired(true)
            .setDescription('The new name of your team')
        ),
    async execute(interaction) {
        let team = await retrieveTeam(interaction)
        if (!team) {
            await replyTeamNotRegistered(interaction)
            return
        }

        team.name = interaction.options.getString('name')
        team.save()
        await interaction.reply({ content: `✅ Your new team name is ${team.name}` })
    },
};