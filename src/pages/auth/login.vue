<template>
    <div class="d-flex justify-center align-center" style="height: 100vh;"> 
        <v-row class="h-75 mx-16 rounded-xl elevation-2" style="background-color: #f5f5f5;">
            <v-col cols="6" class="d-flex justify-center align-center">
                <v-img src="@/assets/loginImg.svg" height="75%" width="80%"></v-img>
            </v-col>
            <v-col col="6" class="d-flex justify-center align-center">
                <v-card width="550">
                    <v-card-title>Login</v-card-title>
                    <v-card-text class="py-0">
                        <v-form ref="login_form">
                            <v-text-field 
                                v-model="mobileNumber"
                                maxlength="10" 
                                :rules="[$rules.required, $rules.phone]" 
                                variant="outlined" 
                                label="Mobile Number"
                                :disabled="disableMobileNumber"
                            />
                            <v-otp-input
                                v-if="showOTP"
                                v-model="otp"
                                :length="6"
                                class="mt-4"
                            ></v-otp-input>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="pa-4 pt-0">
                        <v-spacer></v-spacer>
                        <v-btn v-if="!showOTP" @click="getOTP" class="text-capitalize" color="primary" variant="outlined">Get OTP</v-btn>
                        <v-btn v-else @click="verifyOTP" class="text-capitalize" color="primary" variant="outlined">Verify OTP</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
    </template>
    <script>
        export default {
            data() {
                return {
                    mobileNumber: '',
                    otp: '',
                    password: '',
                    disableMobileNumber: false,
                    showOTP: false,
                }
            },
            methods: {
                getOTP() {
                    if (this.$refs.login_form.validate() == false) return false;
                    let formData = {
                        mobile_number: this.mobileNumber,
                    }

                    const successHandler = () => {
                        this.showOTP = true;
                        this.disableMobileNumber = true;
                    }
                    const failureHandler = (error) => {
                        console.log(error);
                    }
                    this.$api.request_POST(
                        this.$urls.GET_OTP,
                        formData,
                        successHandler,
                        failureHandler
                    );
                },
                verifyOTP() {
                    if (this.$refs.login_form.validate() == false) return false;
                    let formData = {
                        mobile_number: this.mobileNumber,
                        otp: this.otp,
                    }
                    const successHandler = (response) => {
                        sessionStorage.setItem("token", response.data.token);
                        sessionStorage.setItem("user_name", response.data.user_name);
                        this.$router.push({ name: "Dashboard" });
                    }
                    const failureHandler = (error) => {
                        console.log(error);
                    }
                    this.$api.request_POST(
                        this.$urls.VERIFY_OTP,
                        formData,
                        successHandler,
                        failureHandler
                    );
                    this.showOTP = false;
                    this.disableMobileNumber = false;
                    this.mobileNumber = '';
                    this.otp = '';
                }
            }
        }
    </script>
    