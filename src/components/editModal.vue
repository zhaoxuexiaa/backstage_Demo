<template>
  <a-modal v-model="visible" title="编辑" @ok="handleOk">
    <a-form :form="form" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
      <a-form-item label="字段名称">
        <a-input
          placeholder="字段名称"
          v-decorator="['name', {rules: [{ required: required, message: '请输入字段名称' }], validateTrigger: 'blur'}]"/>
      </a-form-item>
      <a-form-item label="字段类型">
        <a-select @change="typeChange"
                  v-decorator="['type', {rules: [{ required: required, message: '请选择字段类型' }], validateTrigger: 'change'}]">
          <a-select-option v-for="item in tableMessage.typeMap" :key="item.value" :value="item.value">{{
              item.name
            }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否必填">
        <a-select @change="IsRequiredChange"
                  v-decorator="['IsRequired', {rules: [{ required: required, message: '请选择是否必填' }], validateTrigger: 'change'}]">
          <a-select-option v-for="item in tableMessage.IsRequiredMap" :key="item.value" :value="item.value">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="type=='2'?'日期选项': '单选选项'" v-if="type !== '1'">
        <a-select v-if="type==='2'"
                  v-decorator="['options', {rules: [{ required: required, message: '请选择日期选项' }], validateTrigger: 'change'}]">
          <a-select-option v-for="item in tableMessage.dateMap" :key="item.value" :value="item.value">{{
              item.name
            }}
          </a-select-option>
        </a-select>
        <a-select mode="tags" v-if="type==='3'" @change="optionChange" placeholder="选项"
                  v-decorator="['options', {rules: [{ required: required, message: '请选择单选选项' }], validateTrigger: 'change'}]">
          <a-select-option v-for="item in tableMessage.optionsList" :key="item" :value="item">{{
              item
            }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import {tableMessage} from '../utils/xueya'

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
}
export default {
  name: 'editModal',
  data () {
    return {
      visible: false,
      formItemLayout,
      tableMessage,
      form: this.$form.createForm(this),
      required: true,
      type: undefined,
      id: undefined
    }
  },
  methods: {
    open (data) {
      this.visible = true
      this.$nextTick(() => {
        const {name, type, IsRequired, id} = data
        this.required = IsRequired === '1'
        this.type = type
        this.id = id
        this.form.setFieldsValue({
          name,
          type,
          IsRequired
        })
        setTimeout(() => {
          if (type !== '1') {
            this.form.setFieldsValue({
              options: data.options
            })
          }
        })
      })
    },
    // 是否必填
    IsRequiredChange (value) {
      this.required = value === '1'
      console.log(this.required)
    },
    // 选项
    optionChange (value) {
      // console.log(value)
    },
    typeChange (type) {
      this.type = type
      this.form.setFieldsValue({
        options: undefined
      })
    },
    // 保存
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const Index = this.tableMessage.tableList.findIndex(item => item.id === this.id)
          this.visible = false
          const data = {id: this.id, ...values}
          this.$emit('editTable', Index, data)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
