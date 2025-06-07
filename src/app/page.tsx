"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Lock, Unlock, BarChart3, ClipboardCopy } from "lucide-react";
import { Inputs } from "./inputsType";
// import { decrypt, encrypt } from "./caesarCipher";
import {
  analyzeLetterFrequency,
  type FrequencyAnalysisResult,
} from "./frequencyAnalysis";

const emptyInputs: Inputs = {
  key: 0,
  clearText: "",
};

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputs, setInputs] = useState<Inputs>(emptyInputs);
  const [cipherText, setCipherText] = useState<string>("");
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [showFrequencyAnalysis, setShowFrequencyAnalysis] = useState(false);
  const [frequencyData, setFrequencyData] =
    useState<FrequencyAnalysisResult | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: name === "clearText" ? value : parseInt(value) || 0,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // try {
    //   const result = isEncrypting
    //     ? encrypt(inputs.key, inputs.clearText)
    //     : decrypt(inputs.key, inputs.clearText);
    //   setCipherText(result);

    //   const analysis = analyzeLetterFrequency(result);
    //   setFrequencyData(analysis);

    //   setInputs(emptyInputs);
    // } catch (error) {
    //   console.error("Erro:", error);
    // } finally {
    //   setIsProcessing(false);
    // }
  };

  const toggleMode = () => {
    setIsEncrypting(!isEncrypting);
    setCipherText("");
    setInputs(emptyInputs);
    setShowFrequencyAnalysis(false);
    setFrequencyData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Cifra de Feistel
          </h1>
          <p className="text-gray-600">Criptografe e descriptografe textos</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-center mb-6">
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                onClick={toggleMode}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isEncrypting
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Lock className="w-4 h-4 mr-1" /> Criptografar
              </button>
              <button
                onClick={toggleMode}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !isEncrypting
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Unlock className="w-4 h-4 mr-1" /> Descriptografar
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="key"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Chave (1-25)
              </label>
              <input
                type="number"
                name="key"
                required
                id="key"
                min="1"
                max="25"
                placeholder="Ex: 3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
                value={inputs.key || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="clearText"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Texto {isEncrypting ? "Original" : "Criptografado"}
              </label>
              <textarea
                name="clearText"
                required
                id="clearText"
                rows={4}
                placeholder={`Digite o texto para ${
                  isEncrypting ? "criptografar" : "descriptografar"
                }...`}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                value={inputs.clearText}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`flex items-center px-6 py-3 rounded-md text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isEncrypting
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    {isEncrypting ? (
                      <Lock className="w-4 h-4 mr-2" />
                    ) : (
                      <Unlock className="w-4 h-4 mr-2" />
                    )}
                    {isEncrypting ? "Criptografar" : "Descriptografar"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {cipherText && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Resultado
            </h3>
            <div className="bg-gray-100 rounded-md p-3 mb-4 border-l-4 border-l-indigo-500">
              <p className="text-gray-800 text-sm break-all">{cipherText}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(cipherText)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
              >
                <ClipboardCopy className="w-4 h-4 mr-2" /> Copiar Resultado
              </button>

              <button
                onClick={() => setShowFrequencyAnalysis(!showFrequencyAnalysis)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                {showFrequencyAnalysis ? "Ocultar" : "Ver"} Análise
              </button>
            </div>
          </div>
        )}

        {showFrequencyAnalysis && frequencyData && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Análise de Frequência
            </h3>
            <div className="bg-gray-100 rounded-md p-3 mb-4">
              <div className="text-md font-bold text-gray-700">
                Total de Letras: {frequencyData.totalLetters}
              </div>
            </div>

            <div className="bg-gray-50 rounded-md p-3 max-h-60 overflow-y-auto">
              {frequencyData.letters.map((item) => (
                <div
                  key={item.letter}
                  className="flex items-center justify-between text-sm py-1"
                >
                  <span className="font-medium text-gray-700">
                    {item.letter}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${Math.max(item.percentage, 2)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-10 text-right">
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {frequencyData.totalLetters === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                Nenhuma letra para análise.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
