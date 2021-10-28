pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Aplybot is ERC721URIStorage,Ownable,VRFConsumerBase {
    using SafeMath for uint256;
    using Strings for string;
    address payable private receiver = payable(0xcaAC892428982B4837b0e84898D8A69887978bb7);
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    address public VRFCoordinator;
    address public LinkToken;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    struct Character {
        uint256 strength;
        uint256 speed;
        uint256 agility;
        uint256 intelligence;
        uint256 defendse;
        uint256 experience;
        string name;
    }
    Character[] public characters;
    mapping(bytes32 => string) requestToCharacterName;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => string) requestToURI;
    mapping(bytes32 => uint256) requestToTokenId;

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash)
    VRFConsumerBase(_VRFCoordinator, _LinkToken)
    ERC721("Aplyzabot", "APZB") {
        VRFCoordinator = _VRFCoordinator;
        LinkToken = _LinkToken;
        keyHash = _keyhash;
        fee = 0.1 * 10**18; // 0.1 LINK
    }
    function requestNewRandomCharacter(
        string memory name, string memory uri
    ) public payable returns (bytes32) {
        require(msg.value >= 1*10**18,"insufficient balance");
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        bytes32 requestId = requestRandomness(keyHash, fee);
        requestToCharacterName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        requestToURI[requestId] = uri;
        receiver.transfer(msg.value);
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
    internal
    override
    {
        uint256 newId = characters.length;
        uint256 strength = (randomNumber % 100) % 18;
        uint256 agility = ((randomNumber % 10000)/100) % 18;
        uint256 speed = ((randomNumber % 1000000)/10000) % 18;
        uint256 intelligence = ((randomNumber % 100000000)/1000000) % 18;
        uint256 defendse = ((randomNumber % 10000000000)/100000000) % 18;
        uint256 experience = 0;

        characters.push(
            Character(
                strength,
                agility,
                speed,
                intelligence,
                defendse,
                experience,
                requestToCharacterName[requestId]
            )
        );
        _safeMint(requestToSender[requestId], newId);
        _setTokenURI(newId, requestToURI[requestId]);
    }
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }
    function getLevel(uint256 tokenId) public view returns (uint256) {
        return sqrt(characters[tokenId].experience);
    }

    function getNumberOfCharacters() public view returns (uint256) {
        return characters.length;
    }

    function getCharacterStats(uint256 tokenId)
    public
    view
    returns (
        uint256,
        uint256,
        uint256,
        uint256,
        uint256,
        uint256
    )
    {
        return (
            characters[tokenId].strength,
            characters[tokenId].agility,
            characters[tokenId].speed,
            characters[tokenId].intelligence,
            characters[tokenId].defendse,
            characters[tokenId].experience
        );
    }
    function sqrt(uint256 x) internal view returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}