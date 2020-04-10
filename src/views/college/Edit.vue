<template>
  <div class="q-pa-md">

    <q-input
    class="q-mt-sm"
     v-model="collegeDetail[item.field]" :label="item.label" v-for="(item, index) in columns" :key="index" />


    <div class="row q-mt-lg">

    <q-btn color="white" class="q-mr-lg" text-color="black" label="取 消" />
    <q-btn color="primary" label="确 定" />

    </div>
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
        { name: 'name', label: '名称', field: 'name' , align: 'left',},
                { name: 'des', label: '描述', field: 'des' , align: 'left',},
        { name: 'type', label: '类型', field: 'type' , align: 'left',},
        { name: 'tag', label: '标签', field: 'tag' , align: 'left',},
        { name: 'created_year', label: '创立时间', field: 'created_year' , align: 'left',},
        { name: 'department', label: '主管部门', field: 'department', align: 'left', },
        { name: 'website', label: '学校官网', field: 'website', align: 'left',},
        { name: 'code', label: '学校代码', field: 'code', align: 'left', },
        {name:'motto',label:'校训',field:'motto', align: 'left',},
        {name:'schoolfellow',label:'知名校友',field:'schoolfellow', align: 'left',},
        
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
    }
    }
}
</script>