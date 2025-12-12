<template>
    <div>
        <v-row class="my-2 mx-2">
            <v-col cols="12" md="3">
                <v-select
                    v-model="filters.major_head"
                    :items="categories"
                    label="Category"
                    variant="outlined"
                    clearable
                    density="compact"
                    @update:model-value="onFilterChange"
                ></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-select
                    v-model="filters.minor_head"
                    :items="minorHeadOptions"
                    :label="minorHeadLabel"
                    variant="outlined"
                    clearable
                    density="compact"
                    :disabled="!filters.major_head"
                    @update:model-value="onFilterChange"
                ></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-combobox
                    v-model="filters.tags"
                    :items="tags"
                    item-title="label"
                    item-value="id"
                    label="Tags"
                    variant="outlined"
                    density="compact"
                    multiple
                    chips
                    closable-chips
                    clearable
                    @update:model-value="onFilterChange"
                ></v-combobox>
            </v-col>
            <v-col cols="12" md="3">
                <v-menu
                    v-model="date_filter_menu"
                    :close-on-content-click="false"
                    location="bottom"
                    min-width="290px"
                >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="display_daterange"
                    v-bind="props"
                    class="filter"
                    density="compact"
                    label="Filter by Date Range"
                    variant="outlined"
                    placeholder="Filter by Date Range"
                    readonly
                    single-line
                  >
                    <template v-slot:append-inner>
                      <v-icon
                        v-if="date_range.length > 1"
                        @click="clearDateFilter()"
                        >mdi-close</v-icon
                      >
                    </template>
                  </v-text-field>
                </template>
                <v-card>
                    <v-date-picker
                        v-model="date_range"
                        :max="today"
                        multiple="range"
                        show-adjacent-months
                    ></v-date-picker>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            variant="text"
                            @click="
                                date_range = [];
                                date_filter_menu = false;"
                        >Cancel</v-btn>
                        <v-btn
                            color="primary"
                            variant="elevated"
                            @click="formateDisplayDate"
                        >OK</v-btn>
                    </v-card-actions>
                    </v-card>
              </v-menu>
            </v-col>
            <v-col cols="12" md="3">
                <v-btn
                    class="elevation-0 white--text mx-4"
                    color="success"
                    @click="addDocument"
                    :loading="isUploading"
                    :disabled="isUploading"
                    >
                    <v-icon start class="mr-1">mdi-file-upload</v-icon>
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
                                @click="downloadDocument(item.file_url)"
                                title="View File"
                            >
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                            <v-btn
                                v-if="item.file_url"
                                icon
                                variant="text"
                                @click="downloadDocument(item.file_url)"
                                size="small"
                                color="success"
                                title="Download File"
                            >
                                <v-icon>mdi-download</v-icon>
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <UploadDocument ref="uploadDocument" :tags="tags" @reload="getDocumentList" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
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
            date_filter_menu: false,

            display_daterange: "",
            date_range: [],
            today: new Date().toISOString().substr(0, 10),
            filters: {
                major_head: '',
                minor_head: '',
                tags: []
            },
            categories: ['Personal', 'Professional'],
            personalNames: ['Ganesh', 'Rahul', 'Aditi', 'Rajni', 'Michael'],
            departments: ['Accounts', 'HR', 'IT', 'Finance', 'Marketing'],
            tags: [],
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
        this.getDocumentTags();
        this.getDocumentList();
    },
    watch: {
        search_query(new_search_query, old_search_query) {
        this.getDocumentList();
        },
    },
    computed: {
        ...mapGetters({
            search_query: "getSearchText",
        }),
        minorHeadOptions() {
            if (this.filters.major_head === 'Personal') {
                return this.personalNames;
            } else if (this.filters.major_head === 'Professional') {
                return this.departments;
            }
            return [];
        },
        minorHeadLabel() {
            if (this.filters.major_head === 'Personal') {
                return 'Select Name';
            } else if (this.filters.major_head === 'Professional') {
                return 'Select Department';
            }
            return 'Select Category First';
        }
    },
    methods: {
        addDocument() {
            this.$refs.uploadDocument.openDialog();
        },
        formateDisplayDate() {
            this.display_daterange = this.formateDisplayDateRange(this.date_range);
            this.date_filter_menu = false;
            this.getDocumentList();
        },
        display_date_formate(date) {
            if (!date) return null;
            if (date instanceof Date) {
                date = date.toISOString();
            }
            const dateOnly = date.split('T')[0];
            
            const [year, month, day] = dateOnly.split("-");
            let new_date = `${day}-${month}-${year}`;
            return new_date;
        },
        formateDisplayDateRange(daterange) {
            if (!daterange || daterange.length === 0) return "";
            
            let date1 = daterange[0];
            let date2 = daterange[1];
            
            if (!date2) {
                date2 = date1;
            }
            
            let to = "";
            let from = "";
            if (date1 > date2) {
                to = date1;
                from = date2;
            } else {
                to = date2;
                from = date1;
            }
    
            from = this.display_date_formate(from);
            to = this.display_date_formate(to);
            return `${from} to ${to}`;
        },
        clearDateFilter() {
            this.date_filter_menu = false;
            this.display_daterange = "";
            this.date_range = [];
            this.getDocumentList();
        },
        downloadDocument(fileUrl) {
            if (fileUrl) {
                window.open(fileUrl, '_blank');
            }
        },
        onFilterChange() {
            if (!this.filters.major_head) {
                this.filters.minor_head = '';
            }
            this.getDocumentList();
        },
        getDocumentTags() {
            const formData = {
                term: ""
            }
            const successHandler = (response) => {
                this.tags = response.data;
            }
            const failureHandler = (error) => {
                console.error('Failed to get document tags:', error);
            }
            this.$api.request_POST(
                this.$urls.GET_TAGS,
                formData,
                successHandler,
                failureHandler
            );
        },
        getDocumentList() {
            this.table_loading = true;
            const formData = {
                uploaded_by: sessionStorage.getItem("user_id"),
                major_head: this.filters.major_head || "",
                minor_head: this.filters.minor_head || "",
                from_date: this.date_range[0] ? this.date_range[0].toISOString().split('T')[0] : "",
                to_date: this.date_range[1] ? this.date_range[1].toISOString().split('T')[0] : "",
                tags: this.filters.tags.map(tag => ({
                    tag_name: typeof tag === 'string' ? tag : tag.label
                })),
                start: 0,
                length: 10,
                filterId: "",
                search: {
                    value: this.search_query,
                }

            }
            const successHandler = (response) => { 
                this.table_loading = false; 
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

