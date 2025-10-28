// Static UI only – no images yet

function Sidebar() {
  return (
    <aside className="card soft-border w-[280px] shrink-0 p-4 sticky top-4 h-[calc(100dvh-2rem)] overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
        <div className="size-8 rounded-xl bg-black text-white grid place-items-center text-sm font-bold">B</div>
        <div className="font-semibold text-[15px]">BetterTasks</div>
      </div>

      <div className="divider" />

      <div className="space-y-3 overflow-y-auto pr-1">
        <div>
          <div className="sidebar-section-title px-2 mb-2">Main Menu</div>
          <nav className="space-y-1">
            {[
              { label: "To-do", icon: "✅" },
              { label: "Calendar", icon: "📅" },
              { label: "Analytics", icon: "📈" },
            ].map((i) => (
              <button key={i.label} className="btn-ghost w-full flex items-center gap-2 rounded-lg px-2 py-2 text-sm">
                <span className="text-base">{i.icon}</span>
                <span className="flex-1 text-left">{i.label}</span>
                {i.extra}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-4">
          <div className="sidebar-section-title px-2 mb-2 flex items-center justify-between">
            <span>Lists</span>
            <span className="text-lg">＋</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-xs font-medium px-2 mb-1 text-[--color-muted]">Projects</div>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-50">
                  <span>🔥</span>
                  <span className="text-sm flex-1">Odama Website</span>
                  <span className="text-zinc-400">＋</span>
                </li>
                <li className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-50">
                  <span>🎯</span>
                  <span className="text-sm flex-1">Dribbble</span>
                  <span className="text-zinc-400">＋</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-medium px-2 mb-1 text-[--color-muted]">Personal Project</div>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-50">
                  <span>🗂️</span>
                  <span className="text-sm flex-1">General</span>
                  <span className="text-zinc-400">＋</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="divider" />

        <div className="flex items-center justify-between px-2">
          <div className="btn-ghost rounded-full px-2 py-1 text-xs">🌞 Light</div>
          <div className="text-[--color-muted]">•</div>
          <div className="btn-ghost rounded-full px-2 py-1 text-xs">🌙 Dark</div>
        </div>

        <div className="mt-4 flex items-center gap-3 px-2">
          <div className="size-10 rounded-full bg-zinc-200 grid place-items-center">🐼</div>
          <div className="text-sm leading-tight">
            <div className="font-medium">Pristia Candra</div>
            <div className="text-xs text-[--color-muted]">Nameless panda #112</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopCard() {
  return (
    <div className="card soft-border px-5 py-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Welcome, Xondamir!</div>
          <div className="text-sm text-[--color-muted]">What do you plan to do today?</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {['😀','😎','🥳','🤩','🧠'].map((e, idx) => (
              <div key={idx} className="size-8 grid place-items-center rounded-full bg-zinc-100 soft-border text-base shadow-sm">
                {e}
              </div>
            ))}
          </div>
          <div className="chip">Odama Studio</div>
          <div className="chip">1,354</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="card soft-border p-3 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-zinc-100 grid place-items-center">🐼</div>
          <div className="text-sm">
            <div className="font-medium">Nameless Panda #245</div>
            <div className="text-xs text-[--color-muted]">Microsoft</div>
          </div>
        </div>
        <div className="card soft-border p-3 grid grid-cols-2 text-sm">
          <div className="text-[--color-muted]">Overall Impact Score</div>
          <div className="text-right">-</div>
          <div className="text-[--color-muted]">Ideal Session Length</div>
          <div className="text-right">-</div>
        </div>
      </div>
    </div>
  );
}

function TaskRow({ title, badge }:{ title:string; badge: "High"|"Medium"|"Low" }) {
  const color = badge === "High" ? "bg-yellow-100 text-yellow-700 border-yellow-200" : badge === "Medium" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-green-100 text-green-700 border-green-200";
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <div className="size-5 rounded-md bg-[--color-primary] text-white grid place-items-center">✓</div>
      <div className="flex-1 text-sm">{title}</div>
      <span className={`chip ${color}`}>{badge}</span>
      <button className="btn-ghost size-8 rounded-md grid place-items-center">⋮</button>
      <button className="btn-ghost size-8 rounded-md grid place-items-center">🗑️</button>
    </div>
  );
}

function TodayTasks() {
  return (
    <div className="card soft-border px-3 py-3">
      <div className="flex items-center justify-between px-2 py-1.5">
        <div className="font-medium">Today Task</div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost"><span>⏱</span> Focus Mode</button>
          <button className="btn btn-primary">AI Assist</button>
        </div>
      </div>
      <div className="divider" />
      <div className="space-y-2">
        <TaskRow title="Create design system" badge="High" />
        <TaskRow title="Create 3 alternative hero section" badge="Medium" />
        <TaskRow title="Upload dribbble shot" badge="Low" />
      </div>
      <div className="mt-6 flex items-center gap-3 px-2 pb-2">
        <button className="btn btn-primary">Finish</button>
        <button className="btn btn-ghost">＋ Add Task</button>
        <div className="text-zinc-300">●</div>
      </div>
    </div>
  );
}

function AssistantPanel() {
  return (
    <aside className="card soft-border w-[360px] shrink-0 p-4 h-[calc(100dvh-2rem)] sticky top-4 flex flex-col">
      <div className="flex items-start justify-between px-1">
        <div>
          <div className="font-semibold">AI Assist ✨</div>
          <div className="text-xs text-[--color-muted]">Knowledge, answers, ideas. One click away.</div>
        </div>
        <button className="btn-ghost size-8 rounded-full">✕</button>
      </div>

      <div className="card soft-border mt-4 p-6 grow grid place-items-center text-center">
        <div className="space-y-6">
          <div className="text-sm text-[--color-muted]">Hi, Pristia</div>
          <div className="text-2xl font-semibold">How can I help you?</div>
          <div className="space-y-3">
            {[
              '"Can you help me with my first task?"',
              '"Create a template for a product design doc"',
              '"What is the SQL query for sorting by date?"',
            ].map((t) => (
              <button key={t} className="btn-ghost rounded-full px-4 py-2 soft-border bg-white w-full text-sm shadow-sm">
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 px-1">
        <div className="flex-1">
          <div className="soft-border rounded-xl bg-white px-3 py-2 text-sm text-[--color-muted]">Write something...</div>
        </div>
        <button className="btn btn-primary rounded-full size-10">➤</button>
      </div>
    </aside>
  );
}

export default function Page() {
  return (
    <main className="p-4 md:p-6">
      <div className="mx-auto max-w-[1400px] grid grid-cols-[280px_1fr_360px] gap-4">
        <Sidebar />
        <div className="space-y-4">
          <TopCard />
          <TodayTasks />
        </div>
        <AssistantPanel />
      </div>
    </main>
  );
}
