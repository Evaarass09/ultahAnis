/* =========================================
   HAPPY BIRTHDAY ANIS 💗✨
   JAVASCRIPT FINAL
   ========================================= */

const correctPassword = "03042000";

let currentSlide = 1;
let enteredPassword = "";
let bouquetCreated = false;
let backgroundStarted = false;
let changingSlide = false;


/* =========================================
   SPARKLE BACKGROUND ✨
   ========================================= */

function createBackgroundSparkles() {
    const symbols = ["✦", "✧", "⋆", "✨"];

    const total = window.innerWidth <= 600 ? 15 : 22;

    for (let i = 0; i < total; i++) {
        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";
        sparkle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        sparkle.style.left = Math.random() * 95 + "%";
        sparkle.style.top = Math.random() * 92 + "%";

        sparkle.style.setProperty(
            "--duration",
            (2 + Math.random() * 2.5) + "s"
        );

        sparkle.style.setProperty(
            "--float-duration",
            (2.5 + Math.random() * 3) + "s"
        );

        sparkle.style.setProperty(
            "--delay",
            Math.random() * 3 + "s"
        );

        document.body.appendChild(sparkle);
    }
}


/* =========================================
   MAGIC SPARKLE ✨
   ========================================= */

function magicSparkles(element, amount = 12) {
    if (!element) return;

    const box = element.getBoundingClientRect();

    for (let i = 0; i < amount; i++) {
        const sparkle = document.createElement("span");

        sparkle.className = "magic-sparkle";

        sparkle.textContent =
            i % 3 === 0 ? "✦" :
            i % 3 === 1 ? "✧" : "✨";

        sparkle.style.left =
            box.left + box.width / 2 + "px";

        sparkle.style.top =
            box.top + box.height / 2 + "px";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            40 + Math.random() * 80;

        sparkle.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        sparkle.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}


/* =========================================
   MUSIC
   ========================================= */

function startBackgroundMusic() {

    const music =
        document.getElementById("backgroundMusic");

    if (!music) {
        console.log("❌ backgroundMusic tidak ditemukan");
        return;
    }

    music.volume = 0.25;

    if (!music.paused) {
        backgroundStarted = true;
        return;
    }

    music.play()
        .then(() => {
            backgroundStarted = true;
            console.log("🎵 Background music menyala");
        })
        .catch((error) => {
            console.log(
                "⚠️ Background music belum bisa dimainkan:",
                error
            );
        });
}


/* =========================================
   PASSWORD
   ========================================= */

function pressNumber(number) {

    // Tap keypad = izinkan musik mulai
    startBackgroundMusic();

    if (enteredPassword.length >= 8) {
        return;
    }

    enteredPassword += number;

    updatePasswordDisplay();

    const message =
        document.getElementById("wrongPassword");

    if (message) {
        message.textContent = "";
    }
}


function updatePasswordDisplay() {

    const display =
        document.getElementById("passwordText");

    if (!display) return;

    if (enteredPassword.length === 0) {
        display.textContent = "••••••••";
        return;
    }

    display.textContent =
        enteredPassword +
        "•".repeat(8 - enteredPassword.length);
}


function deleteNumber() {

    enteredPassword =
        enteredPassword.slice(0, -1);

    updatePasswordDisplay();

    const message =
        document.getElementById("wrongPassword");

    if (message) {
        message.textContent = "";
    }
}


function checkPassword() {

    startBackgroundMusic();

    const message =
        document.getElementById("wrongPassword");

    const display =
        document.getElementById("passwordDisplay");

    if (enteredPassword.length < 8) {

        if (message) {
            message.textContent =
                "Password harus 8 angka 💗";
        }

        return;
    }


    if (enteredPassword === correctPassword) {

        if (display) {
            display.classList.add("correct");
            magicSparkles(display, 15);
        }

        if (message) {
            message.textContent =
                "Password benar! 💗";
        }

        setTimeout(() => {
            nextSlide();
        }, 700);

    } else {

        if (message) {
            message.textContent =
                "Hmm... passwordnya salah 🥺";
        }

        if (display) {

            display.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-8px)" },
                    { transform: "translateX(8px)" },
                    { transform: "translateX(-8px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 350
                }
            );
        }
    }
}


/* =========================================
   PINDAH SLIDE ✨
   ========================================= */

function nextSlide() {

    if (currentSlide >= 6) {
        return;
    }

    if (changingSlide) {
        return;
    }

    changingSlide = true;

    const oldSlide =
        document.getElementById(
            "slide" + currentSlide
        );

    const newSlide =
        document.getElementById(
            "slide" + (currentSlide + 1)
        );

    if (!oldSlide || !newSlide) {
        changingSlide = false;
        return;
    }


    /* Sparkle saat pindah */

    magicSparkles(
        oldSlide.querySelector(".card"),
        10
    );


    /* Slide lama keluar */

    oldSlide.classList.add("slide-out");


    /* Slide baru masuk */

    newSlide.classList.add("active");


    currentSlide++;


    /* Kalau masuk slide 6,
       hentikan background music */

    if (currentSlide === 6) {

        const music =
            document.getElementById(
                "backgroundMusic"
            );

        if (music) {
            music.pause();
            music.currentTime = 0;
        }
    }


    newSlide.scrollTop = 0;


    setTimeout(() => {

        magicSparkles(
            newSlide.querySelector(".card"),
            8
        );

    }, 300);


    setTimeout(() => {

        oldSlide.classList.remove(
            "active",
            "slide-out"
        );

        changingSlide = false;

    }, 550);
}


/* =========================================
   GIFT 🎁
   ========================================= */

function showBirthdayMessage() {

    const gift =
        document.getElementById("gift");

    const message =
        document.getElementById(
            "birthdayMessage"
        );

    if (!gift || !message) {
        return;
    }

    if (!message.classList.contains("hidden")) {
        return;
    }


    /* Sparkle */

    magicSparkles(gift, 20);


    /* Gift bergerak */

    gift.animate(
        [
            {
                transform: "scale(1)"
            },
            {
                transform:
                    "scale(1.25) rotate(-7deg)"
            },
            {
                transform:
                    "scale(.9) rotate(7deg)"
            },
            {
                transform:
                    "scale(1)"
            }
        ],
        {
            duration: 650,
            easing: "ease-out"
        }
    );


    /* Gift berubah */

    setTimeout(() => {

        gift.textContent = "🎉";

    }, 250);


    /* Pesan muncul */

    setTimeout(() => {

        message.classList.remove("hidden");

        message.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(20px)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(0)"
                }
            ],
            {
                duration: 500,
                easing: "ease-out"
            }
        );

        magicSparkles(message, 8);

    }, 400);
}


/* =========================================
   BUNGA → BUKET 🌷💐
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


    /* Sparkle awal */

    magicSparkles(container, 15);


    /* Bunga menghilang */

    flower.classList.add(
        "flower-disappear"
    );


    setTimeout(() => {

        /* Ganti bunga */

        flower.textContent = "💐";

        flower.classList.remove(
            "flower-disappear"
        );

        flower.classList.add(
            "bouquet-appear"
        );

        container.classList.add(
            "bouquet"
        );


        /* Sparkle besar */

        setTimeout(() => {
            magicSparkles(container, 25);
        }, 100);


        /* Tulisan */

        if (instruction) {
            instruction.innerHTML =
                "Surprise! 💗";
        }


        /* Pesan */

        if (message) {

            setTimeout(() => {

                message.classList.remove(
                    "hidden"
                );

                message.animate(
                    [
                        {
                            opacity: 0,
                            transform:
                                "translateY(20px)"
                        },
                        {
                            opacity: 1,
                            transform:
                                "translateY(0)"
                        }
                    ],
                    {
                        duration: 500,
                        easing: "ease-out"
                    }
                );

            }, 300);
        }

    }, 450);
}


/* =========================================
   BIRTHDAY SONG 🎵
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

    const background =
        document.getElementById(
            "backgroundMusic"
        );


    if (!song) {
        console.log(
            "❌ birthdaySong tidak ditemukan"
        );
        return;
    }


    /* Matikan background */

    if (background) {
        background.pause();
        background.currentTime = 0;
    }


    /* PLAY */

    if (song.paused) {

        song.volume = 0.8;

        song.play()
            .then(() => {

                console.log(
                    "🎵 Birthday song menyala"
                );

                if (button) {
                    button.textContent = "❚❚";
                    button.classList.add(
                        "playing"
                    );
                }

                magicSparkles(
                    button,
                    12
                );

            })
            .catch((error) => {

                console.log(
                    "❌ Birthday song gagal:",
                    error
                );

            });

    }

    /* PAUSE */

    else {

        song.pause();

        if (button) {
            button.textContent = "▶";
            button.classList.remove(
                "playing"
            );
        }
    }
}


/* =========================================
   LAGU SELESAI
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createBackgroundSparkles();


        const song =
            document.getElementById(
                "birthdaySong"
            );

        if (song) {

            song.addEventListener(
                "ended",
                function () {

                    const button =
                        document.getElementById(
                            "playButton"
                        );

                    if (button) {

                        button.textContent =
                            "▶";

                        button.classList.remove(
                            "playing"
                        );
                    }

                    magicSparkles(
                        document.getElementById(
                            "slide6"
                        ),
                        15
                    );
                }
            );
        }
    }
);


/* =========================================
   MUSIK SAAT INTERAKSI PERTAMA
   ========================================= */

document.addEventListener(
    "pointerdown",
    function () {

        startBackgroundMusic();

    },
    {
        passive: true
    }
);