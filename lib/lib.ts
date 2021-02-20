/**
 * Checkt ob obj eine Property mit dem Namen prop enthällt. Dies ist ein Wrapper für TypeScript.
 * @param obj
 * @param prop
 */
export function hasOwnProperty<X extends {}, Y extends PropertyKey>
(obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}