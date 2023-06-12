
const Header = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
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
      <h4>total of {parts.reduce((a,c) => { return a + c.exercises },0)} exercises</h4>
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

const App = () => {

  const course = {
    id: 1,
    name:'Half Stack application development',
    parts: [
      {
        name:'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name:'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name:'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name:'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  );
}

export default App;
