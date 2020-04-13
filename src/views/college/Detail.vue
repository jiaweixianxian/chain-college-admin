<template>
  <div class="q-pa-md">
    <q-card class="my-card" :loading="loading">

      <q-card-section>

        <div class="text-h5 q-mt-sm q-mb-xs">{{collegeDetail.name}}</div>
        <div class="text-caption q-mt-sm" style=" white-space: pre-wrap;word-wrap: break-word;">{{collegeDetail.des}}
        </div>

        <div class="text-subitle2 q-mt-md">

          <q-badge v-for="(fellow, index) in collegeDetail.tags" :key="index" outline color="secondary q-mr-md"
            :label="fellow" />

        </div>

        <div class="row q-mt-lg" v-for="(item, index) in columns" :key="index">
          <div class="col-2 text-weight-medium ">
            {{item.label}}
          </div>
          <div class="col text-weight-regular">

            <template v-if="item.field==='schoolfellow'">
              <q-badge v-for="(fellow, index) in collegeDetail.schoolfellow" :key="index" outline
                color="primary q-mr-md" :label="fellow" />
            </template>

            <div v-else>
              {{collegeDetail[item.field]}}
            </div>

          </div>
        </div>

      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="高考分数线" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import collegeAPI from "@/api/college";

export default {
    data() {
        return {
            collegeDetail:{},
            loading:false,
            columns: [
        { name: 'type', label: '类别', field: 'type' },
        { name: 'created_year', label: '创立时间', field: 'created_year'},
        { name: 'department', label: '主管部门', field: 'department' },
        { name: 'website', label: '学校官网', field: 'website'},
        { name: 'code', label: '学校代码', field: 'code' },
        {name:'motto',label:'校训',field:'motto'},
        {name:'schoolfellow',label:'知名校友',field:'schoolfellow'},
        {name:'create_ts',label:'创建条目时间',field:'create_ts'},
        {name:'update_ts',label:'更新条目时间',field:'update_ts'},

      ],
        }
    },
    mounted() {
        this.getCollege();
    },

    methods: {
        async getCollege(){
               this.loading=true;
               const response=await collegeAPI.getCollegeDetail(this.$route.params.id);
               this.collegeDetail=response;
               this.loading=false;
    },

   
    },
}
</script>
<style lang="scss" scoped>
.my-card{
    width: 100%
}
</style>