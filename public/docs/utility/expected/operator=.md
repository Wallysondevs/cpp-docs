# std::expected&lt;T,E&gt;::operator=

```cpp
Modelo primário
constexpr expected& operator=( const expected& other );  // (1) (desde C++23)
constexpr expected& operator=( expected&& other )
noexcept(/* see below */);  // (2) (desde C++23)
template< class U = T >
constexpr expected& operator=( U&& v );  // (3) (desde C++23)
template< class G >
constexpr expected& operator=( const std::unexpected<G>& e );  // (4) (desde C++23)
template< class G >
constexpr expected& operator=( std::unexpected<G>&& e );  // (5) (desde C++23)
Especialização parcial para void
constexpr expected& operator=( const expected& other );  // (6) (desde C++23)
constexpr expected& operator=( expected&& other )
noexcept(/* see below */);  // (7) (desde C++23)
template< class G >
constexpr expected& operator=( const std::unexpected<G>& e );  // (8) (desde C++23)
template< class G >
constexpr expected& operator=( std::unexpected<G>&& e );  // (9) (desde C++23)
Modelo de função auxiliar
template< class T, class U, class... Args >
constexpr void reinit-expected( T& newval, U& oldval, Args&&... args )  // (10) (desde C++23)
(apenas para exposição*)
```

Atribui um novo valor a um objeto `expected` existente.

### Parâmetros

- **other** — outro objeto `expected` cujo valor contido será atribuído
- **v** — valor a ser atribuído ao valor contido
- **e** — objeto [`std::unexpected`](<#/doc/utility/expected/unexpected>) cujo valor contido será atribuído
- **newval** — o valor contido a ser construído
- **oldval** — o valor contido a ser destruído
- **args** — os argumentos usados como inicializadores de newval

### Efeitos

#### Operadores de atribuição do modelo primário

1,2) Atribui o estado de other a *this.

Se [`has_value()`](<#/doc/utility/expected/operator_bool>) e rhs.has_value() tiverem valores diferentes (ou seja, um de *this e other contém um valor esperado [`_val_`](<#/doc/utility/expected>) e o outro contém um valor inesperado [`_unex_`](<#/doc/utility/expected>)), o modelo de função apenas para exposição [`_reinit-expected_`](<#/>) é chamado para atualizar o estado com segurança.

1) O valor contido é atribuído da seguinte forma: Valor de
[`has_value()`](<#/doc/utility/expected/operator_bool>) | Valor de other.has_value()
---|---
true | false
true | `_val_` `= *other; | `_reinit-expected_`
` `(`_unex_` ,` ` _val_` , other.error());
false | `_reinit-expected_`
---|---
` `(`_val_` ,` ` _unex_` , *other); | `_unex_` `= other.error();

2) O valor contido é atribuído da seguinte forma: Valor de
[`has_value()`](<#/doc/utility/expected/operator_bool>) | Valor de other.has_value()
---|---
true | false
true | `_val_` `= std::move(*other); | `_reinit-expected_`
` `(`_unex_` ,` ` _val_` , std::move(other.error()));
false | `_reinit-expected_`
` `(`_val_` ,` ` _unex_` ,
` `std::move(*other)); | `_unex_` `= std::move(other.error());

Então, se nenhuma exceção foi lançada, executa [`_has_val_`](<#/doc/utility/expected>)` `= other.has_value();.

3) O valor esperado é atribuído da seguinte forma: Valor de
[`has_value()`](<#/doc/utility/expected/operator_bool>) | Equivalente a
---|---
true | `_val_` `= [std::forward](<#/doc/utility/forward>)&lt;U&gt;(v);
false | `_reinit-expected_`(`_val_` ,` ` _unex_` , [std::forward](<#/doc/utility/forward>)&lt;U&gt;(v));
`_has_val_` `= false;

4,5) O valor inesperado é atribuído da seguinte forma: Sobrecarga | Valor de
---|---
[`has_value()`](<#/doc/utility/expected/operator_bool>) | Equivalente a
([4](<#/>)) | true | `_reinit-expected_`(`_val_` ,` ` _unex_` , [std::forward](<#/doc/utility/forward>)&lt;const G&&gt;(e.error()));
`_has_val_` `= false;
false | `_unex_` `= [std::forward](<#/doc/utility/forward>)&lt;const G&&gt;(e.error());
([5](<#/>)) | true | `_reinit-expected_`(`_val_` ,` ` _unex_` , [std::forward](<#/doc/utility/forward>)&lt;G&gt;(e.error()));
`_has_val_` `= false;
false | `_unex_` `= [std::forward](<#/doc/utility/forward>)&lt;G&gt;(e.error());

#### Operadores de atribuição da especialização parcial para void

6) O valor inesperado é atribuído ou destruído da seguinte forma: Valor de
[`has_value()`](<#/doc/utility/expected/operator_bool>) | Valor de other.has_value()
---|---
true | false
true | (sem efeitos) | [std::construct_at](<#/doc/memory/construct_at>)
` `([std::addressof](<#/doc/memory/addressof>)(`_unex_`), rhs.`_unex_`);
`_has_val_` `= false;
false | [std::destroy_at](<#/doc/memory/destroy_at>)([std::addressof](<#/doc/memory/addressof>)(`_unex_`));
---|---
`_has_val_` `= true; | `_unex_` `= other.error();

7) O valor inesperado é atribuído ou destruído da seguinte forma: Valor de
[`has_value()`](<#/doc/utility/expected/operator_bool>) | Valor de other.has_value()
---|---
true | false
true | (sem efeitos) | [std::construct_at](<#/doc/memory/construct_at>)
` `([std::addressof](<#/doc/memory/addressof>)(`_unex_`),
` `std::move(rhs.`_unex_`));
`_has_val_` `= false;
false | [std::destroy_at](<#/doc/memory/destroy_at>)([std::addressof](<#/doc/memory/addressof>)(`_unex_`));
---|---
`_has_val_` `= true; | `_unex_` `= std::move(other.error());

8,9) O valor inesperado é atribuído da seguinte forma: Sobrecarga | Valor de
---|---
[`has_value()`](<#/doc/utility/expected/operator_bool>) | Equivalente a
([8](<#/>)) | true | [std::construct_at](<#/doc/memory/construct_at>)([std::addressof](<#/doc/memory/addressof>)(`_unex_`),
` `[std::forward](<#/doc/utility/forward>)&lt;const G&&gt;(e.error()));
`_has_val_` `= false;
false | `_unex_` `= [std::forward](<#/doc/utility/forward>)&lt;const G&&gt;(e.error());
([9](<#/>)) | true | [std::construct_at](<#/doc/memory/construct_at>)([std::addressof](<#/doc/memory/addressof>)(`_unex_`), [std::forward](<#/doc/utility/forward>)&lt;G&gt;(e.error()));
`_has_val_` `= false;
false | `_unex_` `= [std::forward](<#/doc/utility/forward>)&lt;G&gt;(e.error());

#### Modelo de função auxiliar

O modelo de função apenas para exposição `_reinit-expected_` é “definido” da seguinte forma:
```cpp
    template<class NewType, class OldType, class... Args>
    constexpr void reinit-expected(NewType& new_val, OldType& old_val, Args&&... args)
    {
        // Case 1: the construction of “new_val” is non-throwing:
        // “new_val” can be directly constructed after destroying “old_val”
        if constexpr (std::is_nothrow_constructible_v<NewType, Args...>)
        {
            std::destroy_at(std::addressof(old_val));
            std::construct_at(std::addressof(new_val), std::forward<Args>(args)...);
        }
        // Case 2: the move construction of “new_val” is non-throwing:
        // constuct a temporary NewType object first
        // (“old_val” is left intact if an exception is thrown from this construction)
        else if constexpr (std::is_nothrow_move_constructible_v<NewType>)
        {
            NewType temp(std::forward<Args>(args)...); // may throw
            std::destroy_at(std::addressof(old_val));
            std::construct_at(std::addressof(new_val), std::move(temp));
        }
        // Case 3: the construction of “new_val” is potentially-throwing:
        // a backup of “old_val” is required in order to recover from an exception
        else
        {
            OldType temp(std::move(old_val)); // may throw
            std::destroy_at(std::addressof(old_val));
            try
            {
                std::construct_at(std::addressof(new_val),
                                  std::forward<Args>(args)...); // may throw
            }
            catch (...)
            {
                std::construct_at(std::addressof(old_val), std::move(temp));
                throw;
            }
        }
    }
```

Este modelo de função é chamado quando a atribuição fará com que *this contenha o valor alternativo (ou seja, de valor esperado para valor inesperado, ou de valor inesperado para valor esperado).

Neste caso, o valor antigo oldval precisa ser destruído antes de construir o novo valor newval. No entanto, a construção de newval pode lançar uma exceção. A fim de fornecer uma [garantia forte de segurança de exceção](<#/doc/language/exceptions>), o valor antigo precisa ser restaurado antes de relançar a exceção para que *this tenha um estado válido enquanto a exceção estiver sendo tratada.

### Valor de retorno

1-9) *this

### Restrições e informações suplementares

#### Operadores de atribuição do modelo primário

1) Esta sobrecarga é definida como deletada a menos que todos os valores a seguir sejam verdadeiros:

  * [std::is_copy_assignable_v](<#/doc/types/is_copy_assignable>)&lt;T&gt;
  * [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt;
  * [std::is_copy_assignable_v](<#/doc/types/is_copy_assignable>)&lt;E&gt;
  * [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;E&gt;
  * [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; || [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt;

2) Esta sobrecarga participa da resolução de sobrecarga apenas se todos os valores a seguir forem verdadeiros:

  * [std::is_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;T&gt;
  * [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt;
  * [std::is_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;E&gt;
  * [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt;
  * [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; || [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt;

3) Esta sobrecarga participa da resolução de sobrecarga apenas se todas as condições a seguir forem satisfeitas:

  * [std::is_same_v](<#/doc/types/is_same>)<expected, [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;U&gt;> é falso.
  * [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;U&gt; não é uma especialização de `std::unexpected`.
  * Todos os valores a seguir são verdadeiros:
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, U>
    * [std::is_assignable_v](<#/doc/types/is_assignable>)<T&, U>
    * [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<T, U> || [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)<T>
[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt;

4) Esta sobrecarga participa da resolução de sobrecarga apenas se todos os valores a seguir forem verdadeiros:

  * [std::is_constructible_v](<#/doc/types/is_constructible>)<E, const G&>
  * [std::is_assignable_v](<#/doc/types/is_assignable>)<E&, const G&>
  * [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<E, const G&> || [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt;
[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt;

5) Esta sobrecarga participa da resolução de sobrecarga apenas se todos os valores a seguir forem verdadeiros:

  * [std::is_constructible_v](<#/doc/types/is_constructible>)<E, G>
  * [std::is_assignable_v](<#/doc/types/is_assignable>)<E&, G>
  * [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<E, G> || [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt;
[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt;

#### Operadores de atribuição da especialização parcial para void

6) Esta sobrecarga é definida como deletada a menos que [std::is_copy_assignable_v](<#/doc/types/is_copy_assignable>)&lt;E&gt; e [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;E&gt; sejam ambos verdadeiros.

7) Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; e [std::is_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;E&gt; sejam ambos verdadeiros.

8) Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, const G&> e [std::is_assignable_v](<#/doc/types/is_assignable>)<E&, const G&> sejam ambos verdadeiros.

9) Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, G> e [std::is_assignable_v](<#/doc/types/is_assignable>)<E&, G> sejam ambos verdadeiros.

### Exceções

2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(

[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; && [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;T&gt; &&

[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; && [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;E&gt;)

7)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; && [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;E&gt;)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 4025](<https://cplusplus.github.io/LWG/issue4025>) | C++23 | a sobrecarga (7) era definida como deletada se `E` não fosse
move constructible ou não fosse move assignable | ela não participa da
resolução de sobrecarga neste caso

### Ver também

[ emplace](<#/doc/utility/expected/emplace>) | constrói o valor esperado no local
(função membro pública)