# std::type_info::before

bool before( const type_info& rhs ) const; |  | (noexcept desde C++11)  

  
Retorna `true` se o tipo deste `type_info` precede o tipo de `rhs` na ordem de agrupamento da implementação. Nenhuma garantia é dada; em particular, a ordem de agrupamento pode mudar entre as invocações do mesmo programa. 

### Parâmetros

rhs  |  \-  |  outro objeto de informação de tipo para comparar   
  
### Valor de retorno

`true` se o tipo deste `type_info` precede o tipo de `rhs` na ordem de agrupamento da implementação. 

### Exemplo

Run this code
```
    #include <iostream>
    #include <typeinfo>
     
    int main()
    {
        if (typeid(int).before(typeid(char)))
            std::cout << "int goes before char in this implementation.\n";
        else
            std::cout << "char goes before int in this implementation.\n";
    }
```

Saída possível: 
```
    char goes before int in this implementation.
```

### Veja também

[ operator==operator!=](<#/doc/types/type_info/operator_cmp>)(removido em C++20) |  verifica se os objetos se referem ao mesmo tipo   
(função membro pública)  