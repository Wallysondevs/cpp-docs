# operator+, operator-(std::chrono::time_point)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class C, class D1, class R2, class P2 >
time_point<C, typename std::common_type<D1, duration<R2,P2>>::type>
operator+( const time_point<C,D1>& pt,
const duration<R2,P2>& d );
(até C++14)
template< class C, class D1, class R2, class P2 >
constexpr time_point<C, std::common_type_t<D1, duration<R2,P2>>>
operator+( const time_point<C,D1>& pt,
const duration<R2,P2>& d );
template< class R1, class P1, class C, class D2 >
time_point<C, typename std::common_type<duration<R1,P1>,D2>::type>
operator+( const duration<R1,P1>& d,
const time_point<C,D2>& pt );
(até C++14)
template< class R1, class P1, class C, class D2 >
constexpr time_point<C, std::common_type_t<duration<R1,P1>,D2>>
operator+( const duration<R1,P1>& d,
const time_point<C,D2>& pt );
template< class C, class D1, class R2, class P2 >
time_point<C, typename std::common_type<D1, duration<R2,P2>>::type>
operator-( const time_point<C,D1>& pt,
const duration<R2,P2>& d );
(até C++14)
template< class C, class D1, class R2, class P2 >
constexpr time_point<C, std::common_type_t<D1, duration<R2,P2>>>
operator-( const time_point<C,D1>& pt,
const duration<R2,P2>& d );
template< class C, class D1, class D2 >
typename std::common_type<D1,D2>::type
operator-( const time_point<C,D1>& pt_lhs,
const time_point<C,D2>& pt_rhs );
(até C++14)
template< class C, class D1, class D2 >
constexpr std::common_type_t<D1,D2>
operator-( const time_point<C,D1>& pt_lhs,
const time_point<C,D2>& pt_rhs );
```

Realiza operações de adição e subtração envolvendo um `time_point`.

1,2) Aplica o deslocamento d a pt. Efetivamente retorna CT(pt.time_since_epoch() + d), onde `CT` é o tipo de retorno.

3) Aplica o deslocamento d a pt na direção negativa. Efetivamente retorna CT(pt.time_since_epoch() - d), onde `CT` é o tipo de retorno.

4) Calcula a diferença entre pt_lhs e pt_rhs.

### Parâmetros

- **pt** — um time point para aplicar o deslocamento
- **d** — um deslocamento de tempo
- **pt_lhs, pt_rhs** — time points para extrair a diferença

### Valor de retorno

1-3) O time point resultante da aplicação do deslocamento d.

4) A duration entre os time points.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2739](<https://cplusplus.github.io/LWG/issue2739>) | C++11 | pt - d se comportava erraticamente para `duration`s sem sinal | comportamento corrigido

### Ver também

[ operator+=operator-=](<#/doc/chrono/time_point/operator_arith>) | modifica o time point pela duration fornecida
(função membro pública)