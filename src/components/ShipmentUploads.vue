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
                  <a class="dashboard__download-link" :href="apiUrl + '/load/template/xlsx'">
                    Excel Template
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
                  <a class="dashboard__download-link" :href="apiUrl + '/load/template/csv'">
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

                  <input type="file" id="fileUpload" class="hidden" multiple accept=".csv, .xls, .xlsx">
                  <button type="button" class="button button--dark button--csv" @click="uploadFiles">Upload Shipment</button>

                  <router-link :to="{ name: 'pendingQuotes'}" class="button button--green">View Quotes</router-link>

                  <router-link :to="{ name: 'shippers'}"
                    class="button button--auto-width">
                    <svg width="7px" height="11px" viewBox="0 0 7 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                        <g id="Shipper-Logged-In_Scroll" transform="translate(-1172.000000, -242.000000)" stroke="currentColor">
                          <g id="Load-Dashboard-Copy-3" transform="translate(1063.000000, 162.000000)">
                            <g id="Load-Dashboard-Info" transform="translate(0.000000, 22.000000)">
                              <g id="Header" transform="translate(29.000000, 0.000000)">
                                <g id="View-All" transform="translate(10.000000, 53.000000)">
                                  <g id="Arrow" transform="translate(73.500000, 10.500000) rotate(180.000000) translate(-73.500000, -10.500000) translate(71.000000, 5.000000)">
                                    <path d="M0.277777778,0.333333333 L4.45369344,5.34443213" id="Line"></path>
                                    <path d="M4.72715502,5.33610803 L0.541969834,10.3472068 L4.72715502,5.33610803 Z" id="Line"></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    Back
                  </router-link>
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
                  <th>Date Uploaded</th>
                  <th>Uploaded By</th>
                  <th>Valid Shipments</th>
                  <th>Total Shipments</th>
                </thead>
                <tr class="table__divider">
                  <td colspan="5"></td>
                </tr>
                <tr
                  v-for="(shipment, index) in sortedShipments"
                  :class="{'highlighted' : (sortedShipments.length - shipmentsTotal) >= (index + 1)}">
                  <td>
                    <a v-if="shipment.Extension === 'csv'"
                      :href="convertToCSV(shipment.Filedata)"
                      :download="shipment.FileName + '.' + shipment.Extension">
                      {{ shipment.FileName }}.{{ shipment.Extension }}
                    </a>
                    <a v-else href="#"
                      @click="convertToExcel(shipment.Filedata, `${shipment.FileName}.${shipment.Extension}`)">
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
                      {{ successCount(shipment.Successes) }}
                      /
                      {{ shipment.LoadsAttemptedCount }}
                    </span>
                  </td>
                  <td>
                    {{ shipment.LoadsAttemptedCount }}
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

<script>
  import XLSX from 'xlsx';

  import { APP_BACKEND_URL, API_VERSION } from '../js/constants';
  import shipments from '../js/shipmentUploads';
  import utils from '../js/utilities/utils';
  import userInfo from '../js/user';

  export default {
    data() {
      return {
        error: '',
        shipments: [],
        shipmentsTotal: '',
        user: '',
        apiUrl: `${APP_BACKEND_URL}${API_VERSION}`,
      };
    },
    mounted() {
      shipments.getShipments(this);
      userInfo.getUserInfo(this);

      document.querySelector('#fileUpload').addEventListener('change', (event) => {
        const filesArray = event.target.files;
        this.shipmentsTotal = this.shipments.length;
        shipments.convertAddShipment(
          filesArray,
          this.user.Id,
          this.user.ContactInfo.Name,
          this.user.CompanyId,
          this,
        );
        event.target.value = null;
        return false;
      });
    },
    methods: {
      uploadFiles() {
        document.querySelector('#fileUpload').click();
      },

      // Convert to CSV
      convertToCSV(fileData) {
        const fileDataString = utils.bin2String(fileData);
        const fileContent = `data:text/csv;charset=utf-8,${fileDataString}`;
        const encodedUri = encodeURI(fileContent);
        return encodedUri;
      },

      // Convert to Excel
      convertToExcel(fileData, filename) {
        try {
          const excelSheet = XLSX.read(fileData, { type: 'buffer' });
          XLSX.writeFile(excelSheet, filename);
        } catch (err) {
          console.log(err); // eslint-disable-line no-console
        }
      },

      successCount(arrayObj) {
        return arrayObj.filter(s => s).length;
      },
    },
    computed: {
      sortedShipments() {
        this.shipments.sort((a, b) =>
          new Date(b.TimestampLastModified) - new Date(a.TimestampLastModified));
        return this.shipments;
      },
    },
  };
</script>
