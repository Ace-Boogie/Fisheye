import "./loading.css";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="loading-wrapper">
            <div className="loading-wrapper-content"></div>

            <div className="loading-wrapper-logo">
                <Image
                    src="/logo.png"
                    alt="FishEye logo"
                    width={120}
                    height={40}
                    priority
                />
            </div>
        </div>
    );
}