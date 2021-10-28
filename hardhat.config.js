/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const { PRIVATE_KEY } = process.env;

module.exports = {
    solidity: "0.8.3",
    defaultNetwork: "prebsc",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        hardhat: {
        },
        kovan: {
            url: `https://speedy-nodes-nyc.moralis.io/3af0d73e5250649d405b8a79/eth/kovan`,
            chainId: 42,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        ethnet:{
            url: `https://speedy-nodes-nyc.moralis.io/3af0d73e5250649d405b8a79/eth/mainnet`,
            chainId: 1,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        prebsc: {
            url: "https://speedy-nodes-nyc.moralis.io/3af0d73e5250649d405b8a79/bsc/testnet\n",
            chainId: 97,
            accounts: [`0x${PRIVATE_KEY}`],
        },
        bsc: {
            url: "https://speedy-nodes-nyc.moralis.io/3af0d73e5250649d405b8a79/bsc/mainnet",
            chainId: 56,
            accounts: [`0x${PRIVATE_KEY}`],
        }
    },
    etherscan: {
        apiKey: '6AR8R4ZRWNIWGRR17VPT9HRAIZN7DSFWRK'
    }
}