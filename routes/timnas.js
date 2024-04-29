
// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const timnasController = require("../controllers/timnasController");

// endpoint mahasiswa
router.get("/", timnasController.kelolaAnggota); // Untuk view kelola
router.post("/", timnasController.addAnggota); // untuk menambahkan data produk
router.put("/", timnasController.editAnggota); //untuk edit data produk
router.delete("/:id", timnasController.deleteAnggota); //untuk edit data produk
router.get("/daftar_pemain", timnasController.ViewDaftarPemain); // Untuk view kelola
router.get("/detail_pemain/:id", timnasController.ViewDetailPemain); // Untuk view kelola


// Lalu export routernya
module.exports = router;