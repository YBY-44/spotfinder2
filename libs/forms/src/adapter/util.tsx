export const intFilter = (data?: [number, number]) => {
  if (!data) return {};
  const filterObj: { gte?: number; lte?: number } = {};
  if (data[0] !== 0) {
    filterObj["gte"] = data[0];
  }
  if (data[1] !== 100) {
    filterObj["lte"] = data[1];
  }
  return filterObj;
};
