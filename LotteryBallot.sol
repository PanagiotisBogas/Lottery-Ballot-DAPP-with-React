// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0;

contract LotteryBallot {
    
    struct Item{
        uint itemId;
        address [] itemTokens;
        address winner;    
    }

    address[] public winners;
    address public beneficiary;
    address[] emptyArray;
    address emptyAddr;
    Item [] public items;

    Item public car;
    Item public phone;  
    Item public computer;
    string public itemsWon;
    int lotterydone = 0;

    event Winner(address winner,  string item);



    constructor() payable{ //constructor 
        // Αρχικοποίηση του προέδρου με τη διεύθυνση του κατόχου του έξυπνου συμβολαίου 
        beneficiary = msg.sender;
        car.itemId = 0;
        phone.itemId = 1;
        computer.itemId = 2;
        items.push(car);
        items.push(phone);
        items.push(computer);
    }

    // Function to get the contract's balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getCarBids() public view returns(uint32) {
        return uint32(car.itemTokens.length);
    }

    function getComputerBids() public view returns(uint32) {
        return uint32(computer.itemTokens.length);
    }

    function getPhoneBids() public view returns(uint32) {
        return uint32(phone.itemTokens.length);
    }

   //Declares new contract owner (beneficiary)
   function declareNewBeneficiary(address newBeneficiary) public onlyOwner{
        beneficiary = newBeneficiary;
   }

   //This modifier does not allow a function to be called by the deplyer of this contract
    modifier onlyBidders(){
        require(msg.sender != beneficiary, "beneficiary not allowed to use this function");
        _;
    }
    //This modifier allows a function to be called only by the deplyer of this contract
    modifier onlyOwner(){
        require(msg.sender == beneficiary, "Only the beneficiary is allowed to use this function");
        _;
    }

    // This function generates a pseudorandom number
    function random() public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp )));
    }

    function bidCar() public payable  onlyBidders{
        require(msg.value == 0.01 ether, "Insufficient funds! Bidding costs 0.01 ETH");
        require(lotterydone == 0);
        car.itemTokens.push(msg.sender);
    }

    function bidPhone() public payable  onlyBidders{
        require(msg.value == 0.01 ether, "Insufficient funds! Bidding costs 0.01 ETH");
        require(lotterydone == 0);
        phone.itemTokens.push(msg.sender);
    }

    function bidComputer() public payable  onlyBidders{
        require(msg.value == 0.01 ether, "Insufficient funds! Bidding costs 0.01 ETH");
        require(lotterydone == 0);
        computer.itemTokens.push(msg.sender);
    }

    function drawWinner(Item memory item) public view returns (address){

        if(item.itemTokens.length == 0){
            return emptyAddr;
        }else{
            uint index = random() % item.itemTokens.length;
            item.winner = item.itemTokens[index];
            return item.winner;
        }
        
    }

    

    function declareWinners() public onlyOwner{
        
        car.winner  = drawWinner(car);
        phone.winner = drawWinner(phone);
        computer.winner = drawWinner(computer);

        winners.push(car.winner);
        winners.push(phone.winner);
        winners.push(computer.winner);

        lotterydone = 1;
    }


    function restartLottery() public onlyOwner{
    
        delete car.itemTokens;
        delete phone.itemTokens;
        delete computer.itemTokens;
        delete winners;

        car.winner  = emptyAddr;
        phone.winner = emptyAddr;
        computer.winner = emptyAddr;

         lotterydone = 0;

    }

    
    function amIWinner() public  onlyBidders returns (string memory){
        itemsWon = "";
        
        for (uint i = 0; i<3; i++) 
        {
            if(winners[i] == msg.sender){
                if (i == 0) {
                    itemsWon = string(abi.encodePacked(itemsWon, "car "));
                }else if(i == 1){
                     itemsWon = string(abi.encodePacked(itemsWon, "phone "));
                }else if(i == 2){
                    itemsWon = string(abi.encodePacked(itemsWon, "computer "));
                }                
            }
        }
        return itemsWon;

        
    }

    //The contract owner can withdraw the contract's funds to his wallet
    function withdraw() public onlyOwner {
        payable(beneficiary).transfer(address(this).balance);
    }

}