
import { useCallback , useMemo, useState, useRef, useEffect } from "react"
import { Marker, Popup } from "react-leaflet"
import { Card, Button, Space } from "antd"

const center = {
    lat:  19.3862, 
    lng: -99.1061,
  }
  
  export const DraggableMarker = () => {

    const markerRef = useRef(null)

    const [isLoading, setIsLoading] = useState(true);
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const [items, setItems] = useState([]);


   
    ////////Dragrabble
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

/////////// fetch api

     useEffect(() => {
    // POST request using fetch inside useEffect React hook
    if (isLoading){
    fetch(`https://api.aerisapi.com/airquality/${position.lat},${position.lng}?client_id=LU5mu62XKxCHteLp3eUIY&client_secret=63JNZeitJ2hyVwlkqV0sne792XomJiSZJKeMtlNC`)
        .then(response => response.json())
        .then((resultado) => {
            setItems(resultado.response[0].periods[0]);
            setIsLoading(false);     
          });      
       
// empty dependency array means this effect will only run once (like componentDidMount in classes)
 }}, [isLoading]); 
///////

    const change = () => {
        setIsLoading(true);
    }

    if(isLoading){
        return (
            <div>
                <h1>Cargando...</h1>
            </div>
        )
    }

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup>
        <Card type="inner" title="Contaminante dominante" style={{ marginTop: 16 } }>
        <b>{`${items.dominant}`}</b>
      </Card>
      <Card type="inner" title="Calidad del aire" style={{ marginTop: 16 }}>
        <b>{`${items.aqi}`}</b>
      </Card>
      <Card type="inner" title="Recomendacion" style={{ marginTop: 16 , background: "#00E400"} }>
        <b>{`${items.category}`}</b>
      </Card>
        <Card type="inner" title="Selecciona la distancia" style={{ marginTop: 16 }}>
          <Space>
            {/* <InputNumber
              defaultValue={Default_radius}
              min={0}
              onChange={(e) => setRadius(e)}>
            </InputNumber> */}
          <Button
            type="primary"
            shape="round"
            onClick={toggleDraggable} >
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </Button>
        </Space>
      </Card>
      <Card type="inner" title="Selecciona la Actualizar" style={{ marginTop: 16 }}>
          <Space>
          <Button
            type="primary"
            shape="round"
            onClick={change}>
            ¡Actualizar!{" "}
            <span role="img" aria-label="corazón">
             ❤️
            </span>
          </Button>
        </Space>
      </Card>
      </Popup>
      </Marker>
    )
  }
  
