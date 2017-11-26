pragma solidity ^0.4.17;

contract PoL {

    // Declare variables, structures, mapping functions, events
    struct pol {
        address receiver;
        uint initialBlockNumber;
        uint deposit;
    }
    address public master;
    uint constant public BLOCK_COUNT = 2;
    mapping (address => pol) public getPoL;
    
    event IsValidPoL(address indexed _owner, uint _numberOfConfirmation, bool _state);
    event RecoverBalance(address indexed _owner, address indexed _receiver, bool _state);
    event ApprovePoL(address indexed _owner, uint _value, bool _state);
    event RejectPoL(address indexed _owner, uint _value, bool _state);

    // Constructor
    function PoL() {
        master = msg.sender;
    }

    // Group of validation functions
    function existedPoL(address _owner)
        public
        returns (bool)
    {   
        pol _pol = getPoL[_owner];
        if (_pol.receiver == address(0) && _pol.initialBlockNumber == 0) {
            return false;
        }

        return true;
    }

    function isValidPoL(address _owner)
        public
        returns (bool)
    {
        pol _pol = getPoL[_owner];
        if (_pol.receiver == address(0)) {
            IsValidPoL(_owner, 0, false);
            return false;
        }
        if (_pol.initialBlockNumber == 0 || _pol.initialBlockNumber > block.number) {
            IsValidPoL(_owner, 0, false);
            return false;
        }
        if (block.number - _pol.initialBlockNumber <= BLOCK_COUNT) {
            IsValidPoL(_owner, block.number - _pol.initialBlockNumber, false);
            return false;
        }

        IsValidPoL(_owner, block.number - _pol.initialBlockNumber, true);
        return true;
    }

    // Group of user functions
    function recoverBalance(address _owner)
        public
        payable
    {
        require(msg.value > 0);
        require(!existedPoL(_owner));

        address _receiver = msg.sender;
        getPoL[_owner].receiver = _receiver;
        getPoL[_owner].initialBlockNumber = block.number;
        getPoL[_owner].deposit = msg.value;
        RecoverBalance(_owner, _receiver, true);
    }

    function rejectPoL()
        public
    {
        address _owner = msg.sender;
        require(existedPoL(_owner));
        uint _value = getPoL[_owner].deposit;
        bool _success = _owner.send(_value);

        if (_success) {
            getPoL[_owner].receiver = address(0);
            getPoL[_owner].initialBlockNumber = 0;
            getPoL[_owner].deposit = 0;
            RejectPoL(_owner, _value, true);
        } else {
            RejectPoL(_owner, _value, false);
        }
    }   

    function approvePoL(address _owner, uint _value)
        private
        returns (bool)
    {
        address _receiver = getPoL[_owner].receiver;
        bool _success = _receiver.send(_value);
        return _success;
    }   

    function() payable {
        address _owner = msg.sender;
        uint _value = msg.value;

        require(_value > 0);
        require(isValidPoL(_owner));

        bool _success = approvePoL(_owner, _value);

        if (_success) {
            getPoL[_owner].receiver = address(0);
            getPoL[_owner].initialBlockNumber = 0;
            getPoL[_owner].deposit = 0;
            ApprovePoL(_owner, _value, true);
        } else {
            ApprovePoL(_owner, _value, false);
        }
    }

    // Group of admin functions
    function changeMaster(address _newMaster)
        public
    {
        require(msg.sender == master);
        master = _newMaster;
    }

    function kill()
        public
    {
        require(msg.sender == master);
        selfdestruct(master);
    }
}