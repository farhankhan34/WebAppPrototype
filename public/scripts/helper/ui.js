export default class UI {
   

    static createControl($type, $label,$id,$css_style, $place_holder){

        var itemDiv = document.createElement("Div");
        

        /*** the control block */    
        let item = document.createElement('input');
        item.setAttribute ('id',$id);
        item.setAttribute('type',$type);
        item.setAttribute('placeholder', $place_holder);

        itemDiv.appendChild(item);
        
        return itemDiv;
    }

    static createControlWithLabel($type, $label,$id,$css_style, $place_holder){

        var itemDiv = document.createElement("Div");

        /**** the label block ***/
        
        var itemLabel = document.createElement("Label");
        itemLabel.setAttribute('for', $id);        
        itemLabel.innerHTML = $label + ": " ;
        itemDiv.appendChild(itemLabel);
            

        /*** the control block */    
        let item = document.createElement('input');
        item.setAttribute ('id',$id);
        item.setAttribute('type',$type);
        item.setAttribute('placeholder', $place_holder);

        itemDiv.appendChild(item);
        
        return itemDiv;
    }

    static createHero( $text){

          /*****************TASK NAME AT THE TOP  *************/
          let heroLine = document.createElement('div');
          heroLine.setAttribute('class','hero-div');

          let heroText = document.createElement('span');
          heroText.setAttribute('class','hero-text');
          heroText.textContent = $text;

          heroLine.appendChild(heroText);
        
        return heroLine;
    }

    static formatTimeElapsed( seconds) {
         // let ampm = hrs >= 12 ? "PM" : "AM";
           // hrs = hrs % 12;
           // hrs = hrs ? hrs : 12;

           let secs = seconds % 60;
           secs = secs.toFixed(0);

           let minits = Math.floor(seconds/60);
           let mins = minits % 60;
           let hrs = Math.floor(minits/60);

           mins = mins < 10 ? '0'+mins : mins;
           secs = secs < 10 ? '0'+secs : secs;

           let formattedTime = hrs + ":" + mins + ":" + secs ;
          return formattedTime;
    }

}