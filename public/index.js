console.log("js file connected");


let submitButton = document.getElementById('submit-button');

    // "+" gives a numeric representation of the object; +"1" returns 1
submitButton.addEventListener('click', async () => {

    let name = document.getElementById('name-input').value;
    let price = document.getElementById('price');
    let inventory = +document.getElementById('inventory').value;
    let deliveryAmt = document.getElementById('delivery-Amt').value === "true" ? true : false;

    let getData = {
        name,
        price,
        inventory,
        deliveryAmt
    }


    let response = await fetch('/create_item', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(getData)
    })
    let uploadStatusTag = document.getElementById('upload-status');
    console.log(response.status);
    if (response.status === 200) {
        console.log(response);
        console.log("upload is complete!");
        uploadStatusTag.textContent = "Upload Completed";
        uploadStatusTag.style.color = "green";

    } else {
        console.log(response);
        console.log("upload has failed");
        console.log;
        uploadStatusTag.textContent = "Upload Failed";
        uploadStatusTag.style.color = "red";

    }

})

let deleteButton = document.getElementById('delete');

deleteButton.addEventListener('click', async () => {
   let response = await fetch('http://localhost:5000/delete_nameless_data', {
        method: "delete",
    });
    // console.log(response);

    let parsedData = await response.json()
    console.log(parsedData);
});



let displayPageButton = document.getElementById('display-page-button');

displayPageButton.addEventListener('click', (event) => {
    let id = event.target.databaseId
    // change HTML files (from index to display_food.html)
    window.location.href = "./display_food"
    // window.location.href = "./display_food?idOfClickedItem=63cd54377099d7e530cbb428"
    // example of dynamic: `./display_food?idOfClickedItem=${id}`
})