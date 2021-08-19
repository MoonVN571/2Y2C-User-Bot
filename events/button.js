const ButtonPages = require('discord-button-pages');

module.exports = {
    name: 'clickButton',

    execute(client) {
        ButtonPages.buttonInteractions(button, client.interaction);
    }
  
}