export default () => {
  const doc = [
    {
      title: '总体框架',
      content: ['本demo基于react18+umi4+antd-pro实现,mock从BigQuant爬取了部分数据（包括因子类别、因子列表、绩效指标等）'],
    },
    {
      title: '项目结构',
      content: [
        '/pages: 页面容器',
        '/constants: 一些常量，比如绩效指标、操作符等',
        '/service: 接口调用声明',
        '/wrapper: 通用功能支持，比如antd的theme定制',
        '../mock: mock的接口以及数据'
      ]
    },
    {
      title: 'UI设计',
      content: ['总体主题色选用了红色（量化行业考虑），看板部分包括筛选和表格上下两个部分，出于对表格的显示优先级的考虑，提供了筛选部分的折叠',
        '筛选模块可以选择基金的分类，添加筛选的条件（多选）,筛选条件包括三个字段，分别是筛选的field，筛选的运算符，以及筛选的数值',
        '表格部分的主要功能包括：分页，根据关键字搜索，根据各个字段排序，表格右上角可以设置各字段的显示、排序，以及表格的size，用户可以根据需求来定制表格的显示内容',
      ]
    },
    {
      title: '接口设计',
      content: [
        '主要接口包括三个： queryFactorType(获取因子类别列表), queryFactorList(获取因子列表), sendWarnMessage(发送告警信息)',
        '接口的返回值统一结构为{code, data, message}形式。在本地开发环境中，所有接口的返回均在具体实现中有调用,参数和返回值都可以直接查看network中的请求，在github page中由于没有代理接口，所以采用了假接口的方案，具体实现参考./serivces/factor',
        'queryFactorType是简单的get请求，返回一个因子类别列表',
        'sendWarnMessage是post请求，body中包含一个参数为factorIds，代表本次需要发送告警信息的因子列表',
        '--queryFactorList是核心接口，主要参数包括：',
        '--page, page_size: 分页相关参数',
        '--keyword: 用于搜索的关键字',
        '--sorter: 用于排序的参数，对象类型，key代表排序的字段，value代表排序的顺序',
        '--conditions: 筛选条件字段，是一个对象数组，每个对象内部包括field，operator，value字段',
        '--types: 用于因子类型的筛选字段，数组类型，内部是每个因子类别的id',
        'queryFactorList的参数在每次接口调用时都会在控制台打印，方便查看'
      ]
    },
    {
      title: '其他说明',
      content: [
        '筛选、搜索、排序的交互都已经接上，但是接口的处理逻辑没有写，所以没有实际效果，主要展示交互功能的设计',
        '后续考虑加上可针对指标切换的图表功能'
      ]
    }
  ]
  return <div>
    {
      doc.map((v, k) => {
        return <div style={{ marginBottom: 24 }} key={k}>
          <h1>{v?.title}</h1>
          {
            v?.content?.map((v) => <h3 style={{ color: '#4a4a4a', fontWeight: 400 }}>{v}</h3>)
          }
        </div>
      })
    }
  </div>
}