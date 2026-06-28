# std::common_iterator&lt;I,S&gt;::operator++

```cpp
constexpr common_iterator& operator++();  // (1) (desde C++20)
constexpr decltype(auto) operator++( int );  // (2) (desde C++20)
Tipos auxiliares
class /*postfix_proxy*/ {
std::iter_value_t<I> keep_;
constexpr postfix_proxy(std::iter_reference_t<I>&& x)
: keep_(std::forward<std::iter_reference_t<I>>(x)) {}
public:
constexpr const std::iter_value_t<I>& operator*() const noexcept {
return keep_;
}
};  // (3) (apenas para exposição*)
```

  
Incrementa o iterator subjacente.

O comportamento é indefinido se o objeto membro [std::variant](<#/doc/utility/variant>) subjacente `_var_` não contém um objeto do tipo `I`, ou seja, [std::holds_alternative](<#/doc/utility/variant/holds_alternative>)&lt;I&gt;(var) é igual a false.

Seja `it` denotando o iterator do tipo `I` contido por `_var_`, isto é, std::get&lt;I&gt;(var).

1) Pré-incrementa em um. Equivalente a `++it; return *this;`.

2) Pós-incrementa em um:

  * Equivalente a: `auto tmp = *this; ++*this; return tmp;`, se `I` modela [`forward_iterator`](<#/doc/iterator/forward_iterator>).
  * Equivalente a: `return it++;`, se a definição da variável `auto&& ref = *it++;` é bem-formada, ou
    
  * [std::indirectly_readable](<#/doc/iterator/indirectly_readable>)&lt;I&gt; ou
  * [std::constructible_from](<#/doc/concepts/constructible_from>)<[std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;, [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;> ou
  * [std::move_constructible](<#/doc/concepts/move_constructible>)<[std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;>

     é false.

  * Equivalente a: `postfix_proxy p(**this); ++*this; return p;` caso contrário, onde `_postfix_proxy_` é um tipo auxiliar apenas para exposição (3).

### Parâmetros

(nenhum)

### Valor de retorno

1) `*this`

2) Uma cópia de `*this` que foi feita antes da alteração, ou um resultado do pós-incremento do iterator subjacente, ou um proxy mantendo o valor do elemento atual, conforme descrito acima.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <initializer_list>
    #include <iostream>
    #include <iterator>
     
    int main()
    {
        const auto il = {1, 2, 3, 4, 5, 6};
     
        using CI = std::common_iterator<
                       std::counted_iterator<std::initializer_list<int>::iterator>,
                       std::default_sentinel_t
                       >;
     
        CI first{std::counted_iterator{std::begin(il), std::ssize(il) - 2}};
     
        for (; first != std::default_sentinel; ++first)
            std::cout << *first << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 2 3 4
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2259R1](<https://wg21.link/P2259R1>) | C++20  | o pós-incremento pode descartar seu resultado em mais situações  | uma classe proxy é usada para manter o resultado   
[LWG 3546](<https://cplusplus.github.io/LWG/issue3546>) | C++20  | a inicialização do objeto proxy era às vezes malformada  | situação e definição ajustadas   
[LWG 3574](<https://cplusplus.github.io/LWG/issue3574>) | C++20  | `variant` era totalmente constexpr (P2231R1) mas `common_iterator` não era  | também foi tornado constexpr   
[LWG 3595](<https://cplusplus.github.io/LWG/issue3595>) | C++20  | funções do tipo proxy não tinham constexpr e noexcept  | adicionado   
  
### Veja também

[ operator-](<#/doc/iterator/common_iterator/operator->) |  calcula a distância entre dois adaptadores de iterator   
(modelo de função)  