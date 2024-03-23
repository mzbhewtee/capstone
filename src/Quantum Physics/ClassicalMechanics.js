import React from 'react';
import image1 from '../assets/images/cm.jpg'
import Quiz from '../components/Quiz';

const ClassicalMechanics = () => {
    const questions = [
        {
          text: 'What is the first law of motion according to Newton?',
          options: [
            'An object at rest will remain at rest, and an object in motion will remain in motion at a constant velocity unless acted upon by an external force.',
            'The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.',
            'For every action, there is an equal and opposite reaction.',
            'The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another.'
          ],
          correctAnswer: 'An object at rest will remain at rest, and an object in motion will remain in motion at a constant velocity unless acted upon by an external force.'
        },
        {
          text: 'What does Newton’s second law of motion state?',
          options: [
            'An object at rest will remain at rest, and an object in motion will remain in motion at a constant velocity unless acted upon by an external force.',
            'The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.',
            'For every action, there is an equal and opposite reaction.',
            'The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another.'
          ],
          correctAnswer: 'The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.'
        },
        {
          text: 'What is the third law of motion?',
          options: [
            'An object at rest will remain at rest, and an object in motion will remain in motion at a constant velocity unless acted upon by an external force.',
            'The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.',
            'For every action, there is an equal and opposite reaction.',
            'The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another.'
          ],
          correctAnswer: 'For every action, there is an equal and opposite reaction.'
        },
        {
          text: 'What does the principle of conservation of energy state?',
          options: [
            'An object at rest will remain at rest, and an object in motion will remain in motion at a constant velocity unless acted upon by an external force.',
            'The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.',
            'For every action, there is an equal and opposite reaction.',
            'Energy cannot be created or destroyed, only transformed from one form to another.'
          ],
          correctAnswer: 'Energy cannot be created or destroyed, only transformed from one form to another.'
        },
        {
          text: 'What is the principle of conservation of momentum?',
          options: [
            'The total momentum of an isolated system remains constant over time.',
            'The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.',
            'For every action, there is an equal and opposite reaction.',
            'Energy cannot be created or destroyed, only transformed from one form to another.'
          ],
          correctAnswer: 'The total momentum of an isolated system remains constant over time.'
        }
    ];
    
    return (
        <div id='Classical Mechanics'>
            <h2 className="font-bold text-center text-3xl">Classical Mechanics</h2>
            <p className='mt-2 text-lg text-justify'>
                Classical mechanics serves as the foundation for understanding motion, forces, and energy at macroscopic scales.
                It provides the necessary background for contrasting classical and quantum phenomena. It is a fascinating field that describes the motion of objects, forces acting upon them, and the energy associated with their movement.
            </p>
            <div className='md:flex'>
                <div className='md:w-2/3 mr-5'>
                    <h3 className="font-bold mt-4 text-xl">Key Concepts:</h3>
                    <ul className='mt-2 list-disc pl-8'>
                        <li>Newton's Laws of Motion</li>
                        <li>Conservation of Energy</li>
                        <li>Conservation of Momentum</li>
                        <li>Work and Energy</li>
                        <li>Rotational Motion</li>
                    </ul>
                    <p className='mt-2 text-lg text-justify'>
                        Classical mechanics is a fundamental concept in physics that describes the behavior of particles as waves.
                        It provides the necessary background for understanding quantum phenomena and their implications.
                    </p>
                    <h3 className="font-bold mt-4 text-xl">Newton's Laws of Motion</h3>
                    <p className='mt-2 text-lg text-justify'>
                        Newton's laws of motion are three fundamental principles that describe the behavior of objects in motion. They provide the foundation for understanding the forces acting upon objects and their response to those forces.
                    </p>
                </div>
                <img src={image1} alt="Classical Mechanics" className="mt-4 mx-auto block w-96 rounded-md shadow-md" />
            </div>
            <h4 className="font-bold mt-4 text-lg">First Law(Law of Inertia)</h4>
            <p className='mt-2 text-lg text-justify'>
                An object at rest will remain at rest, and an object in motion will remain in motion at a constant velocity unless acted upon by an external force.
            </p>
            <p className='text-lg text-justify'>Consider a stationary book placed on a table. According to Newton's First Law, the book remains at rest until an external force, such as a push or a pull, is exerted upon it. 
            Once set in motion, the book will continue moving at a constant velocity unless 
            acted upon by another force. The celestial bodies in our solar system provide an excellent illustration of Newton's First Law. Planets orbit the sun in nearly circular paths, maintaining their motion due to the absence of significant external forces. 
            Their inertia enables them to persist in their trajectories through space.</p>
            <h4 className="font-bold mt-4 text-lg">Second Law</h4>
            <p className='mt-2 text-lg text-justify'>
                The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.
            </p>
            <p className='text-lg text-justify'>Newton's Second Law is expressed mathematically as <b>F = ma</b>, where F represents the net force acting upon an object, m denotes its mass, and a signifies its acceleration.
            The law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.
            A small force will produce a small acceleration, while a large force will produce a large acceleration.
            The mass of an object also plays a crucial role in determining its response to a given force.
            A heavier object will experience a smaller acceleration than a lighter object when subjected to the same force.
            </p>
            <h4 className="font-bold mt-4 text-lg">Third Law(Action-Reaction)</h4>
            <p className='mt-2 text-lg text-justify'>
                For every action, there is an equal and opposite reaction.
            </p>
            <p className='text-lg text-justify'>Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction. When a force is exerted on an object, the object exerts an equal and opposite force on the source of the original force.
            This principle is evident in various everyday scenarios. For instance, when a person jumps off a boat onto a dock, the force exerted by the person on the dock is matched by an equal and opposite force exerted by the dock on the person.
            Similarly, when a rocket propels itself forward by expelling exhaust gases, the force exerted by the gases on the rocket is matched by an equal and opposite force exerted by the rocket on the gases.
            </p>
            <h3 className="font-bold mt-4 text-xl">Conservation of Energy</h3>
            <p className='mt-2 text-lg text-justify'>
                The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another.
            </p>
            <p className='text-lg text-justify'>Energy is a fundamental concept in physics that describes the capacity to do work or produce heat. The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another.
            This principle is crucial in understanding the behavior of physical systems and the interactions between different forms of energy.
            </p>
            <h3 className="font-bold mt-4 text-xl">Conservation of Momentum</h3>
            <p className='mt-2 text-lg text-justify'>
                The principle of conservation of momentum states that the total momentum of an isolated system remains constant over time.
            </p>
            <p className='text-lg text-justify'>Momentum is a fundamental concept in physics that describes the quantity of motion possessed by an object. The principle of conservation of momentum states that the total momentum of an isolated system remains constant over time.
            This principle is essential in understanding the behavior of objects in collisions and other interactions, as it provides a fundamental constraint on the possible outcomes of such interactions.
            </p>
            <h3 className="font-bold mt-4 text-xl">Work and Energy</h3>
            <p className='mt-2 text-lg text-justify'>
                Work is done when a force acts upon an object to cause a displacement. Energy is the capacity to do work.
            </p>
            <p className='text-lg text-justify'>Work and energy are fundamental concepts in physics that describe the interactions between forces and the motion of objects. Work is done when a force acts upon an object to cause a displacement, and energy is the capacity to do work.
            These concepts are essential in understanding the behavior of physical systems and the transformations of energy that occur within them.
            </p>
            <h3 className="font-bold mt-4 text-xl">Rotational Motion</h3>
            <p className='mt-2 text-lg text-justify'>
                Rotational motion is a fundamental concept in physics that describes the motion of objects around a fixed axis.
            </p>
            <p className='text-lg text-justify'>Rotational motion is a fundamental concept in physics that describes the motion of objects around a fixed axis. This concept is essential in understanding the behavior of rotating objects and the forces that act upon them.
            It provides a fundamental framework for describing the behavior of physical systems that exhibit rotational motion.
            </p>
            <Quiz questions={questions} />
        </div>
    );
};

export default ClassicalMechanics;
