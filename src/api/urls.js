export const urls = {
  //api生成工具的api
  baseApi: 'http://10.0.102.46:17118',
  apiProducer: '/api/etl/apiGenerate/restfulApi',
  obtainApi: '/api/etl/apiQuery/restfulApi?ciphertext=',

  //虚拟层api
  baseLayer: 'http://10.0.102.46:4399',
  tableInfo: '/api/big_data/data_virtualization/metadata/table_info',
  tableName: '/api/big_data/data_virtualization/metadata/table_under_database',
  relationInfo: '/api/big_data/data_virtualization/metadata/relationship_info',
  propertyInfo: '/api/big_data/data_virtualization/metadata/property_info',
  catelogInfo: '/api/big_data/data_virtualization/metadata/catalog_info',
}
