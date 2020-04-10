<template>
  <q-page>
    <div class="q-pa-md">
      <q-table style="width:100%" :loading="loading" :data="collegeList" :columns="columns" row-key="name">

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td :props="props" v-for="(item) in columns" :key="item.field">

              <q-badge v-if="item.name==='type'" outline color="primary" :label="props.row[item.field]" />

              <template v-else-if="item.name==='tag'">

                <q-badge v-for="(fellow, index) in (props.row.tag).split(',')" :key="index" outline
                  color="secondary q-mr-sm" :label="fellow" />
              </template>

              <q-btn v-else-if="item.name==='actions'" outline color="primary" label="操作" size="sm">
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup>
                      <q-item-section @click="edit(props.row)">编辑</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section @click="detail(props.row)">
                        详情
                      </q-item-section>
                    </q-item>

                  </q-list>
                </q-menu>
              </q-btn>

              <span v-else>
                {{ props.row[item.field] }}
              </span>
            </q-td>

          </q-tr>
        </template>

      </q-table>
    </div>
  </q-page>
</template>

<script>
import collegeAPI from "@/api/college";

export default {
  name: 'PageHome',
  data(){
    return{
       columns: [
        {
          name: 'name',
          label: '学校名称',
          field:'name',
           align: 'left',
          sortable: true
        },
        { name: 'type', label: '类型', field: 'type', align: 'left',},
        { name: 'tag', label: '标签', field: 'tag' , align: 'left',},
        { name: 'department', label: '主管部门', field: 'department', align: 'left', },
        {name:'motto',label:'校训',field:'motto', align: 'left',},
        {name:'actions',label:'操作',field:'actions', align: 'left'}
      ],
      collegeList:[],
      loading:false
    }
  },
  mounted() {
    
  },
  created() {
    this.getCollege();
  },
  methods: {
    async getCollege(){
     this.loading=true;
     const response=await collegeAPI.getColleges();
     this.collegeList=response;
     this.loading=false;
    },
    detail(row){
      this.$router.push(`/college/${row.id}`);
    },
     edit(row){
      this.$router.push(`/college/edit/${row.id}`);
    },
  },
}
</script>
