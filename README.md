# antd-table-config

这是通过拖拽组件，配置元素来实现**业务级**的table配置。

## 开始

### 安装

```
npm install antd-table-config --save
```

### 使用

```javascript
import AntdTableConfig from 'antd-table-config
import 'antd-table-config/style/css.css

<AntdTableConfig onSave={onSave}/>
```

### API

| 参数 | 说明 | 类型 | 默认值 | 
| :-- | :-- | :-- | :--: |
| dataSource | 配置的元素库 | ColumnProps[] | - | 
| value | 已配置的元素 | ColumnProps[] | - | 
| height | 配置区域的高度 | string | - | 
| closable | 是否显示关闭按钮 | boolean | false | 
| restable | 是否显示重置按钮 | boolean | false | 
| onSave | 点击保存的回调 | function | - | 
| onCancel | 点击关闭的回调 | function | - | 
| saveButtonProps | 保存按钮的属性 | object | - | 
| cancelButtonProps | 取消按钮的属性 | object | - | 

#### ColumnProps

| 参数 | 说明 | 类型 | 默认值 | 
| :-- | :-- | :-- | :--: |
| title | 标题 | string | - |
| dataIndex | 索引 | string | - |

## 参与贡献

非常欢迎你的贡献，你可以通过以下方式和我们一起共建：

- 通过 Issue bug 或进行咨询。
- 提交 Pull Request 改进代码。
