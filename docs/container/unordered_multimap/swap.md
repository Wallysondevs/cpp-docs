# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::swap

```cpp
void swap( unordered_multimap& other );  // (desde C++11)
(até C++17)
void swap( unordered_multimap& other ) noexcept(/* see below */);  // (desde C++17)
```

  
Troca o conteúdo do container com o de `other`. Não invoca nenhuma operação de move, copy ou swap em elementos individuais. 

Todos os iterators e referências permanecem válidos. O iterator [`end()`](<#/doc/container/unordered_multimap/end>) é invalidado. Os objetos `Hash` e `KeyEqual` devem ser [Swappable](<#/doc/named_req/Swappable>), e são trocados usando chamadas não qualificadas para o `swap` não-membro. 

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_swap::value for `true`, então os allocators são trocados usando uma chamada não qualificada para o `swap` não-membro. Caso contrário, eles não são trocados (e se `get_allocator() != other.get_allocator()`, o comportamento é indefinido).  | (desde C++11)  
  
### Parâmetros

other  |  \-  |  container para trocar o conteúdo com   
  
### Exceções

```cpp
Qualquer exceção lançada pela troca dos objetos `Hash` ou `KeyEqual`.  // (até C++17)
Especificação `noexcept`: noexcept(std::allocator_traits<Allocator>::is_always_equal::value
&& std::is_nothrow_swappable<Hash>::value
&& std::is_nothrow_swappable<key_equal>::value)  // (desde C++17)
```
  
### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <utility>
    #include <unordered_map>
    
    // print out a std::pair
    template<class Os, class U, class V>
    Os& operator<<(Os& os, const std::pair<U, V>& p)
    {
        return os << p.first << ':' << p.second;
    }
    
    // print out a container
    template<class Os, class Co>
    Os& operator<<(Os& os, const Co& co)
    {
        os << '{';
        for (auto const& i : co)
            os << ' ' << i;
        return os << " }\n";
    }
    
    int main()
    {
        std::unordered_multimap<std::string, std::string>
            m1{{"γ", "gamma"}, {"β", "beta"}, {"α", "alpha"}, {"γ", "gamma"}},
            m2{{"ε", "epsilon"}, {"δ", "delta"}, {"ε", "epsilon"}};
    
        const auto& ref = *(m1.begin());
        const auto iter = std::next(m1.cbegin());
    
        std::cout << "──────── before swap ────────\n"
                  << "m1: " << m1 << "m2: " << m2 << "ref: " << ref
                  << "\niter: " << *iter << '\n';
    
        m1.swap(m2);
    
        std::cout << "──────── after swap ────────\n"
                  << "m1: " << m1 << "m2: " << m2 << "ref: " << ref
                  << "\niter: " << *iter << '\n';
    
        // Note that every iterator referring to an element in one container before
        // the swap refers to the same element in the other container after the swap.
        // Same is true for references.
    }
```

Saída possível: 
```
    ──────── before swap ────────
    m1: { α:alpha β:beta γ:gamma γ:gamma }
    m2: { δ:delta ε:epsilon ε:epsilon }
    ref: α:alpha
    iter: β:beta
    ──────── after swap ────────
    m1: { δ:delta ε:epsilon ε:epsilon }
    m2: { α:alpha β:beta γ:gamma γ:gamma }
    ref: α:alpha
    iter: β:beta
```

### Veja também

[ std::swap(std::unordered_multimap)](<#/doc/container/unordered_multimap/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  