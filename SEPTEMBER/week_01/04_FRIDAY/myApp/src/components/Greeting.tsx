

type GreetingProps = {
    name: string;
    age?: number;
};

export default function Greeting({ name, age }: GreetingProps) {

    return (
        <div>
            <div>Hello , {name}</div>
            <p>You are {age} years old.</p>
        </div >
    )
}
