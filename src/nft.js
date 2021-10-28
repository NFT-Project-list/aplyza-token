const VRF_COORDINATOR = '0xa555fC018435bef5A13C6c6870a9d4C11DEC329C'
const LINKTOKEN = '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06'
const KEYHASH = '0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186'
async function main() {
    const Aplybot = await ethers.getContractFactory("Aplybot");
    // Start deployment, returning a promise that resolves to a contract object
    const aplyza = await Aplybot.deploy(VRF_COORDINATOR, LINKTOKEN, KEYHASH);
    console.log("Contract deployed to address:", aplyza.address);
}
/*
KOVAN: 0x086D40A14C85BA5dD4DAE93Ffb38c582f1776650
 */
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
