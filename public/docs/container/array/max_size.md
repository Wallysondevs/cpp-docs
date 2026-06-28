# std::array&lt;T,N&gt;::max_size

```cpp
constexpr size_type max_size() const noexcept;  // (desde C++11)
```

  
Retorna o número máximo de elementos que o container é capaz de armazenar. 

### Parâmetros

(nenhum) 

### Valor de retorno

Número máximo de elementos, ou seja, `N`. 

### Complexidade

Constante. 

### Observações

Como cada [std::array](<#/doc/container/array>)<T, N> é um container de tamanho fixo, o valor retornado por `max_size` é igual a `N` (que também é o valor retornado por [size()](<#/doc/container/array/size>)). 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <locale>
    #include <array>
     
    int main()
    {
        std::array<char, 10> p;
        std::array<long, 10> q;
     
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

[ size](<#/doc/container/array/size>) |  retorna o número de elementos   
(função membro pública)  