/* =====================================
   PASSWORD
===================================== */

const correctPassword = "03042000";


/* =====================================
   VARIABEL
===================================== */

let currentSlide = 1;

let enteredPassword = "";

let backgroundStarted = false;

let bouquetCreated = false;



/* =====================================
   KEYPAD
===================================== */

function pressNumber(number) {


    /*
        Mulai musik ketika user
        pertama kali menyentuh keypad.
    */

    startBackgroundMusic();


    /*
        Maksimal 8 angka
    */

    if (
        enteredPassword.length >= 8
    ) {

        return;

    }


    /*
        Tambahkan angka
    */

    enteredPassword += number;


    /*
        Update display
    */

    updatePasswordDisplay();


    /*
        Hapus pesan error
    */

    document.getElementById(
        "wrongPassword"
    ).innerText = "";

}



/* =====================================
   DISPLAY PASSWORD
===================================== */

function updatePasswordDisplay() {


    const display =
        document.getElementById(
            "passwordText"
        );


    if (
        enteredPassword.length === 0
    ) {

        display.innerText =
            "••••••••";

        return;

    }


    /*
        Angka yang sudah ditekan
        akan terlihat.

        Angka yang belum ditekan
        menjadi titik.
    */

    display.innerText =
        enteredPassword +
        "•".repeat(
            8 -
            enteredPassword.length
        );

}



/* =====================================
   HAPUS ANGKA
===================================== */

function deleteNumber() {


    enteredPassword =
        enteredPassword.slice(
            0,
            -1
        );


    updatePasswordDisplay();


    document.getElementById(
        "wrongPassword"
    ).innerText = "";

}



/* =====================================
   CEK PASSWORD
===================================== */

function checkPassword() {


    /*
        Password harus 8 angka
    */

    if (
        enteredPassword.length !== 8
    ) {

        document.getElementById(
            "wrongPassword"
        ).innerText =
            "Password harus 8 angka 💗";

        return;

    }



    /*
        PASSWORD BENAR
    */

    if (
        enteredPassword ===
        correctPassword
    ) {


        const display =
            document.getElementById(
                "passwordDisplay"
            );


        display.classList.add(
            "correct"
        );


        document.getElementById(
            "wrongPassword"
        ).innerText =
            "Password benar! 💗";


        /*
            Pindah ke slide 2
        */

        setTimeout(
            function () {

                nextSlide();

            },
            800
        );


    }


    /*
        PASSWORD SALAH
    */

    else {


        const display =
            document.getElementById(
                "passwordDisplay"
            );


        document.getElementById(
            "wrongPassword"
        ).innerText =
            "Hmm... passwordnya salah 🥺";


        /*
            Animasi getar
        */

        display.animate(

            [

                {
                    transform:
                        "translateX(0)"
                },

                {
                    transform:
                        "translateX(-8px)"
                },

                {
                    transform:
                        "translateX(8px)"
                },

                {
                    transform:
                        "translateX(-8px)"
                },

                {
                    transform:
                        "translateX(0)"
                }

            ],

            {

                duration: 350

            }

        );

    }

}



/* =====================================
   BACKGROUND MUSIC
===================================== */

function startBackgroundMusic() {


    if (
        backgroundStarted
    ) {

        return;

    }


    const music =
        document.getElementById(
            "backgroundMusic"
        );


    music.volume = 0.25;


    music.play()
        .then(
            function () {

                backgroundStarted =
                    true;

            }
        )
        .catch(
            function () {

                /*
                    Browser bisa saja
                    masih memblokir audio.
                */

            }
        );

}



/* =====================================
   PINDAH SLIDE
===================================== */

function nextSlide() {


    /*
        Maksimal sampai slide 6
    */

    if (
        currentSlide >= 6
    ) {

        return;

    }


    /*
        Hilangkan slide sekarang
    */

    document
        .getElementById(
            "slide" +
            currentSlide
        )
        .classList.remove(
            "active"
        );


    /*
        Pindah nomor slide
    */

    currentSlide++;


    /*
        Tampilkan slide baru
    */

    document
        .getElementById(
            "slide" +
            currentSlide
        )
        .classList.add(
            "active"
        );

}



/* =====================================
   SLIDE 3
   BUKA SURPRISE
===================================== */

function showBirthdayMessage() {


    const message =
        document.getElementById(
            "birthdayMessage"
        );


    const gift =
        document.getElementById(
            "gift"
        );


    /*
        Jangan buka dua kali
    */

    if (
        !message.classList.contains(
            "hidden"
        )
    ) {

        return;

    }


    /*
        Ubah hadiah
    */

    gift.innerText =
        "🎉";


    /*
        Tampilkan ucapan
    */

    message.classList.remove(
        "hidden"
    );


    /*
        Scroll sedikit
    */

    setTimeout(
        function () {

            message.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "nearest"

            });

        },
        100
    );

}



/* =====================================
   SLIDE 4
   BUNGA → BUKET
===================================== */

function makeBouquet() {


    /*
        Kalau buket sudah dibuat,
        jangan lakukan apa-apa lagi.
    */

    if (
        bouquetCreated
    ) {

        return;

    }


    bouquetCreated =
        true;


    const container =
        document.getElementById(
            "flowerContainer"
        );


    const flower =
        document.getElementById(
            "singleFlower"
        );


    const instruction =
        document.getElementById(
            "flowerInstruction"
        );


    const message =
        document.getElementById(
            "bouquetMessage"
        );


    /*
        Hilangkan bunga pertama
    */

    flower.classList.add(
        "flower-disappear"
    );


    /*
        Setelah animasi selesai,
        ubah menjadi buket.
    */

    setTimeout(
        function () {


            /*
                Ubah emoji
            */

            flower.innerText =
                "💐";


            /*
                Hapus animasi lama
            */

            flower.classList.remove(
                "flower-disappear"
            );


            /*
                Tambahkan animasi buket
            */

            flower.classList.add(
                "bouquet-appear"
            );


            /*
                Tandai container
                sebagai buket
            */

            container.classList.add(
                "bouquet"
            );


            /*
                Ubah tulisan
            */

            instruction.innerHTML =
                "Surprise! 💗";


            /*
                Tampilkan pesan
            */

            message.classList.remove(
                "hidden"
            );


        },
        450
    );

}



/* =====================================
   SLIDE 6
   PLAY LAGU
===================================== */

function playSong() {


    const song =
        document.getElementById(
            "birthdaySong"
        );


    const button =
        document.getElementById(
            "playButton"
        );


    const backgroundMusic =
        document.getElementById(
            "backgroundMusic"
        );


    /*
        Matikan background music
    */

    backgroundMusic.pause();



    /*
        PLAY
    */

    if (
        song.paused
    ) {


        song.volume = 0.8;


        song.play();


        button.innerText =
            "❚❚";


    }


    /*
        PAUSE
    */

    else {


        song.pause();


        button.innerText =
            "▶";

    }

}



/* =====================================
   LAGU SELESAI
===================================== */

document
    .getElementById(
        "birthdaySong"
    )
    .addEventListener(
        "ended",
        function () {


            document
                .getElementById(
                    "playButton"
                )
                .innerText =
                "▶";

        }
    );