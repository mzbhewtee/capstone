import React from "react";
import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { FaArrowRight } from "react-icons/fa";

class News extends React.Component {
    render() {
        return (
            <Card className="mt-6 mb-6 w-full border">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {this.props.header}
                    </Typography>
                    <div className="h-0.5 w-full bg-primary/30 mb-2"></div>
                    <Typography>
                        {this.props.paragraph}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-2 mb-5 flex justify-end">
                    <a href={this.props.linkUrl} className="text-sm text-primary flex items-center gap-3 hover:text-md">Read More <FaArrowRight/></a>
                </CardFooter>
            </Card>
        );
    }
}

export default News;
