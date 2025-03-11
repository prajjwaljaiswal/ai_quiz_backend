import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Generative, GenerativeDocument } from '@schema/generative.schema';
import { ChatGroq } from "@langchain/groq";
import { config } from 'dotenv';
import { LLMInterface } from './interface/llm';
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

config(); // Load environment variables
class QuestionSchema {
    question: string;
    options: { level: number; text: string }[];
    correctAnswer: number;
    explanation: string;
}

@Injectable()
export class GenerativeService {
    private llm: ChatGroq; 
    private parser: JsonOutputParser<QuestionSchema>;
    private prompt: PromptTemplate;

    constructor(@InjectModel(Generative.name) private generativeModel: Model<GenerativeDocument>) {
        // Initialize LangChain Groq LLM
        this.llm = new ChatGroq({
            apiKey: process.env.GROQ_API_KEY, // Ensure this is set in .env
            model: "llama3-8b-8192",
            temperature: 0.7
        });

        // Initialize the JSON parser
        this.parser = new JsonOutputParser<QuestionSchema>();

        // Define a structured prompt
        this.prompt = new PromptTemplate({
            template: `You are a JSON generator. Generate a {difficulty}-level multiple-choice question on {topic}.
                Respond ONLY in a valid JSON format. Do NOT include any text before or after the JSON.
                {format_instructions}
                
                strictly follow this example format in json with all key value pairs in the JSON
                Example: 
                {{
                    "question": "What is the capital of France?",
                    "options": [
                        {{"level": 1, "text": "Paris"}},
                        {{"level": 2, "text": "London"}},
                        {{"level": 3, "text": "Madrid"}},
                        {{"level": 4, "text": "Berlin"}}
                    ],
                    "correctAnswer": 0,
                    "explanation": "France is known for its beautiful landscapes, rich history, and vibrant culture."
                }}
        `,
            inputVariables: ["topic", "difficulty"],
            partialVariables: { format_instructions: this.parser.getFormatInstructions() }
        });
    }

    async generateQuestions(body: { topic: string; difficulty: number; prompt: string }) {
        try {
            const { topic, difficulty, prompt } = body;

            // Generate a question using the LLM
            // const response:any = await this.llm.invoke(`
            //      Generate a ${difficulty}-level multiple-choice question on ${topic}. 
            //      Provide a JSON object with the fields: question, options (array of objects with level & text), correctAnswer (index), and explanation. 
            //      The response must be in valid JSON format, without additional text or formatting.
                
                //  Example: {
                //     "question": "What is the capital of France?",
                //     "options": [
                //         {"level": 1, "text": "Paris"},
                //         {"level": 2, "text": "London"},
                //         {"level": 3, "text": "Madrid"},
                //         {"level": 4, "text": "Berlin"}
                //     ],
                //     "correctAnswer": 0,
                //     "explanation": "France is known for its beautiful landscapes, rich history, and vibrant culture."
                // }
            // `);

            const chain = this.prompt.pipe(this.llm).pipe(this.parser);
            console.log(chain)
            const generatedOutput: QuestionSchema = await chain.invoke({ topic, difficulty }); 
            
            // Save to MongoDB
            const savedEntry = await this.generativeModel.create({
                topic,
                difficulty,
                prompt,
                output: generatedOutput
            });

            // Return the generated question
            return {
                success: true,
                data: savedEntry
            };
        } catch (error) {
            console.error("Error generating question:", error);
            return { success: false, message: "Failed to generate question", error };
        }
    }
}
