# std::ranges::views::common, std::ranges::common_view

Definido no cabeçalho `<ranges>`

```c
template< ranges::view V >
requires (not ranges::common_range<V> and
std::copyable<ranges::iterator_t<V>>)
class common_view
: public ranges::view_interface<common_view<V>>
namespace views {
inline constexpr /* unspecified */ common = /* unspecified */;
}
Call signature
template< ranges::viewable_range R >
requires /* see below */
constexpr ranges::view auto common( R&& r );
```

  
1) Adapta uma [`view`](<#/doc/ranges/view>) dada com tipos diferentes para o par iterador/sentinela em uma [`view`](<#/doc/ranges/view>) que também é um [`common_range`](<#/doc/ranges/common_range>). Uma `common_view` sempre tem o mesmo tipo de iterador/sentinela.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Seja `e` uma subexpressão. Então a expressão `views::common(e)` é [equivalente em expressão](<#/doc/language/expressions>) a: 

  * [views::all](<#/doc/ranges/all_view>)(e), se for uma expressão bem formada e `decltype((e))` modela [`common_range`](<#/doc/ranges/common_range>); 
  * `common_view{e}` caso contrário.

### Membros de dados

Member name  |  Definition   
---|---
`_base__` (private) |  A view subjacente do tipo `V`.  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (construtor)](<#/doc/ranges/common_view/common_view>) |  constrói uma `common_view`   
(função membro pública)  
[ base](<#/doc/ranges/common_view/base>) |  retorna uma cópia da view subjacente (adaptada)   
(função membro pública)  
[ begin](<#/doc/ranges/common_view/begin>) |  retorna um iterador para o início   
(função membro pública)  
[ end](<#/doc/ranges/common_view/end>) |  retorna um iterador para o fim   
(função membro pública)  
[ size](<#/doc/ranges/common_view/size>) |  retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>).   
(função membro pública)  
  
#####  Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)  
  
[ empty](<#/doc/ranges/view_interface/empty>) |  retorna se a view derivada está vazia. Fornecido se ela satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) |  retorna um iterador constante para o início do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) |  retorna um sentinela para o iterador constante do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) |  retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ data](<#/doc/ranges/view_interface/data>) |  obtém o endereço dos dados da view derivada. Fornecido se seu tipo de iterador satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ front](<#/doc/ranges/view_interface/front>) |  retorna o primeiro elemento na view derivada. Fornecido se ela satisfaz [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ back](<#/doc/ranges/view_interface/back>) |  retorna o último elemento na view derivada. Fornecido se ela satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ operator[]](<#/doc/ranges/view_interface/operator_at>) |  retorna o `n`-ésimo elemento na view derivada. Fornecido se ela satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
  
### [Guias de dedução](<#/doc/ranges/common_view/deduction_guides>)

### Modelos auxiliares

```cpp
template< class T >
constexpr bool enable_borrowed_range<std::ranges::common_view<T>> =
ranges::enable_borrowed_range<T>;  // (desde C++20)
```

  
Esta especialização de std::[ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>) faz com que `common_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando a view subjacente a satisfaz. 

### Notas

`common_view` pode ser útil para trabalhar com algoritmos legados que esperam que o iterador e o sentinela sejam do mesmo tipo. 

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <numeric>
    #include <ranges>
    
    int main()
    {
        auto v1 = {1, 2, 3, 4, 5};
        auto i1 = std::counted_iterator{v1.begin(), std::ssize(v1)};
        auto r1 = std::ranges::subrange{i1, std::default_sentinel};
    //  auto e1 = std::accumulate(r1.begin(), r1.end(), 0); // error: "common range" required
        auto c1 = std::ranges::common_view{r1};
        std::cout << "accumulate: " << std::accumulate(c1.begin(), c1.end(), 0) << '\n';
    
        // inherited from ranges::view_interface:
        std::cout << "c1.front(): " << c1.front() << '\n';
        std::cout << "c1.back(): " << c1.back() << '\n';
        std::cout << "c1.data(): " << c1.data() << '\n';
        std::cout << "c1[0]: " << c1[0] << '\n';
    
        auto v2 = std::list{1, 2, 3, 4, 5};
        auto i2 = std::counted_iterator{v2.begin(), std::ssize(v2)};
        auto r2 = std::ranges::subrange{i2, std::default_sentinel};
    //  auto e2 = std::accumulate(r2.begin(), r2.end(), 0); // error: "common range" required
        auto c2 = std::ranges::common_view{ r2 };
        std::cout << "accumulate: " << std::accumulate(c2.begin(), c2.end(), 0) << '\n';
    
        // inherited from ranges::view_interface:
        std::cout << "c2.front(): " << c2.front() << '\n';
    //  auto e3 = c2.back(); // error: "bidirectional range" required
    //  auto e4 = c2.data(); // error: "contiguous range" required
    //  auto e5 = c2[0];     // error: "random access range" required
    }
```

Saída possível: 
```
    accumulate: 15
    c1.front(): 1
    c1.back(): 5
    c1.data(): 0x7f19937f00d0
    c1[0]: 1
    accumulate: 15
    c2.front(): 1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3494](<https://cplusplus.github.io/LWG/issue3494>) | C++20  | `common_view` nunca foi um `borrowed_range` | é um `borrowed_range` se sua view subjacente for   
  
### Ver também

[ ranges::common_range](<#/doc/ranges/common_range>)(C++20) |  especifica que um range possui tipos de iterador e sentinela idênticos   
(concept)  
[ common_iterator](<#/doc/iterator/common_iterator>)(C++20) |  adapta um tipo de iterador e seu sentinela em um tipo de iterador comum   
(class template)