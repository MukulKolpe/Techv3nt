//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./User.sol";

contract RegisterUser {
    mapping(address => User[]) public usermapping;
    mapping(address => uint) public numberofparticipants;

    event UserRegistered(address indexed techevent, User indexed participant);

    function AddUser(
        string memory name,
        string memory email,
        string memory location,
        address techevent
    ) public {
        User newuser = new User(
            name,
            email,
            location
        );
        usermapping[techevent].push(newuser);
        numberofparticipants[techevent]++;
        emit UserRegistered(techevent, newuser);
    }
}
