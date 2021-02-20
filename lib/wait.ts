export function wait(ms: number){
    return new Promise<void>(resolve => {
        setTimeout( () => resolve(), ms);
    });
}

export async function waitTimeout<T>(ms: number, func: () => T){
    await wait(ms);
    return func();
}