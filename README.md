# npm-
## ChangeButton API

| 参数         | 说明    |  类型  |
| --------    | -----:   | -----:   |
| startText        | 点击前的button参数      | string|
| endText        | 点击后的button参数      | string |

## PageTable

| 参数         | 说明    |  类型  |
| --------    | -----:   | -----:   |
| columns        | 表格列的配置描述      | array|
| dataSource        | 数据数组      | array |
| total        | 总共的行数      | int |
| showSizeChanger        | 是否可以改变页面大小pageSize      | Boolean |
| onShowSizeChange        | 页面大小改变的回调      | function |
| onChange        | 页面改变的回调      | function |