//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./User.sol";

contract CreateUser {
    mapping(address => User) public _users;
    uint totalUsers = 0;

    event UserCreated(User indexed newuser);
    function userscount() public view returns (uint256) {
        return totalUsers;
    }
    function createUser(
        string memory name,
        string memory email,
        string memory location,
        address userWalletaddress
    ) public {
        User newuser = new User(
            name,
            email,
            location
        );
        totalUsers++;
        _users[userWalletaddress] = newuser;
        emit UserCreated(newuser);
    }
}
