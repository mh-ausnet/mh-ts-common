//---------------------------------- Linked List ------------------------------
class Node<T> {
    _val:T | null;
    _next:Node<T> | null;
    constructor(val:T|null=null, next:Node<T>|null=null) {
        this._val = val;
        this._next = next;
    }

    hasVal(val:T):boolean {
        return this._val === val;
    }
}

interface ILinkedListIterator<T> {
    hasNext():boolean,
    next():void,
    getValue():T|null,
    setToHead():void
}

export class LinkedList<T> {
    _head:Node<T> | null;
    private _length:number = 0;
    constructor() {
        this._head = null;
    }

    push(val:T|null):void {
        if (val!= null) {
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
        if (val != null) {
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
        if (val != null && before != null) {
            if (!this._head || this._head.hasVal(before)) {
                this._head = new Node<T>(val);
            }
            var n:Node<T> = this._head;
            var m:Node<T> = n;
            while (n._next) {
                if (n.hasVal(before)) {
                    m._next = new Node<T>(val, n);
                    this._length++;
                    break;
                }
                m = n;
                n = n._next;
            }
        }
    }

    insertAfter(val:T|null, after:T|null):void {
        if (val != null && after != null) {
            var n = this.find(after);
            if (n) {
                n._next =  new Node<T>(val, n._next);
            } 
        }
    }
    
    findValByObjectKey<U extends keyof T>(key:U, value:any):T|null {
        if (key != null && this._head) {
            var n:Node<T> = this._head;
            while (n._next) {
                if (n._val !== null && n._val[key] === value) {
                  return n._val;
                }
                n = n._next;
            }
        }
        return null;
    }


    find(val:T|null):Node<T>|null {
        if (val != null && this._head) {
            var n:Node<T> = this._head;
            while (n._next) {
                if (n.hasVal(val)) {return n;}
                n = n._next;
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
            getValue:():T|null => { if (n) return n._val; else return null; },
            setToHead:():void => {n = this._head;}
        }
    }
}
