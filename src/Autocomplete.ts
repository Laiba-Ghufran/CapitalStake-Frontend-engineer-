export class autocomplete {

  constructor(private inp : HTMLInputElement , private arr :string[]){
  }

  render()
  {
     let currentFocus :number;

    this.inp.addEventListener('input', (e : Event) => {
      let a:HTMLDivElement, b:HTMLDivElement, i, val = this.inp.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
        if (!val) 
        { return false;}
      
        currentFocus = -1;
          /*create a DIV element that will contain the items (values):*/
      a = document.createElement('div') as HTMLDivElement;
      a.setAttribute("id", a.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
          /*append the DIV element as a child of the autocomplete container:*/
      a.parentNode?.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < this.arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (this.arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement('div') as HTMLDivElement;
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + this.arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += this.arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + this.arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              
          
          
          
          b.addEventListener('click' , (e : Event) => {
              /*insert the value for the autocomplete text field:*/
              this.inp.value = b.getElementsByTagName('input')[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          })
          a.appendChild(b);
        }
      }
  })


  this.inp.addEventListener('keydown', (e : KeyboardEvent) => {
    let y = document.getElementById(this.inp.id + "autocomplete-list")!;
    let x;
      if (y) x = y.getElementsByTagName("div");

    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } 
    else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x)
        {
          x[currentFocus].click();
        } 
      }
    }
})
        function addActive (x: string | any[] | HTMLElement |any ) {
        /*a function to classify an item as "active":*/
        if (!x) 
        {return false;}
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
      }


      function removeActive (x: string | any[] | HTMLElement |any)  {
        /*a function to remove the "active" class from all autocomplete items:*/
        let i : number;
        for ( i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }

      function closeAllLists  (elmnt?: HTMLElement | EventTarget)  {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        const x = document.getElementsByClassName("autocomplete-items")!;
        for(var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != this.inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
}
/*execute a function when someone clicks in the document:*/
      document.addEventListener('click',  (e : Event) =>{
          closeAllLists(e.target);
      })


  }


}


