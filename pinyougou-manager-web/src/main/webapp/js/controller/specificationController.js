app.controller('specificationController',function($scope,specificationService,$controller){
	
	//继承基本baseController_specification 控制器
	$controller('baseController_specification',{$scope:$scope});

	//查询所有并进行分页
	$scope.findAll = function(page,rows){
		specificationService.findAll(page,rows).success(function(response){
				$scope.list = response.rows; //每页显示的数据内容
				$scope.paginationConf.totalItems = response.total; //更新总的记录数
		});
	}
	

	$scope.searchEntity = {}; //定义搜索对象
	//多条件查询并进行分页
	$scope.search = function(page,rows){
		$scope.searchEntity.page=page;
		$scope.searchEntity.rows=rows;
			specificationService.search($scope.searchEntity).success(function(response){
				$scope.list = response.rows; //每页显示的数据内容
				$scope.paginationConf.totalItems = response.total; //更新总的记录数
		});
	}
	
	//保存规格以及规格选项
	$scope.save = function(){
		var methodName;//默认是添加操作
		if($scope.entity.specification.id !=null){
			//执行的是更新操作
			object = specificationService.update($scope.entity);
		}else{
			//执行的是添加操作
			object = specificationService.add($scope.entity);
		}	
		object.success(function(response){
			if(response.success){
				//清空存放规格,规格选项的对象
//				$scope.entity = {};
				//重新加载页面
				$scope.reloadList();
			}else{
				alert(response.message);
			}
		});
	}
	//根据规格id查询规格,以及关联的规格选项
	$scope.findOne =function(id){
		specificationService.findOne(id).success(function(response){
			$scope.entity = response;
		});
	}
	
	//根据规格选项id删除规格选项
	$scope.delSpecOption=function(id){
		specificationService.delSpecOption(id).success(function(response){
			if(response.success){
				//清空存放规格,规格选项的对象
				$scope.entity = {};
			}else{
				alert(response.message);
			}
		});
	}
	
	//根据规格id数组删除规格列表,同时删除规格选项
	$scope.delSpec = function(){
		specificationService.delSpec($scope.selectIds).success(function(response){
			if(response.success){
				//删除成功,清空规格id数组,重新加载
				$scope.selectIds = [];
				$scope.reloadList();
			}else{
				//提交错误信息
				alert(respnse.message);
			}
		});
	}
	
});