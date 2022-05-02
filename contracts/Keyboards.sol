// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Keyboards {
    string[] public createdKeyboards;

    function getKeyboards() public view returns (string[] memory) {
        return createdKeyboards;
    }
}
