import Error404 from "layouts/404";
import breadcurmb from "components/breadcurmb";
import documentSponse from "view/document/sponse/sponse";
import documentDoSponse from "view/form/do";
import documentAssign from "view/document/assign/assign";
import documentDone from "view/document/done/done";
import documentReceive from "view/document/receive/receive";
import documentArrange from "view/document/arrange/arrange";

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


import taskMine from "view/task/mine/mine";
import taskDone from "view/task/done/done";
import taskSub from "view/task/subList/subList";

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

import schedualSearch from "view/schedual/search/search";
import schedualApply from "view/schedual/apply/apply";
import schedualApplyChange from "view/schedual/applyChange/applyChange";
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
  },]

// 错误页面
const errorPage = [{
  path: "/404",
  name: "Error404",
  component: Error404
}];

const routes = [{
  path: "/",
  redirect: "/document/sponse"
  // name: 'Normal',
  // component: Home
}]
  .concat(pagesDocument, pagesTask, pagesSchedual)
  .concat(errorPage);

export default routes;
