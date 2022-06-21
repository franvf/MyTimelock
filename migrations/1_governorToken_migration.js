const GovernanceToken = artifacts.require("GovernanceToken");

module.exports =  async (deployer) =>  {
  await deployer.deploy(GovernanceToken);
  const accounts = await web3.eth.getAccounts()
  const tokenContract = await GovernanceToken.deployed();
  const tx = await tokenContract.delegate(accounts[0]) //It's necessary to delegate because if not, there are nobody able to vote
  console.log("GovernanceTOken deployed and delegated")

};
