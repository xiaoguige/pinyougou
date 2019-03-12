//定义控制层
app.controller('brandController',function($scope,$controller,brandService){
	$controller('baseController',{$scope:$scope});//继承 
	//查询所有品牌列表
	$scope.findAll = function(){
		brandService.findAll().success(function(response){
			$scope.list=response;
		})
	}
	
	//分页查询品牌数据列表
	$scope.findPage = function(page,rows){
		brandService.findPage(page,rows).success(function(response){
			//返回的response是一个封装了分页信息的entity
			$scope.list = response.rows; //每页显示的数据内容
			//重置total 总记录数
			$scope.paginationConf.totalItems = response.total;
		});
	}
	
	//保存品牌信息
	$scope.save=function(){
		//进行判断，根据是否有id来执行添加或者修改操作
		//var methodName = 'add';
		var object = null;
		
		if($scope.entity.id != null){
			//说明执行的update操作
			object = brandService.update($scope.entity);//更新品牌信息
		}else{
			object = brandService.add($scope.entity); //添加品牌信息
		}	
		object.success(function(response){
			if(response.success){
				$scope.reloadList(); //重新加载页面
			}else{
				alert(response.message);
			}
		});
	}
	//根据品牌id查询品牌信息
	$scope.findOne=function(id){
		brandService.findOne(id).success(function(response){
			$scope.entity = response;
		})
	}
	
	
	
	//根据品牌id列表批量删除品牌信息
	$scope.del=function(){
		brandService.del($scope.selectIds).success(function(response){
			if(response.success){
				//清空ids数组中的id
				$scope.selectIds = [];
				$scope.reloadList(); //重新加载页面
			}else{
				alert(response.message);
			}
		})
	}
	
	 $scope.searchEntity = {}; //初始化品牌信息对象
	
	//根据条件查询品牌列表，并进行分页
	$scope.search = function(page,rows){
		 $scope.searchEntity.page = page;
		 $scope.searchEntity.rows = rows;
		brandService.search($scope.searchEntity).success(function(response){
			$scope.list = response.rows; //页面实现的数据内容
			$scope.paginationConf.totalItems = response.total; //更新总记录数
		});
	}
	
})