
document.addEventListener("DOMContentLoaded",main());
function main(){
    const hamIcon = document.querySelector(".header__hamIcon")
    const hiddenLink= document.querySelectorAll(".header__a");
    const submit=document.querySelector(".registroDeGuias__inputSubmit")
    let tableTempData = []
    let tableData = []
    const refreshTable = document.querySelector(".table__btn")
    const companyStatus = document.querySelectorAll(".generalStatus__cartNumber")
    const submitUpgrade = document.querySelector(".formModal__inputSubmit")

    
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
            const validationInputs = validation(Element.id,Element.value)
            if(validationInputs[0]){
                let mensaje = Element.previousElementSibling.lastElementChild
                const type = Element.getAttribute("name")
                mensaje.innerHTML=validationInputs[1]
                mensaje.classList.remove("error")
                mensaje.classList.add("correct")
                if(type == "estado inicial"){
                    validationValues.push(options[Element.value])
                }else{
                    validationValues.push(Element.value)
                }
            }else{
                let mensaje = Element.previousElementSibling.lastElementChild
                mensaje.innerText=validationInputs[1]
                mensaje.classList.remove("correct")
                mensaje.classList.add("error")
                validationValues.push(false)
            }
            
        })
        if(validationValues.includes(false) == false){
            tableTempData.push(createObjeto(validationValues))
            form.reset()
        }
        function validation(Name,Value){
            if(Name == "Numero de Guia"){
                return valGuideNumber(Value)
            }else{
                return valEmpty(Value);
            }
        }
        function valGuideNumber(Value){
            const validVal = /^([0-9])/;
            if(Value.length < 1 ){
                return [false,"Obligatorio"]
            }else if(Value.length !== 10){
                return [false,"Formato No Valido"]
            }else if(!validVal.test(parseInt(Value))){
                return [false,"Este Campo no puede llevar letras"]
            }else{
                for(i of tableData){
                   if(i.guia == Value){
                    return [false,"Este numero ya esta registrado"]
                   }     
                }
                for(i of tableTempData){
                    if(i.guia == Value){
                     return [false,"Este numero ya esta registrado"]
                    }     
                 }
                return [true,'Correct']
            }

        }
        function valEmpty(Value){
            if(Value.length<1 || Value == 0){
                return [false,"Obligatorio"]
            }else{
                return [true,'Correct']
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
            img.setAttribute("src",url)
            img.id=val
            icon.appendChild(img)
            if(type === "delete"){
                icon.addEventListener("click",(e)=>{
                    const rowToDelete = document.getElementById(e.target.id)
                    if(confirm("Estas seguro de eliminar este registro?")){
                        for(i of tableData){
                            if(i.guia == e.target.id){
                                tableData.pop(i)
                            }
                        }
                        rowToDelete.remove()
                        icon.removeEventListener
                    }
                })
            }else if(type === "history"){
                icon.addEventListener("click",(e)=>{
                    for(i of tableData){
                        if(i.guia == e.target.id){
                            createHistoryModal(i)
                        }
                    }
                })
                function createHistoryModal(guia){
                   
                    const body = document.querySelector(".body")
                    const historyModal = document.createElement("section")
                    const historyModalContainer = document.createElement("div")
                    const historyModalTitle = document.createElement("h2")
                    const closeHistoryModal = document.createElement("button")
                    historyModal.classList.add("historyModal")
                    historyModal.classList.add("historyModal--show")
                    historyModalContainer.classList.add("historyModal__container")
                    historyModalTitle.classList.add("historyModal__title")
                    historyModalTitle.innerText = `Historial del Numero de guia:${guia.guia}`
                    historyModal.appendChild(historyModalContainer)
                    historyModalContainer.appendChild(historyModalTitle)

                    for(let i=0;i<guia.fecha.length;i++){
                        const historyModalFecha = document.createElement("p")
                        const historyModalStatus = document.createElement("p")
                        historyModalFecha.classList.add("historyModal__date")
                        historyModalStatus.classList.add("historyModal__status")
                        historyModalFecha.innerText = `Fecha:${guia.fecha[i]}`
                        historyModalStatus.innerText = `Fecha:${guia.status[i]}`
                        historyModalContainer.appendChild(historyModalFecha)
                        historyModalContainer.appendChild(historyModalStatus)
                    }
                    closeHistoryModal.classList.add("historyModal__OkButtom")
                    closeHistoryModal.classList.add("btn-normal")
                    closeHistoryModal.innerText = "OK"
                    historyModalContainer.appendChild(closeHistoryModal)
                    body.appendChild(historyModal)
                    closeHistoryModal.addEventListener("click",(e)=>{
                        const historyModal = document.querySelector(".historyModal")
                        historyModal.remove()
                        e.removeEventListener
                    })
                
                }
            }else if(type === "edit"){
                icon.addEventListener("click",(e)=>{
                    const modal = document.querySelector(".formModal")
                    const modalTitle = document.querySelector(".formModal__title")
                    const options = document.querySelectorAll(".formModal__inputOption")
                    const submitModal = document.querySelector(".formModal__inputSubmit")
                    modal.classList.add("formModal--show")
                    modalTitle.innerText=`Editar registro: ${e.target.id}`
                    submitModal.id=e.target.id
                    for(i of tableData){
                        if(i.guia == e.target.id){
                            if(i.status[0] == "Pendiente"){
                                options[1].setAttribute('selected',true)
                            }else if(i.status[0] == "En tránsito"){
                                options[2].setAttribute('selected',true)
                            }else if(i.status[0] == "Entregado"){
                                options[3].setAttribute('selected',true)
                            }
                        }
                    }
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
            row.id=Element.guia
            row.appendChild(createCell(Element.guia))
            row.appendChild(createCell(Element.origin))
            row.appendChild(createCell(Element.destino))
            row.appendChild(createCell(Element.destinatario))
            row.appendChild(createCell(Element.fecha[0]))
            row.appendChild(createCell(Element.status[0]))
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
            fecha:[],
            status:[],
        }
        controlObjeto.guia=Data[0]
        controlObjeto.origin=Data[1]
        controlObjeto.destino=Data[2]
        controlObjeto.destinatario=Data[3]
        controlObjeto.fecha.push(Data[4])
        controlObjeto.status.push(Data[5])
        
        return controlObjeto
    }

    submitUpgrade.addEventListener("click",(e)=>{
        e.preventDefault()
        const options = document.querySelectorAll(".formModal__inputOption")
        const inputVal = document.querySelector(".formModal__inputSelect")
        const modal = document.querySelector(".formModal")
        const guia = e.target.id
        const date = new Date().toLocaleDateString()
        let optionsToadd = []
        options.forEach(Element=>{
            optionsToadd.push(Element.innerText)
        })
        if(inputVal.value == 1){
            for(i of tableData){
                if(i.guia == guia){
                    i.status.unshift(optionsToadd[1])
                    i.fecha.unshift(date)
                }
            }
        }else if(inputVal.value == 2){
            for(i of tableData){
                if(i.guia == guia){
                    i.status.unshift(optionsToadd[2])
                    i.fecha.unshift(date)
                }
            }
        }else if(inputVal.value == 3){
            for(i of tableData){
                if(i.guia == guia){
                    i.status.unshift(optionsToadd[3])
                    i.fecha.unshift(date)
                }
            }
        }
        upgradeTable(e.target.id)
        refreshCouters(tableData)
        e.target.id=""

        modal.classList.remove("formModal--show")

    })
    function upgradeTable(guia){
        const row = document.getElementById(guia)
        const cell = row.querySelectorAll(".table__tbodyTd")
        for(i of tableData){
            if(i.guia == guia){
                cell[4].innerText = i.fecha[0]
                cell[5].innerText = i.status[0]
            }
        }
    }



}