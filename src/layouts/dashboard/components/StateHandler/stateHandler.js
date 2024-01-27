import {
  RecoilRoot,
  atom
} from 'recoil';

import DashBoard from 'layouts/dashboard'



  export default props => {

    return(
            <RecoilRoot>
                <DashBoard/>
            </RecoilRoot>
        )
  }
