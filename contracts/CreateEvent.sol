//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Events.sol";

contract CreateEvent {
    Events[] public _events;
    uint256 constant maxLimit = 20;

    event EventCreated(Events indexed newevent, address indexed owner);

    function eventscount() public view returns (uint256) {
        return _events.length;
    }

    function createEvent(
        string memory name,
        string memory description,
        string memory imageURL,
        string memory location,
        string memory mode,
        address payable createdBy,
        string memory date,
        uint256 totalRegistration
    ) public {
        Events newevent = new Events(
            name,
            description,
            imageURL,
            location,
            mode,
            createdBy,
            date,
            totalRegistration
        );
        _events.push(newevent);
        emit EventCreated(newevent, createdBy);
    }

    function events(
        uint256 limit,
        uint256 offset
    ) public view returns (Events[] memory coll) {
        //logic for pagination
        require(offset <= eventscount(), "offset out of bounds");
        // start our size as difference between total count and offset
        uint256 size = eventscount() - offset;
        // size should be the smaller of the count or the limit
        size = size < limit ? size : limit;
        // size should not exceed the maxLimit
        size = size < maxLimit ? size : maxLimit;
        // build our collection to return based off of limit and offest
        coll = new Events[](size);
        for (uint256 i = 0; i < size; i++) {
            coll[i] = _events[offset + i];
        }
        return coll;
    }
}
