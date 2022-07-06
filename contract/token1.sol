// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract testToken1 is ERC20("TEST1", "TEST1") {
    address public conAddress;

    constructor() {}

    function mint(address addr) public payable {
        _mint(addr, 10**24);
    }
}
