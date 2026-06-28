# std::bitset&lt;N&gt;::size

[std::size_t](<#/doc/types/size_t>) size() const; |  | (noexcept desde C++11)   
(constexpr desde C++11)  

  
Retorna o número de bits que o bitset contém. 

### Parâmetros

(nenhum) 

### Valor de retorno

o número de bits que o bitset contém, ou seja, o parâmetro de template `N`. 

### Exemplo

Execute este código
```
    #include <bitset>
    #include <iostream>
     
    int main()
    {
        std::cout << std::bitset<0x400>().size() << '\n';
    }
```

Saída: 
```
    1024
```

### Veja também

[ count](<#/doc/utility/bitset/count>) |  retorna o número de bits definidos como true   
(função membro pública)  