import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const recoverToken = req.query.t as string;
  console.log(recoverToken)

  res.status(200).json({ message: 'Hello from Next.js!' })
}