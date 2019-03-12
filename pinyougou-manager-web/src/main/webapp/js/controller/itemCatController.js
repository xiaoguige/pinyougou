//定义商家控制层
app.controller('itemCatController',function($scope,itemCatService,$controller){
	
	//继承typeTemplateController
	$controller('typeTemplateController',{$scope:$scope});
	
	//定义一个变量来记录上级id
	$scope.parentId = 0;
	
	//根据上级id查询当前分类
	$scope.findByParentId = function(parentId){
		$scope.parentId = parentId;
		itemCatService.findByParentId(parentId).success(function(response){
			$scope.list = response;
		});
	}
	
	$scope.entity_1 = null; //表示一级分类的实体
	$scope.entity_2 = null;//二级分类的实体
	
	
	//初始化级别为1级
	$scope.grade = 1;
	
	//定义设置级别的方法
	$scope.setGrade = function(value){
		$scope.grade = value;
	}
	
	
	//查询当前级别下的分类列表
	$scope.selectList = function(p_entity){  
		//点击面包屑之后的级别
		if($scope.grade ==1){
			//说明当前分类是1级分类
			$scope.entity_1 = null;
			$scope.entity_2 = null;
		}
		
		if($scope.grade ==2){
			//说明当前分类是2级分类
			$scope.entity_1 = p_entity;
			$scope.entity_2 = null;
		}
		
		if($scope.grade ==3){
			//说明当前分类是3级分类
			$scope.entity_2 = p_entity;
		}
		//查询当前对象下对应的分类(根据上级id查询当前分类)
		$scope.findByParentId(p_entity.id);
	}
	
	//保存商品分类
	$scope.save =function(){
		var object = null;
		if($scope.entity.id != null){
			//执行的是更新操作
			object = itemCatService.update($scope.entity);
		}else{
			$scope.entity.parentId = $scope.parentId;//设置上级id
			object = itemCatService.add($scope.entity);
		}
		object.success(function(response){
			if(response.success){
				//更新成功,重新加载页面
				$scope.findByParentId($scope.parentId);
			}
		});
	}
	
	
	//定义一个数组,用来存放删除商品id的数组
	
	$scope.selectIds = [];
	
	//定义一个更新选中/取消选中复选框的方法
	$scope.updateSelection = function($event,id){
		if($event.target.checked){
			//当前元素对象被选中
			$scope.selectIds.push(id);
		}else{
			//表示取消选中
			var index = $scope.selectIds.indexOf(id); //获取要取消选中id在数组中的索引位置
			//在数组中移除该元素
			$scope.selectIds.splice(index,1); //index:表示要删除元素在数组中的位置,1:表示要删除的个数
		}
	}
	
	//根据id查询实体
	$scope.findOne=function(id){
	}
	
});