# operator==, operator<=> (std::stacktrace_entry)

```cpp
friend constexpr bool operator==( const stacktrace_entry& lhs,  
const stacktrace_entry& rhs ) noexcept;
```
| (1) | (desde C++23) |
|---|---|
```cpp
friend constexpr std::strong_ordering  
operator<=>( const stacktrace_entry& lhs, const stacktrace_entry& rhs ) noexcept;
```
| (2) | (desde C++23) |
|---|---|
  
1) Compara lhs e rhs por igualdade. Dois valores `stacktrace_entry` são iguais se e somente se eles representam a mesma entrada de stacktrace, ou ambos estão vazios.

2) Obtém a ordem relativa entre lhs e rhs na ordem total estrita não especificada sobre todos os valores `stacktrace_entry` que é consistente com a relação de igualdade estabelecida por `operator==`.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::stacktrace_entry` é uma classe associada dos argumentos.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de `operator<=>` e `operator==` respectivamente.

### Parâmetros

- **lhs, rhs** — Valores de `stacktrace_entry` para comparar
  
### Valor de retorno

1) `true` se lhs e rhs comparam como iguais, `false` caso contrário.

2) `std::strong_ordering::equal` se lhs e rhs comparam como iguais.

Caso contrário, `std::strong_ordering::less` se lhs é ordenado antes de rhs na ordem total estrita.

Caso contrário, `std::strong_ordering::greater` (neste caso, rhs é ordenado antes de lhs na ordem total estrita).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo