const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Button } = require("telegram/tl/custom/button");


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

    const channelName = generateRandomString(12)
    console.log(`https://t.me/${channelName}`)

    await client.connect(); 
    const result = await client.invoke(
      new Api.channels.CreateChannel({
        title: "test chennel",
        about: "test",
        megagroup: false,
        forImport: true,
        geoPoint: new Api.InputGeoPoint({
          lat: 8.24,
          long: 8.24,
          accuracyRadius: 43,
        }),
        address: "213",
      })
    );

    const channeId = result.updates[2].channelId.value

    
    const result2 = await client.invoke(
        new Api.channels.UpdateUsername({
        channel: channeId,
        username: channelName,
        })
        );

    console.log(result2);
    
    const entity = await client.getEntity(`https://t.me/${channelName}`);

    
    const result3 = await client.invoke(
        new Api.messages.SendMessage({
          peer: entity,
          message: "Hello there! \n https://clck.ru/3CaM5e",
          randomId: BigInt("-4156887774564"),
          noWebpage: true,
          noforwards: true,
          scheduleDate: 43,
          sendAs: "username",
        })
      );
  })();