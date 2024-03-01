import React from "react";

class FeaturesComponent extends React.Component {
    render() {
        return (
            <div className="rounded-lg shadow-xl border bg-white overflow-hidden w-96 md:w-full lg:w-auto mt-7">
                <div className="mx-auto mt-5 mb-3 px-10">
                    <img className="rounded-md shadow-xl border h-60 w-full" src={this.props.image} alt={this.props.alt} />
                </div>
                <div className="px-10 py-4 mb-10">
                    <h2 className="text-lg text-start font-link font-bold mb-2">{this.props.header}</h2>
                    <p className='text-justify font-link text-md'>{this.props.paragraph}</p>
                </div>
            </div>
        );
    }
}

export default FeaturesComponent;
