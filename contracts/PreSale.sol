pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract PreSale {
    uint256 public constant tokenPerCore = 500000;
    address payable private receiver = payable(0xcaAC892428982B4837b0e84898D8A69887978bb7);
    IERC20 private token = IERC20(0x086D40A14C85BA5dD4DAE93Ffb38c582f1776650);
    function presale() public payable{
        uint256 amountToBuy = msg.value * tokenPerCore;
        uint256 vendorBalance = token.balanceOf(address(this));
        require(vendorBalance >= amountToBuy, "APZ Balance Not Enough");
        (bool sent)=token.transfer(msg.sender,amountToBuy);
        require(sent, "Failed to transfer token to user");
        receiver.transfer(msg.value);
    }
}
