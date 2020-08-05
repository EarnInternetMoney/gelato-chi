const bre = require("@nomiclabs/buidler");

module.exports = async ({ getNamedAccounts, deployments }) => {
  if (bre.network.name === "mainnet") {
    console.log(
      "CPKFactory mainnet deployed at 0x1eDa606967A97522B432D39D19a2bf4dAF2229De"
    );
    console.log("Edit this deploy file for redeployment");
    return;
  }

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  await deploy("CPKFactoryCustom", {
    from: deployer,
    gas: 4000000,
  });
};

module.exports.tags = ["CPKFactoryCustom"];
