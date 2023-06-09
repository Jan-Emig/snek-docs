import type { GatsbyBrowser } from 'gatsby';

import AppLayout from './src/layout/AppLayout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props
}) => {
  const path = props.location.pathname;

  if (path.startsWith('/admin') || path === '/photonq/') {
    return element;
  }

  return (
    <AppLayout isDocs={path.startsWith('/docs')} path={path}>
      {element}
    </AppLayout>
  );
};
