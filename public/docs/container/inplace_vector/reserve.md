# std::inplace_vector&lt;T,N&gt;::reserve

```cpp
static constexpr void reserve( size_type new_cap );  // (desde C++26)
```

  
Não faz nada, exceto que pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>). A solicitação para aumentar a capacidade (ou seja, o tamanho do armazenamento interno) é ignorada porque [std::inplace_vector](<#/doc/container/inplace_vector>)<T, N> é um container de capacidade fixa. 

### Parâmetros

new_cap  |  \-  |  nova capacidade do `inplace_vector`, em número de elementos   
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante. 

### Exceções

[std::bad_alloc](<#/doc/memory/new/bad_alloc>) se new_cap > capacity() for verdadeiro. 

### Observações

Esta função existe para compatibilidade com interfaces tipo vector. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <inplace_vector>
    #include <iostream>
     
    int main()
    {
        std::inplace_vector<int, 4> v{1, 2, 3};
        assert(v.capacity() == 4 && v.size() == 3);
     
        v.reserve(2); // não faz nada
        assert(v.capacity() == 4 && v.size() == 3);
     
        try
        {
            v.reserve(13); // lança exceção, porque a capacidade solicitada > N; v permanece inalterado
        }
        catch(const std::bad_alloc& ex)
        {
            std::cout << ex.what() << '\n';
        }
        assert(v.capacity() == 4 && v.size() == 3);
    }
```

Saída possível: 
```
    std::bad_alloc
```

### Veja também

[ size](<#/doc/container/inplace_vector/size>) |  retorna o número de elementos   
(função membro pública)  
[ max_size](<#/doc/container/inplace_vector/max_size>)[static] |  retorna o número máximo possível de elementos   
(função membro estática pública)  
[ resize](<#/doc/container/inplace_vector/resize>) |  altera o número de elementos armazenados   
(função membro pública)  
[ capacity](<#/doc/container/inplace_vector/capacity>)[static] |  retorna o número de elementos que podem ser mantidos no armazenamento alocado atualmente   
(função membro estática pública)  
[ shrink_to_fit](<#/doc/container/inplace_vector/shrink_to_fit>)[static] |  reduz o uso de memória liberando memória não utilizada   
(função membro estática pública)