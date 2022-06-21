const timeLock = artifacts.require("timeLock");
const GovernorContract = artifacts.require("GovernorContract");
const Box = artifacts.require("Box");
const { ethers } = require("ethers");

module.exports = async() => {

    const accounts = await web3.eth.getAccounts()

    const timelock = await timeLock.deployed()
    const governorcontract = await GovernorContract.deployed()
    const box = await Box.deployed()

    const boxaddress = box.address

    // ***** MAKE A PROPOSAL *****

    // Encode the function call
    const functionInfo = {name: 'setValue',
                          type: 'function',
                          inputs: [{type: 'uint256',
                                    name: 'newValue'}]}

    const functionEncodedValue = await web3.eth.abi.encodeFunctionCall(functionInfo, ['18']); //Encode the function information and the value to propose
    console.log("Encoded value: ", functionEncodedValue)
    
    console.log('Proposing value...')
    await governorcontract.propose([boxaddress], [0], [functionEncodedValue], 'Proposing value 19')
    console.log('Value proposed')

    const governorEvents = await governorcontract.getPastEvents('ProposalCreated')
    const proposalID = governorEvents[0].returnValues[0] //Get the proposal id, necessary to vote
    console.log("The proposal id is: ", proposalID)
    
    let state = await governorcontract.state(proposalID)
    console.log("State before voting: ", state.toString())
    
    //***** VOTING THE LAST PROPOSAL *****
    console.log("voting...")
    await governorcontract.castVote(proposalID, 1) //0 -> Against, 1 -> For, 2 -> Abstain
    await governorcontract.castVote(proposalID, 0, {from: accounts[1]}) 
    console.log("voted!")
    
    state = await governorcontract.state(proposalID)
    console.log("State after voting: ", state.toString())

    const snap = await governorcontract.proposalDeadline(proposalID)
    console.log("Proposal deadline: ", snap.toString())

    // ***** ENQUEUE THE TRANSACTION *****
    console.log("Enqueuing transaction...")
    const descriptionHashed = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Proposing value 19')) //Hashing the description of the transaction
    await governorcontract.queue([boxaddress], [0], [functionEncodedValue], descriptionHashed )
    console.log('Transaction enqueued')

    //***** EXECUTING THE TRANSACTION *****
    console.log('Executing transaction...')
    await governorcontract.execute([boxaddress], [0], [functionEncodedValue], descriptionHashed)
    console.log("Transaction executed!")

    const value = await box.getValue() //Getting the value stored in box contract
    console.log(value.toString())
}