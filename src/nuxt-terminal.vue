<script lang="ts">
import Filesystem from './os/filesystem'
import Shell from './os/shell'
import StdOut from './os/stdout'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit';
import Vue from 'vue';
export default /*#__PURE__*/Vue.extend({
  name: 'NuxtTerminal', // vue component name
  props: {
      user: String,
      domain: String,
      welcome: String,
      filesystem: Filesystem,
      apps: Array
  },
  data: () => ({
      term: new Terminal(),
      fit_addon: new FitAddon(),
      shell: {} as Shell,        
      stdout: {} as StdOut,        
  }),
  mounted() {
      this.term.loadAddon(this.fit_addon);
      this.term.open(document.getElementById('terminal')!);
      this.fit_addon.fit();

      this.stdout = new StdOut(this.term);
      this.stdout.print('');
      this.stdout.print(this.welcome.replace(/\n/g,'\n\r'));
      this.stdout.print('');

      this.shell = new Shell(this.term, this.filesystem, this.stdout, this.apps as any[]);
      this.shell.user = this.user;
      this.shell.domain = this.domain;
      this.shell.run();
      
      window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
  },
  methods: {
      onResize() {
          this.fit_addon.fit();
      }
  },
  watch: {
      user(val) {this.shell.user = val;},
      domain(val) {this.shell.domain = val;}
  }
});
</script>

<template>
  <div class="pa-0" id="terminal" style="height: 100%"></div>
</template>

<style>
    @import '../node_modules/xterm/css/xterm.css';
</style>