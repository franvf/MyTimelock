//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/governance/TimelockController.sol";

contract timeLock is TimelockController {
    
    constructor(uint256 minDelay, 
                address[] memory proposers, 
                address[] memory executors
                ) TimelockController(minDelay, proposers, executors){}
}