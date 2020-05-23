// Agregar frecuency (aunque desde el back no se valide.)
<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add a new Drug</h3>

    <form @submit.prevent="addDrug">
      <div class="mb-6">
        <input type="text"
          id="drug_title"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Type a drug name"
          v-model="newDrug.name">
      </div>

      <input type=submit" value="Add Drug" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-full py-4 text-white items-center justify-center"/>
            
    </form>

    <hr class="border border-grey-light my-6">
    <ul class="list-reset mt-4"> 
      <li class="py-4" v-for="drug in drugs" :key="drug.id" :drug="drug">
        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center ">
            <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 20 20" width="20" height="20"><title>Drug</title><path d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z"></path></svg>
            {{ drug.name }}
          </p>

          <button class="bg-tranparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded" @click.prevent="editDrug">Edit</button>

          <button class="bg-tranparent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red" @click.prevent="removeDrug">Delete</button>

          <div v-if="drug == editedDrug">
            <form @submit.prevent="updateDrug(drug)">
              <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
                <input class="input" v-model="drug.name">
                <input type="submit" value="Update" class="my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer">
                
              </div>
            </form>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Drug',
    data () {
      return {
        drugs: [],
        newDrug: [],
        errors: '',
        editDrug: ''
      }
    },
    created () {
      if (!localStorage.signedIn) {
        this.$router.replace('/')
      } else {
        this.$http.secured.get('/api/v1/drugs')
          .then(response => { this.drugs = response.data })
          .catch (error => this.setError(error, 'Ups! Something is not kosher.'))
        
      }
    },
    methods: {
      setError (error, text) {
        this.error = (error.response && error.response.data && error.response.data.error) || text
      },
      addDrug () {
        const value = this.newDrug
        if (!value) {
          return
        }
        this.$http.secured.post('/api/v1/drugs', { drug: { name: this.newDrug.name } })
        .then(response => {
          this.drugs.push(response.data)
          this.newDrug = ''
        })
        .catch(error => this.setError(error, 'Cannot create drug.'))
      },
      removeDrug (drug) {
        this.$http.secured.delete(`/api/v1/drugs/${drug.id}`)
        .then(response => {
          this.drugs.splice(this.drugs.indexOf(drug), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete drug.'))
      },
      editDrug () {
        this.editedDrug = drug
      },
      updateDrug (drug) {
        this.editedDrug = ''
        this.$http.secured.patch(`/api/v1/drugs/${drug.id}`, { drug: { title: drug.name }})
          .catch(error => this.setError(error, 'Cannot update drug.'))
      }
    }
  }
</script>
