<script>
import axios from "axios";

export default {
  name: "Forms",
  mounted() {
    this.Get_Form();
  },
  data() {
    return {
      loading:true,
      create_loading:false,
      error:false,
      form : null,
      items : {
        phone :null,
        name:null,
        fields:[],
      }
    }
  },
  methods:{
    Get_Form(){
      axios.get('http://localhost:8000/landing/forms/'+this.$route.params.token)
      .then(response => {
        this.form = response.data.result
        if (this.form.fields.length){
          this.form.fields.forEach(field => {
            this.items.fields.push({
              field_id : field.field_id,
              val : null
            })
          });
        }
        this.loading=false;
      })
      .catch(error => {
        this.error = true
        this.loading=false;
      })
    },
    Create_Form(){
      this.create_loading = true
      axios.post('http://localhost:8000/landing/forms/'+this.$route.params.token,this.items).then(response => {

      }).catch(error => {

      })

    }
  }
}
</script>

<template>
  <div class="row login-box">
    <template v-if="!loading">
      <template v-if="!error">
        <div class="col-lg-6 form-section">
          <div class="form-inner p-4 pb-5" style="border-radius: 18px">
            <h4 class="mb-2 mt-4 text-dark">{{ form.name }}</h4>
            <div class="mt-3 text-secondary">
              {{ form.description }}
            </div>
            <div class="mt-4">
              <div class="form-group position-relative clearfix">
                <input v-model="items.phone" type="number" class="form-control" placeholder="شماره موبایل : 09XX XXX XXXX">
              </div>
              <div class="form-group position-relative clearfix">
                <input v-model="items.name" type="text" class="form-control" placeholder="نام و نام خانوادگی">
              </div>
              <template v-for="(field,index) in form.fields">
                <div class="form-group position-relative clearfix">
                  <input v-model="items.fields[index].val" type="text" class="form-control" :placeholder="field.title">
                </div>

              </template>
              <div class="form-group clearfix mb-0">
                <button @click="Create_Form" :disabled="create_loading" type="submit" class="btn btn-primary btn-lg btn-theme">ثبت اطلاعات </button>
              </div>
            </div>

            <div class="clearfix"></div>
          </div>
        </div>
        <div class="col-lg-6 bg-img">
          <div class="photo">
            <img src="@/assets/img-16.png" alt="logo" class="w-100 img-fluid">
          </div>
        </div>
      </template>
      <template v-else>
        <div class="col-12 text-center">
          <img src="@/assets/error.svg" width="360px" alt="">
          <h5 class="mt-2 mb-2">
            به نظر میاد این فرم وجود نداره !
          </h5>
        </div>
      </template>

    </template>
  </div>
</template>

<style scoped>

</style>