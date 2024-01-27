import {
    atom
  } from 'recoil';

import { getLastAppData } from 'layouts/dashboard/model/getAppDataModel';


const appDataState = atom({
    key: 'appData', // unique ID (with respect to other atoms/selectors)
    default: ({}), // default value (aka initial value)
  });

export {appDataState}


