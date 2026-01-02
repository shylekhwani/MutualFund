import { getAllInvestmentsOfUser } from "../repository/investmentRepository.js";
import { getFundsByIds } from "../repository/mutualFundRepository.js";

export const getUserPortfolioService = async (userId) => {
  //  Get all investments of user
  const investments = await getAllInvestmentsOfUser(userId);

  if (!investments) return [];

  //  Group investments by fundId
  const fundMap = {};

  for (const inv of investments) {
    const fundId = inv.fundId.toString();

    if (!fundMap[fundId]) {
      fundMap[fundId] = {
        fundId,
        fundName: inv.fundName,
        totalUnits: 0,
        investedAmount: 0,
      };
    }

    fundMap[fundId].totalUnits += inv.units;
    fundMap[fundId].investedAmount += inv.amount;
  }

  console.log("fundMap", fundMap);

  //  Fetch latest NAVs
  const fundIds = Object.keys(fundMap);
  const funds = await getFundsByIds(fundIds);

  console.log("funds", funds);

  //  Build portfolio response
  const portfolio = funds.map((fund) => {
    const fundData = fundMap[fund._id.toString()];

    const avgBuyNav = fundData.investedAmount / fundData.totalUnits;
    const currentValue = fundData.totalUnits * fund.nav;
    const profitLoss = currentValue - fundData.investedAmount;

    return {
      fundId: fund._id,
      fundName: fundData.fundName,
      unitsOwned: Number(fundData.totalUnits.toFixed(2)),
      avgBuyNav: Number(avgBuyNav.toFixed(2)),
      currentNav: fund.nav,
      investedAmount: Number(fundData.investedAmount.toFixed(2)),
      currentValue: Number(currentValue.toFixed(2)),
      profitLoss: Number(profitLoss.toFixed(2)),
    };
  });
  return portfolio;
};
