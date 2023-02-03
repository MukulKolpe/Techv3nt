//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract User is Ownable {
    string public name;
    string public email;
    string public location;

    constructor(
        string memory _name,
        string memory _email,
        string memory _location
    ) {
        name = _name;
        email = _email;
        location = _location;
    }
}
