# std::common_iterator&lt;I,S&gt;::operator*,-&gt;

```cpp
constexpr decltype(auto) operator*();  // (1) (desde C++20)
constexpr decltype(auto) operator*() const
requires /*dereferenceable*/<const I>;  // (2) (desde C++20)
constexpr auto operator->() const
requires /* see description */;  // (3) (desde C++20)
Tipos auxiliares
class /*proxy*/ {
std::iter_value_t<I> keep_;
constexpr proxy(std::iter_reference_t<I>&& x)
: keep_(std::move(x)) {}
public:
constexpr const std::iter_value_t<I>* operator->() const noexcept {
return std::addressof(keep_);
}
};  // (4) (apenas para exposição*)
```

  
Retorna um ponteiro ou referência para o elemento atual, ou um proxy que o contém.

O comportamento é indefinido se o objeto membro `std::variant` subjacente `_var_` não contiver um objeto do tipo `I`, ou seja, se [std::holds_alternative](<#/doc/utility/variant/holds_alternative>)&lt;I&gt;(var) for igual a false.

Seja `it` o iterator do tipo `I` contido por `_var_`, ou seja, `std::get<I>(var)`.

1,2) Retorna o resultado da desreferenciação de `it`.

3) Retorna um ponteiro ou iterator subjacente para o elemento atual, ou um proxy que o contém:

  * Equivalente a `return it;`, se `I` for um tipo ponteiro ou se a expressão `it.operator->()` for bem-formada.
  * Caso contrário, equivalente a `auto&& tmp = *it; return [std::addressof](<#/doc/memory/addressof>)(tmp);`, se [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt; for um tipo referência.
  * Caso contrário, equivalente a `return proxy(*it);`, onde `_proxy_` é uma classe apenas para exposição (4).

A expressão na cláusula `requires` é equivalente a  
[std::indirectly_readable](<#/doc/iterator/indirectly_readable>)&lt;const I&gt; && (  

requires(const I& i) { i.operator->(); }
[std::is_reference_v](<#/doc/types/is_reference>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;>
[std::constructible_from](<#/doc/concepts/constructible_from>)<[std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;, [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;>  

).

### Parâmetros

(nenhum)

### Valor de retorno

1,2) Referência para o elemento atual, ou prvalue temporário. Equivalente a `*it`.

3) Ponteiro ou iterator para o elemento atual ou proxy que o contém, conforme descrito acima.

### Exemplo

Run this code
```cpp
    #include <complex>
    #include <initializer_list>
    #include <iostream>
    #include <iterator>
    
    using std::complex_literals::operator""i;
    
    int main()
    {
        const auto il = {1i, 3.14 + 2i, 3i, 4i, 5i};
    
        using CI = std::common_iterator<
            std::counted_iterator<decltype(il)::iterator>,
            std::default_sentinel_t>;
    
        CI ci{std::counted_iterator{std::next(begin(il), 1), std::ssize(il) - 1}};
    
        std::cout << *ci << ' ' << ci->real() << '\n';
    }
```

Saída:
```
    (3.14,2) 3.14
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3574](<https://cplusplus.github.io/LWG/issue3574>) | C++20  | `variant` era totalmente `constexpr` (P2231R1), mas `common_iterator` não era  | também foi tornado `constexpr`   
[LWG 3595](<https://cplusplus.github.io/LWG/issue3595>) | C++20  | funções do tipo proxy não tinham `constexpr` e `noexcept`  | adicionado   
[LWG 3672](<https://cplusplus.github.io/LWG/issue3672>) | C++20  | `operator->` poderia retornar por referência em casos usuais  | sempre retorna por valor   
  
### Veja também

[ (construtor)](<#/doc/iterator/common_iterator/common_iterator>)(C++20) |  constrói um novo adaptador de iterator   
(função membro pública)  