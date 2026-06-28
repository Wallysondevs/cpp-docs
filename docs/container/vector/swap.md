# std::vector&lt;T,Allocator&gt;::swap

```cpp
void swap( vector& other ); |  | (ate C++17)
void swap( vector& other ) noexcept(/* veja abaixo */);  // (desde C++17)
(ate C++20)
constexpr void swap( vector& other ) noexcept(/* veja abaixo */);  // (desde C++20)
```

  
Troca o conteúdo e a capacidade do container com os de other. Não invoca nenhuma operação de move, copy ou swap em elementos individuais. 

Todos os iterators e referências permanecem válidos. O iterator [`end()`](<#/doc/container/vector/end>) é invalidado. 

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_swap::value for true, então os allocators são trocados usando uma chamada não qualificada para o `swap` não-membro. Caso contrário, eles não são trocados (e se get_allocator() != other.get_allocator(), o comportamento é indefinido).  | (desde C++11)  
  
### Parâmetros

other  |  \-  |  container para trocar o conteúdo   
  
### Exceções

```cpp
(nenhuma)  | (ate C++17)
Especificação `noexcept`: noexcept(std::allocator_traits<Allocator>::propagate_on_container_swap::value
|| std::allocator_traits<Allocator>::is_always_equal::value)  // (desde C++17)
```
  
### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <vector>
     
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
        std::vector<int> a1{1, 2, 3}, a2{4, 5};
     
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

###  Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 341](<https://cplusplus.github.io/LWG/issue341>) | C++98  | as capacidades de `std::vector` não podiam ser trocadas  | elas também são trocadas   
  
### Veja também

[ std::swap(std::vector)](<#/doc/container/vector/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  