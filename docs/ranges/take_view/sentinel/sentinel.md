# std::ranges::take_view&lt;V&gt;::sentinel&lt;Const&gt;::sentinel

```cpp
/*sentinel*/() = default;  // (1) (desde C++20)
constexpr explicit /*sentinel*/( ranges::sentinel_t<Base> end );  // (2) (desde C++20)
constexpr /*sentinel*/( /*sentinel*/<!Const> s )
requires Const &&
std::convertible_to<ranges::sentinel_t<V>, ranges::sentinel_t<Base>>;  // (3) (desde C++20)
```

Constrói um sentinel.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) o sentinel subjacente.

2) Inicializa o sentinel subjacente com end.

3) Conversão de /*sentinel*/&lt;false&gt; para /*sentinel*/&lt;true&gt;. Constrói por movimento os membros correspondentes.

### Parâmetros

- **end** — um sentinel representando o fim de `V` (possivelmente qualificado como const)
- **s** — um /*sentinel*/&lt;false&gt;

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo