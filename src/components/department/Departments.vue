<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12 text-center">
                <h1>University of Knowledge Departments</h1>
            </div>
        </div>
        <div class="row">
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
            <ul v-if="departments.length > 0" class="list-group col-12">
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
    props: {
        
    },
    mounted() {
        this.$http.get('http://localhost:3000/department/get-departments').then(response => {
            this.departments = response.data;
        });
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