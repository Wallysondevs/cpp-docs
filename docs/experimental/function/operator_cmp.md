# operator==,!=(std::experimental::function)

Definido no cabeçalho `[<experimental/functional>](<#/doc/header/experimental/functional>)`

```c
template< class R, class... ArgTypes >
bool operator==( const std::experimental::function<R(ArgTypes...)>& f,
std::nullptr_t ) noexcept;
template< class R, class... ArgTypes >
bool operator==( std::nullptr_t,
const std::experimental::function<R(ArgTypes...)>& f ) noexcept;
(removido no library fundamentals TS v3)
template< class R, class... ArgTypes >
bool operator!=( const std::experimental::function<R(ArgTypes...)>& f,
std::nullptr_t ) noexcept;
(removido no library fundamentals TS v3)
template< class R, class... ArgTypes >
bool operator!=( std::nullptr_t,
const std::experimental::function<R(ArgTypes...)>& f ) noexcept;
(removido no library fundamentals TS v3)
```

Compara um `std::experimental::function` com um ponteiro nulo. Funções vazias (isto é, funções sem um alvo chamável) comparam como iguais, funções não vazias comparam como não iguais.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. | (library fundamentals TS v3)

### Parâmetros

- **f** — `std::experimental::function` para comparar

### Valor de retorno

1,2) !f

3,4) (bool) f

### Ver também

[ operator==operator!=](<#/doc/utility/functional/function/operator_cmp>)(removido em C++20) | compara um [std::function](<#/doc/utility/functional/function>) com nullptr
(modelo de função)