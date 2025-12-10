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
            isUploading: false
        }
    },
    methods: {
        addDocument() {
            this.$refs.uploadDocument.openDialog();
        }
    }
}
</script>

