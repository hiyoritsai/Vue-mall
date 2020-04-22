import jsonp from 'jsonp'

const parseParam = (param)=>{
	/*将对象转化成key=value字符串*/
	let params=[];
	for(const key in param){
		params.push([key,param[key]]);	//这里params变成二维数组[[key1,val1],[key2,val2],...]
	}
	return params.map(value => value.join('=')).join('&');	
	//用map()方法遍历到每个[keyn,valn]，并用=号连接，得到[key1=val1,key2=val2,...]
	//再用&连接，得到key1=val1&key2=val2&...
}

export default (url,data,options) =>{
	url+=(url.indexOf('?')<0?'?':'&')+parseParam(data);	/*判断是否有?，还需要将data转义一下*/
	return new Promise((resolve,reject)=>{
		jsonp(url,options,(err,data)=>{
			if(err){
				reject(err);	/*如果有错误就reject并且把错误带出去*/
			}else{
				resolve(data);	/*如果成功就resolve并且把data带出去*/
			}
		});
	});
};