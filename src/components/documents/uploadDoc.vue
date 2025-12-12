<template>
    <div>
        <v-dialog v-model="dialog" max-width="900">
            <v-card>
                <v-card-title class="text-h5 bg-primary text-white">
                    Upload Document
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-form ref="uploadForm">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-menu
                                    v-model="date_menu"
                                    :close-on-content-click="false"
                                    min-width="290px"
                                    transition="scale-transition"
                                >
                                    <template v-slot:activator="{ props }">
                                        <v-text-field
                                            v-bind="props"
                                            v-model="formData.date"
                                            label="Select Date"
                                            variant="outlined"
                                            readonly
                                           :rules="[$rules.required]" 
                                        >
                                            <template v-slot:append-inner>
                                                <v-icon
                                                    v-if="formData.date"
                                                    @click="clearDate"
                                                >
                                                    mdi-close
                                                </v-icon>
                                            </template>
                                        </v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="pickerDate"
                                        :max="today"
                                        @update:model-value="onDateSelected"
                                    >
                                        
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="formData.major_head"
                                    :items="categories"
                                    label="Category"
                                    variant="outlined"
                                   :rules="[$rules.required]" 
                                    
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="formData.minor_head"
                                    :items="minorHeadOptions"
                                    :label="minorHeadLabel"
                                    variant="outlined"
                                   :rules="[$rules.required]" 
                                    :disabled="!formData.major_head"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-combobox
                                    v-model="formData.tags"
                                    :items="tags"
                                    item-title="label"
                                    item-value="id"
                                    label="Tags"
                                    variant="outlined"
                                    multiple
                                    chips
                                    closable-chips
                                    hint="Press Enter to add new tag"
                                    persistent-hint
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    v-model="formData.remarks"
                                    label="Remarks"
                                    variant="outlined"
                                    rows="3"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input
                                    v-model="formData.file"
                                    label="Upload Document"
                                    :rules="[$rules.required]"
                                    variant="outlined"
                                    accept="image/*,.pdf"
                                    prepend-icon="mdi-paperclip"
                                    show-size
                                >
                                    <template v-slot:selection="{ fileNames }">
                                        <template v-for="fileName in fileNames" :key="fileName">
                                            <v-chip
                                                size="small"
                                                label
                                                color="primary"
                                            >
                                                {{ fileName }}
                                            </v-chip>
                                        </template>
                                    </template>
                                </v-file-input>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey"
                        variant="text"
                        @click="dialog = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="primary"
                        variant="elevated"
                        @click="uploadDocument"
                        :loading="isUploading"
                    >
                        Upload
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        tags: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            dialog: false,
            isUploading: false,
            date_menu: false,
            pickerDate: null,
            today: new Date().toISOString().substr(0, 10),
            
            formData: {
                date: '',
                major_head: '',
                minor_head: '',
                tags: [],
                remarks: '',
                file: null
            },
            categories: ['Personal', 'Professional'],
            personalNames: ['Ganesh', 'Rahul', 'Aditi', 'Rajni', 'Michael'],
            departments: ['Accounts', 'HR', 'IT', 'Finance', 'Marketing'],
        }
    },
    computed: {
        minorHeadOptions() {
            if (this.formData.major_head === 'Personal') {
                return this.personalNames;
            } else if (this.formData.major_head === 'Professional') {
                return this.departments;
            }
            return [];
        },
        minorHeadLabel() {
            if (this.formData.major_head === 'Personal') {
                return 'Select Name';
            } else if (this.formData.major_head === 'Professional') {
                return 'Select Department';
            }
            return 'Select Category First';
        },
        formattedDate() {
            if (!this.formData.date) return '';
            
            const [year, month, day] = this.formData.date.split('-');
            return `${day}-${month}-${year}`;
        }
    },
    methods: {
        clearDate() {
            this.formData.date = '';
        },
        openDialog() {
            this.dialog = true;
        },
        onDateSelected(date) {
            if (date) {              
                let dateStr;
                if (date instanceof Date) {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    dateStr = `${day}-${month}-${year}`;
                } else {
                    // If it's already a string in YYYY-MM-DD format
                    const [year, month, day] = date.split('-');
                    dateStr = `${day}-${month}-${year}`;
                }
                this.formData.date = dateStr;
            }
            this.date_menu = false;
        },
        uploadDocument() {
            if (this.$refs.uploadForm.validate() == false) return false;
            this.isUploading = true;
            let formData = new FormData();
            if (this.formData.file) {
                formData.append("file", this.formData.file);
            }
            let dataObject = {
                major_head: this.formData.major_head,
                minor_head: this.formData.minor_head,
                document_date: this.formData.date,
                document_remarks: this.formData.remarks,
                tags: this.formData.tags.map(tag => ({
                    tag_name: typeof tag === 'string' ? tag : tag.label
                })),
                user_id: sessionStorage.getItem("user_id")
            };
            formData.append("data", JSON.stringify(dataObject));

            const successHandler = (response) => {
                console.log('Upload success:', response);
                this.dialog = false;
                this.resetForm();
                this.$emit('reload');
            }
            const failureHandler = (error) => {
                console.error('Upload failed:', error);
                alert('Failed to upload document');
                this.isUploading = false;
            }
            this.$api.request_POST(
                this.$urls.UPLOAD_DOCUMENT,
                formData,
                successHandler,
                failureHandler
            );
        },
        resetForm() {
            this.formData = {
                date: '',
                major_head: '',
                minor_head: '',
                tags: [],
                remarks: '',
                file: null
            };
            this.$refs.uploadForm.reset();
            this.isUploading = false;
        }
    }
}
</script>