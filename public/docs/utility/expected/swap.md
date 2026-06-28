# std::expected&lt;T,E&gt;::swap

```cpp
Modelo primário
constexpr void swap( expected& other ) noexcept(/* see below */);  // (1) (desde C++23)
Especialização parcial void
constexpr void swap( expected& other ) noexcept(/* see below */);  // (2) (desde C++23)
```

Troca o conteúdo com o de `other`.

1) Os valores contidos são trocados da seguinte forma: Valor de
[`has_value()`](<#/doc/utility/expected/operator_bool>) | Valor de other.has_value()
---|---
true | false
true | using [std::swap](<#/doc/algorithm/swap>);
swap([`_val_`](<#/doc/utility/expected>) , rhs.`_val_`); | veja abaixo
false | other.swap(*this); | using [std::swap](<#/doc/algorithm/swap>);
swap([`_unex_`](<#/doc/utility/expected>) , rhs.`_unex_`);

Se [`has_value()`](<#/doc/utility/expected/operator_bool>) for `true` e `other.has_value()` for `false`, equivalente a:

```cpp
// Caso 1: as construções por movimento de valores inesperados não lançam exceções:
// “other.unex” será restaurado se a construção de “other.val” falhar
if constexpr (std::is_nothrow_move_constructible_v<E>)
{
    E temp(std::move(other.`_unex_`));
    std::destroy_at(std::addressof(other.`_unex_`));
    try
    {
        std::construct_at(std::addressof(other.`_val_`), std::move(`_val_`)); // pode lançar exceção
        std::destroy_at(std::addressof(`_val_`));
        std::construct_at(std::addressof(`_unex_`), std::move(temp));
    }
    catch(...)
    {
        std::construct_at(std::addressof(other.`_unex_`), std::move(temp));
        throw;
    }
}
// Caso 2: as construções por movimento de valores esperados não lançam exceções:
// “this->val” será restaurado se a construção de “this->unex” falhar
else
{
    T temp(std::move(`_val_`));
    std::destroy_at(std::addressof(`_val_`));
    try
    {
        std::construct_at(std::addressof(`_unex_`), std::move(other.`_unex_`)); // pode lançar exceção
        std::destroy_at(std::addressof(other.`_unex_`));
        std::construct_at(std::addressof(other.`_val_`), std::move(temp));
    }
    catch(...)
    {
        std::construct_at(std::addressof(`_val_`), std::move(temp));
        throw;
    }
}
`_has_val_` = false;
rhs.`_has_val_` = true;
```

Esta sobrecarga participa da resolução de sobrecarga apenas se todos os valores a seguir forem `true`:

  * [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;T&gt;
  * [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;E&gt;
  * [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; && [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt;
  * [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; || [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt;

2) Os valores inesperados são trocados da seguinte forma: Valor de
[`has_value()`](<#/doc/utility/expected/operator_bool>) | Valor de other.has_value()
---|---
true | false
true | using [std::swap](<#/doc/algorithm/swap>);
swap([`_val_`](<#/doc/utility/expected>) , rhs.`_val_`); | [std::construct_at](<#/doc/memory/construct_at>)([std::addressof](<#/doc/memory/addressof>)(`_unex_`),
` `std::move(rhs.`_unex_`));
[std::destroy_at](<#/doc/memory/destroy_at>)([std::addressof](<#/doc/memory/addressof>)(rhs.`_unex_`));
`_has_val_` = false;
rhs.`_has_val_` = true;
false | other.swap(*this); | using [std::swap](<#/doc/algorithm/swap>);
swap([`_unex_`](<#/doc/utility/expected>) , rhs.`_unex_`);

Esta sobrecarga participa da resolução de sobrecarga apenas se [`std::is_swappable_v`](<#/doc/types/is_swappable>)&lt;E&gt; e [`std::is_move_constructible_v`](<#/doc/types/is_move_constructible>)&lt;E&gt; forem ambos `true`.

### Parameters

- **other** — o objeto `expected` com o qual trocar o conteúdo

### Exceptions

1)

Especificação `noexcept`:

noexcept(

[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; && [std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;T&gt; &&
[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; && [std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;E&gt;

)

2)

Especificação `noexcept`:

noexcept(

[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; && [std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;E&gt;

)

### Example

Execute este código
```cpp
    #include <expected>
    #include <iostream>
    #include <string>
    
    using Ex = std::expected<std::string, int>;
    
    void show(const Ex& ex1, const Ex& ex2)
    {
        for (int i{}; i < 2; ++i)
        {
            std::cout << (i ? "ex2" : "ex1");
            if (const Ex& ex = (i ? ex2 : ex1); ex.has_value())
                std::cout << ".has_value() = " << *ex << '\n';
            else
                std::cout << ".error() = " << ex.error() << '\n';
        }
    }
    
    int main()
    {
        Ex ex1("\N{CAT FACE}");
        Ex ex2{"\N{GREEN HEART}"};
        show(ex1, ex2);
        ex1.swap(ex2);
        std::cout << "ex1.swap(ex2);\n";
        show(ex1, ex2);
        std::cout << '\n';
    
        ex2 = std::unexpected(13);
        show(ex1, ex2);
        std::cout << "ex1.swap(ex2);\n";
        ex1.swap(ex2);
        show(ex1, ex2);
        std::cout << '\n';
    
        ex2 = std::unexpected(19937);
        show(ex1, ex2);
        std::cout << "ex1.swap(ex2);\n";
        ex1.swap(ex2);
        show(ex1, ex2);
    }
```

Output:
```
    ex1.has_value() = 🐱
    ex2.has_value() = 💚
    ex1.swap(ex2);
    ex1.has_value() = 💚
    ex2.has_value() = 🐱
    
    ex1.has_value() = 💚
    ex2.error() = 13
    ex1.swap(ex2);
    ex1.error() = 13
    ex2.has_value() = 💚
    
    ex1.error() = 13
    ex2.error() = 19937
    ex1.swap(ex2);
    ex1.error() = 19937
    ex2.error() = 13
```

### See also

[ swap(std::expected)](<#/doc/utility/expected/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(function)