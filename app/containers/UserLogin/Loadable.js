/**
 *
 * Asynchronously loads the component for UserLogin
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
