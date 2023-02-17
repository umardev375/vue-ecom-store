import arrayToObject from 'vuex-map-fields/src/lib/array-to-object'

export default function mapDynamicFields(fields, objectPath) {
  const fieldsObject = Array.isArray(fields) ? arrayToObject(fields) : fields

  return Object.keys(fieldsObject).reduce((prev, key) => {
    prev[key] = {
      get() {
        const path = `${this[objectPath]}.${fieldsObject[key]}` // fieldsObject[key].replace('[]', `[${this[indexField]}]`)
        return this.$store.getters[`${this.storeModule}/getField`](path)
      },
      set(value) {
        const path = `${this[objectPath]}.${fieldsObject[key]}` // fieldsObject[key].replace('[]', `[${this[indexField]}]`)
        this.$store.commit(`${this.storeModule}/updateField`, { path, value })
      }
    }
    return prev
  }, {})
}
