let addstudentbtn = document.getElementById("add-student-btn")
let outermodal = document.getElementById("outer-modal")
let innermodal = document.getElementById("inner-modal")
let tbody = document.getElementById("tbody")
let btn = document.getElementById("btn")

let students = JSON.parse(localStorage.getItem("students" || "[]"));
localStorage.setItem("students", JSON.stringify(students))

let select = null
let search = document.getElementById("default-search")
let selectStudent = document.getElementById("Students-select")


search.addEventListener("input" , function(e){
    let sarchValue = e.target.value.toLowerCase();
    if(sarchValue){
        studentsSearched = students.filter((el) => el.firstNome.toLowerCase().includes(sarchValue))
        showstudent(tbody, studentsSearched)

    }else{
        showstudent(tbody, students)

    }

})

selectStudent.addEventListener("click"  , function(e){
    if (e.target.value === "all"){
        showstudent(tbody, students)

    }else{
        let filterStudents = students.filter((el) => el.group === e.target.value)
        showstudent(tbody, filterStudents)

    }
    
})

addstudentbtn.addEventListener("click" , function(){
   outermodal.classList.remove("hidden")
   if(select){
       btn.textContent = "Student tahrirlash"
   }else{
       btn.textContent = "Student qo'shish"

   }
})

outermodal.addEventListener("click" ,  function(){
    outermodal.classList.add("hidden")
    select = null;
    innermodal[0].value = "";
    innermodal[1].value = "";
    innermodal[2].value = "default";
    innermodal[3].value = "";
})

innermodal.addEventListener("click" , function(e){
    e.stopPropagation();
})

innermodal.addEventListener("submit" , function(e){
    e.preventDefault();
    let studentObj = {};

if(select){
 students.map((el) =>{
    if(el.id === select ){
        el.firstNome = e.target[0].value
        el.lastName = e.target[1].value
        el.group = e.target[2].value
        el.isWork = e.target[3].checked
 }})
}else{
    studentObj.firstNome = e.target[0].value;
    studentObj.lastName = e.target[1].value;
    studentObj.group = e.target[2].value;
    studentObj.isWork = e.target[3].checked;
    studentObj.id = students.length + 1;
    students.push(studentObj);
}

    localStorage.setItem("students", JSON.stringify(students))

    showstudent(tbody, students);
    outermodal.classList.add("hidden")
    select = null;
    innermodal[0].value = "";
    innermodal[1].value = "";
    innermodal[2].value = "default";
    innermodal[3].value = "";
})



function showstudent(content , data ){
    content.innerHTML = ""
data.map((el , index) => {
    content.innerHTML += `
       <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${index + 1}
                </th>
                <td class="px-6 py-4">
                    ${el.firstNome}
                </td>
                <td class="px-6 py-4">
                    ${
                        el.lastName
                    }
                </td>
                <td class="px-6 py-4">${el.group}</td>
                <td class="px-6 py-4">${el.isWork ? "Ha" : "Yop"}</td>
                <td class="px-6 py-4">
                    <button class="px-4 py-2 bg-[green] text-white"
                    onClick = "editstudent(${el.id})"
                    >Edit</button>
                    <button onClick="deletastudent(${el.id})"
                     class="px-4 py-2 bg-[red] text-white">Delete</button>
             </td>

            </tr>
    `
})
}
showstudent(tbody , students)
function deletastudent(id){
    students = students.filter((el) => el.id !== id );
    localStorage.setItem("students", JSON.stringify(students))
    showstudent(tbody, students)


}


function editstudent(id){
    select = id
    btn.textContent = "Student tahrirlash"
    outermodal.classList.remove("hidden")
    let student = students.find((el) => el.id === id);    
    innermodal[0].value = student.firstNome;
    innermodal[1].value = student.lastName;
    innermodal[2].value = student.group;
    innermodal[3].value = student.isWork;


}
