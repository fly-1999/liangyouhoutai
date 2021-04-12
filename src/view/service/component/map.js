import echarts from "echarts";
import chinaJson from "echarts/map/json/china.json"
var mergeProvinces = function(chinaJson, names, properties) {//合并大区里省份的coordinates
  var features = chinaJson.features;
  var polygons = [];
  var polygons2 = [];
   
  for(var i = 0; i < names.length; i++) {
      var polygonsCoordinates = [];
      var polygonsEncodeOffsets = [];
      for(var z = 0; z < names[i].length;z++){
          for(var j = 0; j < features.length; j++) {
              if(features[j].properties.name == names[i][z]) {
                  if(features[j].geometry.coordinates[0].constructor == String){//合并coordinates
                      for(var l = 0; l<features[j].geometry.coordinates.length;l++){
                          polygonsCoordinates.push(features[j].geometry.coordinates[l]);
                      }
                       
                  }else if(features[j].geometry.coordinates[0].constructor == Array){
                      for(var k=0;k<features[j].geometry.coordinates.length;k++){
                          for(var d=0;d<features[j].geometry.coordinates[k].length;d++){
                              polygonsCoordinates.push(features[j].geometry.coordinates[k][d]);
                          }
                      }
                  }
                   
                   
                   
                  if(features[j].geometry.encodeOffsets[0].constructor == String){//合并encodeOffsets
                      polygonsEncodeOffsets.push(features[j].geometry.encodeOffsets);
                  }else if(features[j].geometry.encodeOffsets[0].constructor == Array){
                      for(var k=0;k<features[j].geometry.encodeOffsets.length;k++){
                          if(features[j].geometry.encodeOffsets[k][0].constructor == Array){
                              for(var e=0;e<features[j].geometry.encodeOffsets[k].length;e++){
                                  polygonsEncodeOffsets.push(features[j].geometry.encodeOffsets[k][e]);
                              }
                          }else{
                              polygonsEncodeOffsets.push(features[j].geometry.encodeOffsets[k]);
                          }
                      }
                  }
                   
                  break;
              }
          }
      }
      polygons.push(polygonsCoordinates);
      polygons2.push(polygonsEncodeOffsets);
       
  }
   
  // 构建新的合并区域
  var features = [];
   
  for(var a = 0;a<names.length;a++){
      var feature = {
          id: features.length.toString(),
          type: "FeatureCollection",
          geometry: {
              type: "Polygon",
              coordinates: polygons[a],
              encodeOffsets: polygons2[a]
          },
          properties: {
              name: properties.name[a] || "",
              childNum:polygons[a].length
          }
      };
      if(properties.cp[a]) {
          feature.properties.cp = properties.cp[a];
      }
       
      // 将新的合并区域添加到地图中
      features.push(feature);
  }
  chinaJson.features = features;
   
};
(function() {
    var params = {
      names: [//把各个大区的省份用二维数组分开
          ["河南"],
          ["湖南"],
          ["湖北"],
          ["广东"],
          ["广西"],
          ["海南"],
          ["香港"],
          ["澳门"]
      ],
      properties: {//自定义大区的名字，要和上面的大区省份一一对应
          name: ["河南","湖南","湖北","广东","广西","海南","香港","澳门"],
          cp: [//经纬度可以自己随意定义
              [112.42,34.16],
              [112,28],
              [113.41,29.98],
              [112.57,22.26],
              [108.26,22.45],
              [110.11,19.52],
              [113.16, 22.7],
              [114.55, 22.85]
          ]
      }
    };
    mergeProvinces(chinaJson, params.names, params.properties);     
    echarts.registerMap('china', chinaJson); // 注册地图
})()