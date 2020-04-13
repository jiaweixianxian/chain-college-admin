<template>
  <div class="q-pa-md">

    <q-form ref="myForm">
      <div v-for="(item, index) in columns" :key="index">

        <q-select v-if="item.name==='type'" v-model="collegeDetail.type" :options="typeOptions" multiple
          :label="item.label" />

        <q-select v-else-if="item.name==='tags'" v-model="collegeDetail.tags" :options="options" multiple
          :label="item.label" />

        <q-select v-else-if="item.name==='schoolfellow'" v-model="collegeDetail.schoolfellow" use-input use-chips
          multiple input-debounce="0" new-value-mode="add" :label="item.label" />

        <q-select v-else-if="item.name==='created_year'" v-model="collegeDetail.created_year" :options="yearArray"
          :label="item.label" />

        <q-input v-else class="q-mt-md" :disabled="item.field==='name'" :type="item.field==='des'?'textarea':''"
          v-model="collegeDetail[item.field]" :label="item.label">

        </q-input>

      </div>

    </q-form>

    <div class="row q-mt-lg">

      <q-btn color="white" class="q-mr-lg" text-color="black" label="取 消" @click="cancel()" />
      <q-btn color="primary" label="确 定" @click="updateCollege()" />

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
        { name: 'tags', label: 'Tags', field: 'tags' , align: 'left',},
        { name: 'created_year', label: '创立时间', field: 'created_year' , align: 'left',},
        { name: 'department', label: '主管部门', field: 'department', align: 'left', },
        { name: 'website', label: '学校官网', field: 'website', align: 'left',},
        { name: 'code', label: '学校代码', field: 'code', align: 'left', },
        {name:'motto',label:'校训',field:'motto', align: 'left',},
        {name:'schoolfellow',label:'知名校友',field:'schoolfellow', align: 'left',},
        
      ],

      options:[
        '985','211','双一流','世界一流大学建设','世界一流学科建设','一本','二本','专科'
      ],
      typeOptions:[
        '公立大学',
        '民办大学'
      ]
        }
    },

    computed:{
       yearArray(){
         var myDate = new Date();       
var thisYear = myDate.getFullYear();  // 获取当年年份
var Section = thisYear - 1700;  // 声明一个变量 获得当前年份至想获取年份差 eg.2008
var arrYear = []; // 声明一个空数组 把遍历出的年份添加到数组里
for(var i = 0;i<=Section;i++){
    arrYear.push((thisYear--))
}
return arrYear;

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
    
    async updateCollege(){
      try {
        const response=await collegeAPI.updateCollege(this.collegeDetail);
       
        this.$q.notify({
              type:'positive',
              message:'更新成功'
            })

        this.$router.push(`/college/${this.$route.params.id}`)
         
      } catch (error) {
         this.$q.notify({
              type:'negative',
              message:error
            })
      }
      
    },

    cancel(){
      this.$refs.myForm.reset();
      this.$router.push('/college');
    }
    }
}
</script>