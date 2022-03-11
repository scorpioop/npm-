import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import axios from 'axios'
import { urls } from '../../api/urls'

const DBColumns = [
  {
    title: '数据库名',
    dataIndex: 'databaseName',
    key: 'databaseName',
    align: 'center',
    render: (text, record, index) => {
      return <span style={{ fontWeight: 'bold' }}>{record.databaseName}</span>
    },
  },
  {
    title: '数据库贡献者',
    dataIndex: 'owner',
    key: 'owner',
    align: 'center',
  },
  {
    title: '别名',
    dataIndex: 'comment',
    key: 'comment',
    align: 'center',
    render: (text, record, index) => {
      return record.comment == '' ? (
        <span style={{ color: '#bfbfbf' }}>未设置</span>
      ) : (
        <span>{record.comment}</span>
      )
    },
  },
  {
    title: '数据库地址',
    dataIndex: 'databaseHost',
    key: 'databaseHost',
    align: 'center',
    render: (text, record, index) => {
      let host = record.databaseHost.split('.')
      let after = record.databaseHost
        .slice(host[0].length)
        .replace(/[0-9]/gi, '*')
      return <span>{host[0] + after}</span>
    },
  },
  {
    title: '数据库类型',
    dataIndex: 'databaseType',
    key: 'databaseType',
    align: 'center',
  },
  {
    title: '表总数',
    dataIndex: 'table_count',
    key: 'table_count',
    align: 'center',
  },
  {
    title: '数据量',
    dataIndex: 'size',
    key: 'size',
    align: 'center',
  },
  {
    title: '贡献时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align: 'center',
    width: '7rem',
  },
  {
    title: '修改时间',
    dataIndex: 'update_time',
    key: 'update_time',
    align: 'center',
    width: '7rem',
  },
]

function SelectDatabaseBlock(props) {
  const setDatabaseInfo = props.setDatabaseInfo
  const databaseInfo = props.databaseInfo
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
  const [tableData, setTableData] = useState([])
  const [pageData, setPageData] = useState([])
  const [pageNow, setPageNow] = useState(1)
  const { createParam, setCreateParam } = props

  useEffect(() => {
    getDBTable(pageNow)
  }, [props.databaseInfo?.databaseId])

  //拿数据库数据
  async function getDBTable(page) {
    const result = await axios({
      method: 'get',
      url: getBaseLayer() + urls.catelogInfo,
      params: {
        page_index: page,
      },
    })
    if (result.status === 200) {
      let arr = result.data?.data?.map((ele, key) => {
        return {
          key: ele.id,
          create_time: ele.create_time,
          databaseHost: ele.host,
          databasePort: ele.port,
          owner: ele.owner,
          databaseName: ele.database,
          databaseType: ele.database_type,
          size: ele.size,
          update_time: ele.update_time,
          comment: ele.comment,
          table_count: ele.table_count,
          databaseId: ele.id,
        }
      })
      setTableData(arr)
      setPageData(result.data.detail)
    }
  }

  const rowSelection = {
    type: 'radio',
    onSelect: (record) => {
      let tem = { ...createParam }
      tem.databaseId = record?.databaseId
      tem.databaseName = record?.databaseName
      tem.databaseType = record?.databaseType
      setCreateParam({ ...tem })
      setDatabaseInfo({
        ...databaseInfo,
        ...record,
      })
    },
    selectedRowKeys: databaseInfo?.databaseId
      ? [databaseInfo?.databaseId + '']
      : [],
  }
  //翻页
  function pageChange(e) {
    setPageNow(e)
    getDBTable(e)
  }

  return (
    <>
      <Table
        dataSource={tableData}
        columns={DBColumns}
        scroll={{ y: 400 }}
        pagination={{
          hideOnSinglePage: true,
          total: pageData.total,
          pageSize: pageData.sizePerPage,
          onChange: pageChange,
          showSizeChanger: false,
        }}
        rowSelection={{
          ...rowSelection,
        }}
      />
    </>
  )
}
export default SelectDatabaseBlock
