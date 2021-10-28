async function main() {
    const AplyzaToken = await ethers.getContractFactory("AplyzaToken");

    // Start deployment, returning a promise that resolves to a contract object
    const aplyza = await AplyzaToken.deploy();
    console.log("Contract deployed to address:", aplyza.address);
}
/*
kovan : 0x71e3F4F4B6B9291FbC1eAf39a1e03E156D744DA7
 */
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
