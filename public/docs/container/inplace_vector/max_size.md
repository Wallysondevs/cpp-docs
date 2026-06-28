# std::inplace_vector&lt;T,N&gt;::max_size

```cpp
static constexpr size_type max_size() noexcept;  // (desde C++26)
```

  
Retorna o número máximo de elementos que o container é capaz de armazenar. 

### Parâmetros

(nenhum) 

### Valor de retorno

Número máximo de elementos, ou seja, `N`. 

### Complexidade

Constante. 

### Observações

Como cada [std::inplace_vector](<#/doc/container/inplace_vector>)<T, N> é um container de capacidade fixa, o valor retornado por `max_size` é igual a `N` (que também é o valor retornado por capacity()). 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <inplace_vector>
    
    int main()
    {
        std::inplace_vector<char, 10> p;
        std::inplace_vector<long, 10> q;
    
        std::cout.imbue(std::locale("en_US.UTF-8"));
        std::cout << std::uppercase
                  << "p.max_size() = " << std::dec << p.max_size() << " = 0x"
                  << std::hex << p.max_size() << '\n'
                  << "q.max_size() = " << std::dec << q.max_size() << " = 0x"
                  << std::hex << q.max_size() << '\n';
    }
```

Saída: 
```
    p.max_size() = 10 = 0xA
    q.max_size() = 10 = 0xA
```

### Veja também

[ size](<#/doc/container/inplace_vector/size>) |  retorna o número de elementos   
(função membro pública)  
[ capacity](<#/doc/container/inplace_vector/capacity>)[static] |  retorna o número de elementos que podem ser armazenados no espaço alocado atualmente   
(função membro estática pública)