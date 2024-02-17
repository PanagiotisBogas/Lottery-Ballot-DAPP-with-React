import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import lottery from "./lottery.js";

function App() {
  const [contract, setContract] = useState(null);
  const [ownerAccount, setownerAcount] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [contractBalance, setContractBalance] = useState(0);
  const [carBids, setCarBids] = useState("0");
  const [phoneBids, setPhoneBids] = useState("0");
  const [computerBids, setComputerBids] = useState("0");
  const [winnersDeclared, setWinnersDeclared] = useState(false);
  const [amIWinnerResult, setAmIWinnerResult] = useState("");
  const [newOwnerAddress, setNewOwnerAddress] = useState("");

  //initialization functions
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          console.log("Connected to MetaMask");

          // Fetch user address
          const accounts = await window.web3.eth.getAccounts();
          const currentUserAddress = accounts[0];
          setUserAccount(currentUserAddress);

          const contractABI = [
            {
              inputs: [],
              name: "amIWinner",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "bidCar",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "bidComputer",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "bidPhone",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newBeneficiary",
                  type: "address",
                },
              ],
              name: "declareNewBeneficiary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "declareWinners",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "restartLottery",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "winner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "item",
                  type: "string",
                },
              ],
              name: "Winner",
              type: "event",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "beneficiary",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "car",
              outputs: [
                {
                  internalType: "uint256",
                  name: "itemId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "winner",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "computer",
              outputs: [
                {
                  internalType: "uint256",
                  name: "itemId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "winner",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "itemId",
                      type: "uint256",
                    },
                    {
                      internalType: "address[]",
                      name: "itemTokens",
                      type: "address[]",
                    },
                    {
                      internalType: "address",
                      name: "winner",
                      type: "address",
                    },
                  ],
                  internalType: "struct LotteryBallot.Item",
                  name: "item",
                  type: "tuple",
                },
              ],
              name: "drawWinner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getCarBids",
              outputs: [
                {
                  internalType: "uint32",
                  name: "",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getComputerBids",
              outputs: [
                {
                  internalType: "uint32",
                  name: "",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getContractBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPhoneBids",
              outputs: [
                {
                  internalType: "uint32",
                  name: "",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "items",
              outputs: [
                {
                  internalType: "uint256",
                  name: "itemId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "winner",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "itemsWon",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "phone",
              outputs: [
                {
                  internalType: "uint256",
                  name: "itemId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "winner",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "random",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "winners",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ];
          const contractAddress = "0x86e63f4bff7b6f095b48aba1333f51a59aee40cd";
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          setContract(contract);

          const ownerAddress = await contract.methods.beneficiary().call();
          setownerAcount(ownerAddress);
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.error("MetaMask not detected");
      }
    };

    init();
  }, []);

  // Get contract balance
  const getContractBalance = async () => {
    if (contract) {
      try {
        const balance = await web3.eth.getBalance(contract.options.address);
        setContractBalance(web3.utils.fromWei(balance, "ether")); // Convert from Wei to Ether
        //alert(contractBalance);
      } catch (error) {
        console.error("Error getting contract balance:", error);
      }
    }
  };

  //withdraw contract funds and transfer them to the contract deployer
  const handleWithdraw = async () => {
    if (userAccount == ownerAccount) {
      try {
        await contract.methods.withdraw().send({ from: ownerAccount });
        alert("The contract owner withdrew the funds");
      } catch (error) {
        console.error("Withdrawal failed", error);
      }
    }
  };
  //bid to the car item
  const bidCar = async () => {
    if (userAccount != ownerAccount) {
      try {
        // Check if contract and account are set
        if (!contract || !userAccount) {
          setError("Contract or account not initialized");
          return;
        }

        // Call the bidCar function
        await contract.methods.bidCar().send({
          from: userAccount,
          value: web3.utils.toWei("0.01", "ether"), // Sending 0.01 ETH
        });

        alert(userAccount + "\n bidded 1 token to Car");

        // If successful, set bid success to true
        //setBidSuccess(true);
      } catch (error) {
        console.error(error);
        setError(error.message || "An error occurred");
      }
    }
  };
  //bid to the phone item
  const bidPhone = async () => {
    if (userAccount != ownerAccount) {
      try {
        // Check if contract and account are set
        if (!contract || !userAccount) {
          setError("Contract or account not initialized");
          return;
        }

        // Call the bidCar function
        await contract.methods.bidPhone().send({
          from: userAccount,
          value: web3.utils.toWei("0.01", "ether"), // Sending 0.01 ETH
        });

        alert(userAccount + "\n bidded 1 token to Phone");

        // If successful, set bid success to true
        setBidSuccess(true);
      } catch (error) {
        console.error(error);
        setError(error.message || "An error occurred");
      }
    }
  };
  //bid to the computer item
  const bidComputer = async () => {
    if (userAccount != ownerAccount) {
      try {
        // Check if contract and account are set
        if (!contract || !userAccount) {
          setError("Contract or account not initialized");
          return;
        }

        // Call the bidCar function
        await contract.methods.bidComputer().send({
          from: userAccount,
          value: web3.utils.toWei("0.01", "ether"), // Sending 0.01 ETH
        });

        alert(userAccount + "\n bidded 1 token to Computer");

        // If successful, set bid success to true
        setBidSuccess(true);
      } catch (error) {
        console.error(error);
        setError(error.message || "An error occurred");
      }
    }
  };

  //Get the number of tokens that have been bidded to the car item (we get all of our info from the smart contract)
  const getCarBids = async () => {
    try {
      const result = String(await contract.methods.getCarBids().call());
      setCarBids(result.toString());
    } catch (error) {
      console.error("Error getting car bids:", error);
    }
  };

  //Get the number of tokens that have been bidded to the phone item (we get all of our info from the smart contract)
  const getPhoneBids = async () => {
    try {
      const result = await contract.methods.getPhoneBids().call();
      setPhoneBids(result.toString());
    } catch (error) {
      console.error("Error getting car bids:", error);
    }
  };

  //Get the number of tokens that have been bidded to the computer item (we get all of our info from the smart contract)
  const getComputerBids = async () => {
    try {
      const result = await contract.methods.getComputerBids().call();
      setComputerBids(result.toString());
    } catch (error) {
      console.error("Error getting car bids:", error);
    }
  };

  //Restarts the lottery (only the contract deployer can restart the lottery)
  const restartLottery = async () => {
    if (userAccount == ownerAccount) {
      try {
        await contract.methods.restartLottery().send({ from: ownerAccount });
        setWinnersDeclared(false);
        alert("Lottery restarted successfully");
        console.log("Lottery restarted successfully");
      } catch (error) {
        console.error("Error restarting lottery:", error);
      }
    }
  };

  //Declares the winners of each ballot/item
  const handleDeclareWinners = async () => {
    if (userAccount == ownerAccount) {
      try {
        await contract.methods.declareWinners().send({ from: ownerAccount });
        setWinnersDeclared(true);
        alert("The owner just declared the winners");
      } catch (error) {
        console.error("Error declaring winners:", error);
      }
    }
  };

  //Calls the amIWinner function of the smart contract
  const handleAmIWinner = async () => {
    if (userAccount != ownerAccount) {
      try {
        const result = await contract.methods
          .amIWinner()
          .call({ from: userAccount });
        setAmIWinnerResult(result);
      } catch (error) {
        console.error("Error checking if winner:", error);
      }
    }
  };

  //Alerts the user in case he won a ballot
  const amIWinnerBtnReact = async () => {
    if (userAccount != ownerAccount && winnersDeclared == false) {
      handleAmIWinner();
      if (amIWinnerResult != "") {
        alert("You won the following ballots: " + amIWinnerResult);
      } else {
        alert("You did not win in any ballots");
      }
    }
  };

  const handleDeclareNewOwner = async () => {
    try {
      // Call the smart contract function to declare new beneficiary
      await contract.methods
        .declareNewBeneficiary(newOwnerAddress)
        .send({ from: ownerAccount });
      alert("New beneficiary declared successfully!");

      location.reload(true);
    } catch (error) {
      console.error("Error declaring new beneficiary:", error);
    }
  };

  const findCurrectAddress = async () => {
    // Fetch user address
    const accounts = await window.web3.eth.getAccounts();
    const currentUserAddress = accounts[0];
    setUserAccount(currentUserAddress);
  };

  setInterval(() => {
    getContractBalance();
    getCarBids();
    getPhoneBids();
    getComputerBids();
    findCurrectAddress();
    // getAllBids();
    // console.log("-----------------------------------------------");
  }, 900);

  const handleInputChange = (event) => {
    setNewOwnerAddress(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Lottery-Ballot</h1>
          <p>Contract Ballance: {contractBalance} ETH</p>
          {/* <p>All Bids: {allBids}</p> */}
        </div>
        <div className="card-container">
          <div className="item-card">
            <div className="item-name">Car</div>
            <img
              src="src\assets\porsche.png"
              alt="porsche-img"
              className="porsche-img"
            />
            <div className="bid-btn-container">
              <button className="bid-btn" onClick={bidCar}>
                Bid
              </button>
              <div className="counter" id="car-counter">
                {carBids}
              </div>
            </div>
          </div>

          <div className="item-card">
            <div className="item-name">Phone</div>
            <img
              src="src\assets\iphone.png"
              alt="iphone-img"
              className="iphone-img"
            />
            <div className="bid-btn-container">
              <button className="bid-btn" onClick={bidPhone}>
                Bid
              </button>
              <div className="counter" id="phone-counter">
                {phoneBids}
              </div>
            </div>
          </div>
          <div className="item-card">
            <div className="item-name">Computer</div>
            <img
              src="src\assets\macbook.png"
              alt="macbook-img"
              className="macbook-img"
            />
            <div className="bid-btn-container">
              <button className="bid-btn" onClick={bidComputer}>
                Bid
              </button>
              <div className="counter" id="computer-counter">
                {computerBids}
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <div className="bidder-side">
            Current account:
            <input type="text" readOnly value={userAccount} />
            {/* <button className="reveal-button">Reveal</button> */}
            <button className="amiwinner-button" onClick={amIWinnerBtnReact}>
              Am i winner
            </button>
          </div>
          <div className="owner-side">
            Owner's account:
            <input type="text" readOnly value={ownerAccount} />
            <button className="withdraw-button" onClick={handleWithdraw}>
              Withdraw
            </button>
            <button
              className="declarewinner-button"
              onClick={handleDeclareWinners}
            >
              Declare Winner
            </button>
            <button className="declarewinner-button" onClick={restartLottery}>
              Restart Lottery
            </button>
            <input
              type="text"
              placeholder="New owner address"
              value={newOwnerAddress}
              onChange={handleInputChange}
            />
            <button
              className="declarewinner-button"
              onClick={handleDeclareNewOwner}
            >
              Change Owner
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
