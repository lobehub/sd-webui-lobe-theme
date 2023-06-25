import { createGlobalStyle } from 'antd-style';

import antdOverride from './antd-override';
import button from './components/button';
import container from './components/container';
import input from './components/input';
import label from './components/label';
import options from './components/options';
import progress from './components/progress';
import slider from './components/slider';
import table from './components/table';
import tabs from './components/tabs';
import tokens from './tokens';

const GlobalStyle = createGlobalStyle(({ theme }) => [
  tokens(theme),
  antdOverride(theme),
  slider(theme),
  table(theme),
  input(theme),
  container(theme),
  button(theme),
  tabs(theme),
  options(theme),
  label(theme),
  progress(theme),
]);

export default GlobalStyle;
