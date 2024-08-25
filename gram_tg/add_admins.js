const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

// Сессия владельца канала
const ownerSession = new StringSession("1AgAOMTQ5LjE1NC4xNjcuNDEBu6diX80UbU8xXI719W5swc+XSuuAh8C+s4Bau1aqaCgssJIfDHnZNk4UKTDjhKp0JXr69Sgu5uqyApsemv3995rHVgU6KWOj12QgXwtgGUa5iX+Jq0LSekFh6goN+F67BNs4zEaQmgZbcqnunLtiEQCcmTzTQT50MrgkUhJ3B0ZPEUZ+8mbHtdAt8sAFR+KKOkBqLtBsuHO1nWz6Y2JhSz39WUvmYR+8jxjQjsF80rbhVLDtvgPALjU2FTbFHCS+UMnA9Kw/dYgMlnb1wyj4pcvHGsdwJ5Fz3u8eOLvpsemW+yDEpyn6lKQ1kXmnGwak9CIWaweQ7v5f59bewMgAwLI=");

const API_ID = 25171031
const API_HASH = "10f7696a65a7217fad43302ea6ba1695"
const client = new TelegramClient(ownerSession, API_ID, API_HASH, {});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function run() {
    await client.connect();
    console.log("Сессия владельца канала запущена");


    // ID или имя пользователя канала, куда пользователи должны присоединиться
    const channelId = await client.getEntity('https://t.me/KuplyTraff');

    // Массив сессий, которые должны присоединиться и получить админку
    const sessionsToJoin = [
        "1BAAOMTQ5LjE1NC4xNjcuOTEBu2opl4BWuRDynh4Bn3xxd2Hg+fY8xPvro1WLrETZAH3S9oc4Q0C/QwwI9xEZbes+IFVcK375gG6oa05Fxbev2FUbsFSfhM4XpX+06oo9L8saH8VEPI6cqPrzfku4wAq/SnkycbNQH2/KOmHVBN9plgw1xkX1nY45VhJ2z4HLrFPaiSA6d7W9vUacHbDngdEZ/FIl6G0p+bzHpF7jbixLaCUbtzcpUywSmyjz1t+9EKvnYTWwAqH7oI9lDJ+NDDt0Jz9Dwz5lmBvgQr5uID+TcbSODfEAfM9J9hUiiRgeFl9LvEJksg49tngVpQdaZSMwOniPqFtaK3EwjygdZnl4flY=",
        "1BAAOMTQ5LjE1NC4xNjcuOTEBu2IaW3mSBq5bvIoiHpShHpgwmO/+DJC8T3GNpnuLhy/6iN3ZVn2XH/WLJu8O1GJ/APVpBuWpkfbodDxGNQwfUIu2Ma6kbKxJPtTwkJY0xCHzvrAqeF9Q7IfT/LbdTINVZc/ZISPWNIOPfj0D1D5Oe09z3kJ+yhhjekfqzd8mU+vLlM4GwZ/OJgmmhEyaln1ALNuNXuI/l/bgNQxhNi4bxQVumMFQJj0d+l8KIQssTp2LQYxRXJ/rJEGnsS0kHKtXh1KCKSHYbGfzE90qPQha6BI78lCuMShTVHIKQiEbvo1MyUr/9mnASrDb/by8ZkStgNRlV/pGgnsQYvLRykTZQrA=",
        "1BAAOMTQ5LjE1NC4xNjcuOTEBu6fgRRACISloy28tI7CpLKIzeX+GY8M/oXfWPHAhG5poLWc+OfMpOomvdgvUp8E0naLK+vluoyRl5ZV9+q4FDUJzPvyAP9Ee2WXwzz1q0wrQjj/NWj/rN53aWBMyWlbIMOIkmZ3osGI7M73kQ96l24O0QecUiy1uqlIT3FcXKK41QFWPRKLeuZcvw1A+okndHGnuItUKyWy2WXt5+5j7a8+DO3nQWkMmufkuFCQ2ZuQI+8TeQKuzrHL+JntWkQszV7/WrV4x2LllRD4PqhVFk3a849Vk8KS4EDbb9EUZLJM1LIhRwRILeCuHd7f0MK0vSEMRfOEjwZLJ3SLDOOWpp2I=",
        "1BAAOMTQ5LjE1NC4xNjcuOTEBuwUKQ/i4bmt4hnGagjF9+ItBiieCbygSkFhENx3f7t9KYcRMGvCQ7O2FEFnd++QMKHt+6ncjcYyeSzfh5yaeQfmdOWEqekAzr4hZC83ivZIAsK2T9JckBzvdcNzQoj0m79DI4ExmGwfgwVtXyOprJycRYu7qY0CX7RFv+7Db2GTyRTBd0vfKV6hDV1/uVi6+FBqPHjX3q3KlBytthiWW1xc3Lu8NG/EzUixwDzieB0XgCvDelWxTj6RvZaW3BV2mB4sw5PbbeD9xN6NsxiXF6F37pzcPiFl6FSRiGUhYiE6TBMyGrufPtLdW3DmO9fALu0C/rwUJyK8AbTCDtL/KAEU="
    ]

    // Массив сообщений, из которых бот будет выбирать случайное
    const messages = [
        "Залью трафик",
        "НАБОР В КОМАНДУ\nЦена от 0,4\nПисать в лс,даже новичкам",
        "залью любой трафик. 👀\nобьем 50+ в день✔️\nвсе в лс",
        "ИЩУ ТРАФЕРА КТО ЗАЛЬЕТ 200 ЛЮДЕЙ",
        "Залью трафик 💳\nВ лс",
    ];

    for (const sessionString of sessionsToJoin) {
        const userClient = new TelegramClient(new StringSession(sessionString), API_ID, API_HASH, {});
        await userClient.connect();

        // Присоединение пользователя к каналу
        const result = await userClient.invoke(
            new Api.channels.JoinChannel({
                channel: "KuplyTraff",
            })
        );

        console.log(`Пользователь ${await result.users[0]?.username} присоединился к каналу`);

        // Отправка случайного сообщения после присоединения
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        await userClient.sendMessage("KuplyTraff", { message: randomMessage });

        console.log(`Пользователь ${await result.users[0]?.username} отправил сообщение: "${randomMessage}"`);

        // Назначение пользователя администратором
        await client.invoke(
            new Api.channels.EditAdmin({
                channel: "KuplyTraff",
                userId: result.users[0]?.username,
                adminRights: new Api.ChatAdminRights({
                    changeInfo: true,
                    postMessages: true,
                    editMessages: true,
                    deleteMessages: true,
                    banUsers: true,
                    inviteUsers: true,
                    pinMessages: true,
                    addAdmins: false,
                    manageCall: true,
                }),
                rank: 'Inviter',
            })
        );

        console.log(`Пользователь ${await result.users[0]?.username} назначен администратором`);

        await userClient.disconnect();
        await delay(30000)
    }

    await client.disconnect(); // Отключение сессии владельца канала после обработки
})();
