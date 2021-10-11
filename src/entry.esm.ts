import _Vue, { PluginObject } from 'vue';

// Import vue component
import component from '@/nuxt-terminal.vue';

// Define typescript interfaces for installable component
type InstallableComponent = typeof component & PluginObject<any>;

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
export default /*#__PURE__*/((): InstallableComponent => {
  // Assign InstallableComponent type
  const installable = component as unknown as InstallableComponent;

  // Attach install function executed by Vue.use()
  installable.install = (Vue: typeof _Vue) => {
    Vue.component('NuxtTerminal', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

import _Color from '@/os/color'
export const Color = _Color

import _INode from '@/os/filesystem'
export const INode = _INode

import _Folder from '@/os/filesystem'
export const Folder = _Folder

import _File from '@/os/filesystem'
export const File = _File

import _Filesystem from '@/os/filesystem'
export const Filesystem = _Filesystem

import _NuxtTerminalApp from '@/apps/App'
export const NuxtTerminalApp = _NuxtTerminalApp