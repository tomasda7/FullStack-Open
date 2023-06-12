    const Header = ({ title }) => {
        return (
        <>
            <h2>{title}</h2>
        </>
        )
    }

    const Part = ({ part }) => {
        return (
        <p>
            {part.name}: {part.exercises}
        </p>
        )
    }

  const Content = ({ parts }) => {
        return (
        <>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </>
        )
    }

    const Total = ({ parts }) => {
        return (
        <>
            <h4>total of {parts.reduce((a,c) =>  a + c.exercises,0)} exercises</h4>
        </>
        )
    }

    const Course = ({ course }) => {
        return (
        <>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </>
        )
    }

export default Course;
