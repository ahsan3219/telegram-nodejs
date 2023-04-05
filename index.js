const dotenv = require('dotenv').config();
const fetch = require("node-fetch");
const telegramAPI = require('node-telegram-bot-api');

const token = process.env.KEY_BOT;

const bot = new telegramAPI(token,{polling: true});

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const myText = "" +
"Who are yu" ;


(async () => {
    try {
        // Catching a message from the chat
        bot.on('message', async msg => {
            const text = msg.text;
            const chatId = msg.chat.id;
            console.log(msg.text);
            // // Process the "/start" command and send brief information to the chat
            if (text === '/start') {
                myMessage = myText;
                await bot.sendMessage(chatId, `Hi Alfredo Mensi. I am your GoogleSheet Assistant.How can I help You.Start every message with keyword "Start".For example:Assistant tell me who is adam?`)
            } 


            else  if (text.slice(0, 5)==="start"||text.slice(0, 5)==="Start" )  {
              console.log("text",typeof(text));

                const api_url = 
                        `https://sheetdb.io/api/v1/keqbu2v4inoqz/ `;
                    
                  async function getapi(url) {
                      
                     let response = await fetch(url);
                      
                      var data = await response.json();
         console.log("data",data);
                      texts(data)
                    }
          
                    async function texts(data){
                        let datas=JSON.stringify(data);
                        let anc=`The is the list of all members in json form ${datas} Kindly read it carefully and  answer the question accordingly answer should be in text form should not contain json format.Remember last question and if need answer next question accordingly.`
                        myMessage = anc+text;
            console.log("Mymessage ", myMessage);           
            // let result = await textGeneration(anc);
            const completion = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: myMessage,
                temperature: 0.2,
                max_tokens: 200,
                top_p: 1.0,
                frequency_penalty: 0.2,
                presence_penalty: 0.2,
                stop: ["\n+"],
            })
            await bot.sendMessage(chatId, completion.data.choices[0].text);
            await bot.sendMessage(chatId,data);
            
            // console.log("result: ", result);          
                }            
        
        
        getapi(api_url)
        // console.log("result",result);
        // await bot.sendMessage(chatId, `Start `)




            }
//            
            else if ( myMessage = text ){
            // Pass model settings to OpenAI
            const completion = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: text,
                temperature: 0.2,
                max_tokens: 180,
                top_p: 1.0,
                frequency_penalty: 0.2,
                presence_penalty: 0.2,
                stop: ["\n+"],
            })
            // send the generated response to the chat
            await bot.sendMessage(chatId, completion.data.choices[0].text);
            console.log(completion.data);
    }

})
    // If there are errors, print them to the console
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}) ();
