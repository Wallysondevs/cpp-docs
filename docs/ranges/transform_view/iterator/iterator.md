# std::ranges::transform_view&lt;V,F&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/()
requires std::default_initializable<ranges::iterator_t<Base>> = default;
```
(1) (desde C++20)
```cpp
constexpr /*iterator*/( Parent& parent, ranges::iterator_t<Base> current );
```
(2) (desde C++20)
```cpp
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires Const &&
std::convertible_to<ranges::iterator_t<V>, ranges::iterator_t<Base>>;
```
(3) (desde C++20)

Constrói um iterator.

1) Construtor padrão. Inicializa por valor o iterator subjacente e inicializa o ponteiro para o `transform_view` pai com `nullptr`.

2) Inicializa o iterator subjacente com `std::move(current)` e o ponteiro para o pai com `std::addressof(parent)`.

3) Conversão de `/*iterator*/<false>` para `/*iterator*/<true>`. Constrói por movimento os membros correspondentes.

### Parâmetros

- **parent** — um `std::ranges::transform_view` (possivelmente qualificado com `const`)
- **current** — um iterator para `V` (possivelmente qualificado com `const`)
- **i** — um `/*iterator*/<false>`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo