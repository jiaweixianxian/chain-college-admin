<template>
  <div class="q-pa-md">
    <q-card class="my-card" :loading="loading">

      <q-card-section>

        <div class="text-overline text-primary">
                {{collegeDetail.type}}
        </div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{collegeDetail.name}}</div>
        <div class="text-caption q-mt-lg ">
          {{collegeDetail.des}}
        </div>

        <div class="text-subitle2 q-mt-lg">

          <q-badge v-for="(fellow, index) in parseName(collegeDetail.tag)" :key="index" outline
            color="secondary q-mr-md" :label="fellow" />

        </div>

        <div class="row q-mt-lg" v-for="(item, index) in columns" :key="index">
          <div class="col-2 text-weight-medium ">
            {{item.label}}
          </div>
          <div class="col text-weight-regular">
            {{collegeDetail[item.field]}}
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
        { name: 'created_year', label: '创立时间', field: 'created_year' , align: 'left',},
        { name: 'department', label: '主管部门', field: 'department', align: 'left', },
        { name: 'website', label: '学校官网', field: 'website', align: 'left',},
        { name: 'code', label: '学校代码', field: 'code', align: 'left', },
        {name:'motto',label:'校训',field:'motto', align: 'left',},
        {name:'schoolfellow',label:'知名校友',field:'schoolfellow', align: 'left',},
        {name:'create_ts',label:'创建条目时间',field:'create_ts', align: 'left',},
        {name:'update_ts',label:'更新条目时间',field:'update_ts', align: 'left',},

      ],
        }
    },
    mounted() {
        this.getCollege();
    },

    methods: {
        async getCollege(){
               this.loading=true;
               const response=await collegeAPI.getColleges(this.$route.params.id);
               this.collegeDetail=response;
               this.loading=false;
    },

    parseName(name){
        if(!name) return;
        return name.split(',');
    }
    },
}
</script>
<style lang="scss" scoped>
.my-card{
    width: 100%
}
</style>