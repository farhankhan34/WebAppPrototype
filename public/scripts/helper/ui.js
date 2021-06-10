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

}