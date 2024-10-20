let [broj1, broj2] = generate();
let operacija = "+";
const disp1 = document.getElementById("broj1");
const disp2 = document.getElementById("broj2");
const znak = document.getElementById("znak");
const rezultat = document.getElementById("result");
disp1.innerHTML = broj1;
disp2.innerHTML = broj2;
znak.innerHTML = operacija;
const tocno = document.getElementById("tocno");
const netocno = document.getElementById("netocno");
function test(){
    if(eval(`${broj1} ${operacija} ${broj2} === ${parseInt(rezultat.value)}`)){
        netocno.style.display = "none";
        tocno.style.display = "inline";
        [broj1, broj2, operacija] = status();
        disp1.innerHTML = broj1;
        disp2.innerHTML = broj2;
        znak.innerHTML = operacija;
        rezultat.value = '';
    }else{
        tocno.style.display = "none";
        netocno.style.display = "inline";
        rezultat.value = '';
    }
}

function generate(digit1=11, digit2=11){
    let x = Math.floor(Math.random() * digit1);
    let y = Math.floor(Math.random() * digit2);
    return [x, y];
}

function status(){
    let digit;
    let radio2 = document.getElementsByName("digit");
    for(const rad2 of radio2){
        if(rad2.checked){
            digit = rad2.value;
        }
    }
    let znak, broj1, broj2;
    let radio1 = document.getElementsByName("operator");
    for(const rad1 of radio1){
        if(rad1.checked){
            znak = rad1.value;
        }
    }
    if(znak==="+"){
        [broj1, broj2] = generate(Number(digit), Number(digit));
        if(digit==="1001"){
            if(broj1 + broj2 > 1000){
                broj1 = Math.round(broj1 / 2);
                broj2 = Math.round(broj2 / 2);
            }
        }
    }else if(znak==="-"){
        [broj1, broj2] = generate(Number(digit), Number(digit));
        if(broj2>broj1){
            let temp;
            temp = broj2;
            broj2 = broj1;
            broj1 = temp;
        }
    }else if(znak==="*"){
        [broj1, broj2] = generate(Number(digit), 11);
    }else if(znak==="/"){
        do{
        [broj1, broj2] = generate(Number(digit), 11);
        if(broj2>broj1){
            let temp = broj2;
            broj2 = broj1;
            broj1 = temp;
        }
        let temp = Math.trunc(broj1 / broj2);
        broj1 = broj2 * temp;
        }while(Number.isNaN(broj1)||Number.isNaN(broj2)||broj1===0||broj2===0);
    }
    return [broj1, broj2, znak];
}