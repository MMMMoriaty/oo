import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  outputPath: 'docs',
  publicPath: process.env.NODE_ENV == 'development' ? '' : 'https://mmmmoriaty.github.io/oo/',
  fastRefresh: true,
  mfsu: {
  },
  history: {  type: 'hash' },
  routes: [
    {
      path: '/',
      redirect: '/monitor',
    },
    {
      name: '因子看板',
      wrappers: ['@/wrapper/theme'],
      path: '/monitor',
      component: './Monitor',
    },
    {
      name: '说明文档',
      path: '/readme',
      component: './Doc',
    }
  ],
  npmClient: 'yarn',
});

