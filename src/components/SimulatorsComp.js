import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";

class SimulatorComp extends React.Component {
    render() {
        return (
            <Card className="mt-6 mb-6 w-1/3 ml-5">
                <CardHeader color="white" className="relative h-56">
                    <img
                        src={this.props.image}
                        alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {this.props.header}
                    </Typography>
                    <Typography>
                        {this.props.paragraph}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-2 mb-5">
                    <a href={this.props.linkUrl}className="text-sm text-white p-4 rounded-md shadow-md bg-primary">Start Simulation</a>
                </CardFooter>
            </Card>
        );
    }
}

export default SimulatorComp;