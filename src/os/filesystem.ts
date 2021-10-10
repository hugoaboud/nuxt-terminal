export abstract class INode {
    parent!: INode;
    path!: string;
    children: Record<string,INode>
    constructor(
        public name: string,
        children:INode[]
    ){
        this.children = children.reduce((a,x) => ({...a, [x.name]: x}), {});
    }
    build(parent?: INode, path?: string) {
        if (!path) this.path = '/';
        else this.path = path + this.name + '/';
        if (!parent) this.parent = this;
        else this.parent = parent;
        Object.values(this.children).map(child => {
        child.build(this, this.path);
        })
        return this;
    }
}

export class Folder extends INode {}

export class File extends INode {
    constructor(
        name: string,
        public content:string
    ){
        super(name,[]);
    }
}

/**
 * Client-Side JSON Filesystem
 */
export default class Filesystem {
    _root: Folder
    constructor(
        nodes: INode[]
    ){
        this._root = new Folder('/',nodes).build();
    }
    public get root() {return this._root; }

    /**
     * Returns child node by name, or '.' for current node, or '..' for parent node.
     * @param node Some INode
     * @param name Child name, '.' or '..'   Child INode
     * @throws     String containing not found node name + warning
     */
    child(node: INode, name: string): INode {
        if (name.length == 0) return node;
        if (name === '.') return node;
        if (name === '..') return node.parent;
        if (!node.children[name])
            throw `'${name}' not found`
        return node.children[name];
    }

    /**
     * Returns node by "UNIX path"
     * @param local Current local inode (for relative addresses)
     * @param path  UNIX path    INode
     * @throws      String containing not found node name + warning
     */
    node(local: INode, path: string): INode {
        if (path.length < 1) return local;
        let node = local;
        if (path[0] === '/') {
            node = this.root;
            path = path.slice(1);
        }
        path.split('/').map(dir => {node = this.child(node, dir)});
        return node;
    }
}
