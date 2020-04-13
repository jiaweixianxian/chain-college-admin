<template>
  <q-page>
    <div class="q-pa-md">

      <div class="row q-mb-lg">
        <div class="col">
          省份：{{currentProvince.name||'北京市'}}
          <q-btn size="sm" flat icon-right="colorize" @click="provinceDialog=true"></q-btn>
        </div>
        <div class="col">
          .col
        </div>
      </div>

      <q-table style="width:100%" :pagination.sync="pagination" :loading="loading" :data="collegeList"
        :columns="columns" row-key="name">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td :props="props" v-for="(item) in columns" :key="item.field">

              <q-badge v-if="item.name==='type'" outline color="primary" :label="props.row[item.field]" />
              <template v-else-if="item.name==='tags'">
                <q-badge v-for="(fellow, index) in props.row.tags" :key="index" outline color="secondary q-mr-sm"
                  :label="fellow" />
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
                    <q-item clickable v-close-popup>
                      <q-item-section @click="deleteConfirm(props.row)">
                        删除
                      </q-item-section>
                    </q-item>

                  </q-list>
                </q-menu>
              </q-btn>

              <span v-else>
                {{ props.row[item.field]?props.row[item.field]:'--' }}
              </span>
            </q-td>

          </q-tr>
        </template>

      </q-table>

      <q-dialog v-model="provinceDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">选择省份</div>
          </q-card-section>

          <q-card-section class="q-pt-none">

            <div class="row q-mb-lg justify-start">
              <div class="col-3 q-ml-lg q-mb-md" @click="province=item" v-for="(item, index) in provinceList"
                :key="index">
                <q-btn size="sm" flat>{{item.name}}</q-btn>

                <q-icon name="check" v-if="province.name===item.name" />
              </div>
            </div>

          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="取消" color="primary" v-close-popup />

            <q-btn flat label="确认" color="primary" @click="confirmProvince()" />
          </q-card-actions>
        </q-card>
      </q-dialog>

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
          label: '院校名称',
          field:'name',
           align: 'left',
          sortable: true
        },
        { name: 'type', label: '类型', field: 'type', align: 'left',},
        { name: 'tags', label: '标签', field: 'tags' , align: 'left',},
        { name: 'department', label: '主管部门', field: 'department', align: 'left', },
        { name: 'location', label: '所在地', field: 'location', align: 'left',},
        {name:'motto',label:'校训',field:'motto', align: 'left',},
        {name:'actions',label:'操作',field:'actions', align: 'left'}
      ],
        pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      collegeList:[],
      loading:false,
      filter:{},
      currentProvince:{
        name:'北京市',
        abbr:'bj'
      },
      province:{},
      provinceDialog:false,
      provinceList:[]
    }
  },
  mounted() {
    
  },
  created() {
    this.getCollege();
    this.getProvince();
  },
  methods: {
    async getCollege(){
     this.filter.province_abbr=this.currentProvince.abbr;
     this.loading=true;
     const response=await collegeAPI.getColleges(this.filter);
     this.collegeList=response;
     this.loading=false;
    },
    detail(row){
      this.$router.push(`/college/${row.id}`);
    },
     edit(row){
      this.$router.push(`/college/edit/${row.id}`);
    },
    deleteConfirm(row){
      this.$q.dialog({
        title: '确认',
        message: `您要删除${row.name}吗？删除之后，所有关于此条目的信息都会被删除。`,
        cancel: true,
        persistent: true,
        cancel:{
          label:'取消',
          flat:true
        },
        ok:{
          label:'确认',
          flat:true,
          focus:true
        }
      }).onOk(() => {
        this.deleteCollege(row);
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
   async deleteCollege(row){
         await collegeAPI.deleteCollege(row.id);
          this.$q.notify({
              type:'positive',
              message:'删除成功'
            })
    },
   async getProvince(){
    this.provinceList=await collegeAPI.getProvinceList();
    },
    confirmProvince(){
        this.currentProvince=this.province;
        this.provinceDialog=false;
        this.getCollege();
    }
  },
}
</script>
