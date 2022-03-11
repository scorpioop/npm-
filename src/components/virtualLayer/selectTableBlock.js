import React, { useState, useEffect } from 'react'
import {
  Table,
  Row,
  Col,
  Menu,
  Typography,
  Button,
  message,
  Divider,
  Switch,
  Input,
} from 'antd'
import './selectTableBlock.css'
import axios from 'axios'
import { urls } from '../../api/urls'

const { Paragraph, Text } = Typography

const TableColumns = [
  {
    title: '字段名',
    dataIndex: 'columnName',
    key: 'columnName',
    ellipsis: true,
    align: 'center',
  },

  {
    title: '字段类型',
    dataIndex: 'columnType',
    key: 'columnType',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '字段名解析',
    dataIndex: 'tagName',
    key: 'tagName',
    ellipsis: true,
    align: 'center',
  },
]
export default function SelectTableBlock(props) {
  const { createParam, setCreateParam } = props
  const handleModalClose = props.handleModalClose
  const databaseInfo = props.databaseInfo
  const setDatabaseInfo = props.setDatabaseInfo
  const getBaseApi = () => {
    if (props.baseApi) {
      return props.baseApi
    } else {
      return urls.baseApi
    }
  }
  const getBaseLayer = () => {
    if (props.baseLayer) {
      return props.baseLayer
    } else {
      return urls.baseLayer
    }
  }
  const store = props.store
  const [tableNames, setTableNames] = useState([])
  const [tableData, setTableData] = useState([])
  const [tableTheme, setTableTheme] = useState([])
  //新建表
  const [createTableName, setCreateTableName] = useState('')
  const [addTable, setAddTable] = useState(false)
  //neo4j相关
  const [relatdata, setRelatdata] = useState([])
  const [otherdata, setOtherdata] = useState([])
  //最后一步，确定api选择
  const [singleApi, setSingleApi] = useState('')

  useEffect(() => {
    //重置页面状态
    getTableNames()
    getTableData(databaseInfo?.tableName)
    setTableData([])
  }, [databaseInfo?.databaseId])
  useEffect(() => {
    if (singleApi) {
      let tem = { ...createParam }
      tem.url = singleApi
      console.log(tem)
      setCreateParam({ ...tem })
    }
  }, [singleApi])
  useEffect(() => {
    let tem = { ...createParam }
    if (databaseInfo?.createTableName) {
      tem.db_name = databaseInfo?.createTableName
    } else {
      tem.db_name = databaseInfo?.tableName
    }
    tem.url = ''
    setSingleApi('')
    setCreateParam({ ...tem })
  }, [databaseInfo?.tableName, databaseInfo?.createTableName])
  //拿到host port 之后，拿tableNames
  async function getTableNames() {
    const result = await axios({
      method: 'get',
      url: getBaseLayer() + urls.tableName,
      params: {
        host: databaseInfo?.databaseHost,
        port: databaseInfo?.databasePort,
        database: databaseInfo?.databaseName,
      },
    })
    if (result.status === 200) {
      //test 额外获得neo4j relationship---------------
      if (databaseInfo?.databaseType === 'Neo4j') {
        const neo4jresult = await axios({
          method: 'post',
          url: getBaseLayer() + urls.relationInfo,
          data: { database_id: databaseInfo?.databaseId },
        })

        if (neo4jresult?.data?.code === '00000') {
          setRelatdata(neo4jresult?.data?.result)
        }
      }

      setOtherdata(result.data)
      setTableNames(result.data)
    }
  }

  const handleTableNameChange = (e) => {
    setDatabaseInfo({ ...databaseInfo, tableName: e.key })
    excuAlgo(e.key)
    //neo4j拿数据的接口不一样
    if (databaseInfo?.databaseType == 'Neo4j') {
      getRelaData(e.key)
    } else {
      getTableData(e.key)
    }
  }

  //拿neo4j数据库表数据
  const getRelaData = async (name) => {
    const result = await axios({
      method: 'post',
      url: getBaseLayer() + urls.propertyInfo,
      data: { database_id: databaseInfo?.databaseId, belong_to: name },
    })
    if (result.status === 200) {
      const data = result?.data?.result
      let tableDataList = []
      if (data?.length > 0) {
        for (let v of data) {
          tableDataList.push({
            columnName: v,
            columnType: 'String',
            tagName: '',
          })
        }
      }
      setTableData(tableDataList)
    }
  }

  //拿普通数据库表数据
  const getTableData = async (tableName) => {
    const result = await axios({
      method: 'get',
      url: getBaseLayer() + urls.tableInfo,
      params: {
        host: databaseInfo?.databaseHost,
        port: databaseInfo?.databasePort,
        database: databaseInfo?.databaseName,
        table_name: tableName,
      },
    })
    if (result.status === 200) {
      const data = result.data
      let tableDataList = []
      const infoGroup1 =
        data[0]?.tableDescriptiveInfo?.columnDescriptiveInfoGroup
      setTableTheme(data[0]?.tableDescriptiveInfo.theme)
      const infoGroup2 = data[0]?.tableStructuredInfo?.columnStructuredInfoGroup
      const len1 = infoGroup1?.length
      const len2 = infoGroup2?.length
      if (len1 > 0) {
        for (let i = 0; i < len1; i++) {
          let columnType = ''
          if (len2 > 0) {
            columnType = infoGroup2[i].columnType
          }
          tableDataList.push({
            columnName: infoGroup1[i].columnName,
            columnType: columnType,
            tagName: infoGroup1[i].tag,
          })
        }
      }
      setTableData(tableDataList)
    }
  }

  //选择表后同时拿到api
  async function excuAlgo(tableName) {
    const getapi = await axios({
      method: 'post',
      url: getBaseApi() + urls.apiProducer,
      data: {
        dbConfig: {
          ip: databaseInfo?.databaseHost,
          port: databaseInfo?.databasePort,
          dbName: databaseInfo?.databaseName,
          dbType: databaseInfo?.databaseType,
        },
        opDetail: {
          tableName: [tableName],
          operation: 'all', //查询全部，写死
        },
      },
    })
    if (getapi.status == 200) {
      setSingleApi(
        getBaseApi() + urls.obtainApi + getapi.data?.data?.ciphertext,
      )
    } else {
      message.info('获取URL失败')
    }
  }
  function handleSwitchChange(checked) {
    if (checked) {
      setTableNames(relatdata)
    } else {
      setTableNames(otherdata)
    }
  }
  const storeFinalData = () => {
    setDatabaseInfo({
      ...databaseInfo,
      api: singleApi,
    })
    message.success('配置成功')
    handleModalClose()
  }
  return (
    <>
      <div className="plain_table" style={{ marginTop: 15 }}>
        <Row>
          <Col span={7}>
            数据库类型：
            <Input
              value={databaseInfo?.databaseType}
              style={{ width: '65%', color: '#000' }}
              disabled
            />
          </Col>
          <Col span={7}>
            数据库名：
            <Input
              value={databaseInfo?.databaseName}
              style={{ width: '65%', color: '#000' }}
              disabled
            />
          </Col>
          <Col span={8}>
            {addTable ? (
              <>
                新增表名：
                <Input
                  placeholder="请输入新增表名"
                  value={createTableName}
                  style={{ width: '70%' }}
                  onChange={(e) => {
                    setCreateTableName(e.target.value)
                    setDatabaseInfo({
                      ...databaseInfo,
                      createTableName: e.target.value,
                    })
                  }}
                />
              </>
            ) : (
              <>
                数据库表名：
                <Input
                  value={databaseInfo?.tableName}
                  style={{ width: '70%', color: '#000' }}
                  disabled
                />
              </>
            )}
          </Col>
          <Col span={2}>
            {store && (
              <Button
                type="primary"
                onClick={() => {
                  if (addTable) {
                    setDatabaseInfo({
                      ...databaseInfo,
                      createTableName: undefined,
                    })
                  } else {
                    setDatabaseInfo({
                      ...databaseInfo,
                      createTableName: createTableName,
                    })
                  }
                  setAddTable(!addTable)
                }}
                disabled={!databaseInfo?.ifAddTable}>
                {addTable ? '取消' : '新增表'}
              </Button>
            )}
          </Col>
        </Row>
        <Divider />
        {addTable ? null : (
          <Row>
            <Col span={4}>
              <div style={{ padding: 15 }}>
                {/* test switch */}
                {databaseInfo?.databaseType == 'Neo4j' &&
                relatdata?.length > 0 ? (
                  <Switch
                    checkedChildren="关系"
                    unCheckedChildren="节点"
                    onChange={handleSwitchChange}
                  />
                ) : null}
                {/* test end */}
              </div>
              <div className="reset-scroll-for-menu">
                <Menu
                  style={{
                    width: '100%',
                    height: 278,
                    overflowY: 'scroll',
                    border: '2px solid rgba(0, 0, 0, 0.05)',
                  }}
                  selectable={true}
                  onClick={handleTableNameChange}>
                  {tableNames?.length > 0 ? (
                    tableNames?.map((tableName) => {
                      return <Menu.Item key={tableName}>{tableName}</Menu.Item>
                    })
                  ) : (
                    <></>
                  )}
                </Menu>
              </div>
            </Col>
            <Col span={20}>
              {tableData ? (
                <>
                  <Text
                    style={{ marginLeft: '45%', fontSize: '1.2rem' }}
                    type="secondary">
                    表主题：
                    {tableTheme?.length != 0
                      ? tableTheme?.map((name) => {
                          return name
                        })
                      : '无'}
                  </Text>
                  <Table
                    dataSource={tableData}
                    columns={TableColumns}
                    pagination={{ pageSize: 4 }}
                  />
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        )}
        <Divider style={{ color: '#43a5ff' }}>获取数据URL</Divider>
        <Row justify="center">
          <Col offset={1} span={22}>
            <span>数据地址：</span>
            <Paragraph className="set_par" copyable style={{ width: '100%' }}>
              {singleApi}
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col offset={10} span={4}></Col>
        </Row>
      </div>
    </>
  )
}
