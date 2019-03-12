//定义服务层
app.service('sellerService',function($http){
	
	//多条件查询并进行分页
	this.search=function(entity){
		return $http.post('../seller/search.do',entity);
	}
	
	//根据id查询实体
	this.findOne=function(id){
		return $http.get('../seller/findOne.do?sellerId='+id);
	}
	
	//根据sellerId修改实体状态
	this.update=function(sellerId,status){
		return $http.get('../seller/update.do?sellerId='+sellerId+"&status="+status);
	}
})