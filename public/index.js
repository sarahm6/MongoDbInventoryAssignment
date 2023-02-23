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
        uploadStatusTag.textContent = "Upload Failed";
        uploadStatusTag.style.color = "red";

    }

})

let displayPageButton = document.getElementById('add-button');

displayPageButton.addEventListener('click', (getData))
