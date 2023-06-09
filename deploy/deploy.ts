import fs from "fs"
import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { Address } from "zksync-web3/build/src/types";

const PRIV_KEY = fs.readFileSync(".env").toString()

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the uniswap contracts`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIV_KEY);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("SwapRouter");

  const FACTORY = "0xFd178772FCc75fF07CAF8A250EFC25924054ee00"
  const WETH9 = "0x20b28B1e4665FFf290650586ad76E977EAb90c5D";                   // zkSync Era Testnet
  const NFTPositionDescriptor = "0xBF90A41C5eBB025bA2D4BeC40bef65C3f1CA72c9"
  const PositionManger = '0xD58bF2851F5eA1eC131D8C0a0D5ACC8580ca8402'


  const greeterContract = await deployer.deploy(artifact, [FACTORY, WETH9]);
  console.log("constructor args:" + greeterContract.interface.encodeDeploy([FACTORY, WETH9]));

  // Show the contract info.
  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

  

}