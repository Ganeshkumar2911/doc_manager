<template>
    <div class="d-flex justify-center align-center" style="height: 100vh;"> 
        <v-row class="h-75 mx-2 mx-md-16 rounded-xl elevation-2" style="background-color: #f5f5f5;">
            <v-col cols="12" md="6" class="d-none d-md-flex justify-center align-center">
                <v-img src="@/assets/loginImg.svg" height="75%" width="80%"></v-img>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-center align-center">
                <v-card width="100%" max-width="440" elevation="4" class="rounded-xl">
                    <div class="login-header pa-6 pb-4">
                    <v-card-title class="text-h5 text-center font-weight-bold px-0">
                        Welcome Back
                    </v-card-title>
                    <v-card-subtitle class="text-center text-medium-emphasis px-0 mt-1">
                        {{ showOTP ? 'Enter the OTP sent to your mobile' : 'Sign in to continue to your account' }}
                    </v-card-subtitle>
                    </div>
                    <v-card-text class="px-6 pb-4">
                    <v-form ref="login_form">
                        <!-- Mobile Number Field -->
                        <div class="mb-4">
                        <label class="text-subtitle-2 font-weight-medium mb-2 d-block">
                            Mobile Number
                        </label>
                        <v-text-field
                            v-model="mobileNumber"
                            maxlength="10"
                            :rules="[$rules.required, $rules.phone]"
                            variant="outlined"
                            placeholder="Enter your 10-digit mobile number"
                            :disabled="disableMobileNumber"
                            density="comfortable"
                            prepend-inner-icon="mdi-phone"
                        >
                        </v-text-field>
                        </div>

                        <!-- OTP Input -->
                        <v-expand-transition>
                        <div v-if="showOTP" class="otp-section">
                            <label class="text-subtitle-2 font-weight-medium mb-2 d-block">
                            One-Time Password
                            </label>
                            <v-otp-input
                            v-model="otp"
                            :length="6"
                            variant="outlined"
                            type="number"
                            class="mb-3"
                            ></v-otp-input>
                            
                            <!-- Resend OTP -->
                            <div class="text-center">
                            <span class="text-caption text-medium-emphasis">
                                Didn't receive the code?
                            </span>
                            <v-btn
                                variant="text"
                                size="small"
                                color="primary"
                                class="text-caption ml-1"
                                @click="resendOTP"
                            >
                                Resend OTP
                            </v-btn>
                            </div>
                        </div>
                        </v-expand-transition>
                    </v-form>
                    </v-card-text>
                    <v-card-actions class="px-6 pb-6 pt-2">
                    <v-btn
                        v-if="!showOTP"
                        @click="getOTP"
                        color="primary"
                        variant="flat"
                        size="large"
                        block
                        class="text-none font-weight-medium"
                        elevation="0"
                    >
                        <v-icon start>mdi-message-text</v-icon>
                        Get OTP
                    </v-btn>
                    <v-btn
                        v-else
                        @click="verifyOTP"
                        color="primary"
                        variant="flat"
                        size="large"
                        block
                        class="text-none font-weight-medium"
                        elevation="0"
                    >
                        <v-icon start>mdi-check-circle</v-icon>
                        Verify & Login
                    </v-btn>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <div class="pa-4 text-center">
                    <p class="text-caption text-medium-emphasis mb-0">
                        By continuing, you agree to our
                        <a class="text-primary text-decoration-none">Terms of Service</a>
                        and
                        <a class="text-primary text-decoration-none">Privacy Policy</a>
                    </p>
                    </div>
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
                        sessionStorage.setItem("user_id", response.data.user_id);
                        sessionStorage.setItem("user_name", response.data.user_name);
                        this.$router.push({ name: "documents" });
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
    