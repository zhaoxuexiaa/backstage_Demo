<template>
  <div class="content">
    <a-card>
      <a-table :columns="tableMessage.columns" :data-source="tableList" rowKey="id" :pagination="false">
        <span slot="type" slot-scope="text">{{ text | filterType }}</span>
        <template slot="options" slot-scope="text,record">
          <span v-if="record.type == '1' || !record.options">无</span>
          <span v-else-if="record.type =='2'">{{ text | filterDate }}</span>
          <span v-else>{{ text.join(',') }}</span>
        </template>
        <span slot="operation" slot-scope="text,record">
          <a @click="$refs.editModal.open(record)">编辑</a>
        </span>
      </a-table>
    </a-card>
    <!--      编辑弹框-->
    <edit-modal ref="editModal" @editTable="editTable"></edit-modal>
  </div>
</template>

<script>
import {tableMessage} from '../utils/xueya'

import editModal from './editModal'

export default {
  components: {editModal},
  name: 'HelloWorld',
  data () {
    return {
      tableMessage,
      tableList: []
    }
  },
  filters: {
    filterType (value) {
      return tableMessage.typeMap.filter(item => item.value === value)[0].name
    },
    filterDate (value) {
      return tableMessage.dateMap.filter(item => item.value === value)[0].name
    }
  },
  methods: {
    editTable (index, data) {
      this.$set(this.tableList, index, data)
    }
  },
  created () {
    this.tableList = this.tableMessage.tableList
  }
}
</script>

<style scoped>
.content {
}
</style>
