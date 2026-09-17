/* =========================================
   HAPPY BIRTHDAY ANIS 💗
   ========================================= */

const correctPassword = "03042000";

let currentSlide = 1;
let enteredPassword = "";

let backgroundStarted = false;
let bouquetCreated = false;
let isChangingSlide = false;


/* =========================================
   PASSWORD
   ========================================= */

function pressNumber(number) {

    startBackgroundMusic();

    if (enteredPassword.length >= 8) {
        return;
    }

    enteredPassword += number;

    updatePasswordDisplay();

    const wrongPassword =
        document.getElementById("wrongPassword");

    if (wrongPassword) {
        wrongPassword.innerText = "";
    }
}


function updatePasswordDisplay() {

    const display =
        document.getElementById("passwordText");

    if (!display) {
        return;
    }

    if (enteredPassword.length === 0) {

        display.innerText = "••••••••";

        return;
    }

    display.innerText =
        enteredPassword +
        "•".repeat(8 - enteredPassword.length);
}


function deleteNumber() {

    enteredPassword =
        enteredPassword.slice(0, -1);

    updatePasswordDisplay();

    const wrongPassword =
        document.getElementById("wrongPassword");

    if (wrongPassword) {
        wrongPassword.innerText = "";
    }
}


function checkPassword() {

    const wrongPassword =
        document.getElementById("wrongPassword");

    const display =
        document.getElementById("passwordDisplay");


    if (enteredPassword.length !== 8) {

        if (wrongPassword) {
            wrongPassword.innerText =
                "Password harus 8 angka 💗";
        }

        return;
    }


    if (enteredPassword === correctPassword) {

        if (display) {
            display.classList.add("correct");
        }

        if (wrongPassword) {
            wrongPassword.innerText =
                "Password benar! 💗";
        }

        setTimeout(() => {

            nextSlide();

        }, 700);

    } else {

        if (wrongPassword) {
            wrongPassword.innerText =
                "Hmm... passwordnya salah 🥺";
        }

        if (display) {

            display.animate(
                [
                    {
                        transform: "translateX(0)"
                    },
                    {
                        transform: "translateX(-7px)"
                    },
                    {
                        transform: "translateX(7px)"
                    },
                    {
                        transform: "translateX(-7px)"
                    },
                    {
                        transform: "translateX(0)"
                    }
                ],
                {
                    duration: 350
                }
            );
        }
    }
}


/* =========================================
   BACKGROUND MUSIC
   ========================================= */

function startBackgroundMusic() {

    if (backgroundStarted) {
        return;
    }

    const music =
        document.getElementById("backgroundMusic");

    if (!music) {
        return;
    }

    music.volume = 0.25;

    music.play()
        .then(() => {

            backgroundStarted = true;

        })
        .catch(() => {

            /* Browser mungkin menolak autoplay.
               Akan dicoba lagi pada interaksi berikutnya. */

        });
}


/* =========================================
   SLIDE TRANSITION
   ========================================= */

function nextSlide() {

    if (currentSlide >= 6) {
        return;
    }

    if (isChangingSlide) {
        return;
    }

    isChangingSlide = true;

    const oldSlide =
        document.getElementById(
            "slide" + currentSlide
        );

    const nextSlideElement =
        document.getElementById(
            "slide" + (currentSlide + 1)
        );


    if (!oldSlide || !nextSlideElement) {

        isChangingSlide = false;

        return;
    }


    /* Animasi slide lama */

    oldSlide.classList.add("slide-out");


    /* Siapkan slide berikutnya */

    nextSlideElement.classList.add("active");


    currentSlide++;


    /* Setelah animasi selesai */

    setTimeout(() => {

        oldSlide.classList.remove(
            "active",
            "slide-out"
        );

        isChangingSlide = false;

    }, 400);


    /* Pastikan halaman kembali ke atas */

    nextSlideElement.scrollTop = 0;
}


/* =========================================
   GIFT
   ========================================= */

function showBirthdayMessage() {

    const message =
        document.getElementById("birthdayMessage");

    const gift =
        document.getElementById("gift");


    if (!message || !gift) {
        return;
    }


    if (!message.classList.contains("hidden")) {
        return;
    }


    gift.innerText = "🎉";


    /* Animasi gift */

    gift.animate(
        [
            {
                transform: "scale(1)"
            },
            {
                transform: "scale(1.2) rotate(-5deg)"
            },
            {
                transform: "scale(0.95) rotate(5deg)"
            },
            {
                transform: "scale(1)"
            }
        ],
        {
            duration: 550,
            easing: "ease-out"
        }
    );


    setTimeout(() => {

        message.classList.remove("hidden");

        message.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(15px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 500,
                easing: "ease-out"
            }
        );

    }, 300);
}


/* =========================================
   BOUQUET
   ========================================= */

function makeBouquet() {

    if (bouquetCreated) {
        return;
    }

    bouquetCreated = true;


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


    if (!container || !flower) {
        return;
    }


    /* Bunga menghilang */

    flower.classList.add(
        "flower-disappear"
    );


    /* Buket muncul */

    setTimeout(() => {

        flower.innerText = "💐";

        flower.classList.remove(
            "flower-disappear"
        );

        flower.classList.add(
            "bouquet-appear"
        );

        container.classList.add(
            "bouquet"
        );


        if (instruction) {

            instruction.innerHTML =
                "Surprise! 💗";

        }


        if (message) {

            message.classList.remove(
                "hidden"
            );

            message.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(15px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 500
                }
            );
        }

    }, 450);
}


/* =========================================
   BIRTHDAY SONG
   ========================================= */

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


    if (!song) {
        return;
    }


    /* Background music berhenti */

    if (backgroundMusic) {
        backgroundMusic.pause();
    }


    if (song.paused) {

        song.volume = 0.8;

        song.play()
            .then(() => {

                if (button) {
                    button.innerText = "❚❚";
                }

            })
            .catch(() => {

                if (button) {
                    button.innerText = "▶";
                }

            });

    } else {

        song.pause();

        if (button) {
            button.innerText = "▶";
        }
    }
}


/* =========================================
   SONG SELESAI
   ========================================= */

const birthdaySong =
    document.getElementById(
        "birthdaySong"
    );


if (birthdaySong) {

    birthdaySong.addEventListener(
        "ended",
        function () {

            const button =
                document.getElementById(
                    "playButton"
                );

            if (button) {
                button.innerText = "▶";
            }
        }
    );
}


/* =========================================
   START BACKGROUND MUSIC
   PADA INTERAKSI PERTAMA
   ========================================= */

document.addEventListener(
    "click",
    function () {

        startBackgroundMusic();

    },
    {
        once: false
    }
);