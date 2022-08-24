//nav control
const subjects = document.getElementsByName('subject');
const navButton = document.querySelector('.nav__button');
const subjectsContent = document.querySelectorAll('.subject')

function chooseSubject(){
    for(i= 0; i < subjects.length; i++){
        if (subjects[i].checked){
            subjects[i].parentNode.classList.add('header__nav___label-checked');
            subjectsContent[i].style.display = 'block';  

            
        }else{
            subjects[i].parentNode.classList.remove('header__nav___label-checked');
            subjectsContent[i].style.display = 'none';    
        }
    } 
}
navButton.addEventListener('click', chooseSubject)


//Load page

loadPage();
chooseSubject();

//create the subject items on subject grid

function loadPage(){
    const apiUrlSubject = 'http://127.0.0.1:5500/assets/html/subject.html';
    fetch(apiUrlSubject).
        then((data) => data.json()).
        then(response => 
            response.forEach((listed) =>{
                //create subject__item
                const subject = listed.subject;
                const section = document.querySelector(`[data-subject="${subject}"]`);
                const card = document.createElement('div');
                card.className = "subject__item";
                    

                //create subject__identification
                const cardIdentification = document.createElement('div');
                const cardIdentificationH3 = document.createElement('h3');
                const cardIdentificationP =  document.createElement('p');
                    
                cardIdentificationH3.innerText = listed.h3;
                cardIdentificationP.innerText = listed.p;

                cardIdentification.className = "subject__identification";
                cardIdentificationH3.className = "subject__identification___title";
                cardIdentificationP.className = "subject__identification___subtitle";


                //create subject__button
                const cardButton = document.createElement('button');
                    
                cardButton.className = "subject__button";
                cardButton.innerHTML = '<i class="fa-solid fa-xl fa-angle-down"></i>';
                    
                
                //create subject__content
                const cardContent = document.createElement('ul');
                cardContent.className = "subject__content";
                cardContent.innerHTML = `<iframe width="100%" height="315" src=${listed.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                //cardContent.innerHTML = `<${listed.tag}</iframe>`;
        

                //appendChild
                section.appendChild(card);

                card.appendChild(cardIdentification);
                cardIdentification.appendChild(cardIdentificationH3);
                cardIdentification.appendChild(cardIdentificationP);

                card.appendChild(cardButton);
                card.appendChild(cardContent);
            })
        ).
        then(()=>{
            const subjectButtons = document.querySelectorAll('.subject__button')
            subjectButtons.forEach((button)=>{
                button.addEventListener('click', () => {controlCard(button)});
            })
        }) 
}


   


//Control Card
function controlCard(button){           //Called on loadPage();
    const cardContent = button.nextElementSibling;
    changeButtonAngle(button)
    if (cardContent.style.display == ''){
        cardContent.style.display = 'block';
    }else{
        cardContent.style.display = '';
    }   
}
function changeButtonAngle(button){     //Called on controlCard()
    const buttonAngle = button.childNodes[0];
    
    buttonAngle.classList.toggle('fa-angle-down')
    buttonAngle.classList.toggle('fa-angle-up');
}





