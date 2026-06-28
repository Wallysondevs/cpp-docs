# std::compare_three_way

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
Definido no cabeçalho `<functional>`
struct compare_three_way;
```

Objeto de função para realizar comparações. Deduz os tipos de parâmetro e o tipo de retorno do operador de chamada de função.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

operator() | obtém o resultado da comparação de três vias em ambos os argumentos
(função membro pública)

## std::compare_three_way::operator()

template< class T, class U >
constexpr auto operator()( T&& t, U&& u ) const;

Dada a expressão [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t) <=> [std::forward](<#/doc/utility/forward>)&lt;U&gt;(u) como expr:

* Se expr resultar em uma chamada para o operador built-in <=> comparando ponteiros, dado o [tipo de ponteiro composto](<#/doc/language/pointer>) de t e u como `P`:

* Compara os dois ponteiros convertidos (do tipo `P`) na [ordem total estrita definida pela implementação sobre ponteiros](<#/doc/language/operator_comparison>):

* Se t precede u, retorna [`std::strong_ordering::less`](<#/doc/utility/compare/strong_ordering>).
* Se u precede t, retorna [`std::strong_ordering::greater`](<#/doc/utility/compare/strong_ordering>).
* Caso contrário, retorna [`std::strong_ordering::equal`](<#/doc/utility/compare/strong_ordering>).

* Se a sequência de conversão de `T` para `P` ou a sequência de conversão de `U` para `P` não for [que preserva a igualdade](<#/doc/concepts>), o comportamento é indefinido.

* Caso contrário:

* Retorna o resultado de expr.
* Se [std::three_way_comparable_with](<#/doc/utility/compare/three_way_comparable>)<T, U> não for modelado, o comportamento é indefinido.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::three_way_comparable_with](<#/doc/utility/compare/three_way_comparable>)<T, U> for satisfeito.

### Exemplo

Execute este código
```cpp
    #include <compare>
    #include <iostream>
    
    struct Rational
    {
        int num;
        int den; // > 0
    
        // Although the comparison X <=> Y will work, a direct call
        // to std::compare_three_way{}(X, Y) requires the operator==
        // be defined, to satisfy the std::three_way_comparable_with.
        constexpr bool operator==(Rational const&) const = default;
    };
    
    constexpr std::weak_ordering operator<=>(Rational lhs, Rational rhs)
    {
        return lhs.num * rhs.den <=> rhs.num * lhs.den;
    }
    
    void print(std::weak_ordering value)
    {
        value < 0 ? std::cout << "less\n" :
        value > 0 ? std::cout << "greater\n" :
                    std::cout << "equal\n";
    }
    
    int main()
    {
        Rational a{6, 5};
        Rational b{8, 7};
        print(a <=> b);
        print(std::compare_three_way{}(a, b));
    }
```

Saída:
```
    greater
    greater
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3530](<https://cplusplus.github.io/LWG/issue3530>) | C++20 | verificações sintáticas foram relaxadas ao comparar ponteiros | apenas requisitos semânticos são relaxados

### Veja também

[ ranges::equal_to](<#/doc/utility/functional/ranges/equal_to>)(C++20) | objeto de função restrito implementando x == y
(classe)
[ ranges::not_equal_to](<#/doc/utility/functional/ranges/not_equal_to>)(C++20) | objeto de função restrito implementando x != y
(classe)
[ ranges::less](<#/doc/utility/functional/ranges/less>)(C++20) | objeto de função restrito implementando x < y
(classe)
[ ranges::greater](<#/doc/utility/functional/ranges/greater>)(C++20) | objeto de função restrito implementando x > y
(classe)
[ ranges::less_equal](<#/doc/utility/functional/ranges/less_equal>)(C++20) | objeto de função restrito implementando x <= y
(classe)
[ ranges::greater_equal](<#/doc/utility/functional/ranges/greater_equal>)(C++20) | objeto de função restrito implementando x >= y
(classe)