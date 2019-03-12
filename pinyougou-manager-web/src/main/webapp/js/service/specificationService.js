//定义服务层
app.service('specificationService',function($http){
	
	//查询所有,并进行分页
	this.findAll=function(page,rows){
		return $http.get('../specification/findAll.do?page='+page+'&rows='+rows);
	}
	//多条件查询并进行分页
	this.search=function(entity){
		return $http.post('../specification/findPage.do',entity);
	}
	//添加规格以及规格选项
	this.add=function(entity){
		return $http.post('../specification/add.do',entity);
	}
	
	//添加规格以及规格选项
	this.update=function(entity){
		return $http.post('../specification/update.do',entity);
	}
	//根据规格id查询规格,以及关联的规格选项
	this.findOne=function(id){
		return $http.get('../specification/findOne.do?id='+id);
	}
	//根据规格选项id删除规格选项
	this.delSpecOption=function(id){
		return $http.get('../specification/deleteSpecOption.do?id='+id);
	}
	
	//根据规格id数组删除规格列表,同时删除规格选项
	this.delSpec=function(ids){
		return $http.get('../specification/deleteSpec.do?ids='+ids);
	}
	//查询规格指定字段
	this.findSpecificationList = function(){
		return $http.get('../specification/selectOptionList.do');
	}
})