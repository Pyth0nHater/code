const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require('fs');

// Load the session string and create the Telegram client
const session = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTIBu2VYkzS/pYv88QNtZwb6zUVmg1VPE24XebIJVpKAN6zVTX6vBnib//xjDeCRq2pYQygGH5rKavKzB1+6LPzkeCYzNrDDxlvmaVNc8NGGfFtOFhQo8VaM72GRWKocUsZ8kZmGQ/M3CZi6Hu4cIUuPt20HSz6kT1j9B+bUKpzX/yk/pC/b/x4SgI9xSjeB2fYTs1fpBUzlDG/XEPRTtgWsaCFrh99WianPLiWSQaABq7u05UYF/7AK/743hZIypKOu3jIl9TQZRnL2+9MA6ZmlRNQW2UYU0kRscMFN4L62C4JGad0R1bn8M4Mzy61cJZNIl4R8jhJ5Twx2wbaiN3624s8=");
const client = new TelegramClient(session, 25171031, '10f7696a65a7217fad43302ea6ba1695', {});

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Load the user data from the JSON file
const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

(async function run() {
    await client.connect(); // Connect to the Telegram client

    // Loop through the users array
    for (let i = 0; i < 50; i++) {
        const user = users[i];

        try {
            // Get the entity for the user (by username)
            const entity = await client.getEntity(user.username);

            // Send a message to the user
            const result = await client.invoke(
                new Api.messages.SendMessage({
                    peer: entity,
                    message: `Hello!`, // Personalize the message
                    randomId: BigInt(Date.now()) + BigInt(i), // Unique randomId for each message
                    noWebpage: true,
                    noforwards: true,
                    scheduleDate: 43, // Optional: schedule the message to be sent later
                })
            );

            console.log(`Message sent to ${user.username}:`, result); // Log the result

            // Apply a delay after every 3rd message
            if ((i + 1) % 3 === 0) {
                console.log('Pausing for 30 seconds...');
                await sleep(30000); // Pause for 30 seconds
            }
        } catch (err) {
            console.error(`Failed to send message to ${user.username}:`, err.message);
        }
    }
})();
