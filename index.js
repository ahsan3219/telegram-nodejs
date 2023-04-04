

//  This code is a chatbot that uses the OpenAI API to generate responses.
// When receiving a '/start' message, the bot activates and sends a message with this text,
// and then when other messages are received, it uses the OpenAI API to generate a response.

const dotenv = require('dotenv').config();

const telegramAPI = require('node-telegram-bot-api');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})
PORT=process.env.PORT||3000
app.listen(3000)

const token = process.env.KEY_BOT;

const bot = new telegramAPI(token,{polling: true});

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);













const myText = "" +
    "Who are yu" ;

async function abc() {
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
            
            // console.log("result: ", result);          
                }            
        
        
        getapi(api_url)
        // console.log("result",result);
        // await bot.sendMessage(chatId, `Start `)




            }
//             else if (""){

//                 const api_url = 
//                 `https://sheetdb.io/api/v1/keqbu2v4inoqz/ `;
//                 an= async function getapi(url) {
              
//              let response = await fetch(url);
              
//               var data = await response.json();
// //  console.log("data",data);
//             //   texts(data)
//             let datas=JSON.stringify(data);
//         //   text(datas)
//     return datas    
//     }
//   abc=getapi(api_url)
// abc()
//   console.log();    
//   await bot.sendMessage(chatId, abc()       )     }
//             else if ( text.split(' ')[0]="start" ){
//                 // Pass model settings to OpenAI

//    const api_url = 
//                         `https://sheetdb.io/api/v1/keqbu2v4inoqz/ `;
                    
//                   async function getapi(url) {
                      
//                      let response = await fetch(url);
                      
//                       var data = await response.json();
//          console.log("data",data);
//                     }
//           getapi(api_url)

//                 const completion = await openai.createCompletion({
//                     model: 'text-davinci-003',
//                     prompt: text,
//                     temperature: 0.2,
//                     max_tokens: 180,
//                     top_p: 1.0,
//                     frequency_penalty: 0.2,
//                     presence_penalty: 0.2,
//                     stop: ["\n+"],
//                 })
//                 // send the generated response to the chat
//                 await bot.sendMessage(chatId, completion.data.choices[0].text);
//                 console.log(completion.data);
//         }
            
            
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
} ;
// abc()




// Start the server
if (process.env.NODE_ENV === "production") {
    // Use Webhooks for the production server
    const app = express();
    app.use(express.json());
    app.use(webhookCallback(abc, "express"));
  
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Bot listening on port ${PORT}`);
    });
  } else {
    // Use Long Polling for development
    abc();
  }



