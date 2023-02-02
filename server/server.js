import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration , OpenAIApi} from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}); 

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/' , async (req, res) => {
   res.status(200).send({
    message : 'Hello' ,
   })
})

app.post('/' , async (req , res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `
            ${prompt}
             Explain me the above code snippet and if it is not a code or some programming language kindly warn me the same and suggest me to input a code instead  
            `,
            temperature: 0,
            max_tokens: 2500,
            top_p: 1,
            frequency_penalty: 0.2,
            presence_penalty: 0,
          });
          res.status(200).send({
           bot: response.data.choices[0].text
          })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

app.listen( $PORT , ()=> 
    console.log('Server is running') 
    
)