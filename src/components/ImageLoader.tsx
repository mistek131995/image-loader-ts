import React, {useEffect, useRef, useState} from "react";
import {IImageLoader} from "./IImageLoader";

export const ImageLoader = (props: IImageLoader) => {
    const divRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [crop, setCrop] = useState<Crop>({
        firstPoint: {
            x: 0,
            y: 0
        },
        secondPoint: {
            x: 0,
            y: 0
        }
    })

    useEffect(() => {
        const width = divRef.current?.offsetWidth || 300;
        const height = divRef.current?.offsetHeight || 150;

        canvasRef.current!.width = width;
        canvasRef.current!.height = height;

        canvasRef.current!.addEventListener("mousedown", (event: MouseEvent) => {
            setCrop({...crop, firstPoint: {x: event.x, y: event.y}})

            console.log("down")

            canvasRef.current!.addEventListener("mouseup", (event: MouseEvent) => {
                setCrop({...crop, secondPoint: {x: event.x, y: event.y}})

                console.log("up")
            })
        })

        console.log("render")

    }, [divRef, canvasRef])

    useEffect(() => {

        if(props.imageFile) {
            const ctx = canvasRef.current?.getContext("2d");
            const blobUrl = URL.createObjectURL(props.imageFile);

            const image = new Image();
            image.src = blobUrl;

            image.onload = () => {

                let koef : number = canvasRef.current!.width / image.width;
                let width : number = canvasRef.current!.width;
                let height : number = image.height * koef;

                canvasRef.current!.height = height;

                ctx?.drawImage(image, 0, 0, width, height);
            }
        }

    },[props.imageFile])

    // useEffect(() => {
    //     console.log(crop)
    // },  [crop])

    return <div ref={divRef} style={{width: "100%", height: "100%"}}>
        <canvas ref={canvasRef}>
            {props.canvasNotSupportMessage}
        </canvas>
    </div>
}

type Crop = {
    firstPoint: Position,
    secondPoint: Position
}

type Position = {
    x: number,
    y: number
}