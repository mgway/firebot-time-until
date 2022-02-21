import {Firebot} from "firebot-custom-scripts-types";

interface Params {
    date: string;
    message: string;
    sendAs: [];
    ignoreIfInPast: boolean;
}

const script: Firebot.CustomScript<Params> = {
    getScriptManifest: () => {
        return {
            name: "Time Until",
            description: "Send a message about the time until an event like a game release or a birthday",
            author: "oh_mg",
            version: "1.1.0",
            firebotVersion: "5",
        };
    },
    getDefaultParameters: () => {
        return {
            date: {
                type: "string",
                default: (new Date).toISOString(),
                description: "Target Date",
                secondaryDescription: "Date must be formatted like '01 Jan 2022 00:00:00 GMT' or '2019-01-01T00:00:00.000Z'",
            },
            message: {
                type: "string",
                useTextArea: true,
                default: "%days days until Elden Ring",
                description: "Message to send to chat",
                secondaryDescription: "Variable are %days, %hours, %minutes, %seconds, %rDays, %rHours %rMinutes. " +
                    "The 'r' prefixed variables should be used when multiple time components are used, e.g. '%rDays days %rHours hours until Elden Ring', " +
                    "while the non-prefixed variables should be used when the duration is by itself, e.g. '%days until Elden Ring'",
            },
            sendAs: {
                type: "enum",
                default: "Streamer",
                description: "Send the chat message as",
                secondaryDescription: "'Bot' has no effect if no bot user is set up",
                options: ["Streamer", "Bot"],
            },
            ignoreIfInPast: {
                type: "boolean",
                default: true,
                description: "Don't send message if target date is in the past",
            },
        };
    },
    run: (runRequest) => {
        const {logger} = runRequest.modules;

        const now = new Date()
        const targetDate = Date.parse(runRequest.parameters.date)
        if (isNaN(targetDate)) {
            return Promise.reject("Unable to parse date")
        }

        const sendAs = runRequest.parameters.sendAs
        const message = runRequest.parameters.message

        // @ts-ignore
        const totalSeconds = Math.ceil((targetDate - now) / 1000)
        logger.debug(`Total seconds: ${totalSeconds}`)

        if (totalSeconds < 0 &&runRequest.parameters.ignoreIfInPast) {
            return Promise.reject("Target date is in the past and ignoreIfInPast = true")
        }

        const totalMinutes = Math.ceil(totalSeconds / 60)
        const totalHours = Math.ceil(totalSeconds / (60*60))
        const totalDays = Math.ceil(totalSeconds / (60*60*24))

        const days = Math.floor(totalSeconds / (60*60*24))
        const hours = Math.floor(totalSeconds % (60*60*24) / 3600)
        const minutes = Math.floor(totalSeconds % (60*60*24) % 3600 / 60)

        const formattedMessage = message
            .replace('%rDays', `${days}`)
            .replace('%rHours', `${hours}`)
            .replace('%rMinutes', `${minutes}`)
            .replace('%seconds', `${totalSeconds}`)
            .replace('%minutes', `${totalMinutes}`)
            .replace('%hours', `${totalHours}`)
            .replace('%days', `${totalDays}`)

        return new Promise((resolve, reject) => {
            resolve({
                success: true,
                effects: [
                    {
                        type: "firebot:chat",
                        message: formattedMessage,
                        chatter: sendAs,
                    }
                ]
            })
        })
    },
};

export default script;
