# std::inplace_vector&lt;T,N&gt;::empty

```cpp
constexpr bool empty() const noexcept;  // (desde C++26)
```

  
Verifica se o container não possui elementos, ou seja, se begin() == end(). 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o container estiver vazio, false caso contrário. 

### Complexidade

Constante. 

### Exemplo

Run this code
```cpp 
    #include <cassert>
    #include <inplace_vector>
     
    int main()
    {
        std::inplace_vector<char, 8> v;
        assert(v.empty());
     
        v.push_back('_');
        assert(not v.empty());
    }
```

### Veja também

[ size](<#/doc/container/inplace_vector/size>) |  retorna o número de elementos   
(função membro pública)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o container está vazio   
(modelo de função)