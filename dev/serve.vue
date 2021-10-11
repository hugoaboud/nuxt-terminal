<script lang="ts">
import Filesystem, { Folder, File } from '../src/os/filesystem';
import Vue from 'vue';
import NuxtTerminal from '@/nuxt-terminal.vue';
import Color from '../src/os/color';

import help from './apps/help'

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
      new Folder('test', []),
      new File('README', 'It works!')
    ]),
    apps: [
      help
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
