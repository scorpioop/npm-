import React, { useState, Component } from "react";
import { Table} from 'antd';
export default function PageTable(props){
    
    return(
        
         <Table columns={props.columns} dataSource={props.data} pagination={{
            total: props.total,
            pageSizeOptions: ["10", "20", "50"],
                    // 显示总条数
            showTotal:()=>`共 ${props.total} 条`,
             // 是否可以改变 pageSize true or false
            showSizeChanger: props.showSizeChanger,
            
            onShowSizeChange:props.onShowSizeChange,
            //页码和页面大小变化
            onChange:props.onChange}}/>
    )
}