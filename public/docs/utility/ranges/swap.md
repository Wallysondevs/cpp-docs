# std::ranges::swap

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
namespace ranges {
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ swap = /* unspecified */;
}
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T, class U >
constexpr void ranges::swap( T&& t, U&& u ) noexcept(/* see below */);
```

Troca os valores referenciados por t e u.

`[ranges::swap](<#/doc/utility/ranges/swap>)(t, u)` é [expressão-equivalente](<#/doc/language/expressions>) a:

1.  `(void)swap(t, u)`, se t ou u tiverem tipo de classe ou enumeração, e essa expressão for válida, onde a [resolução de sobrecarga](<#/doc/language/overload_resolution>) é realizada dentro do namespace `std::ranges` com o candidato adicional `template<class T> void swap(T&, T&) = delete;`.
    *   Se a função selecionada pela resolução de sobrecarga não trocar os valores referenciados por t e u, o programa é malformado; nenhum diagnóstico é exigido.
2.  Caso contrário, `(void)[ranges::swap_ranges](<#/doc/algorithm/ranges/swap_ranges>)(t, u)`, se t e u forem arrays lvalue de extensão igual (mas possivelmente tipos de elementos diferentes) e `[ranges::swap](<#/doc/utility/ranges/swap>)(*t, *u)` for uma expressão válida, exceto que `noexcept((void)ranges::swap_ranges(t, u))` é igual a `noexcept([ranges::swap](<#/doc/utility/ranges/swap>)(*t, *u))`.
3.  Caso contrário, uma expressão que troca os valores referenciados de t e u, se ambos forem lvalues do mesmo tipo `V` que modela [std::move_constructible](<#/doc/concepts/move_constructible>)&lt;V&gt; e [std::assignable_from](<#/doc/concepts/assignable_from>)<V&, V>.
    *   O resultado da aplicação do [operador `noexcept`](<#/doc/language/noexcept>) a essa expressão é igual a [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)<V> && [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)<V>.
    *   Essa expressão é uma [expressão constante](<#/doc/language/constant_expression>) se
        *   `V` é um [LiteralType](<#/doc/named_req/LiteralType>),
        *   ambos `t = std::move(u))` e `u = std::move(t)` são [subexpressões constantes](<#/doc/language/constant_expression>), e
        *   as [full-expressions](<#/doc/language/expressions>) dos inicializadores nas seguintes declarações são subexpressões constantes:
            *   `V v1(std::move(t));`
            *   `V v2(std::move(u));`
4.  Caso contrário, `[ranges::swap](<#/doc/utility/ranges/swap>)(t, u)` é malformado, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando `[ranges::swap](<#/doc/utility/ranges/swap>)(t, u)` aparece no contexto imediato de uma instanciação de template.

### Objetos de ponto de customização

O nome `ranges::swap` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___swap_fn_`.

Todas as instâncias de `___swap_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___swap_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como `const` ou não (no entanto, uma instância qualificada como `volatile` não é exigida para ser invocável). Assim, `ranges::swap` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se `std::declval<Args>()...` atender aos requisitos para argumentos de `ranges::swap` acima, `___swap_fn_` modela

*   [std::invocable](<#/doc/concepts/invocable>)<__swap_fn, Args...>,
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const __swap_fn, Args...&gt;,
*   [std::invocable](<#/doc/concepts/invocable>)<__swap_fn&, Args...>, e
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const __swap_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___swap_fn_` participa da resolução de sobrecarga.

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <concepts>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    #include <vector>
    
    void print(std::string_view name, 
               std::ranges::common_range auto const& p, 
               std::ranges::common_range auto const& q)
    {
        std::cout << name << "1{ ";
        for (auto const& i : p)
            std::cout << i << ' ';
        std::cout << "}, " << name << "2{ ";
        for (auto const& i : q)
            std::cout << i << ' ';
        std::cout << "}\n";
    }
    
    void print(std::string_view name, int p, int q)
    {
        std::cout << name << "1 = " << p << ", " << name << "2 = " << q << '\n';
    }
    
    struct IntLike
    {
        int v;
    };
    
    void swap(IntLike& lhs, int& rhs)
    {
        std::swap(lhs.v, rhs);
    }
    
    void swap(int& lhs, IntLike& rhs)
    {
        std::swap(lhs, rhs.v);
    }
    
    std::ostream& operator<<(std::ostream& out, IntLike i)
    {
        return out << i.v;
    }
    
    int main()
    {
        std::vector a1{10, 11, 12}, a2{13, 14};
        std::ranges::swap(a1, a2);
        print("a", a1, a2);
    
        std::array b1{15, 16, 17}, b2{18, 19, 20};
        std::ranges::swap(b1, b2);
        print("b", b1, b2);
    
        // std::array c1{1, 2, 3}; std::array c2{4, 5};
        // std::ranges::swap(c1, c2); // error: no swap found by ADL
    
        int d1[]{21, 22, 23}, d2[]{24, 25, 26};
        std::ranges::swap(d1, d2);
        print("d", d1, d2);
    
        // int e1[]{1, 2, 3}, e2[]{4, 5};
        // std::ranges::swap(e1, e2); // error: extents mismatch
    
        // char f1[]{1, 2, 3};
        // int  f2[]{4, 5, 6};
        // std::ranges::swap(f1, f2); // error: no swap(*f1, *f2) found by ADL
    
        IntLike g1[]{1, 2, 3};
        int     g2[]{4, 5, 6};
        std::ranges::swap(g1, g2); // heterogeneous swap supported
        print("g", g1, g2);
    
        int h1{27}, h2{28};
        std::ranges::swap(h1, h2);
        print("h", h1, h2);
    }
```

Saída:
```
    a1{ 13 14 }, a2{ 10 11 12 }
    b1{ 18 19 20 }, b2{ 15 16 17 }
    d1{ 24 25 26 }, d2{ 21 22 23 }
    g1{ 4 5 6 }, g2{ 1 2 3 }
    h1 = 28, h2 = 27
```

### Ver também

[swappable swappable_with](<#/doc/concepts/swappable>) (C++20) | especifica que um tipo pode ser trocado ou que dois tipos podem ser trocados entre si
(concept)
[swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(function template)