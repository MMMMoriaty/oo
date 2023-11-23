import { FactorType, FactorList } from './mockData'

export default {
  'GET /api/v1/queryFactorType': (req: any, res: any) => {
    res.json({
      code: 0,
      data: { list: FactorType },
      message: 'success',
    });
  },
  'POST /api/v1/queryFactorList': (req: any, res: any) => {
    let result = FactorList
    const { keyword, page = 0, page_size = 20, sorter, conditions } = req.body
    res.json({
      code: 0,
      data: { list: FactorList, total: FactorList.length },
      message: 'success',
    });
  },
};
