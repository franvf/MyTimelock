const timeLock = artifacts.require("timeLock");
const GovernorContract = artifacts.require("GovernorContract");
const Box = artifacts.require("Box");

module.exports = async() => {

    const accounts = await web3.eth.getAccounts()

    const timelock = await timeLock.deployed()
    const governorcontract = await GovernorContract.deployed()
    const box = await Box.deployed()

    const timelockaddress = timelock.address
    const governoraddress = governorcontract.address
    const boxaddress = box.address
    
    console.log("Timelock contract address: ", timelockaddress)
    console.log("Governor address: ", governoraddress)
    console.log("Box address: ", boxaddress)

    console.log("Transferring box ownership...")
    await box.transferOwnership(timelock.address, {from: accounts[0]}) //Timelock contract is now the box contract owner
    console.log("Transfered ownership")
    
    const proposer = await timelock.PROPOSER_ROLE() //Get proposer role hash
    const executor = await timelock.EXECUTOR_ROLE() //Get executor role hash
    const admin = await timelock.TIMELOCK_ADMIN_ROLE() //Get admin role hash

    const zero_address = '0x0000000000000000000000000000000000000000'

    console.log("Modifying roles...")
    await timelock.grantRole(proposer, governorcontract.address) //Governor contract is the proposer
    await timelock.grantRole(executor, zero_address) //All the accounts can execute a function (zero address)
    await timelock.revokeRole(admin, accounts[0]) //Now the contract owner have not the admin role
    console.log("Roles granted")

}