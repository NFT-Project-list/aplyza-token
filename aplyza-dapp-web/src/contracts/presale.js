export const ABI_presale = [
    {
        constant: true,
        inputs: [],
        name: "presale",
        outputs: [],
        payable: true,
        stateMutability: "view",
        type: "function"
    }
];
export const ABI_blindbox = [
    {
        constant: true,
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string"
            },
            {
                internalType: "string",
                name: "uri",
                type: "string"
            }
        ],
        name: "requestNewRandomCharacter",
        outputs: [],
        payable: true,
        stateMutability: "view",
        type: "function"
    }
];
export const ABI_SS_Character_Detail = [
    {
        constant: true,
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "getCharacterStats",
        outputs: [
            {
                internalType: "uint256[6]",
                name: "",
                type: "uint256[6]"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    }
];
export const CONTRACT_Presale="0xcFA86E7A417C8dc20b7F3dbC6bA2D0b39297e9B1";
export const CONTRACT_Token="0x086D40A14C85BA5dD4DAE93Ffb38c582f1776650";
export const CONTRACT_NFT="0xc93fF98347C27926A2cB712b209D45a0224D86aB";
export const CHAINID_Main="0x61";
export const DEFAULT_DESC="STAR RAID - unique robot with different attribute, weapon , and appearances.";
export const ROBOTS= [
    'Mega',
    'Steam',
    'Z-178',
    'XM-18',
    'Ground',
    'Ultimate',
    'Old',
    'Kaboom',
    'Iron',
    'Mega',
    'Sniper',
    'WX-189',
    'Zigeon'
];
export const COMPANY=[
    'Tesla', 'X-Corp', 'Mars Federation', 'Blue','Raiden','Asian'
];