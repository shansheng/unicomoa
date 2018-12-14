var FormValid = function(frm) {
    this.frm = frm;
    this.errMsg = new Array();
	this.errName = new Array();
   
    this.required = function(inputObj) {
        if (typeof(inputObj) == "undefined" || inputObj.value.trim() == "") {
            return false;
        }
		return true;
    }
    
    this.eqaul = function(inputObj, formElements) {
		var fstObj = inputObj;
		var sndObj = formElements[inputObj.getAttribute('eqaulName')];
		
        if (fstObj != null && sndObj != null) {
            if (fstObj.value != sndObj.value) {
               return false;
            }
        }
		return true;
    }

    this.gt = function(inputObj, formElements) {
		var fstObj = inputObj;
		var sndObj = formElements[inputObj.getAttribute('eqaulName')];
		
        if (fstObj != null && sndObj != null && fstObj.value.trim()!='' && sndObj.value.trim()!='') {
            if (fstObj.value <= sndObj.value) {
                 return false;
            }
        }
		return true;
    }
    //objectName �ж�����������ֵ�Ƿ���ͬ
	this.compare = function(inputObj, formElements) {
		var fstObj = inputObj;
		var sndObj = formElements[inputObj.getAttribute('objectName')];
        if (fstObj != null && sndObj != null && fstObj.value.trim()!='' && sndObj.value.trim()!='') {
            if (!eval('fstObj.value' + inputObj.getAttribute('operate') + 'sndObj.value')) {
                 return false;
            }
        }
		return true;
	}
	//�ж��ı��ĳ��ȷ�Χ
	this.limit = function (inputObj) {
		var len = inputObj.value.length;
		if (len) {
			var minv = inputObj.getAttribute('min');
			var maxv = inputObj.getAttribute('max');
			minv = minv || 0;
			maxv = maxv || Number.MAX_VALUE;
			return minv <= len && len <= maxv;
		}
		return true;
	}

	
	//intֵ��Χ
	this.range = function (inputObj) {
		var val = parseInt(inputObj.value);
		if (inputObj.value) {
			var minv = inputObj.getAttribute('min');
			var maxv = inputObj.getAttribute('max');
			minv = minv || 0;
			maxv = maxv || Number.MAX_VALUE;
		
			return minv <= val && val <= maxv;
		}
		return true;
	}
	
	this.requireChecked = function (inputObj) {
		var minv = inputObj.getAttribute('min');
		var maxv = inputObj.getAttribute('max');
		minv = minv || 1;
		maxv = maxv || Number.MAX_VALUE;
	
		var checked = 0;
		var groups = document.getElementsByName(inputObj.name);
		
		for(var i=0;i<groups.length;i++) {
			if(groups[i].checked) checked++;
			
		}
		return minv <= checked && checked <= maxv;
	}
	
	//�Զ��������
	this.filter = function (inputObj) {
		var value = inputObj.value;
		var allow = inputObj.getAttribute('allow');
		if (value.trim()) {
			return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, allow.split(/\s*,\s*/).join("|")), "gi").test(value);
		}
		return true;
	}
	
	//�����������
	this.isNo = function (inputObj) {
		var value = inputObj.value;
		var noValue = inputObj.getAttribute('noValue');
		return value!=noValue;
	}
    this.checkReg = function(inputObj, reg, msg) {
        inputObj.value = inputObj.value.trim();

        if (inputObj.value == '') {
            return;
        } else {
            if (!reg.test(inputObj.value)) {
				this.addErrorMsg(inputObj.name,msg);
			}
        }
    }

    this.passed = function() {
        if (this.errMsg.length > 0) {
            FormValid.showError(this.errMsg,this.errName);
            frt = document.getElementsByName(this.errName[0])[0];
			
			if (frt.type!='radio' && frt.type!='checkbox') {
				frt.focus();
			}
            return false;
        } else {
          return true;
        }
    }

    this.addErrorMsg = function(name,str) {
        this.errMsg.push(str);
		this.errName.push(name);
    }
	
    this.addAllName = function(name) {
		FormValid.allName.push(name);
    }
	
}
FormValid.allName = new Array();
FormValid.showError = function(errMsg) {
	var msg = "";
	for (i = 0; i < errMsg.length; i++) {
		msg += "- " + errMsg[i] + "\n";
	}

	alert(msg);
}
function validator(frm) {
	var formElements = frm.elements;
	var fv = new FormValid(frm);
	
	for (var i=0; i<formElements.length;i++) {
		var validType = formElements[i].getAttribute('valid');
		var errorMsg = formElements[i].getAttribute('errmsg');
		if (validType==null) continue;
		fv.addAllName(formElements[i].name);

		var vts = validType.split('|');
		var ems = errorMsg.split('|');
		for (var j=0; j<vts.length; j++) {
			var curValidType = vts[j];
			var curErrorMsg = ems[j];
			
			switch (curValidType) {
			case 'isNumber':
			case 'isEmail':
			case 'isPhone':
			case 'isMobile':
			case 'isIdCard':
			case 'isMoney':
			case 'isZip':
			case 'isQQ':
			case 'isInt':
			case 'isEnglish':
			case 'isChinese':
			case 'isUrl':
			case 'isDate':
			case 'isTime':
				fv.checkReg(formElements[i],RegExps[curValidType],curErrorMsg);
				break;
			case 'regexp':
				fv.checkReg(formElements[i],new RegExp(formElements[i].getAttribute('regexp'),"g"),curErrorMsg);
				break;
			case 'custom':
				if (!eval(formElements[i].getAttribute('custom')+'(formElements[i],formElements)')) {
					fv.addErrorMsg(formElements[i].name,curErrorMsg);
				}
				break;
			default :
				if (!eval('fv.'+curValidType+'(formElements[i],formElements)')) {
					fv.addErrorMsg(formElements[i].name,curErrorMsg);
				}
				break;
			}
		}
	}
	return fv.passed();
}
String.prototype.trim = function() {
	return this.replace(/^\s*|\s*$/g, "");
}
var RegExps = function(){};
RegExps.isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
RegExps.isPhone = /(^(\d{2,4}[-_����]?)?\d{3,8}([-_����]?\d{3,8})?([-_����]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
RegExps.isMobile = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/;


RegExps.isNumber = /^[-\+]?\d+(\.\d+)?$/;
RegExps.isIdCard = /(^\d{15}$)|(^\d{17}[0-9Xx]$)/;
RegExps.isMoney = /^\d+(\.\d+)?$/;
RegExps.isZip = /^[1-9]\d{5}$/;
RegExps.isQQ = /^[1-9]\d{4,10}$/;
RegExps.isInt = /^[-\+]?\d+$/;
RegExps.isEnglish = /^[A-Za-z]+$/;
RegExps.isChinese =  /^[\u0391-\uFFE5]+$/;
RegExps.isUrl = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
RegExps.isDate = /^\d{4}-\d{1,2}-\d{1,2}$/;
RegExps.isTime = /^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}$/;


function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function prepareInputsForHints() {
	var inputs = document.getElementsByTagName("input");
	for (var i=0; i<inputs.length; i++){
		if (inputs[i].parentNode.getElementsByTagName("span")[0]) {
			inputs[i].onfocus = function () {
				this.parentNode.getElementsByTagName("span")[0].style.display = "inline";
			}
			inputs[i].onblur = function () {
				this.parentNode.getElementsByTagName("span")[0].style.display = "none";
			}
		}
	}
	var selects = document.getElementsByTagName("select");
	for (var k=0; k<selects.length; k++){
		if (selects[k].parentNode.getElementsByTagName("span")[0]) {
			selects[k].onfocus = function () {
				this.parentNode.getElementsByTagName("span")[0].style.display = "inline";
			}
			selects[k].onblur = function () {
				this.parentNode.getElementsByTagName("span")[0].style.display = "none";
			}
		}
	}
}
addLoadEvent(prepareInputsForHints);

FormValid.showError = function(errMsg,errName) {
	for (key in FormValid.allName) {
	 
		document.getElementById('errMsg_'+FormValid.allName[key]).innerHTML = '';
	}
	for (key in errMsg) {
		 
		document.getElementById('errMsg_'+errName[key]).innerHTML = errMsg[key];
	}
	alert(errMsg[0]);
}