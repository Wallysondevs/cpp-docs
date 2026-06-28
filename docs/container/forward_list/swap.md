# std::forward_list&lt;T,Allocator&gt;::swap

```cpp
void swap( forward_list& other );  // (desde C++11)
(até C++17)
void swap( forward_list& other ) noexcept(/* see below */);  // (desde C++17)
```

  
Troca o conteúdo do container com o de `other`. Não invoca nenhuma operação de move, copy ou swap em elementos individuais. 

Todos os iterators e referências permanecem válidos. É não especificado se um iterator que contém o valor [`end()`](<#/doc/container/forward_list/end>) neste container se referirá a este ou ao outro container após a operação. 

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_swap::value for `true`, então os allocators são trocados usando uma chamada não qualificada para o `swap` não-membro. Caso contrário, eles não são trocados (e se `get_allocator() != other.get_allocator()`, o comportamento é indefinido).  | (desde C++11)  
  
### Parâmetros

other  |  \-  |  container para trocar o conteúdo   
  
### Exceções

```cpp
(nenhuma)  // (até C++17)
`noexcept` especificação: noexcept(std::allocator_traits<Allocator>::is_always_equal::value)  // (desde C++17)
```
  
### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <forward_list>
     
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
        std::forward_list<int> a1{1, 2, 3}, a2{4, 5};
     
        auto it1 = std::next(a1.begin());
        auto it2 = std::next(a2.begin());
     
        int& ref1 = a1.front();
        int& ref2 = a2.front();
     
        std::cout << a1 << a2 << *it1 << ' ' << *it2 << ' ' << ref1 << ' ' << ref2 << '\n';
        a1.swap(a2);
        std::cout << a1 << a2 << *it1 << ' ' << *it2 << ' ' << ref1 << ' ' << ref2 << '\n';
     
        // Note que após o swap, os iterators e referências permanecem associados aos seus
        // elementos originais, por exemplo, it1 que apontava para um elemento em 'a1' com valor 2
        // ainda aponta para o mesmo elemento, embora este elemento tenha sido movido para 'a2'.
    }
```

Saída: 
```
    { 1 2 3 } { 4 5 } 2 5 1 4
    { 4 5 } { 1 2 3 } 2 5 1 4
```

### Veja também

[ std::swap(std::forward_list)](<#/doc/container/forward_list/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  