const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const session = new StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEBu7YJTn1IGFUuX63RH11RfnUFG67761MOE9SNnJxRc4zeIHY+X0VGLA4tjkVvCis3btkXwCBcwaAC9cwLYQmOhI2xlaZUgRHYnoHFr/mHekabraxSfNfU3dsgl2T/u3+N7+gRLHNFAfEMHKoBQQfhbekt+FpqNkycylF43RQeRpT/jqQaDtOuT8sBqHpEZI/aQPZDGAIs2y85pVSf6lfi2JVhEvcdEzhoUfMAtxaf7FIrURAua+jaIU0Btv3/MbDOuZmZspMp/whiiqtz7bmGY2/vGXOVDrdB9dZXtHkhYNAVcovONUVga5L4Js+jKQ8WmhJwhQXfeyXWEnCZHmsZTfE=");
const client = new TelegramClient(session, 25171031, '10f7696a65a7217fad43302ea6ba1695', {});

(async function run() {

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const channelName = generateRandomString(12);

    await client.connect();

    // Step 1: Create a channel (supergroup)
    const result = await client.invoke(
        new Api.channels.CreateChannel({
          title: "Test Channel",
          about: "This is a test channel",
          megagroup: true, // Use 'megagroup: true' to create a supergroup
        })
    );

    const channelId = result.chats[0].id; // ID of the created channel

    // Step 2: Make the channel public by setting a username
    const result2 = await client.invoke(
        new Api.channels.UpdateUsername({
          channel: channelId,
          username: channelName, // This sets the username, making the channel public
        })
    );

    console.log(`https://t.me/${channelName}`);


    // Step 3: Optionally send a message to the newly created public channel
    const entity = await client.getEntity(`https://t.me/${channelName}`);

    const result3 = await client.invoke(
        new Api.messages.SendMessage({
          peer: entity,
          message: "Hello there! This is a public channel.",
          randomId: BigInt("-4156887774564"),
          noWebpage: true,
          noforwards: true,
        })
    );



    // Disconnect the client when done
    await client.disconnect();
})();
