# Requisitos nomeados C++: Clock (desde C++11)

Os requisitos **Clock** descrevem um conjunto que consiste em um [std::chrono::duration](<#/doc/chrono/duration>), um [std::chrono::time_point](<#/doc/chrono/time_point>), e uma função now() para obter o `time_point` atual. A origem do `time_point` do clock é referida como a época do clock.

### Requisitos

C1 e C2 denotam tipos de clock. t1 e t2 são valores retornados por C1::now() onde a chamada que retorna t1 ocorre antes da chamada que retorna t2 e ambas as chamadas ocorrem antes de C1::time_point::max().

Expression | Return type | Operational semantics
---|---|---
C1::rep | An arithmetic type or a class emulating an arithmetic type | O tipo de representação de C1::duration.
C1::period | A specialization of [std::ratio](<#/doc/numeric/ratio/ratio>) | O período de tick do clock em segundos.
C1::duration | [std::chrono::duration](<#/doc/chrono/duration>)<C1::rep, C1::period> | O tipo de duração do clock.
C1::time_point | [std::chrono::time_point](<#/doc/chrono/time_point>)&lt;C1&gt; or [std::chrono::time_point](<#/doc/chrono/time_point>)<C2, C1::duration> | O tipo [std::chrono::time_point](<#/doc/chrono/time_point>) do clock. C1 e C2 devem se referir à mesma época.
C1::is_steady | const bool | true se t1 <= t2 for sempre verdadeiro e o clock avança a uma taxa constante em relação ao tempo real (assim, a diferença entre dois tempos distintos reportados é aproximadamente o tempo real decorrido entre as atualizações do clock), caso contrário false
C1::now() | C1::time_point | Retorna um objeto time_point representando o ponto atual no tempo.

### Veja também

[ is_clockis_clock_v](<#/doc/chrono/is_clock>)(C++20) | determina se um tipo é um **Clock**
(modelo de classe) (modelo de variável)
*[_(as is)_]: A::pointer