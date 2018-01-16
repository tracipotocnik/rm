<!-- src/components/Loads.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <section class="dashboard">
          <div class="dashboard__content">
            <div class="dashboard__top">
              <div class="dashboard__heading">
                <h1 class="dashboard__title">Shipment Uploads</h1>
                <div class="dashboard__heading__buttons">
                  <button class="button button--dark">Upload From CSV</button>
                </div>
              </div>
            </div>
            <div class="grid-x grid-margin-x">
              <div class="cell" v-if="error">
                <p>{{ error }}</p>
              </div>
              <table class="table">
                <thead>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Uploaded By</th>
                  <th>Valid Shipments</th>
                  <th>Total Shipments</th>
                </thead>
                <tr>
                  <td><a href="#">Load_FileNameHere.file</a></td>
                  <td>11 / 29 /17</td>
                  <td>C. Restino</td>
                  <td><span class="text-red">20 / 22</span></td>
                  <td>22</td>
                </tr>
                <tr>
                  <td><a href="#">Load_SecondFileNameHere.file</a></td>
                  <td>12 / 07 /17</td>
                  <td>J. Randall</td>
                  <td><span class="text-green">16 / 16</span></td>
                  <td>16</td>
                </tr>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        error: '',
      };
    },
  };
</script>
