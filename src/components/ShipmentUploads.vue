<!-- src/components/ShipmentUploads.vue -->

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
                  <a class="dashboard__download-link" href="https://api-test.routemarket.com:8443/v1/load/template">
                    CSV Template
                    <svg width="17px" height="19px" viewBox="0 0 17 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                            <g id="Shipment-Uploads" transform="translate(-928.000000, -205.000000)" stroke="currentColor" stroke-width="2">
                                <g transform="translate(55.000000, 162.000000)" id="Load-Dashboard-Copy-2">
                                    <g>
                                        <g id="Buttons" transform="translate(757.000000, 25.000000)">
                                            <g id="Download-CSV-Template" transform="translate(0.000000, 19.000000)">
                                                <path d="M117.5,16.5 L131.5,16.5" id="Line-4"></path>
                                                <g id="Arrow" transform="translate(124.500000, 6.500000) rotate(-270.000000) translate(-124.500000, -6.500000) translate(118.000000, 0.000000)">
                                                    <path d="M7,0 L13,6" id="Line"></path>
                                                    <path d="M0.5,6 L12,6" id="Line-Copy"></path>
                                                    <path d="M13,6 L7,13 L13,6 Z" id="Line"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                  </a>
                  <input type="file" id="csvUpload" multiple>
                  <button class="button button--dark button--csv" @click="uploadFiles">Upload From CSV</button>
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
                <tr v-for="(shipment, index) in shipments">
                  <td>
                    <a :href="convertToCSV(shipment.Filedata)" :download="shipment.FileName + '.' + shipment.Extension">
                      {{ shipment.FileName }}.{{ shipment.Extension }}
                    </a>
                  </td>
                  <td>
                    <span class="no-wrap">{{ shipment.TimestampLastModified | dateShort }}</span>
                  </td>
                  <td>
                    {{ shipment.PosterName }}
                  </td>
                  <td>
                    <span
                      :class="[
                        shipment.Successes.length < shipment.LoadsAttemptedCount ?
                        'text-red' : 'text-green',
                      ]">
                      {{ shipment.LoadIds.length }}
                      /
                      {{ shipment.LoadsAttemptedCount }}
                    </span>
                  </td>
                  <td>
                    {{ shipment.LoadIds.length }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #csvUpload {
    display: none;
  }
</style>

<script>
  import shipments from '../js/shipmentUploads';
  import userInfo from '../js/user';
  import utils from '../js/utilities/utils';

  export default {
    data() {
      return {
        error: '',
        shipments: [],
        user: '',
      };
    },
    mounted() {
      shipments.getShipments(this);
      userInfo.getUserInfo(this);

      // Convert CSV to Binary
      document.querySelector('#csvUpload').addEventListener('change', (event) => {
        Array.from(event.target.files).forEach((file) => {
          if (file.type === 'text/csv') {
            utils.getFileDataArray(file).then((data) => {
              const arrayBuffer = data;
              const unit8Array = new Uint8Array(arrayBuffer);
              const array = Array.from(unit8Array);

              const fileInfo = {
                FileName: file.name.substr(0, file.name.lastIndexOf('.')),
                UserId: this.user.Id,
                PosterName: this.user.ContactInfo.Name,
                Extension: 'csv',
                CompanyId: this.user.CompanyId,
                Filedata: array,
              };

              shipments.submitShipment(this, fileInfo);
            });
          }
        });
      });
    },
    methods: {
      uploadFiles() {
        document.querySelector('#csvUpload').click();
      },

      // Convert to CSV
      convertToCSV(fileData) {
        const fileDataString = utils.bin2String(fileData);
        const csvContent = `data:text/csv;charset=utf-8,${fileDataString}`;
        const encodedUri = encodeURI(csvContent);
        return encodedUri;
      },
    },
  };
</script>
