const ApiRootUrl = 'https://shop.funnything.net/api/';

const ApiList = {
  EnteringApply: ApiRootUrl + "shop/enteringApply",
  
  IndexUrl: ApiRootUrl + 'index/index', //首页数据接口
  CatalogList: ApiRootUrl + 'catalog/index',  //分类目录全部分类数据接口
  CatalogCurrent: ApiRootUrl + 'catalog/current',  //分类目录当前分类数据接口
  
  PromotionList: ApiRootUrl + 'promotion/list',
  PromotionDetail: ApiRootUrl + 'promotion/detail',

  RechargeList: ApiRootUrl + 'recharge/list',
  RechargeRecord: ApiRootUrl + 'user/getRechargeRecord',

  AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin', //微信登录
  ShopCategory: ApiRootUrl + 'category',
  UserShopOwnState: ApiRootUrl + 'user/getShopOwnState',

  UserPoint: ApiRootUrl + 'user/getPoint', //微信登录
  PhoneNumber: ApiRootUrl + 'user/getPhoneNumber',

  ShopList: ApiRootUrl + 'shop/list',  //商户列表
  ShopDetail: ApiRootUrl + 'shop/detail',  //商户详情

  OrderSubmit: ApiRootUrl + 'order/submit', // 提交订单
  PayPrepayId: ApiRootUrl + 'pay/prepay', //获取微信统一下单prepay_id

  CollectList: ApiRootUrl + 'collect/list',  //收藏列表
  CollectAddOrDelete: ApiRootUrl + 'collect/addordelete',  //添加或取消收藏

  CommentList: ApiRootUrl + 'comment/list',  //评论列表
  CommentCount: ApiRootUrl + 'comment/count',  //评论总数
  CommentPost: ApiRootUrl + 'comment/post',   //发表评论

  TopicList: ApiRootUrl + 'topic/list',  //专题列表
  TopicDetail: ApiRootUrl + 'topic/detail',  //专题详情
  TopicRelated: ApiRootUrl + 'topic/related',  //相关专题

  SearchIndex: ApiRootUrl + 'search/index',  //搜索页面数据
  SearchHelper: ApiRootUrl + 'search/helper',  //搜索帮助
  SearchClearHistory: ApiRootUrl + 'search/clearhistory',  //搜索帮助

  OrderList: ApiRootUrl + 'order/list',  //订单列表
  OrderDetail: ApiRootUrl + 'order/detail',  //订单详情
  OrderCancel: ApiRootUrl + 'order/cancel',  //取消订单
  OrderReturn: ApiRootUrl + "order/return",
};

export default ApiList