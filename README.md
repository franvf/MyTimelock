# MyTimelock
This is just a project I did to test how timelock works and its usefulness. 
This kind of project helps me understand Solidity and learn new things daily. 

The timelock's purpose is to avoid executing certain actions without the holders' consent. This approach is very useful on DAOs, where is the community who
votes for changes. 

The project is composed of four smart contracts:
  Box.sol: Very simple contract which manages the business logic. In this case only has two different functions, one of them to set the value of the Value variable
           and the other one to get the value of this variable.
  
  GovernanceToken.sol: This contract allows us to create the token used to vote and do some actions related to it, like burn it.
  GovernorContract.sol: In this contract, we set some parameters for our "DAO." We will need to import five different contracts and call all of them in our
                        in our constructor to set these parameters. We will need to override some functions as well.
  Timelock.sol: In the timelock contract, we just set some parameters about the timelock, like who the proposers are, the executors, and the minimum delay. This minimum
  delay is the number of blocks the community has to wait before voting.
  
  In the scripts folder, there are four different files. Each one is a part of a use case. These files are well commented on and easy to understand.
