/**
 *
 * Asynchronously loads the component for AdminSetup
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
