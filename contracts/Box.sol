// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract box is Ownable{
    uint256 private value;

    function setValue(uint256 newValue) public onlyOwner() {
        value = newValue;
    }    

    function getValue() public view returns(uint256){
        return value;
    }
}