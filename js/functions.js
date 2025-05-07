
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
            console.log(logElement(Element.id,Element.value));
             
            if(Element.value == "" || Element.value == 0){
                let mensaje = Element.previousElementSibling.lastElementChild
                mensaje.innerText="Obligatorio"
                mensaje.classList.remove("correct")
                mensaje.classList.add("error")
                validationValues.push(false)
            }else{
                let mensaje = Element.previousElementSibling.lastElementChild
                const type = Element.getAttribute("name")
                mensaje.innerHTML="&#9786;"
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
            tableTempData.push(createObjeto(validationValues))
            form.reset()
        }
        function logElement(Name,Value){
            switch (Name){
                case ("Numero de Guiags"):
                    return tableData;
                case("origen"):
                    return "origen";
                case("destino"):
                    return "destino";
                case("destinatario"):
                    return "destinatario";
                case("fecha De Creacion"):
                    return "Fecha de creacion";
                case("estado inicial"):
                    return "Estado inicial";
            }
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
        function addActionsToCell(val,url,type){
            const icon = document.createElement("i")
            const img = document.createElement("img")
            icon.classList.add("table__tbodyTdDelete")
            icon.id=val
            img.setAttribute("src",url)
            icon.appendChild(img)
            if(type === "delete"){
                icon.addEventListener("click",()=>{
                    console.log('tamoaqui');
                })
            }else if(type === "history"){
                icon.addEventListener("click",()=>{
                    console.log('history');
                })
            }else if(type === "edit"){
                icon.addEventListener("click",()=>{
                    console.log('edit');
                })
            }else{
                console.log('no entro en ningun caso');
                
            }
            return icon

        }

        function createCell(valor,withActions=false){
            const cel = document.createElement("td")
            
            cel.classList.add("table__tbodyTd")
            if(withActions){
                cel.appendChild(addActionsToCell(valor,"/img/history.svg","history"))
                cel.appendChild(addActionsToCell(valor,"img/trash.svg","delete"))
                cel.appendChild(addActionsToCell(valor,"img/edit.svg","edit"))
            }else{cel.innerText = valor}
            return cel
        }
        data.forEach(Element=>{
            const row = document.createElement("tr")
            row.classList.add("table__tr")
            row.classList.add(Element.guia)
            row.appendChild(createCell(Element.guia))
            row.appendChild(createCell(Element.origin))
            row.appendChild(createCell(Element.destino))
            row.appendChild(createCell(Element.destinatario))
            row.appendChild(createCell(Element.fecha))
            row.appendChild(createCell(Element.status))
            row.appendChild(createCell(Element.guia,true))
            tableBody.appendChild(row)
        })

    }
    function refreshCouters(data =[]){
        let pendienteCounter = 0
        let transitCounter = 0
        let completeCounter = 0
        data.forEach(Element=>{
            if(Element.status[0] == "Pendiente"){
                pendienteCounter ++
            }else if(Element.status[0] == "En tránsito"){
                transitCounter ++
            }else if(Element.status[0] == "Entregado"){
                completeCounter ++
            }
        })
        companyStatus[0].innerText = pendienteCounter
        companyStatus[1].innerText = transitCounter
        companyStatus[2].innerText = completeCounter
    }
    function createObjeto(Data){
        let controlObjeto = {
            guia:"",
            origin:"",
            destino:"",
            destinatario:"",
            fecha:"",
            status:[],
        }
        controlObjeto.guia=Data[0]
        controlObjeto.origin=Data[1]
        controlObjeto.destino=Data[2]
        controlObjeto.destinatario=Data[3]
        controlObjeto.fecha=Data[4]
        controlObjeto.status.push(Data[5])
        
        return controlObjeto
    }


}