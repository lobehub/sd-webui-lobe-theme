import { createGlobalStyle } from 'antd-style';

import antdOverride from './antdOverride';
import button from './components/button';
import collapse from './components/collapse';
import container from './components/container';
import extensions from './components/extensions';
import gallery from './components/gallery';
import input from './components/input';
import label from './components/label';
import lightboxModal from './components/lightboxModal';
import options from './components/options';
import popup from './components/popup';
import progress from './components/progress';
import slider from './components/slider';
import table from './components/table';
import tabs from './components/tabs';
import tokens from './tokens';

const GlobalStyle = createGlobalStyle(({ theme }) => [
  tokens(theme),
  antdOverride(theme),
  button(theme),
  container(theme),
  gallery(theme),
  input(theme),
  label(),
  collapse(theme),
  options(theme),
  progress(theme),
  slider(theme),
  table(theme),
  tabs(theme),
  popup(theme),
  extensions(theme),
  lightboxModal(theme),
]);

export default GlobalStyle;
