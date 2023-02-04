//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Events is Ownable {
    string public name;
    string public description;
    string public imageURL;
    string public location;
    string public mode;
    address payable createdBy;
    bool public isVerified;
    string public date;
    uint256 public totalRegistration;
    mapping(address => string) public poap;

    address public admin = 0x56f20e89A0CB5097Fa41695E6E15d97e1Aa58092;

    constructor(
        string memory _name,
        string memory _description,
        string memory _imageURL,
        string memory _location,
        string memory _mode,
        address payable _createdBy,
        string memory _date,
        uint256 _totalRegistration
    ) {
        name = _name;
        description = _description;
        imageURL = _imageURL;
        location = _location;
        mode = _mode;
        createdBy = _createdBy;
        isVerified = false;
        date = _date;
        totalRegistration = _totalRegistration;
    }

    modifier onlyAdmin(address _admin) {
        require(_admin == admin);
        _;
    }


    function giveAwayPoap(address user,string memory cid) public {
        poap[user] = cid;
    }

    function verifyEvent(
        bool _status,
        address _admin,
        string memory cid
    ) public onlyAdmin(_admin) {
        isVerified = _status;
        giveAwayPoap(createdBy,cid);
    }
}