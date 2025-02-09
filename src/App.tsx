import { CSSProperties, useMemo, useState } from 'react'
import catAnimation from '../public/catValentine.gif'

const rejections: string[] = [
    'No no no',
    'Are you sure?',
    'No, think again',
    "I'm going to cry now",
    "I can't believe",
    'PLEASE!!!',
]

interface Position {
    top?: string
    left?: string
}

function App() {
    const [count, setCount] = useState<number>(1)
    const [exclamation, setExclamation] = useState('!')
    const [isValentine, setisValentine] = useState(false)
    const [position, setPosition] = useState<Position>()

    const changeRejections = () => {
        setExclamation((prev) => (prev += '!'))
        setCount((prev) => prev + 1)

        setPosition({
            left: `${Math.floor(Math.random() * 60 - 40) + 40}%`,
            top: `${Math.floor(Math.random() * (90 - 65 + 1)) + 65}%`,
        })
    }

    const agree = () => {
        setisValentine(true)
    }

    const stylesBtnAgree = useMemo<CSSProperties>(() => {
        return {
            width:
                count === 1
                    ? '22vw'
                    : count !== rejections.length
                    ? `${(count ?? rejections.length) * 17}vw`
                    : '100vw',
            height:
                count === 1
                    ? '7vh'
                    : count !== rejections.length
                    ? `${(count ?? rejections.length) * 5}vh`
                    : '100vh',
            fontSize:
                count === 1
                    ? ''
                    : count !== rejections.length
                    ? `${(count ?? rejections.length) * 15}px`
                    : '100px',
        }
    }, [count])

    const stylesBtnRefusual = useMemo<CSSProperties>(() => {
        return {
            position: count === 1 ? 'static' : 'absolute',
            left: position?.left,
            top: position?.top,
        }
    }, [position, count])

    return (
        <div className="main">
            {isValentine ? (
                <>
                    <h2 className="title"> I love you &hearts; </h2>
                    <img alt="cat animation" src={catAnimation} />
                </>
            ) : (
                <>
                    <h2 className="title">Will be my</h2>
                    <h1 className="valentine">Valentine?</h1>
                    <button
                        style={stylesBtnAgree}
                        onClick={agree}
                        className={`btn-agree ${
                            count === rejections.length ? 'last' : ''
                        }`}
                    >
                        Yes {exclamation}
                    </button>
                    {count !== 6 && (
                        <button
                            style={stylesBtnRefusual}
                            className="btn-refusal"
                            onClick={changeRejections}
                        >
                            {rejections[count]}
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

export default App
