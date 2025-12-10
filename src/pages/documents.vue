<template>
    <div>
        <v-row class="my-2">
            <v-col class="d-flex justify-end" cols="12">
                <v-btn
                    class="elevation-0 white--text mx-4"
                    color="success"
                    @click="addDocument"
                    :loading="isUploading"
                    :disabled="isUploading"
                    >
                    <v-icon left class="mr-1">mdi-file-upload</v-icon>
                    {{ isUploading ? 'Uploading...' : 'Upload Document' }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    :items="documentList"
                    :items-per-page="10"
                    hide-default-footer
                    :loading="table_loading"
                    no-data-text="No documents found"
                    :header-props="{class: 'bg-indigo text-white'}"
                >
                    <template v-slot:item.actions="{ item }">
                        <div class="d-flex ga-2">
                            <v-btn
                                v-if="item.file_url"
                                icon
                                variant="text"
                                size="small"
                                color="primary"
                                @click="viewFile(item.file_url)"
                                title="View File"
                            >
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                            <v-btn
                                v-if="item.file_url"
                                icon
                                variant="text"
                                size="small"
                                color="success"
                                @click="downloadFile(item.file_url)"
                                title="Download File"
                            >
                                <v-icon>mdi-download</v-icon>
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <UploadDocument ref="uploadDocument" />
    </div>
</template>

<script>
import UploadDocument from "@/components/documents/uploadDoc.vue"
export default {
    name: "DocumentsPage",
    components: {
        UploadDocument
    },
    data() {
        return {
            isUploading: false,
            table_loading: false,
            headers: [
                { 
                    title: 'Document ID', 
                    key: 'document_id', 
                    align: 'start',
                    sortable: true 
                },
                { 
                    title: 'Category', 
                    key: 'major_head', 
                    align: 'start',
                    sortable: true 
                },
                { 
                    title: 'Sub-Category', 
                    key: 'minor_head', 
                    align: 'start',
                    sortable: true 
                },
                { 
                    title: 'Document Date', 
                    key: 'document_date', 
                    align: 'start',
                    sortable: true 
                },
                { 
                    title: 'Remarks', 
                    key: 'document_remarks', 
                    align: 'start',
                    sortable: false 
                },
                { 
                    title: 'Upload Time', 
                    key: 'upload_time', 
                    align: 'start',
                    sortable: true 
                },
                { 
                    title: 'Uploaded By', 
                    key: 'uploaded_by', 
                    align: 'start',
                    sortable: true 
                },
                { 
                    title: 'Actions', 
                    key: 'actions', 
                    align: 'center',
                    sortable: false 
                }
            ],
            documentList: []
        }
    },
    mounted() {
        this.getDocumentList();
    },
    methods: {
        addDocument() {
            this.$refs.uploadDocument.openDialog();
        },
        viewFile(fileUrl) {
            if (fileUrl) {
                window.open(fileUrl, '_blank');
            }
        },
        downloadFile(fileUrl) {
            console.log(fileUrl);
        },
        getDocumentList() {
            this.table_loading = true;
            const formData = {
                uploaded_by: sessionStorage.getItem("user_id"),
                major_head: "",
                minor_head: "",
                from_date: "",
                to_date: "",
                tags: [],
                start: 0,
                length: 10,
                filterId: "",
                search: {
                    value: "",
                }

            }
            const successHandler = (response) => {
                
                this.documentList = response.data;
            }
            const failureHandler = (error) => {
                this.table_loading = false;
                console.error('Failed to get document list:', error);
            }
            this.$api.request_POST(
                this.$urls.GET_DOCUMENT_LIST,
                formData,
                successHandler,
                failureHandler
            );
        }
    }
}
</script>

