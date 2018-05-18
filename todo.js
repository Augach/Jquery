$(document).ready(function () {
    // ici on vérifie que le DOM est prêt à être manipulé

    // je récupère mon champ input sous forme d'objet
    var input = $('.todo-input');

    // je récupère la liste ul sous forme d'objet
    var list = $('.todo-list');

    // tableau de stockage pour les tâches
    var tasks = [];
    var data = localStorage.getItem('todo');
   
    if (data) {
        tasks = JSON.parse(data); //parse transforme une chaîne de caractères en JSON
    }
    
    tasks.forEach(function (task) {
        list.append(taskToHTML(task));
    });



    // on ajoute un écouteur d'événement keyup sur le champ text
    input.on('keyup', function (event) {
        if (event.keyCode === 13) {
            var text = event.target.value;

            //trim permet de supprimer les espaces au début et à la fin de la chaîne de caractères
            if (text.trim()) {
                var task = {
                    id: 'task-' + (tasks.length + 1),
                    text: text,
                    date: Date.now(),
                    done: false,
                    // id, text, date, done sont des clés
                    //l'intégralité des accolades est du JSON
                };

                //ajout de l'objet task nouvellement créé dans le tableau
                tasks.push(task);
                localStorage.setItem('todo', JSON.stringify(tasks));
              
                
                
                var li = taskToHTML(task);

                list.append(/*'<li>' + text + '</li>'*/ li);
                input.val('');
                //input.val('') permet de vider le champ, ici après avoir tapé sur entrée
            }
        }

    });
    /*$('.todo-list li').on('click', function () {
        alert($(this).text());
    });
    ici l'alerte fonctionne uniquement sur le premier li*/

    list.on('click', 'li', function (event) {
        //list car on a redéfini .todo.list en list
        var element = $(event.target);

        
        if (element.hasClass('todo-delete')) {
            var id = element.parent().attr('id'); //attr('id') car jquery ne connaît pas id seul
            
            var index = tasks.findIndex(function (task) { //méthode attachée à un tableau qui appartient à javascript, on veut trouver la position de la tache dans le tableau
                return task.id === id;
            }); 
            
            tasks.splice(index, 1);
            localStorage.setItem('todo', JSON.stringify(tasks));
            
            element.parent().fadeOut(1000, function () { //element =poubelle, parent = li, fadeOut fait disparaitre un element en douceur, après 1000 on un callback function
                $(this).remove(); // this = li
            });
        }


        if (element.hasClass('todo-list-text')) {
            element.on('keyup', function (e) { //ici element=span
                if (e.keyCode === 13) {
                    e.preventDefault();

                    var id = element.parent().attr('id');
                    
                    var index = tasks.findIndex(function (task) {
                        return task.id === id;
                    });

                    var task = tasks[index];
                    task.text = e.target.innerText;
                    localStorage.setItem('todo', JSON.stringify(tasks));
                    
                }
            });
        }
    });

});

function taskToHTML(task) {
    var li = '<li id="' + task.id + '" class="list-group-item">';
    li += ' <div class="todo-list-text single-line" contenteditable="true">' + task.text + '</div>'; // contenteditable permet de modifier le champ sur la page web
    //on utilise la librairie en ligne fontawesome dont on a indiqué lelien dans le html 
    li += ' <i class="fa fa-check-square todo-check"></i>';
    //li += ' <i class="fa fa-check"></i>';
    li += ' <i class="fa fa-times-circle todo-delete"></i>';
    li += '</li>';

    return li;

}