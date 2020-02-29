pragma solidity 0.6.0;

 import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/cryptography/ECDSA.sol";

contract microPayments {
    
    
    mapping(address => mapping(address => uint)) nonce;
    
    address tokenContract;
    
    event Withdraw(address _from, address _to, uint _amount);
    
    constructor(address _token) public{
        tokenContract = _token;
    }
    
    
    /**
     * @param _amount Amount of token in last microTransaction
     * @param _sender Address of the signer
     * @param _messageHash Hash of the message
     * @param _signature Encoded signature
     * 
     * @dev web3.utils.soliditysha3((web3.utils.utf8ToHex()))
     * @notice Transfer the token amount to caller
     */
    
    function withdraw(uint _amount, address _sender, bytes32 _messageHash, bytes memory _signature) public {
        uint _nonce = getNonce(_sender, msg.sender);
        bool status;
        
        bytes32 message = keccak256(abi.encodePacked(msg.sender,_amount,_nonce)); //(receiver, amount, nonce). Hash is the message, that is signed
        bytes32 msgHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",message)); //Get the hash
        
        require(msgHash == _messageHash, "Signature mismatch");
        
        address recoveredSender = ECDSA.recover(_messageHash, _signature);// = ecrecover(msgHash, _v, _r, _s);
        require(recoveredSender != address(0), "Invalid Signature");
        
        (status,) = tokenContract.call(abi.encodePacked(bytes4(keccak256("transferFrom(address,address,uint)")),recoveredSender, msg.sender, _amount));
        nonce[_sender][msg.sender]++;
        emit Withdraw(_sender, msg.sender, _amount);
    }
    
    function getNonce(address _sender, address _receiver) public view returns (uint){
        return nonce[_sender][_receiver];
    }
}
