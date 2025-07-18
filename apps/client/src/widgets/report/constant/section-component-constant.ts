import { HOME_CATEGORY_TAB } from '@widgets/report/constant/tab-constant';

import Ipwon from '../components/ipwon/ipwon';
import Janghae from '../components/janghae/janghae';
import Keunbyeong from '../components/keunbyeong/keunbyeong';
import Samang from '../components/samang/samang';
import Susul from '../components/susul/susul';

export const SECTIONS = [
  {
    key: HOME_CATEGORY_TAB.MAJOR_DISEASE,
    title: '큰 병',
    Component: Keunbyeong,
  },
  { key: HOME_CATEGORY_TAB.SURGERY, title: '수술', Component: Susul },
  { key: HOME_CATEGORY_TAB.HOSPITALIZATION, title: '입원', Component: Ipwon },
  { key: HOME_CATEGORY_TAB.DISABILITY, title: '장해', Component: Janghae },
  { key: HOME_CATEGORY_TAB.DEATH, title: '사망', Component: Samang },
] as const;
