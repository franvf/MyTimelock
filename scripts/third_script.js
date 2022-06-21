const GovernorContract = artifacts.require("GovernorContract");
const GovernanceToken = artifacts.require("GovernanceToken");

module.exports = async() => {

    const accounts = await web3.eth.getAccounts()

    const governorcontract = await GovernorContract.deployed()
    const governorToken = await GovernanceToken.deployed()

    console.log("Minting...")
    await governorToken.mint(1000000000000000000n, {from: accounts[1]}) //1515
    const balance = await governorToken.balanceOf(accounts[1])
    console.log("Balance of account 1: ", balance.toString())
    let weight = await governorcontract.getMyVoteWeight(1516, {from: accounts[1]}) //1516
    console.log("Vote weight of account 1 before delegate: ",weight.toString())

    console.log("Delegating...")
    await governorToken.delegate(accounts[1], {from: accounts[1]}) //Delegate in myself to activate the tokens 1517
    await governorToken.mint(1, {from: accounts[1]}) //Mint to jump one block /1518
    weight = await governorcontract.getMyVoteWeight(1518, {from: accounts[1]})// 1519
    console.log("Vote weight of account 1 after delegate: ", weight.toString())

    const quorumSize = await governorcontract.quorumNumerator()
    console.log("Amount of necessary tokens to execute a proposal: ", quorumSize)
}