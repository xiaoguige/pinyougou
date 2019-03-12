//定义服务层
app.service('brandService',function($http){
	//this 表示当前这个服务service对象
	
	//查询所有品牌列表
	this.findAll=function(){
		return $http.get('../brand/findAll.do');
	}
	//分页查询
	this.findPage = function(page,rows){
		return $http.get('../brand/findPage.do?page='+page+'&rows='+rows);
	}
	//添加品牌信息
	this.add=function(entity){
		return $http.post('../brand/add.do',entity);
	}
	//更新品牌信息
	this.update=function(entity){
		return $http.post('../brand/update.do',entity);
	}
	//根据id查询品牌信息
	this.findOne = function(id){
		return $http.get('../brand/findOne.do?id='+id);
	}
	//根据选中的id列表批量删除品牌信息
	this.del=function(ids){
		return $http.get('../brand/delete.do?ids='+ids);
	}
	//多条件查询品牌信息,并进行分页
	this.search = function(searchEntity){
		return $http.post('../brand/search.do',searchEntity);
	}
	
	//查询品牌指定字段
	this.selectOptionList = function(){
		return $http.get('../brand/selectOptionList.do');
	}
})