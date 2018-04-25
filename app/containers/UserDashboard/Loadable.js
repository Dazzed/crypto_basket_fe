/**
 *
 * Asynchronously loads the component for UserDashboard
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
