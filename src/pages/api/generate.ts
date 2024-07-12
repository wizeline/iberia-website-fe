// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type GenerateResponse = {
  imageData: string;
};

export default async function handler(
  _req: NextApiRequest,
  _res: NextApiResponse<GenerateResponse>,
) {
  const requestBody = JSON.parse(_req.body);
  console.log('Body: ', requestBody.prompt);
  /*const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${serverUrl}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: _req.body,
  });
  const text = await res.text();
  _res.status(200).send({ imageData: text });*/
  const openAIUrl = 'https://api.openai.com/v1/images/generations';
  const res = await fetch(openAIUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: requestBody.prompt,
      n: 1,
      quality: 'hd',
      style: 'natural',
      size: '1792x1024',
    }),
  });
  const json = await res.json();
  console.log(json);
  _res.status(200).send({ imageData: json.data[0].url });
}
