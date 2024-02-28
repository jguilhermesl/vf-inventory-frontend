export const sortItems = (items, key, order, type: "date" | "number" | "string") => {
  const getNestedPropertyValue = (obj: any, key: string) => {
    return key.split('?.').reduce((acc, currentKey) => acc?.[currentKey], obj);
  };

  return items.sort((a, b) => {
    const itemA = getNestedPropertyValue(a, key)
    const itemB = getNestedPropertyValue(b, key)

    console.log(itemA, itemB)

    if (type === 'number') {
      return order === 'ASC' ? itemA - itemB : itemB - itemA;
    }

    if (type === 'date') {
      return order === 'ASC'
        ? new Date(itemA).getTime() - new Date(itemB).getTime()
        : new Date(itemB).getTime() - new Date(itemA).getTime();
    }

    return order === 'ASC'
      ? itemA?.localeCompare(itemB)
      : itemB?.localeCompare(itemA);
  });
}