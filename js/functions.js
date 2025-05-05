
document.addEventListener("DOMContentLoaded",main());
function main(){
    const hamIcon = document.querySelector(".header__hamIcon")
    const hiddenLink= document.querySelectorAll(".header__a");
    const submit=document.querySelector(".registroDeGuias__inputSubmit")
    let tableTempData = []
    let tableData = []
    const refreshTable = document.querySelector(".table__btn")
    const companyStatus = document.querySelectorAll(".generalStatus__cartNumber")
    
    hamIcon.addEventListener("click",()=>{
        const hiddenMenu = document.querySelector(".header__ul")
        hiddenMenu.classList.toggle("header__ul--show")
    })

    hiddenLink.forEach(Element => {
        Element.addEventListener("click",()=>{
            const hiddenMenu = document.querySelector(".header__ul")
            hiddenMenu.classList.remove("header__ul--show")
        })
    })
    submit.addEventListener("click",(e)=>{
        e.preventDefault()
        const input = document.querySelectorAll(".registroDeGuias__input");
        const validationValues = []
        const optionsElement = document.querySelectorAll(".registroDeGuias__inputOption")
        let options = []
        const form = document.getElementById("Registro de guias")
        optionsElement.forEach(Element=>{
            options.push(Element.innerText)
        })
        

        input.forEach(Element => {
            if(Element.value == "" || Element.value == 0){
                let mensaje = Element.previousElementSibling.lastElementChild
                console.log(Element.value)
                mensaje.innerText="Obligatorio"
                mensaje.classList.remove("correct")
                mensaje.classList.add("error")
                validationValues.push(false)
            }else{
                let mensaje = Element.previousElementSibling.lastElementChild
                const type = Element.getAttribute("name")
                mensaje.innerText="&#9786;"
                mensaje.classList.remove("error")
                mensaje.classList.add("correct")
                if(type == "estado inicial"){
                    validationValues.push(options[Element.value])
                }else{
                    validationValues.push(Element.value)
                }
            }


        })
        if(validationValues.includes(false) == false){
            tableTempData.push(validationValues)
            form.reset()
        }

    })


    refreshTable.addEventListener("click",()=>{
        if(tableTempData.length == 0){
            
        }else{
            createTabla(tableTempData)
            tableTempData.forEach(Element=>{
                tableData.push(Element)
            })
            tableTempData=[]
            refreshCouters(tableData)
        }
    })


    function createTabla(data){

        const tableBody = document.querySelector(".table__tbody")
        const generalStatus = document.querySelectorAll(".generalStatus__cartNumber")
        data.forEach(Element=>{
            const row = document.createElement("tr")
            row.classList.add("table__tr")
            for(i of Element){
                const cel = document.createElement("td")
                cel.classList.add("table__tbodyTd")
                cel.innerText = i
                row.appendChild(cel)
                
            }
            tableBody.appendChild(row)
        })

    }
    function refreshCouters(data =[]){
        let pendienteCounter = 0
        let transitCounter = 0
        let completeCounter = 0
        data.forEach(Element=>{
            if(Element[5] == "Pendiente"){
                pendienteCounter ++
            }else if(Element[5] == "En tránsito"){
                transitCounter ++
            }else if(Element[5] == "Entregado"){
                completeCounter ++
            }
        })
        companyStatus[0].innerText = pendienteCounter
        companyStatus[1].innerText = transitCounter
        companyStatus[2].innerText = completeCounter
    }
    const guiaStatus =document.querySelector(".table__tbodyTdStatus")
    guiaStatus.addEventListener("change",()=>{
        console.log("tamoaqui")
    })

}