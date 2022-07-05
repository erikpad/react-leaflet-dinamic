export const getColor = (d) => {
    return d > 300
      ? "#800026"
      : d > 200
      ? "#800080"
      : d > 150
      ? "#FF0000"
      : d > 100
      ? "#FD8D3C"
      : d > 50
      ? "#FFFF00"
      : d > 0
      ? "#00E400"
      : "#FFEDA0";
  };
  
  export const style = (feature) => {
    return {
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      fillColor: getColor(feature && feature.properties.Calidad)
    };
  };

  export const styleCycle = (feature) => {
    return {
      weight: 4,
      opacity: 1,
      color: "red",
      dashArray: "3",
      fillOpacity: 0.7,
      fillColor: getColor(feature && feature.properties.Calidad)
    };
  };
  