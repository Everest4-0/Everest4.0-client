export class Entity<T> {
    public static clone<T>(target: T): T {
        if (target === null) {
            return target;
        }
        if (target instanceof Date) {
            return new Date(target.getTime()) as any;
        }
        if (target instanceof Array) {
            const cp = [] as any[];
            (target as any[]).forEach((v) => { cp.push(v); });
            return cp.map((n: any) => Entity.clone<any>(n)) as any;
        }
        if (typeof target === 'object' && target !== {}) {
            const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
            Object.keys(cp).forEach(k => {
                cp[k] = Entity.clone<any>(cp[k]);
            });
            return cp as T;
        }
        return target;
    }

    public clone(): T {

        const obj: any = {};
        for (const attr in this) {
            if (typeof this[attr] === 'object') {
                obj[attr + 'Id'] = this[attr]['id'];
            } else {
                obj[attr] = this[attr];
            }
        }

        return obj as T;
    }
}