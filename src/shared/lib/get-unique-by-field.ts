function getUniqueByField<T>(items: T[], fieldName: keyof T) {
  return items.reduce((unique, item) => {
    if (!unique.some((u) => u[fieldName] === item[fieldName])) {
      unique.push(item);
    }
    return unique;
  }, [] as T[]);
}
