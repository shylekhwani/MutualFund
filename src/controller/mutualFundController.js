import {
  createFundService,
  getAllFundService,
  getFundByIdService,
  updateNavService,
} from "../services/mutualFundService.js";

export const createFundController = async function (req, res, next) {
  try {
    const data = req.body;
    const newFund = await createFundService(data);
    return res.status(201).json({
      success: true,
      message: "fund created successfully",
      data: newFund,
    });
  } catch (error) {
    next(error);
    console.log("Internal server error on controller");
  }
};

export async function getAllFundsController(req, res, next) {
  try {
    const funds = await getAllFundService();

    return res.status(200).json({
      success: true,
      message: "funds fetched successfully",
      data: funds,
    });
  } catch (error) {
    console.error("Error in getAllFundsCont:", error);
    next(error);
  }
}

export async function getFundByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const fund = await getFundByIdService(id);

    return res.status(200).json({
      success: true,
      message: "fund fetched successfully",
      data: fund,
    });
  } catch (error) {
    console.error("Error in getFundByIdCont:", error);
    next(error);
  }
}

export async function updateNavController(req, res, next) {
  try {
    const { id } = req.params;
    const { nav } = req.body;
    // console.log(req.body);
    const fund = await updateNavService(id, nav);

    return res.status(200).json({
      success: true,
      message: "fund Updated successfully",
      data: fund,
    });
  } catch (error) {
    console.error("Error in getFundByIdCont:", error);
    next(error);
  }
}
