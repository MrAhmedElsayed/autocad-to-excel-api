<script>
import * as XLSX from "xlsx";
import CoordinatesTable from "@/components/CoordinatesTable";

export default {
  name: "HomeView",
  components: { CoordinatesTable },
  data: () => ({
    selectedPoint: {},
    showUpdateTable: false,
    fileFormat: "xlsx",
    fileName: "points",
    outputDirectory: "C:\\Users\\ultra\\Desktop",
    updatePointObject: {},
    points: [
      { pn: 1, x: 776078.653, y: 2233566.631, z: 1629.953 },
      { pn: 2, x: 776078.167, y: 2233566.804, z: 1629.706 },
      { pn: 3, x: 776078.673, y: 2233566.521, z: 1629.453 },
    ],
  }),
  computed: {
    fullOutputPath() {
      return (
        this.outputDirectory + "\\" + this.fileName + "." + this.fileFormat
      );
    },
  },
  // TODO : CRUD ;(
  methods: {
    setSelectedPoint(point) {
      this.selectedPoint = point;
      this.updatePointObject = this.selectedPoint;
    },
    updateSelectedPoint() {
      this.showUpdateTable = true;
      this.updatePointObject = this.selectedPoint;
    },
    deleteSelectedPoint() {
      const selectedIndex = this.points.findIndex(
        (point) => point.pn === this.selectedPoint.pn
      );
      this.points.splice(selectedIndex, 1);
      this.selectedPoint = "";
      this.showUpdateTable = false;
    },
    unselectPoint() {
      this.selectedPoint = "";
      this.showUpdateTable = false;
    },
    saveChanges() {
      const selectedIndex = this.points.findIndex(
        (point) => point.pn === this.selectedPoint.pn
      );
      this.points[selectedIndex] = this.updatePointObject;
      this.updatePointObject = {};
      this.showUpdateTable = false;
      this.selectedPoint = "";
    },
    saveExcelPoints() {
      const worksheet = XLSX.utils.json_to_sheet(this.points);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Points");
      XLSX.writeFile(workbook, "Points.xlsx");
      this.startBtnStatus = !this.startBtnStatus;
    },
    captureView() {
      // eslint-disable-next-line no-undef
      Acad.Application.activedocument.capturePreview(100, 100).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<template>
  <main class="px-3">
    <!-- Update Table -->
    <section class="mt-2 scale-up-center" v-if="showUpdateTable">
      <table
        class="table table-bordered table-hover table-striped table-sm table-dark text-center mt-3"
      >
        <thead>
          <tr>
            <th scope="col" class="position-relative">
              <button
                @click="saveChanges"
                style="width: 2em; height: 2em; padding: 0.25em 0.25em"
                type="button"
                class="position-absolute top-0 start-0 translate-middle btn btn-dark border border-info rounded-circle"
              >
                <span class="m-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-check2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </span>
              </button>
              #
            </th>
            <th scope="col">X</th>
            <th scope="col">Y</th>
            <th scope="col" class="position-relative">
              <button
                @click="unselectPoint"
                type="button"
                class="position-absolute top-0 start-100 translate-middle btn-close btn-close-white border border-info rounded-circle"
              ></button>
              Z
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-center">
              <input
                type="text"
                class="form-control form-control-sm text-bg-dark"
                style="max-width: 63px"
                v-model="updatePointObject.pn"
              />
            </th>
            <td>
              <input
                type="text"
                class="form-control form-control-sm text-bg-dark w-100"
                v-model="updatePointObject.x"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control form-control-sm text-bg-dark w-100"
                v-model="updatePointObject.y"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control form-control-sm text-bg-dark w-100"
                v-model="updatePointObject.z"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <!-- toolbar -->
    <section class="row py-2">
      <div class="col-4">
        <input
          type="text"
          class="form-control form-control-sm text-bg-dark"
          placeholder="Search ..."
        />
      </div>
      <div class="col-8">
        <div class="d-flex justify-content-end">
          <!-- edit delete buttons-->
          <div
            v-if="selectedPoint"
            class="btn-group btn-group-sm me-2"
            role="group"
            aria-label="Basic example"
          >
            <!-- edit point-->
            <button
              type="button"
              class="btn btn-outline-info"
              @click="updateSelectedPoint"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
            <!-- delete point-->
            <button
              type="button"
              class="btn btn-outline-info"
              @click="deleteSelectedPoint"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </div>
          <!-- draw table -->
          <button
            type="button"
            class="btn btn-sm btn-outline-info me-2"
            v-if="points.length > 0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bi bi-table"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"
              />
            </svg>
          </button>
          <!-- switch run or stop-->
          <!--          <div class="form-check form-switch">-->
          <!--            <input-->
          <!--              class="form-check-input"-->
          <!--              type="checkbox"-->
          <!--              role="switch"-->
          <!--              id="flexSwitchCheckChecked"-->
          <!--              checked-->
          <!--            />-->
          <!--            <label class="form-check-label" for="flexSwitchCheckChecked"-->
          <!--              >Checked switch checkbox input</label-->
          <!--            >-->
          <!--          </div>-->
          <div
            class="btn-group btn-group-sm"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio1"
              autocomplete="off"
              checked
            />
            <label class="btn btn-outline-danger" for="btnradio1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-stop"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"
                />
              </svg>
            </label>

            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio3"
              autocomplete="off"
            />
            <label class="btn btn-outline-success" for="btnradio3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-play"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </section>
    <!-- table -->
    <CoordinatesTable
      :points="points"
      :selected-point="selectedPoint"
      :set-selected-point="setSelectedPoint"
    />
    <!-- pagination -->
    <section class="d-flex justify-content-between" v-if="points.length > 5">
      <!--        <nav>-->
      <p class="justify-content-start text-muted">
        Showing 1 to 10 of {{ points.length }} entries
      </p>
      <ul class="pagination pagination-sm">
        <li class="page-item">
          <a
            class="text-bg-dark page-link disabled"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a class="text-bg-dark page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="text-bg-dark page-link active" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="text-bg-dark page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="text-bg-dark page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
      <!--        </nav>-->
    </section>
    <!-- output directory -->
    <section class="row border-info border-top">
      <div class="col-12">
        <div class="folder-heading d-flex mt-3">
          <div class="folder-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="currentColor"
              class="bi bi-folder2-open"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"
              />
            </svg>
          </div>
          <div class="folder-direct flex-column ms-3">
            <h4>Output Folder</h4>
            <p class="text-muted">{{ fullOutputPath }}</p>
          </div>
        </div>
      </div>
      <div class="ps-3 row py-2 gx-1">
        <div class="col-5 mt-1">
          <input
            type="text"
            class="form-control form-control-sm bg-dark text-bg-dark"
            v-model="outputDirectory"
          />
        </div>
        <div class="col-2 mt-1">
          <input
            type="text"
            class="form-control form-control-sm bg-dark text-bg-dark"
            v-model="fileName"
          />
        </div>
        <div class="col-3 mt-1">
          <select
            class="form-select form-select-sm bg-dark text-bg-dark"
            v-model="fileFormat"
          >
            <option value="xlsx" selected>excel</option>
            <option value="csv">csv</option>
            <option value="txt">text</option>
          </select>
        </div>
        <div class="col-1 text-end">
          <!-- save button-->
          <button
            type="button"
            class="btn btn-dark btn-sm"
            @click="saveExcelPoints"
          >
            <span>
              <svg
                width="64"
                height="32"
                viewBox="0 0 32 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27 20C26.7348 20 26.4804 19.8946 26.2929 19.7071C26.1054 19.5196 26 19.2652 26 19C26 18.7348 26.1054 18.4804 26.2929 18.2929C26.4804 18.1054 26.7348 18 27 18C27.2652 18 27.5196 18.1054 27.7071 18.2929C27.8946 18.4804 28 18.7348 28 19C28 19.2652 27.8946 19.5196 27.7071 19.7071C27.5196 19.8946 27.2652 20 27 20ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19C4 18.7348 4.10536 18.4804 4.29289 18.2929C4.48043 18.1054 4.73478 18 5 18C5.26522 18 5.51957 18.1054 5.70711 18.2929C5.89464 18.4804 6 18.7348 6 19C6 19.2652 5.89464 19.5196 5.70711 19.7071C5.51957 19.8946 5.26522 20 5 20ZM4 5C4 5.26522 4.10536 5.51957 4.29289 5.70711C4.48043 5.89464 4.73478 6 5 6C5.26522 6 5.51957 5.89464 5.70711 5.70711C5.89464 5.51957 6 5.26522 6 5C6 4.73478 5.89464 4.48043 5.70711 4.29289C5.51957 4.10536 5.26522 4 5 4C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5ZM27 6C26.7348 6 26.4804 5.89464 26.2929 5.70711C26.1054 5.51957 26 5.26522 26 5C26 4.73478 26.1054 4.48043 26.2929 4.29289C26.4804 4.10536 26.7348 4 27 4C27.2652 4 27.5196 4.10536 27.7071 4.29289C27.8946 4.48043 28 4.73478 28 5C28 5.26522 27.8946 5.51957 27.7071 5.70711C27.5196 5.89464 27.2652 6 27 6ZM16 12C16 12.5304 16.2107 13.0391 16.5858 13.4142C16.9609 13.7893 17.4696 14 18 14C18.5304 14 19.0391 13.7893 19.4142 13.4142C19.7893 13.0391 20 12.5304 20 12C20 11.4696 19.7893 10.9609 19.4142 10.5858C19.0391 10.2107 18.5304 10 18 10C17.4696 10 16.9609 10.2107 16.5858 10.5858C16.2107 10.9609 16 11.4696 16 12Z"
                  fill="white"
                  fill-opacity="0.8"
                />
                <path
                  d="M18 20C15.8999 20.0002 13.884 19.1747 12.3872 17.7015C10.8905 16.2284 10.0331 14.2258 10 12.126C8.374 11.052 6.97 10.086 6.646 9.76397C6.23226 9.35049 5.99972 8.7896 5.99953 8.20467C5.99935 7.61975 6.23153 7.05871 6.645 6.64497C7.05847 6.23123 7.61937 5.99869 8.20429 5.9985C8.78922 5.99831 9.35026 6.23049 9.764 6.64397C9.96 6.84397 10.392 7.43597 10.94 8.23397C11.7793 6.65903 13.1212 5.40996 14.7521 4.68542C16.3831 3.96089 18.2094 3.8025 19.9408 4.23545C21.6721 4.66839 23.2089 5.66781 24.3069 7.07474C25.4048 8.48168 26.0008 10.2153 26 12C26 14.1217 25.1571 16.1565 23.6569 17.6568C22.1566 19.1571 20.1217 20 18 20ZM18 18C19.1097 17.9998 20.1977 17.6919 21.1429 17.1105C22.0881 16.5291 22.8535 15.6969 23.3541 14.7066C23.8547 13.7162 24.0708 12.6063 23.9784 11.5005C23.8861 10.3946 23.4888 9.33603 22.8308 8.44243C22.1728 7.54882 21.2799 6.85519 20.2514 6.43866C19.2228 6.02213 18.0988 5.89902 17.0045 6.08301C15.9101 6.267 14.8882 6.75088 14.0524 7.48086C13.2166 8.21084 12.5996 9.15832 12.27 10.218C13.15 11.552 14.09 13.01 14.806 14.128C15.094 14.576 14.576 15.094 14.126 14.808L12.206 13.568C12.5509 14.8405 13.3052 15.9641 14.3524 16.7652C15.3997 17.5662 16.6815 18.0002 18 18Z"
                  fill="#6FC2E8"
                  fill-opacity="0.8"
                />
                <path
                  d="M28 0C29.0609 0 30.0783 0.421427 30.8284 1.17157C31.5786 1.92172 32 2.93913 32 4V20C32 21.0609 31.5786 22.0783 30.8284 22.8284C30.0783 23.5786 29.0609 24 28 24H4C2.93913 24 1.92172 23.5786 1.17157 22.8284C0.421429 22.0783 0 21.0609 0 20V4C0 2.93913 0.421429 1.92172 1.17157 1.17157C1.92172 0.421427 2.93913 0 4 0L28 0ZM30 4C30 3.46957 29.7893 2.96086 29.4142 2.58579C29.0391 2.21071 28.5304 2 28 2L4 2C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H28C28.5304 22 29.0391 21.7893 29.4142 21.4142C29.7893 21.0391 30 20.5304 30 20V4Z"
                  fill="#CFE1E5"
                  fill-opacity="0.8"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>

    <section class="test">
      <button class="btn btn-outline-danger" @click="captureView">
        CAPTURE
      </button>
    </section>
  </main>
</template>

<style scoped>
.point-tr {
  cursor: pointer;
}
.selected-tr {
  outline: aqua 1px dashed;
}

.scale-up-center {
  -webkit-animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2022-10-18 9:38:51
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-center
 * ----------------------------------------
 */
@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
