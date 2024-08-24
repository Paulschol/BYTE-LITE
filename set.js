 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0RETXBqc1htNll5eVFNL1dqRFZRUUs4R3RSMk1lblYwZVo4SnNFQkNHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkpvV2FmcFNUUXV3cWdkQnAyQ0VhWUQ0aURnd1JWK24rSHQ5SzZCUHh4bz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4TklwcHJjNmx3OWs3alFpQitBSFNrYVpPUm9GbE56UkNuajZwakRiSDI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyRW5zOTBjMTZyVi9obW85dTFTaHl5Z1JEWkhZU1dpSFhOZitQQXAwRDE4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1CcitqcU05Tlk2OWk5Y2ZuL0RtNDlvbHR3MGlsNHhOZG5qdWMweEc3SFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNOMHlXMkMzZXYzRkJUS3NLMVpLMEM4endncWtwc2drMlp5cUdvMVhKWFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU5LRkdpaVh6OXpqVHhDS1NsdUpYL21JRnlJb1JRTlpiT0RuU1R2ZUZsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1dKUklUT0VUVmhWME96cUFtSDYwUkR3T3duMFpycEQ1QTkvTk5sd3N4Yz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdwUTJqUXVNUkoybDVMU2hVUVVwNCtieU1hRktya2NINTFuZEhOVjVRMklHak55U1pjQ1plMDVPVVNPc2t2dzNCZFhjWngvbzhaWkQvb1FLSXgrVkJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM0LCJhZHZTZWNyZXRLZXkiOiJUYUJUdjRoMUFpb0FFemR1akJ2Y3UyUmhvVGIrQm1TNlpoV3lYY1JFZjgwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiItTnB4Q2hMeVJTaTFsZ3FoYnZlaDR3IiwicGhvbmVJZCI6IjFjNjgyNWY2LTBmNmMtNDUwZC04OTlkLTY3MTYwYjYzODY2MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3V1hFUUpVQlRYRUFPanhPM0tZZVhFa1lSTTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0phSm8vWEVKL1R4U1ZWTGRVVGRtMERYbThZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlkxRTVMQ05EIiwibWUiOnsiaWQiOiIyMzQ5MDY3ODQ3MjI2OjQ3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKK2svcDhFRUpPV3ByWUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJBVU1Ra3JFdUVSa0hJTlEzSkdUSUR6QUNRSkFzdEZ5RXRiTStCZHBzWlQ0PSIsImFjY291bnRTaWduYXR1cmUiOiJXTHNDSTVFWXE5VGhoOWNZdkNpUE5CaElzSVJaYXBQSlZ6RE9HbE1XclI4b0p3aGg4eitmOU1Ua01OYnU3TXV6clNmazM5L3lGYkI5cVdOdlhVNGZDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiak55dXRRdVNsRWRvY3hUZjBNTlNhbll6ZUZRbG1DYkhtRG9WblRUK09YSzNQUkdjSzBCM2pWSWlCMXdFcGRQUU9UU0xoWXhEZUJySlJSZHZLYlBPQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDY3ODQ3MjI2OjQ3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFGREVKS3hMaEVaQnlEVU55Umt5QTh3QWtDUUxMUmNoTFd6UGdYYWJHVSsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ0ODQzODR9',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "Anonymous Dave",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2349067847226",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
