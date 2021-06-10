/*
Code reference : https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
The code is recycled from the above source
*/
export default class Dictionary {
    
    static $theDictionary;

   static lookUp(){
       let $searchInput = document.getElementById("search-input");

      // alert('You are look for : '+  $searchInput.value  );
       let $dictionaryEndPoint = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + $searchInput.value;
       let $request = new XMLHttpRequest();
       $request.open("GET", $dictionaryEndPoint);

       // --> Handling Response
       $request.onload = function() {
           let $data = JSON.parse(this.response);

           if ($request.status >= 200 && $request.status < 400) {
               console.log("success!!");
               console.log(JSON.stringify($data));
               Dictionary.showMeaning($data);

           } else {
               let errorMessage = document.createElement('p');
               errorMessage.textContent = "Error: Unable to process your API request. Status: " + $request.status
               //content.appendChild(errorMessage);
               console.log(errorMessage.textContent);

           }
       };

       $request.send();

   }
    static showMeaning($data){
       /* get the display element and clean it */
        let $meaning = document.getElementById("search-results");
        $meaning.innerHTML = "";


        $data.forEach(function($item){
            // Create title heading element

            Dictionary.AddElementToSearchResult ($meaning, 'h2' ,$item.word, 'Search');

            // Phonetics inner loop
            $item.phonetics.forEach(function($item_phonetics){
                Dictionary.AddElementToSearchResult ($meaning, 'h3' ,$item_phonetics.text , 'Phonetics');
            });

            // meaning part
            $item.meanings.forEach(function($item_meaning){
                Dictionary.AddElementToSearchResult ($meaning, 'p' , $item_meaning.partOfSpeech , 'Part of speech');

                // definitions
                $item_meaning.definitions.forEach(function($definition){
                    // Definition part
                    Dictionary.AddElementToSearchResult ($meaning, 'p' , $definition.definition , 'Definition');
                    // Example
                    Dictionary.AddElementToSearchResult ($meaning, 'p' , $definition.example, 'Example');

                });

            });


        });


    }

 static AddElementToSearchResult($parentElement, $elementType , $textContent, $label){
     let $elementToAdd = document.createElement($elementType);
     $elementToAdd.textContent = $label + ": " + $textContent;
     $parentElement.appendChild($elementToAdd);
 }

    static clearSearchBox(){
       let $searchInput = document.getElementById("search-input");
        $searchInput.value = '';
    }

    constructor($board)
        {
            let $theDictionary = this;
            this.board = $board;
        }




 
    render()  {
        
        let dictionaryDiv =  document.createElement('div');
        dictionaryDiv.setAttribute('class','dictionary-div');

        let searchBox =  document.createElement('div');
        searchBox.setAttribute('class','search-box');

        /* Search input */
        let searchInput =  document.createElement('input');
        searchInput.setAttribute('id','search-input')
        searchInput.setAttribute('class','search-input')
        searchInput.setAttribute('placeholder','Type here ...');
        searchBox.appendChild(searchInput);

        /*  creating search button */
        let searchButton = document.createElement('button');
        searchButton.innerHTML = '<i class="fa fa-search fa-2x"></i>';
        searchButton.setAttribute('class','search-icon');
        searchButton.taskObject = this;
        searchButton.addEventListener('click',Dictionary.lookUp,false);
        searchBox.appendChild(searchButton);
        
        let clearButton = document.createElement('button');
        clearButton.innerHTML ='<i class="fa fa-times fa-2x"></i>';
        clearButton.setAttribute('class','search-icon');
        clearButton.taskObject = this;
        clearButton.addEventListener('click',Dictionary.clearSearchBox,false);
        searchBox.appendChild(clearButton);

        dictionaryDiv.appendChild(searchBox);

        /* search results display box */
        let searchResults =  document.createElement('div');
        searchResults.setAttribute('id','search-results')
        searchResults.setAttribute('class','search-results');
        dictionaryDiv.appendChild(searchResults);

        this.board.toolBoxSection.appendChild(dictionaryDiv);


        

    }

    
}
