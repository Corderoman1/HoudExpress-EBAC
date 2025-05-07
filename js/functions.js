
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
                    console.log(e.target.id);
                    const rowToDelete = document.getElementById(e.target.id)
                    console.log(rowToDelete);
                    if(confirm("Estas seguro de eliminar este registro?")){
                        for(i of tableData){
                            if(i.guia == e.target.id){
                                tableData.pop(i)
                            }
                        }
                        rowToDelete.remove()
                    }
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
            row.id=Element.guia
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