import React, {useEffect, useRef} from "react";
import {IImageLoader} from "./IImageLoader";

export const ImageLoader = (props: IImageLoader) => {
    const divRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const width = divRef.current?.offsetWidth || 300;
        const height = divRef.current?.offsetHeight || 150;

        canvasRef.current!.width = width;
        canvasRef.current!.height = height;

    }, [divRef, canvasRef])

    useEffect(() => {

        if(props.imageFile) {
            const ctx = canvasRef.current?.getContext("2d");
            const blobUrl = URL.createObjectURL(props.imageFile);

            const image = new Image();
            image.src = blobUrl;

            image.onload = () => {

                let koef : number;
                let width : number = image.width;
                let height : number = image.height;

                if(image.height > image.width)
                {
                    koef = canvasRef.current!.height / image.height;
                    width *= koef;
                    height = canvasRef.current!.height;
                }
                else
                {
                    koef = canvasRef.current!.width / image.width;
                    height *= koef;
                    width = canvasRef.current!.width;
                }

                canvasRef.current!.width = width;
                canvasRef.current!.height = height;

                ctx?.drawImage(image, 0, 0, width, height);
            }
        }

    },[props.imageFile])


    return <div ref={divRef} style={{width: "100%", height: "100%"}}>
        <canvas ref={canvasRef}>
            {props.canvasNotSupportMessage}
        </canvas>
    </div>
}