const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require('fs');

const session = new StringSession("1AgAOMTQ5LjE1NC4xNjcuNDEBu6diX80UbU8xXI719W5swc+XSuuAh8C+s4Bau1aqaCgssJIfDHnZNk4UKTDjhKp0JXr69Sgu5uqyApsemv3995rHVgU6KWOj12QgXwtgGUa5iX+Jq0LSekFh6goN+F67BNs4zEaQmgZbcqnunLtiEQCcmTzTQT50MrgkUhJ3B0ZPEUZ+8mbHtdAt8sAFR+KKOkBqLtBsuHO1nWz6Y2JhSz39WUvmYR+8jxjQjsF80rbhVLDtvgPALjU2FTbFHCS+UMnA9Kw/dYgMlnb1wyj4pcvHGsdwJ5Fz3u8eOLvpsemW+yDEpyn6lKQ1kXmnGwak9CIWaweQ7v5f59bewMgAwLI=");
const client = new TelegramClient(session, 25171031, '10f7696a65a7217fad43302ea6ba1695', {});

(async function run() {
    await client.connect(); // This assumes you have already authenticated with .start()
  
    const chat = await client.getEntity('https://t.me/Kuplyu_prodam_trafik');

    let totalMessages = [];
    let lastMessageId = 0;

    while (totalMessages.length < 1000) {
        const messages = await client.getMessages(chat, { 
            limit: 100, 
            offsetId: lastMessageId
        });

        if (!messages.length) break;

        totalMessages = totalMessages.concat(messages);
        lastMessageId = messages[messages.length - 1].id;
    }

    totalMessages = totalMessages.slice(0, 100);

    // Extract user IDs
    let userIds = totalMessages
        .map(msg => msg.fromId)
        .filter(id => id && id.className === 'PeerUser') // Ensure it's a PeerUser
        .map(id => id.userId.value); // Extract the value from the Integer object


    // Fetch user information
    try {
        const users = await client.invoke(
            new Api.users.GetUsers({
                id: userIds,
            })
        );

        // Extract unique usernames
        const uniqueUsernames = users
            .map(user => user.username)
            .filter(username => username !== undefined || username !== null); // Filter out undefined usernames

        // Save usernames to file
        fs.writeFileSync('unique_usernames.json', JSON.stringify(uniqueUsernames, null, 2));
        console.log('Unique usernames saved to unique_usernames.json');
    } catch (error) {
        console.error('Error fetching user info:', error.message);
    }

    await client.disconnect();
})();
