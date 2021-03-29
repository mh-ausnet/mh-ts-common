//---------------------------- LINKED LIST --------------------------------------

class Node<T> {
    _val:T | null;
    _next:Node<T> | null;
    constructor(val:T|null=null, next:Node<T>|null=null) {
        this._val = val;
        this._next = next;;
    }

    hasVal(val:T):boolean {
        return this._val === val;
    }
}

interface ILinkedListIterator<T> {
    hasNext:Function,
    next:Function,
    getValue:Function
}

export class LinkedList<T> {
    _head:Node<T> | null;
    private _length:number = 0;
    constructor() {
        this._head = null;
    }

    push(val:T|null):void {
        if (val) {
            this._head = new Node<T>(val, !this._head ? null : this._head); 
            this._length++;
        }
    }

    pop():T|null {
        if (this._head) {
            var n = this._head;
            if (this._head._next) {
                this._head = this._head._next;
            } else {
                this._head = null;
            }
            this._length--;
            return n._val;
        }
        this._length = 0;
        return null;
    }

    remove(val:T):T|null {
        if (val) {
            var n = this._head;
            var m = n;
            if (n) {
                while (n._next) {
                    if (n.hasVal(val) && m) {
                        m._next = n._next
                        this._length--;
                        return n._val;
                    }
                    m = n;
                    n = n._next;
                }
            }
        }
        return null;
    }

    insertBefore(val:T|null, before:T|null):void {
        if (val && before) {
            if (!this._head) this._head = new Node<T>(val);
            var n:Node<T> = this._head
            while (n._next) {
                if (n._next.hasVal(val)) {
                    n._next = new Node<T>(val, n._next);
                    this._length++;
                    break;
                }
                n = n._next;
            }
        }
    }



    find(val:T|null):T|null {
        if (val && this._head) {
            var n:Node<T> = this._head;
            while (n._next) {
                if (n.hasVal(val)) {return n._val;}
            }
        }
        return null;
    }

    getIterator():ILinkedListIterator<T> {
        let n:Node<T>|null = this._head;
        return {
            hasNext:():boolean => {return n !== null},
            next:():void => {
                if (n) {
                    n = n._next;
                }
            },
            getValue:():T|null => { if (n) return n._val; else return null; }
        }
    }
}