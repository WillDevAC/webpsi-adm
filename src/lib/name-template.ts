interface IName {
  name: string;
  value: string;
}
const getNames = (json: string, names: IName[]) => {
  let jsonJ = json;

  for (const name of names) {
    jsonJ = jsonJ.split(name.name).join(name.value);
  }
  return jsonJ;
};

export { getNames };
