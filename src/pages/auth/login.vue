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
                        <v-form>
                            <v-text-field variant="outlined" label="Email" v-model="email" />
                            <v-text-field variant="outlined" label="Password" v-model="password" />
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="pa-4 pt-0">
                        <v-btn class="w-100 text-capitalize" color="primary" variant="outlined">Login</v-btn>
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
                    email: '',
                    password: '',
                }
            }
        }
    </script>
    