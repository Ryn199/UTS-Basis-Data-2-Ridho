// Mengimport modul mongoose
const mongoose = require("mongoose");

// Membuat variabel baru dengan nama timnasSchema
const timnasScheme = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  no: {
    type: Number,
    required: true,
    unique: true,
  },
  posisi: {
    type: String,
    required: true,

  },
  foto: {
    type: String,
    required: true,
  },
  klub: {
    type: String,
    required: true,
  },
  tanggal_naturalisasi: {
    type: String,
    required: true,
  },
});


// lalu mengekspor model dari mahasiswa, tujuan mengekspor ini supaya model dari mahasiswa ini bisa digunakan dimana saja atau reusable
module.exports = mongoose.model("Timnas", timnasScheme);
