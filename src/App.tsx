import { CSSProperties, useMemo, useState } from 'react'
import catAnimation from '../public/yippee-happy.gif'

const rejections: string[] = [
    'Нет',
    'Ты уверена?',
    'Нет, подумай еще',
    "Я сейчас заплачу",
    "Не могу поверить",
    'ПОЖАЛУЙСТА!!!',
]

interface Position {
    top?: string
    left?: string
}

function App() {
    const [count, setCount] = useState(1)
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
                    ? `${count * 17}vw`
                    : '100vw',
            height:
                count === 1
                    ? '7vh'
                    : count !== rejections.length
                    ? `${count * 5}vh`
                    : '100vh',
            fontSize:
                count === 1
                    ? ''
                    : count !== rejections.length
                    ? `${count * 15}px`
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
                    <h2 className="title"> Я люблю тебя &hearts; </h2>
                    <img alt="cat animation" src={catAnimation} />
                </>
            ) : (
                <>
                    <h1 className="valentine">Пососёшь?</h1>
                    <button
                        style={stylesBtnAgree}
                        onClick={agree}
                        className={`btn-agree ${
                            count === rejections.length ? 'last' : ''
                        }`}
                    >
                        Да {exclamation}
                    </button>
                    {count !== 6 && (
                        <button
                            style={stylesBtnRefusual}
                            className="btn-refusal"
                            onClick={changeRejections}
                        >
                            {rejections[count - 1]}
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

export default App
