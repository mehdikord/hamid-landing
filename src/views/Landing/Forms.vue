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
      form_error:false,
      success:false,
      message : null,
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
      axios.get('https://core.hamidmasoudi.ir/landing/forms/'+this.$route.params.token)
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
        this.form_error = true
        this.loading=false;
      })
    },
    Helpers_Methods_Convert_Number(input) {
      const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
      const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
      if (typeof input === 'string') {
        let output = input;
        for (let i = 0; i < 10; i++) {
          output = output.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
        return output;
      }
      return input;
    },


    Create_Form(){
      this.success=false
      this.error = false
      this.message = null
      this.create_loading = true
      if (!this.items.phone || !this.items.name){
        this.error = true
        this.create_loading = false
        this.message = 'وارد کردن شماره موبایل و نام الزامی است'
        return 0;
      }
      this.items.phone = this.Helpers_Methods_Convert_Number(this.items.phone)
      axios.post('https://core.hamidmasoudi.ir/landing/forms/'+this.$route.params.token,this.items).then(response => {
        this.success = true
        this.create_loading = false
        this.message = response.data.message
      }).catch(error => {
        if (error.response.status === 422){
          this.error = true
          this.message = 'فرمت شماره موبایل صحیح نمیباشد !'
        }else {
          this.error = true
          this.message = error.response.data.error
        }
        this.create_loading = false

      })
    }
  }
}
</script>

<template>
  <div class="row login-box">
    <template v-if="!loading">
      <template v-if="!form_error">
        <div class="col-lg-6 form-section">
          <div class="form-inner p-4 pb-5" style="border-radius: 18px">
            <h4 class="mb-2 mt-4 text-dark">{{ form.name }}</h4>
            <div class="mt-3 text-secondary">
              {{ form.description }}
            </div>
            <div class="alert alert-danger mt-3" v-if="error">
              <strong>{{ message }}</strong>
            </div>
            <div class="alert alert-success mt-3" v-if="success">
              <strong>{{ message }}</strong>
            </div>
            <div class="mt-4">
              <div class="form-group position-relative clearfix">
                <input v-model="items.phone" type="text" class="form-control" placeholder="شماره موبایل : 09XX XXX XXXX">
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