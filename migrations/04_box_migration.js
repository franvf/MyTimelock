
const box = artifacts.require("box");

module.exports =  async (deployer) =>  {
    await deployer.deploy(box);
};
