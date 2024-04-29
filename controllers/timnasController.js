const Timnas = require("../models/Timnas");

module.exports = {

    // Membuat view untuk crud
    kelolaAnggota: async (req, res) => {
        try {
        const timnas = await Timnas.find();
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };

        res.render("index", {
            timnas,
            alert,
            title: "CRUD",
        });
        } catch (error) {
        res.redirect("/timnas");
        }
    },

    // Membuat controller untuk halaman detail produk
    ViewDetailPemain: async (req, res) => {
        try {
        // Mendapatkan ID produk dari parameter URL
        const { id } = req.params;
        // Mendapatkan data produk berdasarkan ID
        const timnas = await Timnas.findOne({ _id: id });

        // Render halaman detail_produk.ejs dengan data produk
        res.render("detail_pemain", { timnas });
        } catch (error) {
        // Tangani error jika terjadi
        res.status(500).send({ message: "Internal server error" });
        }
    },

    // Membuat view untuk mahasiswa
    ViewDaftarPemain: async (req, res) => {
        try {
        // Membuat variabel timnas, dan menunda eksekusi hingga proses async selesai lalu mengambil model timnas
        // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database timnas
        const timnas = await Timnas.find();
        // Membuat variabel untuk alertMessage  dan alertStatus
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
        const alert = { message: alertMessage, status: alertStatus };
        /**
         * Lalu render viewnya yang ada di dalam file index
         * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel timnas diatas
         * Lalu merender alert yang sudah di deklar di atas
         */
        res.render("daftar_pemain", {
            timnas,
            alert,
            title: "Daftar pemain", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
        });
        } catch (error) {
        // Jika error maka akan meredirect ke route timnas(routenya akan kita buat setelah selesai dengan timnasController)
        res.redirect("/timnas/daftar_pemain");
        }
    },

    // Membuat create data untuk anggota
    // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
    addAnggota: async (req, res) => {
        // memberi validasi untuk inputan yang kosong
        try {
        // Membuat contanta untuk nama, nim, jurusan, dan alamat yang diambil dari body/yang diketikan di form
        const { nama, no, posisi, foto, klub, tanggal_naturalisasi } = req.body;
        // lalu mengembalikan fungsi dan membuat data dari scheme/model timnas
        await Timnas.create({
            nama,
            no,
            posisi,
            foto,
            klub,
            tanggal_naturalisasi,
        });
        // ketika create data berhasil memberikan notifikasi
        req.flash("alertMessage", "Success add data Anggota");
        req.flash("alertStatus", "success");
        res.redirect("/timnas"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
        } catch (error) {
        // ketika create data error memberikan notifikasi
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        // ketika inputan kosong, maka redirect kehalaman
        res.redirect("/timnas");
        }
    },

    editAnggota: async (req, res) => {
        try {
        // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
        const { id, nama, no, posisi, foto, klub, tanggal_naturalisasi } =
            req.body;
        /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
    _id didapat database dan id isinya dari inputan user */
        const timnas = await Timnas.findOne({ _id: id });
        /* timnas diambil dari fungsi diatas dan titik(.) nama diambil dari database = nama yang didapat dari req body
    yang tentu dikirimkan dari inputan user */
        timnas.nama = nama;
        timnas.no = no;
        timnas.posisi = posisi;
        timnas.foto = foto;
        timnas.klub = klub;
        timnas.tanggal_naturalisasi = tanggal_naturalisasi;
        // Menyimpan datanya ke database
        await timnas.save();
        // ketika edit data berhasill memberikan notifikasi/alert
        req.flash("alertMessage", "Success edit data anggota");
        req.flash("alertStatus", "success");
        // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/timnas)
        res.redirect("/timnas");
        } catch (error) {
        // ketika edit data error memberikan notifikasi erronya
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        // ketika inputan kosong maka redirect kehalaman (/timnas)
        res.redirect("/timnas");
        }
    },

    // Membuat delete data untuk timnas
    deleteAnggota: async (req, res) => {
        try {
        /*
    Membuat variabel yang menerima id yang didapat dari params
    id didapat database dan id isinya dari params
    */
        const { id } = req.params;
        // cek data timnas yang mau di delete berdasarkan id
        const timnas = await Timnas.findOne({ _id: id });
        // setelah datanya sudah didapat maka menghapusnya
        await timnas.deleteOne();
        // ketika delete data memberikan notifikasi
        req.flash("alertMessage", "Success delete data Produk");
        req.flash("alertStatus", "warning");
        // setelah berhasil remove maka melakukan redirect
        res.redirect("/timnas");
        } catch (error) {
        // ketika create data error memberikan notifikasi
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        // ketika inputa kosong redirect kehalaman
        res.redirect("/timnas");
        }
    },

    // Membuat delete data untuk mahasiswa
    // types code in here..
    };
