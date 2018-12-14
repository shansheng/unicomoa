(function($){
	$.formatDate = function(pattern,date){
		//��������ã�Ĭ��Ϊ��ǰʱ��
		if(!date) date = new Date();
		if(typeof(date) ==="string"){
			 if(date=="")  date = new Date();
			  else  date = new Date(date.replace(/-/g,"/"));
		}	
		/*��00*/
		var toFixedWidth = function(value){
			 var result = 100+value;
			 return result.toString().substring(1);
		};
		
		/*����*/
		var options = {
				regeExp:/(yyyy|M+|d+|h+|m+|s+|ee+|ws?|p)/g,
				months: ['January','February','March','April','May',
				         'June','July', 'August','September',
						  'October','November','December'],
				weeks: ['Sunday','Monday','Tuesday',
				        'Wednesday','Thursday','Friday',
							'Saturday']
		};
		
		/*ʱ���л�*/
		var swithHours = function(hours){
			return hours<12?"AM":"PM";
		};
		
		/*����ֵ*/
		var pattrnValue = {
				"yyyy":date.getFullYear(),                      //���
				"MM":toFixedWidth(date.getMonth()+1),           //�·�
				"dd":toFixedWidth(date.getDate()),              //����
				"hh":toFixedWidth(date.getHours()),             //Сʱ
				"mm":toFixedWidth(date.getMinutes()),           //����
				"ss":toFixedWidth(date.getSeconds()),           //��
				"ee":options.months[date.getMonth()],           //�·�����
				"ws":options.weeks[date.getDay()],              //��������
				"M":date.getMonth()+1,
		        "d":date.getDate(),
		        "h":date.getHours(),
		        "m":date.getMinutes(),
		        "s":date.getSeconds(),
		        "p":swithHours(date.getHours())
		};
		
		return pattern.replace(options.regeExp,function(){
			   return  pattrnValue[arguments[0]];
		});
	};
	
})(jQuery);