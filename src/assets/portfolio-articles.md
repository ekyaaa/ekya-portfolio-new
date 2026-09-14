# Portfolio Articles

> Five long-form articles for a personal developer portfolio. The writing below is grounded in the experience and constraints described in the provided article brief. It intentionally avoids invented metrics, project claims, or outcomes.

---

## 1. Building Software Beyond the Code

**Slug:** `building-software-beyond-the-code`  
**Category:** Software Engineering  
**Tags:** Problem Solving, Product Thinking, Deployment, Maintenance  
**Excerpt:** What changed when I stopped treating a working feature as the final measure of successful software.

There was a time when I judged my progress as a developer mostly by what I could make the code do. If a page rendered correctly, an API returned the expected response, or a background task completed without an error, the work felt finished.

Working on real internal applications during my internship at PT Surabaya Autocomp Indonesia changed that definition. The code still mattered, but it became only one part of a much larger chain: understanding a problem, translating it into a workable flow, building the system, validating it with users, deploying it, and then living with the consequences of that deployment.

That experience made software feel less like a collection of features and more like a sequence of decisions. A decision about what to build. A decision about what not to build. A decision about where logic belongs. A decision about whether the system is simple enough for another developer to maintain. A decision about whether a user can actually understand it without knowing anything about the technologies behind it.

### A request is not yet a problem

One of the most important shifts in my thinking was learning not to treat a user's first request as a complete specification.

A user can describe what they want based on the workflow they already know. That does not necessarily mean the requested feature is the best representation of the problem. Before thinking about Django, Laravel, PostgreSQL, or any other tool, I have to understand what is happening around the request.

What are they doing now? Where does the process slow down? Which information do they repeatedly enter? What part is confusing? What happens when the normal flow fails? Who needs the result afterward?

Those questions sound less technical than choosing a framework, but they can have a greater effect on whether the software succeeds. If I misunderstand the workflow, good code can simply automate the wrong thing.

Interviewing users and observing how they work made this very visible. A screen can be logically clean from a developer's perspective while still being awkward for the person who has to use it every day. A data model can be elegant while failing to represent the exceptions that exist in a real business process. A feature can satisfy the literal request while adding more steps to the actual job.

For me, this is where software engineering begins: not with implementation, but with reducing ambiguity.

### Workflows before frameworks

As a student, it is easy to become attached to technology choices. New tools are concrete. They are easy to compare, learn, and put into a project stack. Real problems are less neat.

My internship work involved technologies such as Django, Laravel, PostgreSQL, Celery, Gunicorn, Nginx, and SSH-based deployment. Each of them solved a particular kind of problem, but none of them could decide what the application should be.

That distinction sounds obvious, yet it is easy to reverse the order in practice. I have caught myself thinking in terms such as, "This would be a good place to use a worker," or, "This could be separated into another service," before proving that the problem needed those things.

Now I try to start with the flow instead. What enters the system? What must happen synchronously? What can happen later? What must be stored? What can fail independently? Which people interact with each step?

Only after that does the architecture become meaningful.

Celery, for example, can be useful when work should not block a request. PostgreSQL can provide strong relational structure for business data. Nginx and Gunicorn are part of making a Django application available reliably rather than merely running it in a development server. But the value of those tools comes from the needs they answer, not from the fact that they make the stack look more complete.

### A prototype is part of the conversation

Prototyping also changed meaning for me. I used to think of a prototype mainly as an early version of the interface. In practice, it is also a way to test whether two people have the same understanding of a process.

A written explanation leaves room for different interpretations. A visible flow makes disagreements easier to find. A user can point at a step and say that it should happen earlier, that a field is unnecessary, or that a case I thought was unusual is actually common.

That kind of feedback is cheaper before the implementation becomes deeply connected to the rest of the system.

The point is not to avoid change. Software changes. The point is to make important misunderstandings visible while they are still inexpensive to correct.

### Production changes the meaning of "done"

The strongest difference between coursework and real software appeared after implementation.

On a local machine, I control almost everything. I know which environment variables exist. I know which process I started. I can reset data, inspect logs directly, and retry without affecting anyone else.

Deployment removes that comfort.

A Django application behind Gunicorn and Nginx has more boundaries than the application code itself. The environment must be correct. Static files, permissions, reverse proxy configuration, processes, database access, and networking all become part of the behavior users experience. If deployment happens through SSH, the steps taken on the server are part of the engineering process too.

The same is true after release. Maintenance is not an optional final chapter. Logs have to be interpretable. Failures need to be diagnosable. A future change should not require rediscovering every hidden assumption in the system.

This is why I no longer think of deployment as the moment after development. Deployment is one of the conditions the software must be designed to survive.

### Existing systems teach restraint

Greenfield projects are attractive because the architecture can begin from a clean page. Existing systems do not offer that freedom.

When an application has to work with an existing database, existing workflows, or other applications that are already in use, every change has a context. A table may look poorly named but be consumed by another system. A process may look redundant but exist because of an operational requirement. A seemingly cleaner redesign may create migration risk that is not justified by the benefit.

That environment taught me to ask a different question. Instead of asking, "How would I design this from scratch?" I have to ask, "What is the safest useful improvement I can make within the system that actually exists?"

That question is less exciting, but it is closer to professional engineering.

Reading unfamiliar code is part of the same lesson. Rewriting something can feel faster than understanding it, especially when the existing implementation does not match my preferences. But rewriting also discards decisions whose reasons may not be visible yet. Understanding first gives me a chance to separate accidental complexity from constraints that still matter.

### Simple does not mean careless

I increasingly prefer solutions with fewer moving parts, but not because complexity is always bad.

Complexity can be necessary. Background jobs, caching, multiple services, connection pooling, asynchronous communication, or specialized infrastructure can all be justified. The mistake is introducing them before there is evidence that their cost is worth paying.

Every additional component creates another place to configure, observe, secure, deploy, and debug. A simple solution can therefore be more robust, not because it is less sophisticated, but because its behavior is easier to understand.

The best version of simplicity is deliberate. It understands the constraints and chooses the smallest system that still handles them correctly.

### Communication is part of the technical work

Another change in my definition of engineering is that I no longer see communication as something surrounding the technical work. It affects the technical work directly.

If I cannot explain a limitation clearly, a user may make an incorrect assumption. If I do not ask the right question, I may encode that misunderstanding into the database. If I cannot describe a deployment risk to another developer, the team cannot make an informed decision about it.

Non-technical users do not need framework terminology. They need to understand what the software will do, what it will not do, and what changes in their workflow. Developers need a different level of detail, but the responsibility is similar: make important assumptions visible.

That is a technical skill because software is built from assumptions as much as it is built from code.

### My current definition of a good developer

I still care about code quality. I want to understand frameworks deeply, design clean APIs, write maintainable modules, and become better at debugging. But I no longer think those things are sufficient on their own.

A good developer should be able to move between levels of the problem. They should understand what a user is trying to accomplish, trace that need through application logic and data, think about how the system will run in production, and anticipate what another developer will face when the code changes later.

They should also know when not to add something.

My internship did not give me a final definition of software engineering. If anything, it made the field feel larger. I became more aware of how much exists between an idea and a reliable system.

But that awareness changed the direction in which I want to improve. I do not want to become someone who can only build features quickly. I want to become an engineer who can understand why a system should exist, make careful choices while building it, and remain responsible for what happens after the code leaves my machine.

---

## 2. When PostgreSQL Became the Problem

**Slug:** `when-postgresql-became-the-problem`  
**Category:** Backend & Database  
**Tags:** PostgreSQL, Django, PgBouncer, Production Debugging  
**Excerpt:** A production investigation into connection pressure, Django's connection behavior, and the trade-offs behind introducing PgBouncer.

For a long time, when I heard "database performance problem," I imagined slow queries first. I thought about indexes, joins, query plans, and large tables.

During my internship, I encountered a different kind of pressure. A PostgreSQL server was shared by many internal applications and databases. Some databases contained millions of rows, and dozens of applications depended on the same infrastructure. At one point, a Django application using two databases contributed to connection pressure on that PostgreSQL environment.

The situation forced me to look beyond SQL performance. A database can struggle even when an individual query is reasonable if too many clients are trying to keep connections open. Application configuration, concurrency, connection lifetime, and the shape of the infrastructure matter too.

That investigation changed how I think about databases in production. Knowing how to write SQL is not the same as understanding what happens when many applications continuously talk to the same server.

### The first signal was not a bad query

The problem was connection pressure. That distinction mattered because it changed what I needed to investigate.

A PostgreSQL connection is not just an abstract socket that costs nothing. The server maintains state and resources for connected clients. If many applications each open multiple connections, the total can grow long before any single application looks extreme in isolation.

A shared PostgreSQL server makes this more interesting. One application may behave acceptably on its own but become part of a larger capacity problem when combined with many other systems. The relevant question is no longer, "How many connections does this application use?" It becomes, "How does this application's behavior interact with everyone else using the same server?"

That is an architectural question, not only a query question.

### Why I did not want to start with more hardware

Adding resources can be valid, but I did not want it to be the first explanation for the problem.

If the pressure comes from connection behavior, increasing capacity without understanding that behavior can postpone the issue rather than clarify it. It can also hide configuration choices that will keep scaling in the same direction.

Before thinking about larger infrastructure, I wanted to understand the path from the Django application to PostgreSQL. When does Django create a connection? How long is it kept? What happens when requests run concurrently? What changes when one application uses two databases? Are there long-running operations? Which parts of the code assume session state on a particular PostgreSQL connection?

Those questions are more useful than assuming that the database server is simply too small.

### Django participates in the connection story

An ORM can make database access feel like an implementation detail. I can write a QuerySet and think mainly about the data I want back. In production, the connection beneath that QuerySet still has a lifecycle.

Django's database configuration influences how connections are opened and reused. Process count and concurrency influence how many database clients may exist at the same time. An application configured with multiple databases adds another dimension because a single application process can interact with more than one database connection pool.

The important lesson for me was that application architecture and database capacity cannot be reasoned about separately.

Even if PostgreSQL has a configured connection limit, that number is not a target to consume. It is a boundary. Once several applications compete near that boundary, a local configuration change in one service can affect unrelated systems.

### Why PgBouncer became interesting

This led me to investigate PgBouncer.

PgBouncer is a lightweight connection pooler that sits between application clients and PostgreSQL. The basic idea is to avoid requiring every client-side connection to map permanently to a dedicated PostgreSQL backend connection. Depending on the pooling mode, PgBouncer can reuse a smaller set of server connections across more client activity.

The attractive part was clear: connection pooling could reduce pressure on PostgreSQL.

The dangerous part was also clear: inserting a pooler changes connection semantics. I could not treat it as a transparent switch without understanding how the applications behave.

### Session, transaction, and statement pooling are different contracts

The three modes I focused on were session pooling, transaction pooling, and statement pooling.

With **session pooling**, a client is assigned a PostgreSQL server connection for the lifetime of that client session. The server connection is not freely reused by another client until the client disconnects. This preserves the strongest connection affinity and is therefore the closest to connecting directly to PostgreSQL, although it offers less aggressive reuse than shorter pooling modes.

With **transaction pooling**, a server connection is assigned for the duration of a transaction and can return to the pool after that transaction finishes. This can reuse server connections much more efficiently, but the application cannot assume it will receive the same PostgreSQL backend connection for its next transaction.

With **statement pooling**, reuse is even more aggressive: a server connection can be released after individual statements. That imposes much stricter limitations and is not a mode I would introduce casually into an application that was not designed around those semantics.

The key point is that these are not merely performance presets. They are different contracts between the application and the database layer.

### Why session pooling felt like the conservative first step

Because the existing applications were not designed around a connection pooler from the beginning, session pooling was interesting as a conservative option.

It does not produce the maximum possible connection reuse, but it preserves behavior that depends on connection affinity more closely than transaction pooling. For existing systems, that compatibility can be more important than theoretical efficiency.

This is where I had to resist thinking of optimization as a single dimension. "Fewer server connections" is valuable, but so is "does not subtly break existing behavior."

A production change should improve the system without changing assumptions that the application depends on.

### `QuerySet.iterator()` made the trade-off concrete

One detail that made me think carefully was Django code using `QuerySet.iterator()` and behavior related to database sessions.

On PostgreSQL, streaming large query results can involve server-side cursor behavior. That kind of behavior can depend on the relationship between a transaction and the backend connection serving it. More aggressive pooling changes when a client is guaranteed to stay on the same PostgreSQL connection.

The important part of the lesson was not a single Django setting. It was the method: before changing infrastructure semantics, audit application behavior that may depend on those semantics.

It is easy to read a PgBouncer configuration example and see only the operational benefit. It is harder, and more important, to ask what parts of the codebase become invalid under that configuration.

### Shared infrastructure multiplies the cost of assumptions

A PostgreSQL server supporting many applications creates a special kind of risk. A change intended to help one application can influence others if applied globally. Conversely, one application's connection behavior can consume capacity needed by systems with completely different workloads.

That means a connection-pooling decision should include an inventory of who is connecting, how they connect, and which behaviors are sensitive to connection reuse.

I learned to think in terms of blast radius. The more applications share a resource, the more valuable it is to understand the effects of a change before making it.

This is one reason production infrastructure can feel slower to change than application code. The correct unit of analysis is larger.

### Debugging production is an exercise in consequences

The investigation also changed what I mean when I say I "know" a technology.

I can know that PgBouncer exists. I can explain its configuration file. I can describe transaction pooling. That is useful knowledge, but it is not yet engineering judgment.

Engineering judgment begins when I ask what will happen to the applications already running. Which queries are long-lived? Which code relies on session-level behavior? How are failures observed? What is the rollback plan? Does the expected reduction in connections justify the new operational component?

The same applies to PostgreSQL itself. Knowing indexes, transactions, and SQL syntax is different from understanding how connection limits, application concurrency, and shared infrastructure interact under real load.

### What I took from the incident

I did not come away believing that PgBouncer is a universal fix for PostgreSQL scalability. Connection pooling addresses a particular class of problems. It cannot repair inefficient queries, poor schema design, inappropriate locking, slow storage, or every other database bottleneck.

What I gained instead was a better debugging model.

Start with the observed constraint. Trace the behavior across layers. Separate symptoms from causes. Understand the semantics of any infrastructure component before adding it. Audit the code that may depend on the behavior you are about to change. Prefer a reversible, conservative improvement when the system is shared and the blast radius is large.

The database became "the problem" only in the sense that it exposed a wider system problem. PostgreSQL was not isolated from Django, process concurrency, application configuration, or the architecture around it.

That was the real lesson: production systems fail across boundaries, so debugging them requires understanding those boundaries too.

---

## 3. Git Is More Than Version Control

**Slug:** `git-is-more-than-version-control`  
**Category:** AI & Developer Tools  
**Tags:** Git, LLM, GitTrace, Documentation  
**Excerpt:** What happens when commit history is treated not only as version control, but as source material for a project's development memory.

Most of the time, I use Git for a practical reason: I need to know what changed, preserve versions of the code, collaborate safely, and recover when an experiment goes wrong.

But the longer I worked with repositories, the more interesting another question became: what does a Git history remember that the final code no longer shows?

The final state of a project is only the latest answer. It does not naturally explain the path that produced that answer. Commits contain fragments of that path: messages, timestamps, changed files, diffs, sequences of revisions, and patterns in how the project evolved.

That idea led me to work on GitTrace, a project intended to transform Git commit history into a more understandable development logbook. I also experimented with using LLMs to turn that source material into readable summaries, including Indonesian-language internship or project reports.

The project made me stop thinking of a repository only as storage for source code. A repository can also be evidence of development over time.

### Git is good at recording change, not explaining a story

Git answers certain questions extremely well.

Which commit introduced this line? Which files changed? What was the state of the project before a particular revision? What is the difference between two points in history?

Those are precise questions, and precision is one of Git's strengths.

Human reporting often asks something different. What did I work on this week? How did the project move from one feature to another? Which technical areas consumed most of the effort? Why did a series of small commits matter as one larger development task?

A chronological list of commit messages is not automatically a useful answer.

That gap is where I became interested in treating Git history as raw material rather than finished documentation.

### A commit is a useful record, but an incomplete explanation

Commit messages are written for many different purposes. Some are careful and descriptive. Some are short. Some describe implementation instead of intent. Some make sense only when the author still remembers the context.

The diff itself has a similar limitation. It can show that a model changed, a view was added, or a configuration file was updated. It cannot reliably tell me the business reason for that change unless the reason is encoded somewhere in the history.

That is important because it establishes a boundary for any automated reporting system. Git contains evidence, but evidence is not the same as complete context.

GitTrace therefore cannot be valuable by pretending to recover information that was never recorded. Its value has to come from organizing what actually exists and making the uncertainty visible.

### From raw history to a development narrative

The useful transformation begins by structuring the history.

Instead of sending an entire repository to an AI model and asking, "What happened?", I can think in smaller records: commit identifier, timestamp, commit message, changed files, and a controlled representation of the diff or change summary.

Those records can then be grouped into useful windows or themes. A set of commits touching the same feature area may represent one larger task. Several small fixes after a deployment may form a maintenance phase. Changes across configuration and application code may belong to the same technical decision.

The goal is not to rewrite history. The goal is to make the relationships inside the recorded history easier to read.

This is where an LLM becomes interesting, because language models are good at transforming structured input into human-readable language. But that ability also creates the central risk of the project.

### The problem with a confident summary

LLMs can produce fluent text even when the source material is incomplete.

For a development logbook, that is dangerous. A polished paragraph can sound more authoritative than the evidence it came from. If the model invents a reason for a code change, merges two unrelated commits into one explanation, or claims a result that is not present in the history, the report becomes easier to read and less trustworthy at the same time.

That is why I do not want AI to be the authority in this workflow.

The source data must remain the authority.

The model should be constrained to summarize supplied records. Important statements should be traceable back to commits or other explicit inputs. When information is missing, the system should prefer uncertainty over invention.

This changes how I think about AI integration. The interesting work is not simply calling an LLM API. It is designing the boundaries around the model.

### Grounding is more important than impressive prose

For this kind of system, grounding means making the relationship between output and source data explicit.

The input can be structured so the model knows which commit produced which changes. A generated section can retain references to the commits it summarizes. The pipeline can separate extraction from interpretation, so the raw Git data remains available even after a higher-level narrative is generated.

Validation matters too. If a summary claims that a feature was completed, there should be evidence in the input that supports that wording. If the source only shows partial implementation, the report should not convert that into a completed outcome.

The better the prose becomes, the more important this discipline is. Fluency should never be confused with accuracy.

### Development memory is larger than documentation

The idea of "development memory" became useful to me because documentation usually describes the system as it should be understood now. Git history describes how the system changed.

Those are complementary views.

A README can explain how to run the project. Architecture documentation can explain the intended boundaries between components. An issue tracker can explain planned work. Git can show what actually changed in the repository over time.

None of those sources is complete by itself.

A tool like GitTrace is interesting because it can sit between raw repository history and human reporting. For a student, that might mean generating a more accurate weekly internship log from recorded work. For a team, it might mean summarizing development activity before a review. For an organization, it could support institutional memory when a developer leaves and someone else needs to understand the evolution of a codebase.

Those use cases are only valuable if the report remains grounded in the underlying history.

### Automation should reduce reporting work, not erase responsibility

I do not think automated reports should remove the need for humans to review what they communicate.

A commit history can be messy. A good report often needs context that Git cannot know: why a decision was made, what a user requested, what failed outside the repository, or what was discussed in a meeting.

The system can reduce repetitive work by organizing and summarizing the recorded evidence. The human can then correct, add context, or reject interpretations that are not justified.

That division of labor feels more realistic to me than asking AI to "understand the whole project" from code alone.

### What GitTrace taught me about AI systems

Working on this idea changed my view of AI-assisted developer tools.

The most interesting problem is not how to generate more text. It is how to build a reliable path from source data to generated text.

That path needs extraction, structure, boundaries, and validation. It needs a clear answer to the question, "Where did this statement come from?" It also needs a way to preserve the raw evidence so the generated narrative does not become the only version of history people see.

In that sense, GitTrace is as much a software engineering problem as an AI problem.

### A repository as evidence of becoming

The final codebase tells me what the project is. The Git history tells me something about how it became that way.

That difference matters to me because development is a process that is easy to forget once a feature works. The abandoned attempt disappears. The refactor becomes normal. The sequence of decisions collapses into the current implementation.

Git keeps traces of that movement.

I do not think every commit deserves a narrative, and I do not think an LLM should turn every repository into a long story. But I do think there is useful information inside development history that ordinary version-control workflows leave difficult to read.

Exploring that idea made me see Git differently. It is still version control first. But it can also be a form of memory—provided that any system interpreting that memory respects the evidence it was built from.

---

## 4. The Architecture I Actually Need

**Slug:** `the-architecture-i-actually-need`  
**Category:** Architecture  
**Tags:** FastAPI, WebSocket, SSE, Qdrant, LLM, Infrastructure  
**Excerpt:** Why architecture should be justified by the problem, the team, and the constraints—not by how many technologies appear in the diagram.

I like architecture diagrams.

There is something satisfying about seeing a system divided into clear components: an API layer, a worker, PostgreSQL, a vector database, a local LLM, a reverse proxy, real-time communication, and a separate client. Each box has a responsibility. Each arrow suggests deliberate design.

I have explored architectures involving FastAPI, REST, WebSocket, SSE, background workers, PostgreSQL, Qdrant, LLM APIs, local models through Ollama, Flutter, Nginx, Tailscale, and VPS infrastructure. That exploration has been useful because it taught me what these components can do.

It also taught me a less exciting lesson: knowing that I *can* add a component does not mean the system needs it.

The architecture I want to build today is increasingly the architecture I can justify.

### Complexity is attractive because it looks like capability

Modern backend development makes sophisticated building blocks accessible. I can add a queue, put a vector database next to PostgreSQL, stream tokens over SSE, maintain bidirectional state over WebSocket, run an LLM locally, and place the services behind Nginx.

All of those technologies solve real problems.

The temptation is to treat their presence as evidence that the architecture is advanced.

But architecture is not a technology collection. A system with more components has more capabilities, but it also has more failure modes. There are more processes to start, more connections to observe, more configuration to synchronize, more logs to inspect, and more deployment steps that can go wrong.

If the problem does not need those capabilities, the complexity is not neutral. It becomes work.

### REST is often enough until the interaction says otherwise

REST is easy to underestimate because it is familiar.

For many operations, a normal request and response are exactly what the system needs. Create a record. Fetch a list. Update state. Trigger an operation and return a result.

WebSocket becomes valuable when the communication pattern is genuinely bidirectional and long-lived. A client may need frequent server updates while also sending state changes without repeatedly creating new request cycles.

SSE fits a different shape. When the server mainly needs to stream updates in one direction—such as incremental progress or generated text—SSE can be simpler than maintaining a fully bidirectional WebSocket connection.

The question I now try to ask is not, "Which real-time technology is better?" It is, "What communication behavior does the user experience require?"

If polling every few seconds is acceptable, even that may be the correct answer. Architecture starts with the interaction contract, not the trendiest transport.

### Background workers should protect boundaries that matter

The same reasoning applies to workers.

A background worker is useful when a task is too slow, unreliable, or independent to keep inside the lifetime of a request. AI inference, long-running processing, document transformation, or other expensive jobs can be reasonable candidates.

Moving work to a worker also introduces a queueing model. Now I have to think about retries, idempotency, job state, failure visibility, and what the client sees while the work is incomplete.

That is a good trade when asynchronous execution solves a real product or reliability problem. It is unnecessary overhead when the task is fast and predictable.

A worker should be a consequence of the workload, not a default box in the diagram.

### A vector database is not a requirement for using an LLM

AI projects create another form of architectural gravity. Once retrieval-augmented generation enters the discussion, adding a vector database can feel automatic.

Qdrant and other vector databases are useful when the system needs semantic retrieval across embedded content at a scale or query pattern where specialized vector search is justified.

But not every AI feature needs retrieval. Not every retrieval problem needs a separate vector database. Small, structured datasets may be searchable in simpler ways. Some application features need deterministic database queries rather than semantic similarity. Some prompts already contain all the context the model requires.

Using a vector database without a retrieval problem creates storage, indexing, synchronization, and operational work without a clear benefit.

The right question is not, "Where can I use embeddings?" It is, "What information does the model need, and what is the simplest reliable way to retrieve it?"

### Local LLMs made constraints impossible to ignore

Running models locally through tools such as Ollama made architectural trade-offs more physical for me.

A cloud API hides most of the hardware. I think about request cost, latency, quotas, data handling, and provider dependency, but I do not have to decide whether the model fits in available VRAM or system memory.

Local inference removes some of those external dependencies and can give me more control, but the hardware becomes part of the design. Model size affects memory. Quantization affects resource use and output quality. CPU and GPU capability affect latency. Concurrent requests can become a capacity problem quickly.

Because my hardware is limited, I cannot treat those constraints as theoretical.

That has been useful. A resource limit forces me to decide what the system actually needs. Maybe a smaller model is sufficient. Maybe an API is more practical for a specific workload. Maybe a local model should handle only certain tasks. Maybe the product should avoid an expensive generation step entirely.

Constraint turns architecture from preference into reasoning.

### Infrastructure has a maintenance price

Nginx, Tailscale, and a VPS can make a system flexible and accessible, but they also expand the operational surface.

A reverse proxy adds routing and TLS concerns. Private networking changes how services discover and reach each other. A VPS needs deployment, process management, updates, monitoring, and security decisions.

None of this is an argument against infrastructure. It is an argument for counting operations as part of architecture.

A design is not finished when the request path works on a diagram. Someone has to keep the path working.

For a small team—or for one student developer—that "someone" may be the same person writing the application code. Every additional service therefore competes with feature work and debugging time.

### Distributed systems create coordination problems before they create scale

Breaking a system into services can isolate responsibilities and scale components independently. It can also create network boundaries where there used to be function calls.

Now data consistency, retries, service availability, timeouts, and observability matter in new ways. A local failure can become a partial system failure. Debugging may require correlating events across processes.

For a small system, that cost can arrive long before the scale benefit does.

This is why I have become more comfortable starting with a monolithic application or a small number of processes when the problem allows it. I can still preserve internal boundaries in the code. I can extract a service later if the workload or organizational structure justifies it.

Starting simple does not mean refusing to scale. It means delaying irreversible complexity until there is evidence for it.

### The architecture should follow the constraint

The most useful architecture discussions I have now are constraint discussions.

How many users are expected? What latency is acceptable? What data must remain relational? Which tasks can fail independently? What hardware is available? Who will operate the system? How much time does the team have? What happens when the network is unavailable? How expensive is an external API compared with maintaining a local model?

Those questions reduce the space of reasonable designs.

Sometimes the answer will still be WebSocket, a worker, Qdrant, a local LLM, and several deployment components. When those pieces are justified, I want to understand them well enough to operate them.

But I no longer want them simply because they make the architecture look complete.

### Start simple, then earn complexity

The principle I keep returning to is simple: start with the smallest architecture that satisfies the current constraints, measure where it fails, and add complexity when the evidence justifies the cost.

That principle is not anti-technology. It actually makes learning technology more useful. I can study WebSocket without forcing it into every project. I can understand vector databases without assuming every LLM application requires one. I can experiment with local inference while still choosing an API when the operational trade-off is better.

The architecture I actually need is not the one with the most boxes.

It is the one whose boxes I can explain.

---

## 5. Becoming a Better Developer Before Becoming a Senior Developer

**Slug:** `becoming-a-better-developer-before-becoming-a-senior-developer`  
**Category:** Career & Reflection  
**Tags:** Engineering Judgment, Learning, Teamwork, Responsibility  
**Excerpt:** A student developer's reflection on technical growth, judgment, responsibility, and what "senior" should mean beyond a title.

I want to become a strong software engineer. For a long time, the most visible path toward that goal was technical: learn more frameworks, understand more backend concepts, build larger systems, become faster at debugging, and accumulate experience with production tools.

I still want those things.

But university projects, software competitions, team and freelance work, internship experience, deployment problems, infrastructure issues, and AI experiments have made the goal less straightforward. Technical ability matters, but it does not automatically produce good engineering decisions. It does not guarantee that I understand a user's problem, that I communicate well with a teammate, or that I take responsibility for what happens when a system fails.

That has changed the question I ask myself.

Instead of asking only, "How do I become a senior developer?" I am more interested in, "What would make me a better developer before the title ever becomes relevant?"

### Knowing more technology is not the same as having better judgment

Technology knowledge is easy to count. I can list frameworks, databases, protocols, infrastructure tools, and AI systems I have used or explored.

Judgment is harder to display because it often appears as something I chose not to do.

Not adding a queue because the request is already fast enough. Not replacing an existing codebase because understanding it is safer than rewriting it. Not introducing a new database when PostgreSQL already represents the data well. Not using an LLM when deterministic logic is more reliable.

Those decisions require technical knowledge too. I need to understand the more complex option before I can reject it for the right reason.

This is why I now see expertise less as the number of tools available to me and more as the ability to choose among them under constraints.

### Existing code is an argument I have not read yet

When I encounter unfamiliar code, my first reaction can be to imagine how I would write it differently.

That reaction is useful as a source of ideas, but it can also be arrogant. Existing code is full of decisions made under context I may not know. A strange condition may represent an old production incident. A duplicated-looking field may exist for compatibility. A process that feels indirect may reflect how another system integrates with it.

Reading before rewriting is therefore a form of respect for hidden constraints.

It does not mean the code is correct. It means I should understand why it exists before deciding that I can safely replace it.

The better I become at reading other people's code, the less I treat unfamiliar style as evidence of bad engineering.

### Communication changes technical outcomes

I used to think of communication as a separate professional skill that becomes important after the technical work is done.

Real projects made that separation difficult to maintain.

If I misunderstand a user's workflow, the database schema can be wrong. If a teammate and I use the same term to mean different things, the API contract can be wrong. If I do not explain a deployment limitation clearly, someone can make a decision based on an assumption the system does not satisfy.

Communication therefore has a direct relationship with bugs.

Good communication does not require turning every conversation into a meeting or writing long documents for simple changes. It requires making the important parts explicit: assumptions, constraints, ownership, and uncertainty.

Sometimes the most useful sentence is, "I do not know yet; I need to verify this before we change it."

### Responsibility begins after the code works

A feature working on my machine is evidence, not completion.

Deployment taught me this quickly. The application still depends on processes, configuration, database access, networking, reverse proxies, permissions, and the environment around it. A failure in any of those layers becomes part of the user experience even if the code itself is correct.

Responsibility means caring about that full path.

It also means being willing to investigate when something goes wrong instead of focusing first on whether the problem was "my part." Systems cross ownership boundaries. A database issue may be triggered by application behavior. A deployment problem may expose a configuration assumption inside the code. A slow user flow may be caused by a technically correct feature that does not match the actual workflow.

I want to become the kind of developer who follows the problem across those boundaries.

### Asking for help is an engineering decision

There is a version of independence that is useful: I should be able to investigate, read documentation, inspect logs, make hypotheses, and test them.

There is also a version that wastes time: refusing to ask a person who knows the system when their context could prevent an incorrect change.

Knowing when to ask for help is not the opposite of being technically capable. It is part of managing risk and time.

A good question shows the work already done. It explains what I observed, what I expected, what I tried, and where the uncertainty remains. That makes collaboration more efficient and helps me learn the missing mental model rather than only receiving an answer.

I still want to become more self-sufficient. I just no longer want self-sufficiency to mean pretending I can know every part of a system alone.

### Failure is useful only when I extract something specific from it

It is easy to romanticize failure in technology. "Fail fast" can become a slogan that makes every mistake sound productive.

I do not think failure is automatically valuable.

A production mistake that teaches nothing is simply a mistake. A failed architecture experiment that I never analyze is only lost time. The useful part begins when I can state what assumption was wrong, how I could have discovered it earlier, and what I will change in my process next time.

Sometimes the lesson is technical. Sometimes it is that I should have asked a user one more question. Sometimes it is that I introduced complexity before measuring the need. Sometimes it is that I did not leave enough time for deployment and testing.

Specific lessons are more useful than general confidence about "learning from failure."

### Discipline, curiosity, and humility pull in different directions

Curiosity makes me explore new systems. It is the reason I experiment with backend architecture, local LLMs, vector databases, networking, and infrastructure.

Discipline asks whether that exploration belongs in the production path of the current project.

Humility reminds me that understanding a technology in a demo is not the same as understanding its behavior under real constraints.

I need all three.

Curiosity without discipline can turn projects into technology collections. Discipline without curiosity can make me stop learning. Confidence without humility can make me change systems I do not yet understand.

I do not expect to balance those qualities perfectly. I only want to notice when one of them is missing.

### Seniority, as I currently understand it

I am still a student, so I do not want to pretend I know exactly what being a senior engineer means from the inside.

From where I am now, I associate seniority less with typing speed or framework knowledge and more with judgment under incomplete information.

A senior engineer should be able to identify the important constraint, reduce risk, communicate trade-offs, make a decision that fits the team and system, and take responsibility for the consequences. They should make other people more effective, not only produce more code personally.

I also expect there are parts of seniority I cannot understand yet because they require years of maintaining systems, mentoring people, seeing long-term architectural consequences, and making decisions when every option has real cost.

That uncertainty is useful. It prevents the goal from becoming a checklist.

### The direction I want to grow

I still want deep technical skill. I want stronger fundamentals, better debugging instincts, cleaner system design, and more experience with production infrastructure. I want to understand the tools I use beyond the level required to make a demo work.

But I also want to become more reliable in less visible ways: clearer in communication, more careful with assumptions, more willing to read before rewriting, more disciplined about complexity, and more responsible when a decision affects other people.

I cannot claim that I am already that engineer.

What I can say is that my definition of progress has changed. I no longer want to measure growth only by how many technologies I can use or how advanced a project looks. I want to measure it by the quality of the decisions I can make with the knowledge, constraints, and people in front of me.

That feels like a better direction than trying to look senior before I have learned how to be useful.
