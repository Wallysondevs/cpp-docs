# std::is_eq, std::is_neq, std::is_lt, std::is_gt, std::is_lteq, std::is_gteq

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
constexpr bool is_eq( std::partial_ordering cmp ) noexcept;
constexpr bool is_neq( std::partial_ordering cmp ) noexcept;
constexpr bool is_lt( std::partial_ordering cmp ) noexcept;
constexpr bool is_lteq( std::partial_ordering cmp ) noexcept;
constexpr bool is_gt( std::partial_ordering cmp ) noexcept;
constexpr bool is_gteq( std::partial_ordering cmp ) noexcept;
```

Essas funções recebem um resultado de comparação de 3 vias e o convertem para o resultado de um dos seis operadores relacionais

Especificamente, essas funções retornam

1) cmp == 0

2) cmp != 0

3) cmp < 0

4) cmp <= 0

5) cmp > 0

6) cmp >= 0

### Parâmetros

- **cmp** — resultado de comparação de 3 vias

### Valor de retorno

resultado bool da operação relacional correspondente

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ partial_ordering](<#/doc/utility/compare/partial_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores, não é substituível e permite valores incomparáveis
(classe)