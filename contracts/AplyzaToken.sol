// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.8.3;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
contract AplyzaToken is ERC20,AccessControl {
    bytes32 public constant BURNER_ROLE = keccak256("MINTER_ROLE");
    constructor() ERC20("Aplyza Token", "APZ") {
        _setupRole(BURNER_ROLE, msg.sender);
        _mint(msg.sender,100000000*10**18);
    }
    function burn(uint256 amount) public {
        require(hasRole(BURNER_ROLE, msg.sender), "Caller is not a minter");
        burn(amount);
    }
}
