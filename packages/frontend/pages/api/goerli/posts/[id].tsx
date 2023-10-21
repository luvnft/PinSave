import { fetchDecodedPost } from "@/services/fetchCid";
import { getContractInfo } from "@/utils/contracts";
import { AlchemyProvider, Contract } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const { address, abi } = getContractInfo(5);
    let provider = new AlchemyProvider(
      "goerli",
      process.env.NEXT_PUBLIC_ALCHEMY_ID
    );

    /*     
    const contract = new Contract(address, abi, provider);

    const result = await contract.getPostCid(id);
    const owner = await contract.getPostOwner(id);

    console.log("CID:" + result);

    const output = await fetchDecodedPost(result);

    res.status(200).json({ ...output, owner: owner }); */
    res.status(200).json({ id, address });
  } catch (err) {
    res.status(500).send({ error: "failed to fetch data" + err });
  }
}
