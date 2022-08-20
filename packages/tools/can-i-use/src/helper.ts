export const kindOf = (obj: any) => Object.prototype.toString.call(obj).slice(1, -8).toLowerCase();
