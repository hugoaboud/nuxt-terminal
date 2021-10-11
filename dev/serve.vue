<script lang="ts">
import Filesystem, { Folder, File } from '../src/os/filesystem';
import Vue from 'vue';
import NuxtTerminal from '@/nuxt-terminal.vue';
import Color from '../src/os/color';

import help from './apps/help'
import NuxtTerminalApp from '@/apps/App';

class example extends NuxtTerminalApp {
  async main(_args: string[]): Promise<number> {
    this.stdout.print('The app has access to the shell stdout.\n');
    return 0;
  }
}

export default Vue.extend({
  name: 'NuxtTerminalDevelopment',
  components: {
    NuxtTerminal
  },
  data: () => ({
    user: 'root',
    domain: 'nuxt',
    welcome: `Welcome to ${Color.Green('nuxt-terminal')}! Powered by xtermjs.`,
    filesystem: new Filesystem([
      new Folder('home', [
        new Folder('user', [
          new File('email', 'user@email.com')
        ]),
        new Folder('root', [])
      ]),
      new Folder('bin', []),
      new Folder('lib', []),
      new File('README', 'It works!')
    ]),
    apps: [
      help,
      example
    ]
  })
});
</script>

<template>
  <div id="app">
    <NuxtTerminal
      :user = 'user'
      :domain = 'domain'
      :welcome = 'welcome'
      :filesystem = 'filesystem'
      :apps = 'apps'
      />
  </div>
</template>
