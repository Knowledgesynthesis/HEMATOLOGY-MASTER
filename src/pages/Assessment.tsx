import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  category: string
}

const questions: Question[] = [
  {
    id: 1,
    question: 'A 45-year-old woman presents with fatigue. Labs show Hgb 9.2 g/dL, MCV 72 fL, Fe 35 μg/dL, TIBC 450 μg/dL, Ferritin 8 ng/mL. What is the most likely diagnosis?',
    options: ['Iron deficiency anemia', 'Anemia of chronic disease', 'Thalassemia', 'Sideroblastic anemia'],
    correct: 0,
    explanation: 'Classic iron deficiency pattern: Low Fe, High TIBC, Low Ferritin. The body increases TIBC to grab any available iron.',
    category: 'Anemias'
  },
  {
    id: 2,
    question: 'A patient has schistocytes on peripheral smear, thrombocytopenia, elevated LDH, low haptoglobin, and acute kidney injury. What is the most likely diagnosis?',
    options: ['ITP', 'TTP/HUS', 'DIC', 'Warm AIHA'],
    correct: 1,
    explanation: 'TTP/HUS presents with microangiopathic hemolytic anemia (schistocytes, low haptoglobin, high LDH), thrombocytopenia, and renal failure. Classic pentad also includes fever and neuro changes.',
    category: 'Platelets'
  },
  {
    id: 3,
    question: 'A patient on heparin develops a 50% drop in platelets on day 7. What is the next best step?',
    options: ['Continue heparin and monitor', 'Stop heparin immediately', 'Start warfarin', 'Transfuse platelets'],
    correct: 1,
    explanation: 'This is likely HIT (Heparin-Induced Thrombocytopenia). Stop heparin immediately and switch to alternative anticoagulant (argatroban, bivalirudin). HIT causes thrombosis, not bleeding.',
    category: 'Platelets'
  },
  {
    id: 4,
    question: 'Which finding is pathognomonic for acute myeloid leukemia (AML)?',
    options: ['Smudge cells', 'Auer rods', 'Hypersegmented neutrophils', 'Schistocytes'],
    correct: 1,
    explanation: 'Auer rods are needle-like inclusions in myeloblasts that are pathognomonic for AML. Smudge cells suggest CLL, hypersegmented neutrophils suggest B12/folate deficiency.',
    category: 'Leukemias'
  },
  {
    id: 5,
    question: 'A 5-year-old child presents with sudden petechiae and bruising 2 weeks after a viral illness. Platelet count is 15,000. CBC is otherwise normal. Most likely diagnosis?',
    options: ['Acute leukemia', 'Aplastic anemia', 'ITP', 'TTP'],
    correct: 2,
    explanation: 'Post-viral ITP is most common in children. Isolated thrombocytopenia with normal RBC and WBC. Usually self-limited (~80% resolve within 6 months).',
    category: 'Pediatrics'
  },
  {
    id: 6,
    question: 'PT is normal, PTT is elevated. Mixing study corrects. What is the most likely diagnosis?',
    options: ['Lupus anticoagulant', 'Hemophilia A', 'Warfarin therapy', 'DIC'],
    correct: 1,
    explanation: 'Isolated PTT elevation suggests intrinsic pathway defect. Mixing study that corrects indicates factor deficiency (not inhibitor). Hemophilia A (Factor VIII deficiency) is most common.',
    category: 'Coagulation'
  },
  {
    id: 7,
    question: 'A patient develops dyspnea, hypotension, and bilateral infiltrates within 2 hours of transfusion. JVD is absent. BNP is normal. What is the diagnosis?',
    options: ['TACO', 'TRALI', 'Acute hemolytic reaction', 'FNHTR'],
    correct: 1,
    explanation: 'TRALI: Acute lung injury within 6 hours, hypoxemia, bilateral infiltrates, NO volume overload (no JVD, normal BNP). TACO would have hypertension, JVD, and elevated BNP.',
    category: 'Transfusion'
  },
  {
    id: 8,
    question: 'A patient with sickle cell disease presents with severe bone pain and fever. What is the most appropriate initial management?',
    options: ['Immediate exchange transfusion', 'Hydration, oxygen, and analgesia', 'Antibiotics alone', 'Observation only'],
    correct: 1,
    explanation: 'Vaso-occlusive crisis is managed with hydration (to prevent further sickling), oxygen (if hypoxic), and adequate analgesia. Look for triggers (infection, dehydration) and treat if present.',
    category: 'Hemoglobinopathies'
  },
  {
    id: 9,
    question: 'Which finding suggests β-thalassemia trait rather than iron deficiency?',
    options: ['MCV < 70 with low ferritin', 'MCV < 70 with normal ferritin and elevated HbA2', 'MCV > 100', 'High reticulocyte count'],
    correct: 1,
    explanation: 'β-thalassemia trait: Microcytic anemia (MCV < 70) with normal/elevated ferritin and elevated HbA2 (>3.5%). Iron deficiency would have low ferritin and respond to iron supplementation.',
    category: 'Hemoglobinopathies'
  },
  {
    id: 10,
    question: 'A patient with CLL develops sudden onset hemolytic anemia. DAT is positive. What type of hemolysis is this?',
    options: ['Warm autoimmune hemolytic anemia', 'Cold agglutinin disease', 'Microangiopathic hemolysis', 'G6PD deficiency'],
    correct: 0,
    explanation: 'CLL is associated with warm autoimmune hemolytic anemia (warm AIHA). DAT positive indicates immune-mediated hemolysis. IgG antibodies react best at body temperature.',
    category: 'Lymphomas'
  },
]

export function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [quizComplete, setQuizComplete] = useState(false)

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = index
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1])
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
      setShowExplanation(false)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswers(new Array(questions.length).fill(null))
    setQuizComplete(false)
  }

  const calculateScore = (): number => {
    return answers.reduce((score: number, answer, index) => {
      return score + (answer !== null && answer === questions[index].correct ? 1 : 0)
    }, 0)
  }

  const question = questions[currentQuestion]
  const score = calculateScore()
  const percentage = Math.round((score / questions.length) * 100)

  if (quizComplete) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assessment Complete</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Session Results</CardTitle>
            <CardDescription>Your performance on this quiz attempt</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <div className="text-6xl font-bold text-primary mb-4">{percentage}%</div>
              <div className="text-2xl mb-2">
                {score} out of {questions.length} correct
              </div>
              <div className="text-muted-foreground">
                {percentage >= 80 && 'Excellent work!'}
                {percentage >= 60 && percentage < 80 && 'Good effort! Review the topics you missed.'}
                {percentage < 60 && 'Keep studying! Review the explanations below.'}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Review Your Answers</h3>
              <div className="space-y-3">
                {questions.map((q, index) => {
                  const userAnswer = answers[index]
                  const isCorrect = userAnswer === q.correct
                  return (
                    <div key={q.id} className={`p-3 rounded border-l-4 ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                      <div className="font-medium text-sm mb-1">
                        Question {index + 1}: {q.category}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">{q.question}</div>
                      <div className="text-xs">
                        <strong>Your answer:</strong> {userAnswer !== null ? q.options[userAnswer] : 'Not answered'}
                        <br />
                        <strong>Correct answer:</strong> {q.options[q.correct]}
                        <br />
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleRestart}>Retake Quiz</Button>
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 text-sm mt-4">
              <strong className="text-yellow-600 dark:text-yellow-400">Note:</strong> Results are session-only and not saved.
              When you close this page, your score will be lost.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Practice Assessment</h1>
          <p className="text-muted-foreground mt-1">
            Test your hematology knowledge
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="text-sm text-muted-foreground">
          Category: {question.category}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded border-2 transition-all ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === question.correct
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-red-500 bg-red-500/10'
                      : 'border-primary bg-primary/10'
                    : showExplanation && index === question.correct
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-1">{option}</div>
                  {showExplanation && index === question.correct && (
                    <div className="flex-shrink-0 text-green-600 dark:text-green-400">✓</div>
                  )}
                  {showExplanation && selectedAnswer === index && index !== question.correct && (
                    <div className="flex-shrink-0 text-red-600 dark:text-red-400">✗</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {!showExplanation && selectedAnswer !== null && (
            <Button onClick={() => setShowExplanation(true)}>Check Answer</Button>
          )}

          {showExplanation && (
            <div className={`p-4 rounded border-l-4 ${selectedAnswer === question.correct ? 'border-green-500 bg-green-500/10' : 'border-orange-500 bg-orange-500/10'}`}>
              <div className="font-semibold mb-2">
                {selectedAnswer === question.correct ? '✓ Correct!' : 'Incorrect'}
              </div>
              <div className="text-sm text-muted-foreground">{question.explanation}</div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNext} disabled={!showExplanation}>
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-3 rounded text-sm text-center text-muted-foreground">
        Session-only quiz • Results are not saved
      </div>
    </div>
  )
}
