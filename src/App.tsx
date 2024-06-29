import { FC } from 'react'
import { observer } from 'mobx-react-lite';
import GenerarorSettings from './components/generarorSettings';
import Examples from './components/examples';

const App: FC = observer(() => (
  <div>
    <GenerarorSettings />
    <Examples />
  </div>
));

export default App
