import breadcurmb from "components/breadcurmb";
const Error404 = () => import('layouts/404')
const documentSponse = () => import('view/document/sponse/sponse')
const documentDoSponse = () => import('view/form/do')
const documentAssign = () => import('view/document/assign/assign')
const documentDone = () => import('view/document/done/done')
const documentReceive = () => import('view/document/receive/receive')
const documentArrange = () => import('view/document/arrange/arrange')

import {
  funcGetPath
} from './pathConfig'

// 公文管理
const pagesDocument = [{
    path: '/document/:type/do',
    name: 'tableDo',
    components: {
      default: documentDoSponse,
      paths: breadcurmb
    },
    props: {
      paths: funcGetPath
    }
  }, {
    path: "/document/sponse",
    name: "documentSponse",
    components: {
      default: documentSponse,
      paths: breadcurmb
    },
    props: {
      paths: funcGetPath
    }
  },
  {
    path: "/document/assign",
    name: "documentAssign",
    components: {
      default: documentAssign,
      paths: breadcurmb
    },
    props: {
      paths: funcGetPath
    }
  },
  {
    path: "/document/done",
    name: "documentDone",
    components: {
      default: documentDone,
      paths: breadcurmb
    },
    props: {
      paths: funcGetPath
    }
  },
  {
    path: "/document/receive",
    name: "documentReceive",
    components: {
      default: documentReceive,
      paths: breadcurmb
    },
    props: {
      paths: funcGetPath
    }
  },
  {
    path: "/document/arrange",
    name: "documentArrange",
    components: {
      default: documentArrange,
      paths: breadcurmb
    },
    props: {
      paths: funcGetPath
    }
  },

];


const taskMine = () => import('view/task/mine/mine')
const taskDone = () => import('view/task/done/done')
const taskSub = () => import('view/task/subList/subList')

// 任务管理
const pagesTask = [{
  path: '/task/mine',
  name: 'taskMine',
  components: {
    default: taskMine,
    paths: breadcurmb
  },
  props: {
    paths: funcGetPath
  }
}, {
  path: '/task/done',
  name: 'taskDone',
  components: {
    default: taskDone,
    paths: breadcurmb
  },
  props: {
    paths: funcGetPath
  }
}, {
  path: '/task/sub',
  name: 'taskSub',
  components: {
    default: taskSub,
    paths: breadcurmb
  },
  props: {
    paths: funcGetPath
  }
}]

const schedualSearch = () => import('view/schedual/search/search')
const schedualApply = () => import('view/schedual/apply/apply')
const schedualApplyChange = () => import('view/schedual/applyChange/applyChange')

// 排班管理
const pagesSchedual = [{
  path: '/schedual/search',
  name: 'schedualSearch',
  components: {
    default: schedualSearch,
    paths: breadcurmb
  },
  props: {
    paths: funcGetPath
  }
}, {
  path: '/schedual/apply',
  name: 'schedualApply',
  components: {
    default: schedualApply,
    paths: breadcurmb
  },
  props: {
    paths: funcGetPath
  }
}, {
  path: '/schedual/applyChange',
  name: 'schedualApplyChange',
  components: {
    default: schedualApplyChange,
    paths: breadcurmb
  },
  props: {
    paths: funcGetPath
  }
}, ]


const home = () => import('view/hp/hp')
const LayoutBase = () => import('layouts/base')
const permission = () => import('view/permission/index')

// 权限管理
const pagesPermission = [{
  path: '/permission/:type',
  name: 'permissionSearch',
  components: {
    default: permission,
    paths: breadcurmb
  },
  props: {
    default: true,
    paths: funcGetPath
  }
}, ]

// 系统首页
const homePage = [{
  path: '/hp',
  name: 'homePage',
  component: home
  
}]

const Default = () => import('layouts/default')
const Login = () => import('layouts/login')

const routes = [{
  path: "/",
  redirect:'/hp',
  component: Default,
  children: [].concat(pagesDocument, pagesTask, pagesSchedual,pagesPermission,homePage)
}, {
  path: "/404",
  name: "Error404",
  component: Error404,
  meta: {
    noLogin: true
  }
}, {
  path: "/login",
  component: Login,
  meta: {
    noLogin: true
  }
}]

export default routes;
