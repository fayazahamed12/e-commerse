// Search

var searchbox=document.getElementById("search")
var boxes=document.querySelectorAll(".card")

searchbox.addEventListener('keyup', (e)=>{
    let searchtext=e.target.value.toLowerCase().trim()
    boxes.forEach((box)=>{
        const data=box.dataset.item
        if(data.includes(searchtext)){
            box.style.display="block"
        }
        else{
            box.style.display="none"
        }
    })
})

// Cart Open and Close

let cartbtn=document.querySelector("#cart-icon")
let cart=document.querySelector(".cart")
let closebtn=document.querySelector("#cancel")

cartbtn.addEventListener('click',()=>{
    cart.classList.add('cart-active')
})

closebtn.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
})

// Remove Products

document.addEventListener('DOMContentLoaded',loadproduct)

function loadproduct(){
    loadcontent()
}

function loadcontent(){
    // Remove product from cart..
    let removebtn=document.querySelectorAll('#trash')
    removebtn.forEach((button)=>{
        button.addEventListener('click',removeitem)
    })

    // Adding Product Quantity
    let quantity=document.querySelectorAll('.cart-quantity')
    quantity.forEach((inputnumber)=>{
        inputnumber.addEventListener('change',changeqty)
    })

    // Adding product to cart
    let cartbtn=document.querySelectorAll('.cartbtn')
    cartbtn.forEach((btn)=>{
        btn.addEventListener('click',addcart)
    })

    updatetotal()
}

// Remove products
function removeitem(){
    if(confirm("Are you Sure Want to Remove This Product")){
        let title = this.parentElement.querySelector(".item-title").innerHTML;
        productlist=productlist.filter(el=>el.protitle!=title)
        this.parentElement.remove()
        updateCartCount();
        loadcontent()
    }
}

// Changing Quantity
function changeqty(){
    if(isNaN(this.value) || this.value<1 ){   //*isnotanumber
        this.value=1
    }
    updatetotal()
}

let productlist=[]

// Add Cart
function addcart(event){
    event.preventDefault()
    let product=this.parentElement.parentElement
    let protitle=product.querySelector('.card-title').innerHTML
    let proprice=product.querySelector('.price').innerHTML
    let proimage=product.querySelector(".card-img-top").src

    let addnewproduct={protitle,proimage,proprice}

    // Check product already added to cart
    if (productlist.find((ele)=>ele.protitle==addnewproduct.protitle)){
        alert("Product is already added to Cart")
        return  //if product it will not add new product
    }else{
        productlist.push(addnewproduct)
    }

    let newproduct=creatproduct(protitle,proprice,proimage)

    let element = document.createElement("div");
    element.innerHTML = newproduct;

    let cartbasket = document.querySelector(".cart-content");
    cartbasket.append(element)
    loadcontent()
    updateCartCount();
}

// Adding Product to cart

function creatproduct(protitle,proprice,proimage){
    return `<div class="cart-box">
            <img  src="${proimage}" class="cart-img">
            <div class="detail-box">
               <div class="item-title">${protitle}</div>
            <div class="price-box">
              <div class="cart-price">${proprice}</div>
              <div class="cart-amt">${proprice}</div>
            </div>
            <input type="number" value="1" class="cart-quantity">
          </div>
          <i class="fa-solid fa-trash" id="trash"></i>
        </div>`
}

function updatetotal(){
  let cartitems = document.querySelectorAll(".cart-box");
  let totalvalue = document.querySelector(".totalprice");

  let total = 0;

  cartitems.forEach((products) => {
    let pricelement = products.querySelector(".cart-price");
    let price = parseFloat(pricelement.innerHTML.replace("₹", ""));
    let qty = products.querySelector(".cart-quantity").value;
    total += price * qty;
    products.querySelector(".cart-amt").innerHTML = "Rs." + price * qty;
  });

  totalvalue.innerHTML = "Rs." + total;

  // Adding product count in carticon

  let cartcount = document.querySelector(".cart-count");
  let count = productlist.length;
  cartcount.innerHTML = count;

  if (count == 0) {
    cartcount.style.display = "none";
  } else {
    cartcount.style.display = "block";
  }
  
}

