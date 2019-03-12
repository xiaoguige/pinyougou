//定义类型模版service
app.service('typeTemplateService',function($http){
	
	//查询所有类型模版
	this.findAll = function(){
		return $http.get('../typeTemplate/findAll.do');
	}
	
	//条件查询并进行分页
	this.search = function(currentPage,pageSize,searchEntity){
		return $http.post('../typeTemplate/search.do?currentPage='+currentPage+"&pageSize="+pageSize,searchEntity);
	}
	
	//保存实体
	this.save=function(object,entity){
		return $http.post('../typeTemplate/'+object+'.do',entity);
	}
	
	//根据id列表,批量删除实体
	this.del=function(ids){
		return $http.get('../typeTemplate/delete.do?ids='+ids);
	}
	
	//根据id查询实体
	this.findOne=function(id){
		return $http.get('../typeTemplate/findOne.do?id='+id);
	}
	
	//查询类型模板中指定字段
	this.selectTypeTemplateOptionList=function(){
		return $http.get('../typeTemplate/selectTypeTemplateOptionList.do');
	}
});