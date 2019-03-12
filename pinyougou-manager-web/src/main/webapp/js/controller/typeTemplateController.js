//定义控制层
app.controller('typeTemplateController',function($scope,$controller,typeTemplateService,brandService,specificationService){
	
	//继承baseController
	$controller('baseController',{$scope:$scope});
	
	//分页查询模版类型数据列表
	$scope.search = function(currentPage,pageSize){
		
		//判断是否是条件查询
		if(!angular.equals({},$scope.searchEntity)){
			alert("aaaaaaaaa");
			//条件查询
			$scope.conditionEntity = $scope.searchEntity; //将查询条件保存到$scope.conditionEntity中
		}
		//调用服务,进行查询
		typeTemplateService.search(currentPage,pageSize,$scope.conditionEntity).success(function(response){
			//清空搜索实体对象,这样就不会在查询条件输入框中回显查询条件数据
			$scope.searchEntity = {};
			//获取查询结果
			$scope.list = response.rows;
			//判断初始化总记录数和查询结果的总记录数是否一致
			if($scope.paginationConf.totalItems !=response.total){
				//这时会进行二次查询,将查询结果的总记录数赋值给初始化总记录数
				$scope.paginationConf.totalItems = response.total;
			}else{
				//初始化总记录数和查询结果总记录数没有发生改变
				//不会再次查询,就清空保存条件查询的参数实体
				$scope.conditionEntity = {};
			}
		});
	}
	
	
	$scope.entity={customAttributeItems:[]}; //定义一个用于存放类型模版数据的对象
	
	//初始化下拉列表select2的数据来源对象
	$scope.brandList={data:[]};
	//查询品牌指定字段信息作为下拉列表的数据来源
	  $scope.selectOptionList=function(){
		brandService.selectOptionList().success(function(response){
			$scope.brandList = {data:response};
		});
	}
	
	
	//初始化下拉列表select2的规格数据来源
	$scope.specList={data:[]};
	//查询规格信息作为下拉列表的数据来源
	$scope.findSpecificationList=function(){
		specificationService.findSpecificationList().success(function(response){
			$scope.specList = {data:response};
		});
	}
	
	
	//添加扩展属性行
	$scope.addTableRow=function(){
		$scope.entity.customAttributeItems.push({});
	}
	
	//删除扩展属性行
	$scope.delTableRow=function(index){
		$scope.entity.customAttributeItems.splice(index,1);//index表示要删除元素对象在$scope.entity数组对象中的位置,1:表示要删除的个数
	}
	
	//执行保存实体
	$scope.save=function(){
		var object = 'add';
		if($scope.entity.id != null){
			//执行的更新操作
			object = 'update';
		}
		//执行的添加操作
		typeTemplateService.save(object,$scope.entity).success(function(response){
			if(response.success){
				//保存成功,就刷新页面
				$scope.findAll();
			}else{
				alert(response.message);
			}
		});
	}
	
	//批量删除
	$scope.del=function(){
		typeTemplateService.del($scope.selectIds).success(function(response){
			if(response.success){
				//删除成功,清空存放类型模版的id,重新加载页面
				//$scope.selectIds=[];
				$scope.findAll();
			}else{
				alert(response.message);
			}
		});
	}
	
	//根据id查询实体
	$scope.findOne=function(id){
		typeTemplateService.findOne(id).success(function(response){
			$scope.entity.name = response.name; //类型模版名称
			$scope.entity.specIds = JSON.parse(response.specIds); //转换关联的规格列表
			$scope.entity.brandIds = JSON.parse(response.brandIds); //转换关联的规格列表 
			$scope.entity.customAttributeItems = JSON.parse(response.customAttributeItems);//转换扩展属性
		});
	}
	
	//定义一个方法,用来将字符串转成json对象,并根据key获取对应的value
	$scope.stringToJson = function(String,key){
		var json = JSON.parse(String);//将字符串转成json对象
		var value = "";
		
		for(var i =0;i<json.length;i++){
			if(i >0){
				value+=",";
			}
			value+=json[i][key];
		}
		return value;
	}
	
	//初始化select2下拉列表的数据源
	$scope.typeTemplateList = {data:[]};
	
	//查询类型模板中的指定字段
	$scope.selectTypeTemplateOptionList = function(){
		typeTemplateService.selectTypeTemplateOptionList().success(function(response){
			$scope.typeTemplateList={data:response};
		});
	}
	
});