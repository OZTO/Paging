// 假设一共10页，且每次只显示5页
window.onload = function() {
	page({
		id: 'paging',
		nowPage: 1,
		allPage: 10,
		callBack: function(now, all) {}
	});
};

function page(opt) {

	if (!opt.id) {
		return false;
	}

	var obj = document.getElementById(opt.id);
	var nowPage = opt.nowPage || 1;
	var allPage = opt.allPage || 5;
	var callBack = opt.callBack || function() {};
	// 如果当前页大于或等于4且总页数大于6，第一页就不能展示，就出现首页按钮
	if (nowPage >= 4 && allPage >= 6) {
		var oA = document.createElement('a');
		oA.href = '#1';
		oA.innerHTML = '首页';
		obj.appendChild(oA);
	}

	// 如果当前页不是第1页，就出现上一页
	if (nowPage >= 2) {
		var oA = document.createElement('a');
		oA.href = '#' + (nowPage - 1);
		oA.innerHTML = '上一页';
		obj.appendChild(oA);
	}

	// 如果只显示第1页到第5页
	if (allPage <= 5) {
		for (var i = 1; i <= allPage; i++) {
			var oA = document.createElement('a');
			oA.href = '#' + i;
			if (nowPage == i) {
				oA.innerHTML = i;
			} else {
				oA.innerHTML = "[" + i + "]";
			}
			obj.appendChild(oA);
		} //for
	} //if

	//显示页大于5
	else {
		for (var i = 1; i <= 5; i++) {
			var oA = document.createElement('a');

			if (nowPage == 1 || nowPage == 2) {
				oA.href = '#' + i;
				if (nowPage == i) {
					oA.innerHTML = i;
				} else {
					oA.innerHTML = '[' + i + ']';
				}
			} else if ((allPage - nowPage) == 0 || (allPage - nowPage) == 1) {
				oA.href = '#' + (allPage - 5 + i);
				if ((allPage - nowPage) == 0 && i == 5) {
					oA.innerHTML = (allPage - 5 + i);
				} else if ((allPage - nowPage) == 1 && i == 4) {
					oA.innerHTML = (allPage - 5 + i);
				} else {
					oA.innerHTML = '[' + (allPage - 5 + i) + ']';
				}
			} else {
				oA.href = '#' + (nowPage - 3 + i);
				if (i == 3) {
					oA.innerHTML = (nowPage - 3 + i);
				} else {
					oA.innerHTML = '[' + (nowPage - 3 + i) + ']';
				}
			}
			obj.appendChild(oA);
		} //for
	} //else

	//如果不是最后1页，就出现下一页
	if ((allPage - nowPage) >= 1) {
		var oA = document.createElement('a');
		oA.href = '#' + (nowPage + 1);
		oA.innerHTML = '下一页';
		obj.appendChild(oA);
	}

	//如果最后一页没显示，就出现尾页按钮
	if ((allPage - nowPage) >= 3 && allPage >= 6) {
		var oA = document.createElement('a');
		oA.href = '#' + allPage;
		oA.innerHTML = '尾页';
		obj.appendChild(oA);
	}
	callBack(nowPage, allPage);

	var aA = obj.getElementsByTagName('a');

	for (var i = 0; i < aA.length; i++) {
		aA[i].onclick = function() {

			var nowPage = parseInt(this.getAttribute('href').substring(1));

			obj.innerHTML = '';

			page({

				id: opt.id,
				nowPage: nowPage,
				allPage: allPage,
				callBack: callBack

			});

			return false;

		};
	}
}