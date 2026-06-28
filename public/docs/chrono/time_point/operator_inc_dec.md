# std::chrono::time_point&lt;Clock,Duration&gt;::operator++, std::chrono::time_point&lt;Clock,Duration&gt;::operator--

```cpp
constexpr time_point& operator++();  // (1) (desde C++20)
constexpr time_point operator++( int );  // (2) (desde C++20)
constexpr time_point& operator\--();  // (3) (desde C++20)
constexpr time_point operator\--( int );  // (4) (desde C++20)
```

Modifica o ponto no tempo que *this representa por um tick da `duration`.

Se `d_` é uma variável membro que armazena a duration (isto é, tempo desde a epoch) deste objeto `time_point`,

1) Equivalente a ++d_; return *this;.

2) Equivalente a return time_point(d_++).

3) Equivalente a \--d_; return *this;.

4) Equivalente a return time_point(d_\--);.

### Parâmetros

(nenhum)

### Valor de retorno

1,3) Uma referência a este `time_point` após a modificação.

2,4) Uma cópia do `time_point` feita antes da modificação.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/duration/operator_arith2>) | incrementa ou decrementa a contagem de ticks
(função membro pública de `std::chrono::duration<Rep,Period>`)
[ operator+=operator-=](<#/doc/chrono/time_point/operator_arith>) | modifica o time point pela duration fornecida
(função membro pública)
[ operator+operator-](<#/doc/chrono/time_point/operator_arith2>)(C++11) | realiza operações de adição e subtração envolvendo um time point
(modelo de função)