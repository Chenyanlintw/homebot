api.fetch({
    path: "/enviroment/get_all",
    success: (result) => {
        updateEnviromentDatas(result);
    },
    error: (err) => {
        console.log(err);
    }
});



var envirList = document.getElementById("envir-data-list");
function updateEnviromentDatas(datas) {
	for (var i = datas.length - 1; i >= 0; i--) {
		var d = datas[i];

		var row = document.createElement('tr');

		var date = new Date(d.time);

		var cell_time = document.createElement('td');
		cell_time.className = "time";
		cell_time.innerHTML = zeroFill((date.getMonth()+1),2)+"/"+zeroFill(date.getDate(),2)+" "+zeroFill(date.getHours(),2)+":"+zeroFill(date.getMinutes(),2);
		row.appendChild(cell_time);

		var temp = Math.round10(d.temperature, -1);
		var cell_temp = document.createElement('td');
		cell_temp.className = "temp";
		cell_temp.innerHTML = temp.toString().indexOf(".") == -1 ? temp.toString()+".0" : temp;
		row.appendChild(cell_temp);

		var humidity = Math.round10(d.humidity, -1)
		var cell_humidity = document.createElement('td');
		cell_humidity.className = "humidity";
		cell_humidity.innerHTML =  humidity.toString().indexOf(".") == -1 ? humidity.toString()+".0" : humidity;
		row.appendChild(cell_humidity);

		envirList.appendChild(row);
	}
}


function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

// 閉包含數
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();