# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::chrono::time_point)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Clock, class Dur1, class Dur2 >
bool operator==( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
(até C++14)
template< class Clock, class Dur1, class Dur2 >
constexpr bool operator==( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
template< class Clock, class Dur1, class Dur2 >
bool operator!=( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
(até C++14)
template< class Clock, class Dur1, class Dur2 >
constexpr bool operator!=( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
(até C++20)
template< class Clock, class Dur1, class Dur2 >
bool operator<( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
(até C++14)
template< class Clock, class Dur1, class Dur2 >
constexpr bool operator<( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
template< class Clock, class Dur1, class Dur2 >
bool operator<=( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
(até C++14)
template< class Clock, class Dur1, class Dur2 >
constexpr bool operator<=( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
template< class Clock, class Dur1, class Dur2 >
bool operator>( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
(até C++14)
template< class Clock, class Dur1, class Dur2 >
constexpr bool operator>( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
template< class Clock, class Dur1, class Dur2 >
bool operator>=( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
(até C++14)
template< class Clock, class Dur1, class Dur2 >
constexpr bool operator>=( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
template< class Clock, class Dur1, std::three_way_comparable_with<Dur1> Dur2 >
constexpr auto operator<=>( const std::chrono::time_point<Clock,Dur1>& lhs,
const std::chrono::time_point<Clock,Dur2>& rhs );
```

Compara dois time points. A comparação é feita comparando os resultados de [time_since_epoch()](<#/doc/chrono/time_point/time_since_epoch>) para os time points.

1,2) Verifica se os time points `lhs` e `rhs` se referem ao mesmo time point para o `Clock` fornecido.

3-6) Compara os time points `lhs` e `rhs`.

7) Compara os time points `lhs` e `rhs`. O tipo de retorno é deduzido de `lhs.time_since_epoch() <=> rhs.time_since_epoch()`, e, portanto, o tipo de resultado da comparação three-way de `Dur1` e `Dur2`.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — time points a comparar

### Valor de retorno

1) true se `lhs` e `rhs` se referem ao mesmo time point, false caso contrário.

2) true se `lhs` e `rhs` se referem a time points diferentes, false caso contrário.

3) true se `lhs` se refere a um time point _anterior_ a `rhs`, false caso contrário.

4) true se `lhs` se refere a um time point _anterior_ a `rhs`, ou ao mesmo time point que `rhs`, false caso contrário.

5) true se `lhs` se refere a um time point _posterior_ a `rhs`, false caso contrário.

6) true se `lhs` se refere a um time point _posterior_ a `rhs`, ou ao mesmo time point que `rhs`, false caso contrário.

7) `lhs.time_since_epoch() <=> rhs.time_since_epoch()`.

### Exceções

Pode lançar exceções definidas pela implementação.

### Notas

Os operadores de comparação two-way de `time_point` não eram `constexpr` em C++11; isso foi corrigido em C++14.