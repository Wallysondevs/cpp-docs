# std::experimental::ranges::tagged&lt;Base,Tags...&gt;::tagged

```cpp
using Base::Base;  // (1)
tagged() = default;  // (2)
tagged( tagged&& that ) = default;  // (3)
tagged( const tagged& that ) = default;  // (4)
tagged( Base&& that ) noexcept(std::is_nothrow_move_constructible<Base>::value)
requires MoveConstructible<Base>;  // (5)
tagged( const Base& that ) noexcept(std::is_nothrow_copy_constructible<Base>::value)
requires CopyConstructible<Base>;  // (6)
template< class Other >
requires Constructible<Base, Other>
constexpr tagged( ranges::tagged<Other, Tags...> && that )
noexcept(std::is_nothrow_constructible<Base, Other>::value);  // (7)
template< class Other >
requires Constructible<Base, const Other&>
constexpr tagged( const ranges::tagged<Other, Tags...> &that );  // (8)
```

Constrói um objeto `tagged`.

1) `tagged<Base, Tags...>` herda os construtores de `Base`.

2-4) `tagged` possui construtores padrão, de cópia e de movimento padronizados que invocam o construtor correspondente de `Base`.

5) Construtor de movimento de conversão a partir de `Base`. Inicializa o subobjeto `Base` com std::move(that).

6) Construtor de cópia de conversão a partir de `Base`. Inicializa o subobjeto `Base` com that.

7) Construtor de movimento de conversão a partir de uma especialização `tagged` diferente com tags correspondentes. Inicializa o subobjeto `Base` com static_cast<Other&&>(that).

8) Construtor de cópia de conversão a partir de uma especialização `tagged` diferente com tags correspondentes. Inicializa o subobjeto `Base` com static_cast&lt;const Other&&gt;(that).