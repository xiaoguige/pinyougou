//定义服务层
app.service('itemCatService',function($http){

	//根据上级id查询当前分类列表
	this.findByParentId = function(parentId){
		return $http.get('../itemCat/findByParentId.do?id='+parentId);
	}
	
	//新增实体
	this.add =function(entity){
		return $http.post('../itemCat/add.do',entity);
	}
	
	//更新实体
	this.update =function(entity){
		return $http.post('../itemCat/update.do',entity);
	}
});