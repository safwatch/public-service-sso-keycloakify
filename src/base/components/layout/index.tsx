import { ReactNode } from "react";
import Illustration1 from "../../../assets/images/illustration-1.png";
import Illustration2 from "../../../assets/images/illustration-2.png";
import { Carousel } from "antd";

interface Props {
    children?: ReactNode;
}

export function Layout(props: Props): JSX.Element {
    const children = props.children;

    const illustrations = [
        {
            title: "Mewujudkan ekosistem data yang inklusif demi pembangunan kota yang berkelanjutan dan partisipatif",
            img: Illustration1
        },
        {
            title: "Mendukung tata kelola pemerintahan yang tertib melalui sistem informasi yang terintegrasi dan terdokumentasi",
            img: Illustration2
        }
    ];

    return (
        <>
            <div className="carousel-wrapper">
                <Carousel autoplay={{ dotDuration: true }}>
                    {illustrations.map((item, index) => {
                        return (
                            <div key={index} className="carousel-item">
                                <img
                                    src={item.img}
                                    alt="Civic Portal Illustration"
                                    className="img-illustration"
                                />
                                <div className="title-wrapper">
                                    <h1>{item.title}</h1>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
            {children && <div className="child-content-wrapper">{children}</div>}
        </>
    );
}
