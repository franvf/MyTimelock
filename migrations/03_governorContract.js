
const GovernorContract = artifacts.require("GovernorContract");
const timeLock = artifacts.require("timeLock");
const GovernanceToken = artifacts.require("GovernanceToken");

module.exports =  async (deployer) =>  {
    const timelock = await timeLock.deployed()
    const governancetoken = await GovernanceToken.deployed()
    await deployer.deploy(GovernorContract, governancetoken.address, timelock.address);
};

