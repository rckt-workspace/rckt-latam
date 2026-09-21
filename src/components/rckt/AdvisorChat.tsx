import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Operamos ecommerce en varios mercados y el CAC sube cada trimestre.",
  "Tenemos varias agencias y datos inconsistentes entre canales.",
  "Queremos integrar IA en adquisición sin perder control de marca.",
  "Necesitamos medir el revenue incremental, no solo last-click.",
];

const AdvisorChat = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionId = useMemo(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }, []);

  const persistLead = (msgs: Msg[]) => {
    fetch("/api/save-chat-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, messages: msgs }),
    }).catch(() => {
      // silencioso: no interrumpir UX si falla el guardado
    });
  };

  // Check if user has sent any messages (for suggestions visibility)
  const hasUserMessages = messages.some((m) => m.role === "user");

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const value = text.trim();
    if (!value || isLoading) return;

    const userMsg: Msg = { role: "user", content: value };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    let streamError: { message: string; code?: string } | null = null;
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch("/api/advisor-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, session_id: sessionId }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) {
          toast("Asesor ocupado", {
            description: "Demasiadas consultas. Intenta en unos segundos.",
          });
        } else if (resp.status === 402) {
          toast("Crédito agotado", {
            description: "Escribe directamente al equipo de RCKT LATAM.",
          });
        } else {
          toast("Error", { description: "El asesor no respondió. Intenta nuevamente." });
        }
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: rDone, value } = await reader.read();
        if (rDone) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);

            // Check for error in stream
            if (parsed.error) {
              streamError = parsed.error;
              done = true;
              break;
            }

            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Handle stream error
      if (streamError) {
        const errorMsg = streamError.message || "El asesor no pudo procesar tu consulta";
        toast("Error en la respuesta", { description: errorMsg });

        // Remove the empty assistant message if nothing was received
        if (!assistantSoFar) {
          setMessages(nextMessages);
        }
        setIsLoading(false);
        return;
      }

      // Guardamos la conversación completa tras cada turno (upsert por session_id)
      const finalMessages: Msg[] = assistantSoFar
        ? [...nextMessages, { role: "assistant", content: assistantSoFar }]
        : nextMessages;
      persistLead(finalMessages);
    } catch (e) {
      console.error(e);
      toast("Sin conexión", { description: "Verifica tu red e intenta de nuevo." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[580px] max-h-[calc(100dvh-3rem)] flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
      <header className="shrink-0 flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-zinc-600 opacity-60 animate-ping dark:bg-zinc-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-600 dark:bg-zinc-400" />
          </span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-600 font-medium dark:text-zinc-400">
            Asesor RCKT LATAM · en línea
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
          AI-first
        </span>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto bg-white px-5 py-5 space-y-5 dark:bg-zinc-950"
      >
        {/* RCKT Advisor intro - always visible */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
            RCKT LATAM
          </span>
          <p className="text-sm text-zinc-900 leading-relaxed dark:text-zinc-100">
            ¡Hola! Soy el asesor estratégico de RCKT LATAM. Cuéntame brevemente el reto de
            crecimiento de tu compañía y te devolveré hipótesis accionables conectadas a tu
            industria y a tu stack.
          </p>
        </div>

        {/* Suggestion buttons - only before first user message */}
        {!hasUserMessages && (
          <div className="grid grid-cols-2 gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-left text-[13px] leading-snug text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Conversation messages */}
        {messages.map((m, i) => (
          <div key={i} className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              {m.role === "user" ? "Tú" : "RCKT LATAM"}
            </span>
            <p
              className={
                m.role === "user"
                  ? "text-sm leading-relaxed text-zinc-900 dark:text-zinc-100"
                  : "text-sm leading-relaxed text-zinc-900 whitespace-pre-wrap border-l-2 border-zinc-300 pl-4 dark:text-zinc-100 dark:border-zinc-700"
              }
            >
              {m.content}
              {isLoading && i === messages.length - 1 && m.role === "assistant" && (
                <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-zinc-600 dark:bg-zinc-400 align-middle animate-pulse" />
              )}
            </p>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              RCKT LATAM
            </span>
            <div className="flex gap-1 pl-4 border-l-2 border-zinc-300 dark:border-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-500 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-500 animate-pulse [animation-delay:120ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-500 animate-pulse [animation-delay:240ms]" />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="shrink-0 border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={3}
            placeholder="Describe el reto de crecimiento de tu compañía…"
            className="min-w-0 flex-1 min-h-[72px] max-h-36 resize-none rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="shrink-0 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvisorChat;
