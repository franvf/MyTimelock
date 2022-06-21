//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract GovernanceToken is ERC20Votes, Ownable{
    
    uint256 public supply = 100000000000000000000; //100 tokens

    //Token used for governance
    constructor()
        ERC20("GovernanceToken", "MTK")  
        ERC20Permit("GovernanceToken"){
            _mint(0x746858649ec117C6D6ecD299b4EAdc76B24f78f5, supply/4);
        }

    function mint(uint256 numTokens) public {
        _mint(msg.sender, numTokens); 
    }

    //Required overrides by solidity

    // ***** afterTokenTransfer, mint, burn *****
    function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20Votes){
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) internal override(ERC20Votes){
        super._mint(account, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20Votes){
        super._burn(account, amount);
    }
}