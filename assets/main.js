const localKey = "ccc_haidilao_value";

function setValue(value) {
  let target = {};
  if (value) {
    target = value;
    localStorage.setItem(localKey, JSON.stringify(value));
  } else {
    const localValue = JSON.parse(localStorage.getItem(localKey)) || {
      name: "海底捞(朝阳北路店)",
      number: "285",
      renshu: "2",
      zhuoxing: "小桌",
      shibie: "午市",
      curNumber: "188",
    };
    target = localValue;
  }
  const { name, number, renshu, zhuoxing, shibie, curNumber } = target;
  $("#storeName").text(name);
  $("#queueNum").text(`${number}号`);
  $("#ParticipantNumber").text(`${renshu}人`);
  $("#tableType").text(zhuoxing);
  $("#timeType").text(shibie);
  $("#wait").text(`当前叫号：小桌${curNumber}号`);
}

$(document).ready(function () {
  setValue();

  $("#paihaoxinxi").click(function () {
    $("#myformwrap").show();
  });

  const form = document.getElementById("myForm");

  $("#formClose").click(function () {
    $("#myformwrap").hide();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // 阻止默认的表单提交行为

    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const renshu = document.getElementById("renshu").value;
    const zhuoxing = document.getElementById("zhuoxing").value;
    const shibie = document.getElementById("shibie").value;
    const curNumber = document.getElementById("curNumber").value;

    const value = {
      name,
      number,
      renshu,
      zhuoxing,
      shibie,
      curNumber,
    };
    setValue(value);

    $("#myformwrap").hide();
  });
});
