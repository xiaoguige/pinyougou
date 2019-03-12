//定义商家控制层
app.controller('sellerController',function($scope,sellerService,$controller){
	
	//继承baseController
	$controller('baseController',{$scope:$scope});
	
	
	//定义搜索对象
	$scope.searchEntity = {};
	
	//根据条件查询商家列表并分页
	$scope.search=function(page,rows){
		$scope.searchEntity.page=page;
		$scope.searchEntity.rows=rows;
		sellerService.search($scope.searchEntity).success(function(response){
//			$scope.paginationConf.totalItems = response.total; //重置总记录数
			$scope.list = response.rows; //每页显示的数据内容
		});
	}
	
	//根据id查询实体
	$scope.findOne=function(id){
		sellerService.findOne(id).success(function(response){
			$scope.entity = response;
		});
	}
	//根据sellerId修改状态
	$scope.update=function(sellerId,status){
		sellerService.update(sellerId,status).success(function(response){
			if(response.success){
				//修改成功,修改$scope.searchEntity = {};中的status为0
				$scope.reloadList();
			}else{
				alert(response.message);
			}
		})
	}
});