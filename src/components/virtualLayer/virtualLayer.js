import React, { useEffect, useState } from 'react'
import { Divider } from 'antd'
import SelectDatabaseBlock from './selectDatabaseBlock'
import SelectTableBlock from './selectTableBlock'

export default function (props) {
  const [databaseGoInfo, setDatabaseGoInfo] = useState({ ifAddTable: true })
  const { returnData, setReturnData, store, baseApi, baseLayer } = props

  return (
    <div>
      {/* 选择数据库 */}
      <Divider style={{ color: '#43a5ff' }}>选择数据库</Divider>
      <SelectDatabaseBlock
        databaseInfo={databaseGoInfo}
        setDatabaseInfo={setDatabaseGoInfo}
        createParam={returnData}
        setCreateParam={setReturnData}
        baseApi={baseApi}
        baseLayer={baseLayer}
      />
      {/* 选择表 */}
      <Divider style={{ color: '#43a5ff' }}>选择表</Divider>
      <SelectTableBlock
        databaseInfo={databaseGoInfo}
        setDatabaseInfo={setDatabaseGoInfo}
        // handleModalClose={handleStoreCancel}
        createParam={returnData}
        setCreateParam={setReturnData}
        store={store ? store : false}
        baseApi={baseApi}
        baseLayer={baseLayer}
      />
    </div>
  )
}
