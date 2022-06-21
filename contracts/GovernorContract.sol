//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/governance/Governor.sol";
import "../node_modules/@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "../node_modules/@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "../node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "../node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "../node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

contract GovernorContract is 
    Governor, 
    GovernorSettings, 
    GovernorCountingSimple, 
    GovernorVotes, 
    GovernorVotesQuorumFraction, 
    GovernorTimelockControl {

    //GovernorSettings: Wait 0 blocks to allow votes, is possible to vote during a week. 
    // The third parameter is the number of votes possesed by an account to make a proposal

    //GovernorVotesQuorumFraction: 1 quorum = 4% of total supply (We need the 4% of total supply to approve a proposal)
    constructor(IVotes tokenAddress, TimelockController timelock) 
        Governor("My governor")
        GovernorSettings(0, 45818 , 0) 
        GovernorVotes(tokenAddress)
        GovernorVotesQuorumFraction(4)
        GovernorTimelockControl(timelock) {}

    function getMyVoteWeight(uint256 blockNumber) public view returns(uint256){
        return _getVotes(msg.sender, blockNumber, "");
    }

    //Override the necessary functions

    function votingDelay() public view override(IGovernor, GovernorSettings) returns(uint256){
        return super.votingDelay();
    }

    function votingPeriod() public view override(IGovernor, GovernorSettings) returns(uint256){
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber) public view override(IGovernor, GovernorVotesQuorumFraction) returns(uint256){
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId) public view override(Governor, GovernorTimelockControl) returns(ProposalState){
        return super.state(proposalId);
    }

    function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description) public override(Governor, IGovernor) returns(uint256) {
        return super.propose(targets, values, calldatas, description);
    }

    function proposalThreshold() public view override(Governor, GovernorSettings) returns(uint256){
        return super.proposalThreshold();
    }

    function _execute(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash) internal override(Governor, GovernorTimelockControl) {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash) internal override(Governor, GovernorTimelockControl) returns(uint256){
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor() internal view override(Governor, GovernorTimelockControl) returns(address){
        return super._executor();
    }

    function supportsInterface(bytes4 interfaceId) public view override(Governor, GovernorTimelockControl) returns(bool){
        return super.supportsInterface(interfaceId);
    }
}