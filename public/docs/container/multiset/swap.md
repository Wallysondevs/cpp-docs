# std::multiset&lt;Key,Compare,Allocator&gt;::swap

```cpp
void swap( multiset& other );  // (até C++17)
void swap( multiset& other ) noexcept(/* see below */);  // (desde C++17)
```

  
Troca o conteúdo do container com o de `other`. Não invoca nenhuma operação de move, copy ou swap em elementos individuais.

Todos os iterators e referências permanecem válidos. O iterator [`end()`](<#/doc/container/multiset/end>) é invalidado. Os objetos `Compare` devem ser [Swappable](<#/doc/named_req/Swappable>), e são trocados usando uma chamada não qualificada para a função `swap` não-membro.

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_swap::value for true, então os allocators são trocados usando uma chamada não qualificada para a função `swap` não-membro. Caso contrário, eles não são trocados (e se get_allocator() != other.get_allocator(), o comportamento é indefinido). | (desde C++11)  
  
### Parâmetros

other  |  \-  |  container para trocar o conteúdo com   
  
### Exceções

```cpp
Qualquer exceção lançada pela troca dos objetos `Compare`.  // (até C++17)
`noexcept` especificação: noexcept(std::allocator_traits<Allocator>::is_always_equal::value
&& std::is_nothrow_swappable<Compare>::value)  // (desde C++17)
```
  
### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <set>
     
    template<class Os, class Co>
    Os& operator<<(Os& os, const Co& co)
    {
        os << '{';
        for (auto const& i : co)
            os << ' ' << i;
        return os << " } ";
    }
     
    int main()
    {
        std::multiset<int> a1{3, 1, 3, 2}, a2{5, 4, 5};
     
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
     
        struct Cmp : std::less<int>
        {
            int id{};
            Cmp(int i) : id{i} {}
        };
     
        std::multiset<int, Cmp> s1{{2, 2, 1, 1}, Cmp{6}}, s2{{4, 4, 3, 3}, Cmp{9}};
     
        std::cout << s1 << s2 << s1.key_comp().id << ' ' << s2.key_comp().id << '\n';
        s1.swap(s2);
        std::cout << s1 << s2 << s1.key_comp().id << ' ' << s2.key_comp().id << '\n';
     
        // So, comparator objects (Cmp) are also exchanged after the swap.
    }
```

Saída:
```
    { 1 2 3 3 } { 4 5 5 } 2 5 1 4
    { 4 5 5 } { 1 2 3 3 } 2 5 1 4
    { 1 1 2 2 } { 3 3 4 4 } 6 9
    { 3 3 4 4 } { 1 1 2 2 } 9 6
```

### Veja também

[ std::swap(std::multiset)](<#/doc/container/multiset/swap2>) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  