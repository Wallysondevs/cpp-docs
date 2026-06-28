# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::swap

```cpp
void swap( unordered_multiset& other );  // (desde C++11)
(até C++17)
void swap( unordered_multiset& other ) noexcept(/* see below */);  // (desde C++17)
```

  
Troca o conteúdo do container com o de `other`. Não invoca nenhuma operação de movimentação, cópia ou troca em elementos individuais.

Todos os iterators e referências permanecem válidos. O iterator [`end()`](<#/doc/container/unordered_multiset/end>) é invalidado. Os objetos `Hash` e `KeyEqual` devem ser [Swappable](<#/doc/named_req/Swappable>), e são trocados usando chamadas não qualificadas para o `swap` não-membro.

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_swap::value for `true`, então os allocators são trocados usando uma chamada não qualificada para o `swap` não-membro. Caso contrário, eles não são trocados (e se `get_allocator() != other.get_allocator()`, o comportamento é indefinido).  | (desde C++11)  
  
### Parâmetros

other  |  \-  |  container para trocar o conteúdo.   
  
### Exceções

```cpp
Qualquer exceção lançada pela troca dos objetos `Hash` ou `KeyEqual`.  // (até C++17)
`noexcept` especificação: noexcept(std::allocator_traits<Allocator>::is_always_equal::value
&& std::is_nothrow_swappable<Hash>::value
&& std::is_nothrow_swappable<key_equal>::value)  // (desde C++17)
```
  
### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <unordered_set>
    
    template<class Os, class Co> Os& operator<<(Os& os, const Co& co)
    {
        os << '{';
        for (auto const& i : co)
            os << ' ' << i;
        return os << " } ";
    }
    
    int main()
    {
        std::unordered_multiset<int> a1{3, 1, 3, 2}, a2{5, 4, 5};
    
        auto it1 = std::next(a1.begin());
        auto it2 = std::next(a2.begin());
    
        const int& ref1 = *(a1.begin());
        const int& ref2 = *(a2.begin());
    
        std::cout << a1 << a2 << *it1 << ' ' << *it2 << ' ' << ref1 << ' ' << ref2 << '\n';
        a1.swap(a2);
        std::cout << a1 << a2 << *it1 << ' ' << *it2 << ' ' << ref1 << ' ' << ref2 << '\n';
    
        // Note that every iterator referring to an element in one container before the swap
        // refers to the same element in the other container after the swap. Same is true
        // for references.
    }
```

Saída possível:
```
    { 2 3 3 1 } { 4 5 5 } 3 5 2 4
    { 4 5 5 } { 2 3 3 1 } 3 5 2 4
```

### Veja também

[ std::swap(std::unordered_multiset)](<#/doc/container/unordered_multiset/swap2>)(C++11) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  