export const tableMessage = {
  tableList: [
    {name: '字段一', type: '1', IsRequired: '1', options: '0', id: '1'},
    {name: '字段二', type: '2', IsRequired: '2', options: '2', id: '2'},
    {name: '字段三', type: '3', IsRequired: '2', options: ['选项一', '选项二'], id: '3'}
  ],
  typeMap: [
    {value: '1', name: '单行文本'},
    {value: '2', name: '日期'},
    {value: '3', name: '单选下拉'}
  ],
  dateMap: [
    {value: '0', name: '年'},
    {value: '1', name: '年 - 月'},
    {value: '2', name: '年 - 月 - 日'},
    {value: '3', name: '年 - 月 - 日 时 - 分'}
  ],
  optionsList: ['选项一', '选项二'],
  IsRequiredMap: [
    {value: '1', name: '是'},
    {value: '2', name: '否'}
  ],
  columns: [
    {
      title: '字段名称',
      dataIndex: 'name'
    },
    {
      title: '字段类型',
      dataIndex: 'type',
      scopedSlots: {customRender: 'type'}
    },
    {
      title: '是否必填',
      dataIndex: 'IsRequired',
      customRender: (text) => {
        return text === '1' ? '是' : '否'
      }
    },
    {
      title: '字段选项',
      dataIndex: 'options',
      scopedSlots: {customRender: 'options'}
    },
    {
      title: '操作',
      scopedSlots: {customRender: 'operation'}
    }
  ]
}
