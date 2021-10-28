async function main() {
    const PreSale = await ethers.getContractFactory("PreSale");

    // Start deployment, returning a promise that resolves to a contract object
    const presale = await PreSale.deploy();
    console.log("Contract deployed to address:", presale.address);
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
