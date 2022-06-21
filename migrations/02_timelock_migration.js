const timeLock = artifacts.require("timeLock");

module.exports =  function (deployer)  {
  deployer.deploy(timeLock,0, [], []);
};
