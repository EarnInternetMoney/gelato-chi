const bre = require("@nomiclabs/buidler");

module.exports = async ({ getNamedAccounts, deployments }) => {
  if (bre.network.name == "mainnet") {
    console.log(
      "Not redeploying ActionChiMint to mainnet because already deployed but with solc 0.6.12"
    );
    console.log(
      "Bytecode might change if compiled with 0.6.10 and trigger redeployment"
    );
    console.log(
      "BUT, if you changed ActionChiMint source code and want to redeploy, edit this file"
    );
    return;
  }

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  let chiTokenAddress;
  if (bre.network.name === "mainnet") {
    chiTokenAddress = "0x0000000000004946c0e9f43f4dee607b0ef1fa1c";
  } else {
    const chiToken = await deployments.get("ChiToken");
    chiTokenAddress = chiToken.address;
  }

  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  await deploy("ActionChiMint", {
    from: deployer,
    gas: 4000000,
    args: [chiTokenAddress],
    log: true,
  });
};

module.exports.dependencies = ["ChiToken"];
