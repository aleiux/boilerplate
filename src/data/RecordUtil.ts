import { List, Map, Record } from 'immutable';

type GetType<Base> = (key: keyof Base) => any;
type SetType<Base> = (key: keyof Base, value: any) => RecordToSelf<Base>;
export type RecordToSelf<Base> = Base & {
  get: GetType<Base>,
  set: SetType<Base>,
}

export function CreateConstructor<C>(ClassRef: { new(): C }): (override?: any) => RecordToSelf<C>
{
  const instance: C = new ClassRef();
  const obj = {};
  for (const key in instance)
  {
    if (instance.hasOwnProperty(key))
    {
      obj[key as string] = instance[key];
    }
  }
  return Record(obj) as any;
}
