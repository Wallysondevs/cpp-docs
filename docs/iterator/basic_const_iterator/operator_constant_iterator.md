# std::basic_const_iterator&lt;Iter&gt;::operador iterador constante

```cpp
template< /*not-a-const-iterator*/ CI >
requires /*constant-iterator*/<CI> &&
std::convertible_to<Iter const&, CI>
constexpr operator CI() const &;  // (1) (desde C++23)
template< /*not-a-const-iterator*/ CI >
requires /*constant-iterator*/<CI> &&
std::convertible_to<Iter, CI>
constexpr operator CI() &&;  // (2) (desde C++23)
```

  
Retorna o iterador constante convertido para o qual um iterador subjacente [`_current_`](<#/doc/iterator/basic_const_iterator>) pode ser explicitamente ou implicitamente conversível. 

CI satisfaz o concept apenas para exposição /*not-a-const-iterator*/ se e somente se não for uma especialização de `basic_const_iterator`. 

### Valor de retorno

1) `_current_`

2) std::move(`_current_`)

### Exemplo

Run this code
```
    #include <iterator>
    #include <ranges>
    #include <vector>
     
    void foo(std::vector<int>::const_iterator) {}
     
    int main()
    {
        auto v = std::vector<int>();
        {
            // ranges::cbegin below returns vector<int>::const_iterator
            auto i1 = std::ranges::cbegin(v);
            foo(i1); // okay
        }
     
        auto t = v | std::views::take_while( { return x < 100; });
        {
            // ranges::cbegin below returns basic_const_iterator<vector<int>::iterator>
            auto i2 = std::ranges::cbegin(t);
            foo(i2); // error until P2836R1
        }
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2836R1](<https://wg21.link/P2836R1>) | C++23  | `basic_const_iterator` não segue a convertibilidade de seu tipo subjacente  | operador de conversão fornecido 