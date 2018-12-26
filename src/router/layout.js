import Error404 from 'layouts/404';
import breadcurmb from 'components/breadcurmb';
import documentSponse from 'view/document/sponse/sponse';
import documentDoSponse from 'view/document/sponse/doSponse';
// 页面
const pages = [{
  path: '/document/sponse',
  name: 'documentSponse',
  components: {
    default: documentSponse,
    paths: breadcurmb
  },
  props: {
    paths: () => ({
      paths: [{
          name: '公文管理',
          url: '/'
        },
        {
          name: '公文发起',
          url: ''
        }
      ],
      showName: true
    })
  }
}, {
  path: '/document/sponse/do',
  name: 'documentDoSponse',
  components: {
    default: documentDoSponse,
    paths: breadcurmb
  },
  props: {
    paths: () => ({
      paths: [{
          name: '公文管理',
          url: '/'
        },
        {
          name: '公文发起',
          url: '/document/sponse'
        }, {
          name: '发起公文',
          url: ''
        }
      ],
      showName: true
    })
  }
}];
// 错误页面
const errorPage = [{
  path: '/404',
  name: 'Error404',
  component: Error404
}];

const routes = [{
  path: '/',
  redirect: '/document/sponse'
  // name: 'Normal',
  // component: Home
}].concat(pages).concat(errorPage);

export default routes;
