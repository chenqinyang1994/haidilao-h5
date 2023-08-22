$("#paihaoxinxi").click(function () {
  $("#myformwrap").show();
});

const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // 阻止默认的表单提交行为

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;

  $("#storeName").text(name);
  $("#queueNum").text(`${email}号`);
  $("#wait").text(`当前叫号：小桌${age}号`);
  $("#myformwrap").hide();
});
