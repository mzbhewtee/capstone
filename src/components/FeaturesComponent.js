import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

class FeaturesComponent extends React.Component {
    render() {
        return (
            <>
                <Card className="mt-6 w-80 font-link">
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img className="rounded-md shadow-xl border h-60 w-full" src={this.props.image} alt={this.props.alt} />

                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">{this.props.header}</Typography>
                        <Typography>{this.props.paragraph}</Typography>
                    </CardBody>

                </Card >
            </>

        );
    }
}

export default FeaturesComponent;




