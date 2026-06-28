# Requisitos nomeados C++: TrivialClock (desde C++11)

Os requisitos **TrivialClock** descrevem os requisitos satisfeitos por vários clocks na [biblioteca chrono](<#/doc/chrono>).

### Requisitos

Para um tipo TC:

*   O tipo deve satisfazer os requisitos [Clock](<#/doc/named_req/Clock>).
*   Os tipos TC::rep, TC::duration e TC::time_point satisfazem os requisitos de [EqualityComparable](<#/doc/named_req/EqualityComparable>), [LessThanComparable](<#/doc/named_req/LessThanComparable>), [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), [CopyConstructible](<#/doc/named_req/CopyConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>), [Destructible](<#/doc/named_req/Destructible>)(até C++17), [Swappable](<#/doc/named_req/Swappable>) e [NumericType](<#/doc/named_req/NumericType>).
*   A função TC::now() não lança exceções.
*   O tipo TC::time_point::clock satisfaz os requisitos TrivialClock, recursivamente.

### Biblioteca padrão

Os seguintes tipos na biblioteca padrão satisfazem os requisitos TrivialClock:

[ system_clock](<#/doc/chrono/system_clock>)(C++11) | tempo de relógio de parede do relógio de tempo real de todo o sistema
(class)
[ steady_clock](<#/doc/chrono/steady_clock>)(C++11) | clock monotônico que nunca será ajustado
(class)
[ high_resolution_clock](<#/doc/chrono/high_resolution_clock>)(C++11) | o clock com o menor período de tick disponível
(class)
[ file_clock](<#/doc/chrono/file_clock>)(C++20) | [Clock](<#/doc/named_req/Clock>) usado para [file time](<#/doc/filesystem/file_time_type>)
(typedef)
[ file_time_type](<#/doc/filesystem/file_time_type>)(C++17) | representa valores de file time
(typedef)