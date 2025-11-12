window.onload = function() {
    const picArray = [{src: "./fss/Screenshot from 2025-02-03 20-18-40.png",
        href: "https://math-mkd.netlify.app/"
    },
        {src: "./fss/Screenshot from 2025-11-11 23-53-02.png",
            href: "https://vesti-mkd.netlify.app/"
        },
        {src: "./fss/Screenshot from 2025-11-11 23-54-54.png",
            href: "https://cam-mkd.netlify.app/"
        },
        {src: "./fss/Screenshot from 2025-11-11 23-55-17.png",
            href: "https://geo-mkd.netlify.app/"
        }
    ];

    const pic1 = document.getElementById("pic1");
    const pic2 = document.getElementById("pic2");
    const pic3 = document.getElementById("pic3");
    const pic4 = document.getElementById("pic4");
    const link1 = document.getElementById("link1");
    const link2 = document.getElementById("link2");
    const link3 = document.getElementById("link3");
    const link4 = document.getElementById("link4");

    pic4.style.display = "none";

    pic1.src = picArray[0].src;
    pic2.src = picArray[1].src;
    pic3.src = picArray[2].src;
    pic4.src = picArray[3].src;
    link1.href = picArray[0].href;
    link2.href = picArray[1].href;
    link3.href = picArray[2].href;
    link4.href = picArray[3].href;

    this.setInterval(function() {

        picArray.push(picArray.shift());
        pic1.style.transition = "width 1s";
        pic1.style.width = "0%";
        setTimeout(function() {
            pic1.style.transition = "width 1s";
            pic1.style.width = "32%";
        }, 1000);
        setTimeout(function() {
        pic1.src = picArray[0].src;
        pic2.src = picArray[1].src;
        pic3.src = picArray[2].src;
        pic4.src = picArray[3].src;
        link1.href = picArray[0].href;
        link2.href = picArray[1].href;
        link3.href = picArray[2].href;
        link4.href = picArray[3].href;
        }, 1000);
    }, 5000);
}