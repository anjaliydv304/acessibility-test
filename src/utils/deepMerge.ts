type DeepMergeObject = Record<string | number | symbol, any>;

export function deepMerge<T extends DeepMergeObject>(
  target: T,
  ...sources: Array<Partial<T> | undefined | null>
): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (source === undefined || source === null) {
    return deepMerge(target, ...sources);
  }

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const targetValue = target[key as keyof T];

        if (isObject(sourceValue) && isObject(targetValue)) {
          target[key as keyof T] = deepMerge(
            { ...targetValue },
            sourceValue
          ) as T[keyof T];
        } else if (sourceValue !== undefined) {
          target[key as keyof T] = sourceValue as T[keyof T];
        }
      }
    }
  }

  return deepMerge(target, ...sources);
}

function isObject(item: any): item is DeepMergeObject {
  return item && typeof item === 'object' && !Array.isArray(item);
}
