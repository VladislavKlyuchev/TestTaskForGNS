<template>
    <v-data-table
            :headers="headers"
            :items="tableData"
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td><input class="inputFF" v-model="props.item.id" type="text"></td>
            <td><input class="inputFF" v-model="props.item.name" type="text"></td>
            <td><input class="inputFF" v-model="props.item.location" type="text"></td>
            <td><input class="inputFF" v-model="props.item.currency" type="number"></td>
        </template>
    </v-data-table>
</template>
<script>

export default {
    props: ['tableData'],
    data() {
        return {
            headers: null
        }
    },
    created() {
        /**
         * Get headers for table
         *  @result  = array
         */
        this.headers = Object.keys(this.tableData[0]).map((val) => {
          return  {
                    text: val,
                    value: val
                  }
        });

    }
}
</script>
<style scoped>
    .inputFF {
        outline:none;
        max-width: 70px;
    }
</style>