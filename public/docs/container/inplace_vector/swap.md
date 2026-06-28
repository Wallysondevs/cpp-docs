# std::inplace_vector&lt;T,N&gt;::swap

```cpp
constexpr void swap( inplace_vector& other ) noexcept(/* veja abaixo */);  // (desde C++26)
```

  
Troca o conteúdo do container com o de other. Não faz com que iterators e references se associem ao outro container. 

### Parâmetros

other  |  \-  |  container para trocar o conteúdo com   
  
### Valor de retorno

(nenhum) 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(N == 0
([std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;T&gt; && [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt;))

### Complexidade

Linear no tamanho do container. 

### Exemplo

Execute este código
```
    #include <inplace_vector>
    #include <print>
     
    int main()
    {
        std::inplace_vector<int, 3> a1{1, 2, 3}, a2{4, 5, 6};
     
        auto i1 = a1.begin();
        auto i2 = a2.begin();
        int& r1 = a1[1];
        int& r2 = a2[1];
     
        auto print_them_all = &
        {
            std::println("{}a1 = {}, a2 = {}, *i1 = {}, *i2 = {}, r1 = {}, r2 = {}",
                         rem, a1, a2, *i1, *i2, r1, r2);
        };
     
        print_them_all("Before swap:\n");
        a1.swap(a2);
        print_them_all("After swap:\n");
     
        // Note that after swap() iterators and references stay associated with their
        // original sites, e.g., i1 points to element a1[0], r1 refers to a1[1].
    }
```

Saída: 
```
    Before swap:
    a1 = [1, 2, 3], a2 = [4, 5, 6], *i1 = 1, *i2 = 4, r1 = 2, r2 = 5
    After swap:
    a1 = [4, 5, 6], a2 = [1, 2, 3], *i1 = 4, *i2 = 1, r1 = 5, r2 = 2
```

### Veja também

[ std::swap(std::inplace_vector)](<#/doc/container/inplace_vector/swap2>)(C++26) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  