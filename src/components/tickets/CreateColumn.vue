<template>
    <div class="modal fade" :id="dataTarget" tabindex="-1" role="dialog" aria-labelledby="ticketModalLabel" aria-hidden="true">
        <div class="modal-dialog d-flex align-items-center modal-dialog-centered" role="document">
            <div class="modal-content">
                <form 
                    id="createColumnForm"
                    action="/create-column"
                    autocomplete="off"
                    method="post"
                >
                    <div class="modal-header">
                        <h5 class="modal-title" id="ticketModalLabel">Create Column</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row mb-0">
                            <div class="col-12 text-left">
                                <label for="name">Name</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <input
                                    autocomplete="off"
                                    autofocus
                                    class="form-control"
                                    :class="{ 'is-invalid' : name_error }"
                                    id="name"
                                    name="name"
                                    required
                                    type="text"
                                    placeholder="Enter Column Name"
                                    v-model="form.name"
                                >
                                <span
                                    class="invalid-feedback"
                                    role="alert"
                                    v-if="name_error">
                                    <strong>{{ name_error }}</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                        <button id="createColumnBtn" type="button" class="btn btn-secondary" @click.prevent="createColumn()">Create Column</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateColumn",
    data() {
        return {
            users: null,
            form : {
                name: '',
            },
            name_error: false,
            creatingColumn: false,
        };
    },
    props: {
        dataTarget: String,
    },
    methods: {
        createColumn() {
            let failed = false;

            this.name_error = false;

            if (this.form.name.trim() === '') {
                failed = true;
                this.name_error = 'Please give this Column a name'
            }

            if (failed) {
                return false;
            }

            this.creatingColumn = true;

            this.$http.post('http://localhost:3000/ticket/create-column', this.form).then(response => {
                if (response.data.Error) {
                    this.creatingColumn = false;
                    this.handleErrors(response.data.Error);
                } else {
                    this.form.name = '';
                    this.creatingColumn = false;
                    this.$emit('columnCreated', response.data);
                    $('#' + this.dataTarget).modal('hide')
                }
            });
        },
        handleErrors(sentError){
            if (sentError.name) {
                this.name_error = sentError.name;
            }
        },
    },

}
</script>

<style scoped>

</style>
