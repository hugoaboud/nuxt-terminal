# nuxt-terminal

A client-side, shell-like terminal based on [xtermjs](https://github.com/xtermjs/xterm.js/), featuring a simple filesystem and an application layer. Wrapped in a `Vue Component` and pre-configured for [Nuxt.js](https://github.com/nuxt/nuxt.js).

This library allows fast building of terminal interfaces for games, educational projects and applications where a simple yet robust web terminal / OS simulator is required.

![nuxt-terminal.gif](https://imgur.com/HPawk0vl.png)

#### Features

- __Shell-like typing__: arrows, backspace/delete, home/end and buffer handling are already covered
- __Filesystem__: Folders and files defined through a simple schema
- __FS Navigation__: `cd` and `ls` commands with unix-like path syntax
- __File reading__: `cat` command for printing file content to terminal
- __Stdout__: A handler for printing text to terminal wrapped by word
- __Colors__: Color helper for beautiful UIs
- __Applications__: Unix-like approach for applications, where every command calls a single application with arguments.
- __Responsive__: Uses `xterm-addon-fit` to resize the console at runtime.
- __Typescript__: Type interfaces available for TS projects

#### Setup

The package is distributed via `npm` and `yarn`, so it should be pretty simple to install. Go to your Nuxt/Vue project root folder and run one of the commands below:

**npm**
```bash
$ npm i nuxt-terminal
```
**yarn**
```bash
$ yarn add nuxt-terminal
```

If you're using `Nuxt.js`, you should also list the plugin file at `nuxt.config.js`:
```javascript
// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
plugins: [
    '~node_modules/nuxt-terminal/plugin.client.js'
],
```

If you're using `Vue` without `Nuxt.js` you can also use it, just make sure to import both the component and the `xterm.css` file.

```javascript
import Vue from 'vue'
import NuxtTerminal from 'nuxt-terminal'
import 'node_modules/xterm/css/xterm.css'

Vue.use(NuxtTerminal)
```

#### Hello World

After setting up you should be able to use the `NuxtTerminal` component.

```html
<NuxtTerminal 
    :user="user"
    :domain="domain"
    :welcome="welcome"
    :filesystem="filesystem"
    :apps="apps"
/>
``` 

It should grow to fit the container it's in. If this doesn't happen, make sure the parent's dimensions are set (not auto), or else it shouldn't work well.

Then you should create the filesystem on the `<script>` section. Either `props` or `data` should be fine.
You should not use `computed` for the `filesystem` or the `apps` parameter.

```html
<script lang="ts">
import Vue from 'vue'
import { Filesystem, Folder, File, NuxtTerminalApp } from 'nuxt-terminal'

export default Vue.extend({
  data: () => ({
    
    user: 'root',
    domain: 'test',
    welcome: 'Hello world!',

    filesystem: new Filesystem([
      new Folder('home', [
        new Folder('user', [
          new File('passwords.txt', 'user:123456')
        ])
      ]),
      new File('README', 'This is a client-side bash-like terminal! Enjoy!')
    ]),
    
    apps: []
  })
})

</script>
```

![nuxt-terminal-filesystem.gif](https://s9.gifyu.com/images/nuxt_terminal_10c151616ed85676f.gif)

#### Apps

Every input sent to the shell is split (at whitespaces) into arguments, where the first argument is the app name.

This way, `ls` and `cat` are also apps (just like Unix!). When you type:
```bash
ls /home/user
```
The `ls` app should receive the arguments: `['ls', '/home/user']`.

In order to create an app you should extend the `NuxtTerminalApp` class. The class name is the application name, called by the shell.

```typescript
import NuxtTerminalApp from "nuxt-terminal";

class example extends NuxtTerminalApp {
  async main(_args: string[]): Promise<number> {
    this.stdout.print('The app has access to the shell stdout.\n');
    return 0;
  }
}
```

Then, you simply list the type on the `apps` property:
```typescript
    ...
    filesystem: {...},
    apps: [example]
    ...
```

![nuxt-terminal-example](https://imgur.com/GyJmhVxl.png)

In order to keep the `Single File Component` structure of `Vue`, you can define the App class right above the `export default` on the `<script>` tag of the component.

Apps also have access to the `Filesystem`, and a pointer to the `INode` from where the app was launched.

```typescript
import { NuxtTerminalApp, Folder } from 'nuxt-terminal'
class test_fs extends NuxtTerminalApp {
    async main(args: string[]): Promise<number> {
        
        this.stdout.print('The app was launched from: ' + this.node.path);

        let relative_node = this.fs.node(this.node, 'test/');
        let absolute_node = this.fs.node(null, '/test/');
        let also_absolute_node = this.fs.node(this.node, '/test/');

        return 0;
    }
}
```

#### Development Notes

I've built this library for an educational game/prank I wanted to play on some teens. It turns out it felt useful for other projects, so I've decided to wrap it and publish.

It's still pretty raw, so feel free to open Issues and Pull Requests.

In order to run the library standalone for development purposes you should:

```bash
git clone https://github.com/hugoaboud/nuxt-terminal.git
cd nuxt-terminal
npm run serve
```
