# std::inplace_vector&lt;T,N&gt;::capacity

```cpp
static constexpr size_type capacity() noexcept;  // (desde C++26)
```

  
Retorna a capacidade do armazenamento interno (inplace). Equivalente a: return N;. 

### Parâmetros

(nenhum) 

### Valor de retorno

O número máximo de elementos que o container é capaz de armazenar. 

### Complexidade

Constante. 

### Observações

Como cada [std::inplace_vector](<#/doc/container/inplace_vector>)<T, N> é um container de capacidade fixa, o valor retornado por `capacity` é igual a `N` (que também é o valor retornado por max_size()). 

### Exemplo

Execute este código
```
    #include <inplace_vector>
     
    int main()
    {
        constexpr std::inplace_vector<int, 4> v1;
        static_assert(v1.capacity() == 4 && v1.max_size() == 4);
     
        constexpr std::inplace_vector<int, 0> v2;
        static_assert(v2.capacity() == 0 && v2.max_size() == 0);
    }
```

### Ver também

[ max_size](<#/doc/container/inplace_vector/max_size>)[static] |  retorna o número máximo possível de elementos   
(função membro estática pública)  
[ size](<#/doc/container/inplace_vector/size>) |  retorna o número de elementos   
(função membro pública)  
[ resize](<#/doc/container/inplace_vector/resize>) |  altera o número de elementos armazenados   
(função membro pública)  
[ empty](<#/doc/container/inplace_vector/empty>) |  verifica se o container está vazio   
(função membro pública)  
[ reserve](<#/doc/container/inplace_vector/reserve>)[static] |  reserva armazenamento   
(função membro estática pública)