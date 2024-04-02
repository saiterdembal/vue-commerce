<template>
    <div class="example-five my-5">
        <vue-awesome-paginate :total-items="getProductsByCategory.length" v-model="currentPage" :items-per-page="6"
            :max-pages-shown="5" :show-breakpoint-buttons="true" :show-jump-buttons="true" />
    </div>
</template>



<script>
import { ref } from "vue";
import { mapGetters } from 'vuex';
// !!! CODESANBOX.IO doesn't support (SCRIPT SETUP), So I will use composition api for this example
export default {
    data() {
        const currentPage = ref(1);
        return {
            currentPage,
        };
    },
    computed: {
        ...mapGetters({
            getProductsByCategory: "productStore/getProductsByCategory",
        }),



    },
    watch: {
        currentPage() {
            this.$store.state["productStore/currentPage"] = this.currentPage

        }
    }

};
</script>

<style>
.pagination-container {
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 10px 0px;
    justify-content: center;
    display: flex !important;
}

.example-five .paginate-buttons {
    width: 40px;
    height: 40px;
    margin-inline: 5px;
    cursor: pointer;
    border: none;
    background-color: #d4d4d4;
    border-radius: 2px;
    border-radius: 5px
}

.example-five .back-button {
    width: 70px;
}

.example-five .next-button {

    width: 70px;
}

.example-five .back-button svg {
    transform: rotate(180deg);
}

.example-five .active-page {
    background-color: rgb(31 41 55);
    color: #fff;
}

.example-five .paginate-buttons:hover {
    background-color: #e5e5e5;
}

.example-five .active-page:hover {
    background-color: rgb(249 115 22);
    color: #fff;
}

.example-five .back-button:active,
.example-five .next-button:active {
    background-color: #dedede;
}
</style>