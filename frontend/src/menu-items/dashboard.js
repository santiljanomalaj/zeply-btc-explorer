import { IconDashboard } from '@tabler/icons';

const icons = { IconDashboard };

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'page1',
      title: 'Page 1',
      type: 'item',
      url: '/page1',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'page2',
      title: 'Page 2',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'subpage 2 1',
          title: 'Sub Page 1',
          type: 'item',
          url: '/page2/subpage1',
          breadcrumbs: false
        },
        {
          id: 'subpage 2 2',
          title: 'Sub Page 2',
          type: 'item',
          url: '/page2/subpage2',
          breadcrumbs: false
        },
        {
          id: 'subpage 2 3',
          title: 'Sub Page 3',
          type: 'item',
          url: '/page2/subpage3',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'page3',
      title: 'Page 3',
      type: 'item',
      url: '/page3',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'page4',
      title: 'Page 4',
      type: 'item',
      url: '/page4',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'page5',
      title: 'Page 5',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'subpage 5 1',
          title: 'Sub Page 1',
          type: 'item',
          url: '/page5/subpage1',
          breadcrumbs: false
        },
        {
          id: 'subpage 5 2',
          title: 'Sub Page 2',
          type: 'item',
          url: '/page5/subpage2',
          breadcrumbs: false
        },
        {
          id: 'subpage 5 3',
          title: 'Sub Page 3',
          type: 'item',
          url: '/page5/subpage3',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'logout',
      title: 'Logout',
      type: 'logout',
      url: '/logout',
      icon: icons.IconTypography,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
