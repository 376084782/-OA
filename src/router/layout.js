import breadcurmb from "components/breadcurmb";
const Error404 = () => import('layouts/404')
const documentSponse = () => import('view/document/sponse/sponse')
const documentDoSponse = () => import('view/form/do')
const documentAssign = () => import('view/document/assign/assign')
const documentArrange = () => import('view/document/arrange/arrange')
const documentWHGL = () => import('view/document/whgl/whgl')



// 公文管理
const pagesDocument = [{
    path: '/document/:type/do',
    name: 'tableDo',
    components: {
      default: documentDoSponse,
      paths: breadcurmb
    },
  }, {
    path: "/document/sponse",
    name: "documentSponse",
    components: {
      default: documentSponse,
      paths: breadcurmb
    },
  },
  {
    path: "/document/assign",
    name: "documentAssign",
    components: {
      default: documentAssign,
      paths: breadcurmb
    },
  },
  {
    path: "/document/arrange",
    name: "documentArrange",
    components: {
      default: documentArrange,
      paths: breadcurmb
    },
  }, {
    path: "/document/whgl",
    name: "documentWHGL",
    components: {
      default: documentWHGL,
      paths: breadcurmb
    },
  },

];


const taskCenter = () => import('view/task/center/center')

// 任务管理
const pagesTask = [{
  path: '/task/center',
  name: 'taskCenter',
  components: {
    default: taskCenter,
    paths: breadcurmb
  },
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
}, {
  path: '/schedual/apply',
  name: 'schedualApply',
  components: {
    default: schedualApply,
    paths: breadcurmb
  },
}, {
  path: '/schedual/applyChange',
  name: 'schedualApplyChange',
  components: {
    default: schedualApplyChange,
    paths: breadcurmb
  },
}, ]


const home = () => import('view/hp/hp')
const LayoutBase = () => import('layouts/base')
const permissionOrganization = () => import('view/permission/organization/index')
const permissionRole = () => import('view/permission/role/index')

// 权限管理
const pagesPermission = [{
  path: '/permission/organization',
  name: 'permissionOrganization',
  components: {
    default: permissionOrganization,
    paths: breadcurmb
  },
}, {
  path: '/permission/role',
  name: 'permissionRole',
  components: {
    default: permissionRole,
    paths: breadcurmb
  },
}]

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
  redirect: '/hp',
  component: Default,
  children: [].concat(pagesDocument, pagesTask, pagesSchedual, pagesPermission, homePage)
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
