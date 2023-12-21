const res = document.getElementById("result");
const dBtn = document.getElementById("detect-btn");
res.style.display = "none";

const predict = () => {
  const img = document.getElementById("file-input").files[0];
  if (!img) return alert("No image");
  dBtn.disabled = true;
  const formData = new FormData();
  formData.append("img", img);
  fetch("http://localhost:5000/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      res.style.display = "block";
      const predDiv = document.getElementById("prediction");
      predDiv.innerText = result.prediction;
      const resImg = document.getElementById("mask-img");
      if (result.prediction == "real") {
        const reader = new FileReader();
        reader.onload = function (event) {
          resImg.src = event.target.result;
        };
        reader.readAsDataURL(img);
      } else {
        resImg.src = "data:image/jpeg;base64," + result.mask;
      }
      dBtn.disabled = false;
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

document.getElementById("form-input").addEventListener("submit", (e) => {
  e.preventDefault();
  predict();
});
