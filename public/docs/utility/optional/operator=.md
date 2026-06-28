# std::optional&lt;T&gt;::operator=

`optional& operator=( [std::nullopt_t](<#/doc/utility/optional/nullopt_t>) ) noexcept; | (1) | (desde C++17)`
`(constexpr desde C++20)`
`---|---|---`
---|---|---
`constexpr optional& operator=( const optional& other ); | (2) | (desde C++17)`
`constexpr optional& operator=( optional&& other ) noexcept(/* see below */); | (3) | (desde C++17)`
`template< class U = T >`
`optional& operator=( U&& value ); | (4) | (desde C++17)`
`(constexpr desde C++20)`
`template< class U >`
`optional& operator=( const optional<U>& other ); | (5) | (desde C++17)`
`(constexpr desde C++20)`
`template< class U >`
`optional& operator=( optional<U>&& other ); | (6) | (desde C++17)`
`(constexpr desde C++20)`
`| |`

Substitui o conteúdo de `*this` pelo conteúdo de `other`.

1) Se `*this` contiver um valor antes da chamada, o valor contido é destruído chamando seu destrutor como se fosse `value().T::~T()`. `*this` não contém um valor após esta chamada.

2,3) Atribui o estado de `other`.

*   Se tanto `*this` quanto `other` não contiverem um valor, a função não tem efeito.
*   Se `*this` contiver um valor, mas `other` não, então o valor contido é destruído chamando seu destrutor. `*this` não contém um valor após a chamada.
*   Se `other` contiver um valor, então, dependendo se `*this` contiver um valor, o valor contido é [inicializado diretamente](<#/doc/language/direct_initialization>) ou atribuído de `*other` (2) ou `std::move(*other)` (3). Note que um `optional` do qual se moveu ainda _contém um valor_.
*   A sobrecarga (2) é deletada quando `std::is_copy_constructible_v<T>` ou `std::is_copy_assignable_v<T>` for `false`. É trivial se `std::is_trivially_copy_constructible_v<T>`, `std::is_trivially_copy_assignable_v<T>` e `std::is_trivially_destructible_v<T>` forem todos `true`.
*   A sobrecarga (3) não participa da resolução de sobrecarga quando `std::is_move_constructible_v<T>` ou `std::is_move_assignable_v<T>` for `false`. É trivial se `std::is_trivially_move_constructible_v<T>`, `std::is_trivially_move_assignable_v<T>` e `std::is_trivially_destructible_v<T>` forem todos `true`.

4) Atribuição com perfect-forwarding: dependendo se `*this` contém um valor antes da chamada, o valor contido é [inicializado diretamente](<#/doc/language/direct_initialization>) a partir de `std::forward<U>(value)` ou atribuído a partir de `std::forward<U>(value)`. A função não participa da resolução de sobrecarga a menos que `std::decay_t<U>` (até C++20) `std::remove_cvref_t<U>` (desde C++20) não seja `std::optional<T>`, `std::is_constructible_v<T, U>` seja `true`, `std::is_assignable_v<T&, U>` seja `true`, e pelo menos uma das seguintes condições seja `true`:

*   `T` não é um [tipo escalar](<#/doc/language/type-id>);
*   `std::decay_t<U>` não é `T`.

5,6) Atribui o estado de `other`.

*   Se tanto `*this` quanto `other` não contiverem um valor, a função não tem efeito.
*   Se `*this` contiver um valor, mas `other` não, então o valor contido é destruído chamando seu destrutor. `*this` não contém um valor após a chamada.
*   Se `other` contiver um valor, então, dependendo se `*this` contiver um valor, o valor contido é [inicializado diretamente](<#/doc/language/direct_initialization>) ou atribuído de `*other` (5) ou `std::move(*other)` (6). Note que um `optional` do qual se moveu ainda _contém um valor_.
*   Essas sobrecargas não participam da resolução de sobrecarga a menos que as seguintes condições sejam atendidas:
    *   `T` não é construtível, conversível ou atribuível a partir de qualquer expressão do tipo (possivelmente `const`) `std::optional<U>`, ou seja, os 12 `type traits` a seguir são todos `false`:
        *   `std::is_constructible_v<T, std::optional<U>&>`
        *   `std::is_constructible_v<T, const std::optional<U>&>`
        *   `std::is_constructible_v<T, std::optional<U>&&>`
        *   `std::is_constructible_v<T, const std::optional<U>&&>`
        *   `std::is_convertible_v<std::optional<U>&, T>`
        *   `std::is_convertible_v<const std::optional<U>&, T>`
        *   `std::is_convertible_v<std::optional<U>&&, T>`
        *   `std::is_convertible_v<const std::optional<U>&&, T>`
        *   `std::is_assignable_v<T&, std::optional<U>&>`
        *   `std::is_assignable_v<T&, const std::optional<U>&>`
        *   `std::is_assignable_v<T&, std::optional<U>&&>`
        *   `std::is_assignable_v<T&, const std::optional<U>&&>`
    *   Para a sobrecarga (5), `std::is_constructible_v<T, const U&>` e `std::is_assignable_v<T&, const U&>` são ambos `true`.
    *   Para a sobrecarga (6), `std::is_constructible_v<T, U>` e `std::is_assignable_v<T&, U>` são ambos `true`.

### Parâmetros

- **other** — outro objeto `optional` cujo valor contido deve ser atribuído
- **value** — valor a ser atribuído ao valor contido

### Valor de retorno

`*this`

### Exceções

2-6) Lança qualquer exceção lançada pelo construtor ou operador de atribuição de `T`. Se uma exceção for lançada, o estado de inicialização de `*this` (e de `other` no caso de ([2,3](<#/>)) e ([5,6](<#/>))) permanece inalterado, ou seja, se o objeto continha um valor, ele ainda contém um valor, e vice-versa. O conteúdo de `value` e os valores contidos em `*this` e `other` dependem das garantias de segurança de exceção da operação da qual a exceção se origina (construtor de cópia, atribuição de movimento, etc.).

3) Possui a seguinte especificação [`noexcept`](<#/doc/language/noexcept_spec>):
`noexcept([std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)<T> && [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)<T>)`

### Notas

Um objeto `optional` `op` pode ser transformado em um `optional` vazio com `op = {};` e `op = nullopt;`. A primeira expressão constrói um objeto `optional` vazio com `{}` e o atribui a `op`.

```cpp
Macro de teste de recurso | Valor | Std | Recurso
`__cpp_lib_optional` | `202106L`  // (C++20)
(DR20) | Totalmente `constexpr` (1), (4-6)
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <optional>
    
    int main()
    {
        std::optional<const char*> s1 = "abc", s2; // constructor
        s2 = s1; // assignment
        s1 = "def"; // decaying assignment (U = char[4], T = const char*)
        std::cout << *s2 << ' ' << *s1 << '\n';
    }
```

Saída:
```
    abc def
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[`P0602R4`](<https://wg21.link/P0602R4>) | C++17 | operador de atribuição de cópia/movimento pode não ser trivial
mesmo que as operações subjacentes sejam triviais | exigido para propagar a trivialidade
[`P2231R1`](<https://wg21.link/P2231R1>) | C++20 | operadores de atribuição de conversão ([1](<#/>)) e ([4-6](<#/>)) não eram `constexpr`
enquanto as operações necessárias podem ser em C++20 | tornados `constexpr`

### Veja também

[`emplace`](<#/doc/utility/optional/emplace>) | constrói o valor contido no local
(função membro pública)