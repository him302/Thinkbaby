// Smart contract constants (mock for development)
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

export const CONTRACT_ABI = [
  "function registerClaim(string memory _claim) public",
  "function voteTrue(uint256 _claimId) public",
  "function voteFalse(uint256 _claimId) public",
  "function getClaim(uint256 _claimId) public view returns (string memory, uint256, uint256, bool)",
  "function getReputation(address _user) public view returns (uint256)",
];

export const SEPOLIA_CHAIN_ID = "0xaa36a7";
