// Create a NextJS POST request that returns a json object
import type { NextApiRequest, NextApiResponse } from 'next'
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;
import { pre_prompt } from './helpers/pre_prompt'


type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const configuration = new Configuration({
    organization: "org-oZLti1TYdsWzJJjWQDdQ0H83",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const message = req.body.message;
  const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${pre_prompt} ${message}?
      Goku:`,
      max_tokens: 200,
      temperature: 0,
    });
  console.log("called post function");
  // console.log(response.data);
  console.log("data choices",response.data.choices);
  if(response.data.choices[0].text){
      res.json({
                  message: response.data.choices[0].text
              })
  }
}
