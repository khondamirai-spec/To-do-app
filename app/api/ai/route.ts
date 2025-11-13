import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getTasks } from '@/lib/tasks';

/**
 * AI API Route
 * Handles AI requests for task management assistance
 */
export async function POST(request: NextRequest) {
  try {
    const { message, tasks } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Initialize OpenAI client (inside handler to ensure env vars are loaded)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Get user's tasks if not provided
    let userTasks = tasks;
    if (!userTasks) {
      try {
        userTasks = await getTasks();
      } catch (error) {
        console.error('Failed to load tasks:', error);
        userTasks = [];
      }
    }

    // Format tasks for context (handle both DB and UI task formats)
    const tasksContext = userTasks.length > 0
      ? userTasks.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: task.description || '',
          priority: task.priority || task.badge || 'Medium',
          date: task.date,
          completed: task.completed || false,
        }))
      : [];

    // System prompt - instructs AI to be concise and helpful
    const systemPrompt = `Sen vazifalar boshqaruvida yordamchi AI assistentsan. Quyidagi talablarga rioya qil:

1. **Qisqa va lo'nda javoblar**: Uzun matn yozma, faqat kerakli qisqa xulosa, maslahat yoki tushuntirish ber.

2. **Vazifalarni qisqa umumlashtirish**: Foydalanuvchi vazifalarini yuborsa, ularni juda qisqa, aniq formatda jamlab ber.

3. **Shaxsiylashtirilgan maslahatlar**: Foydalanuvchining vazifalari bo'yicha maslahatlar taqdim et:
   - Qaysi vazifani birinchi bajarish kerak
   - Vaqtni qanday tejash
   - Prioritizatsiya
   - Reja tuzish

4. **Yordamchi funksiyalar**:
   - Vazifalarni tartiblab berish
   - Reja tuzish
   - Vazifalarni qisqartirish
   - Vazifalarni yaxshilash
   - Savollarga javob berish

Javoblaring har doim qisqa, aniq va foydali bo'lsin. Uzun tushuntirishlar yozma.`;

    // Build messages array
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: `Foydalanuvchining vazifalari:\n${JSON.stringify(tasksContext, null, 2)}\n\nFoydalanuvchi savoli: ${message}\n\nJavob qisqa va lo'nda bo'lsin.`,
      },
    ];

    // Call OpenAI API with GPT-4o mini
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500, // Limit response length for concise answers
    });

    const aiResponse = completion.choices[0]?.message?.content || 'Kechirasiz, javob olishda xatolik yuz berdi.';

    return NextResponse.json({
      response: aiResponse,
    });
  } catch (error) {
    console.error('AI API error:', error);
    
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

