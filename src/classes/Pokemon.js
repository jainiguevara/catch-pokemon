function Pokemon({ id, name, types, stats, encounters }, date) {
  this.id = id;
  this.name = name;
  this.types = types.reduce((acc, value) => {
    acc.push(value.type.name);
    return acc;
  }, []);
  this.stats = stats.reduce((acc, value) => {
    acc.push({
      stat: value.stat.name,
      base: value.base_stat
    });
    return acc;
  }, []);
  this.encounters = encounters.reduce((acc, value) => {
    const { location_area, version_details } = value
    acc.push({
      location: location_area.name,
      methods: wrapEncounterMethods(version_details)
    });
    return acc
  }, []);
  this.dateUpdated = date;
}

function wrapEncounterMethods (details) {
  return details.reduce((dAcc, dValue) => {
    dAcc.push({
      ...dValue.encounter_details.reduce((acc, value) => {
        acc = {
          method: value.method.name,
          version: dValue.version.name
        }
        return acc
      }, {})
    })
    return dAcc
  }, []);
}

export default Pokemon;
