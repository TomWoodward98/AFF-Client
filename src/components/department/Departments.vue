<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12 text-center">
                <h1>University of Knowledge Departments</h1>
            </div>
        </div>
        <div class="row px-3">
            <div class="col-12 text-left pl-0 my-3">
                <button 
                    type="button"
                    class="btn btn-secondary"
                    data-target="#createDepartmentModal"
                    data-toggle="modal"
                >
                    Add Department
                </button>
                <create-department
                    dataTarget="createDepartmentModal"
                    @departmentCreated="addDepartment($event)"
                ></create-department>
            </div>
            <ul v-if="departments.length > 0" class="list-group col-12 p-0">
                <li 
                    v-for="department in departments" 
                    :key="department.id" 
                    class="list-group-item"
                >
                    {{ department.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import CreateDepartment from "./CreateDepartment";

export default {
    name: "Departments",
    components: {
        CreateDepartment
    },
    data() {
        return {
            departments: [],
        };
    },
    computed: {
        storeDepartments() {
            return this.departments = this.$store.state.departments;
        }
    },
    created() {
        this.departments = this.$store.state.departments;
    },
    methods: {
        addDepartment(department) {
            this.departments.push(department);
        }
    },
}
</script>

<style scoped>

</style>