let TYPING_SPEED = [20, 60];

function typeWriterEffect(element) {
    return new Promise(resolve => {
        let i = 0;
        let text = element.innerHTML;
        element.innerHTML = "";
        element.style.display = "block";
        function typeNextLetter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;

                // keep reader on the tract of writing
                if (document.body.offsetHeight - (window.innerHeight + window.scrollY) < 60) {
                    window.scrollTo(0, document.body.scrollHeight);
                }

                // simulate the typing with "animation"
                const randomSpeed = Math.random() * (TYPING_SPEED[1] - TYPING_SPEED[0]) + TYPING_SPEED[0];
                setTimeout(typeNextLetter, randomSpeed);
            } else {
                resolve();
            }
        }
        typeNextLetter();
    });
}

async function typeWriterEffectSequential(selector) {
    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
        element.style.display = "none";
    }
    for (const element of elements) {
        await typeWriterEffect(element);
        await new Promise(resolve => setTimeout(resolve, 10 * TYPING_SPEED[1]));
    }
    const skipBtn = document.getElementById("skip");
    if (skipBtn) {
        skipBtn.remove();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeWriterEffectSequential("p");

    document.getElementById("skip").addEventListener("click", function () {
        console.log("clicked");
        TYPING_SPEED = [5, 10];
        this.remove();
    });
});
