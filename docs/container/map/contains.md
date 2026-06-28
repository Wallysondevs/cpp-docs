# std::map&lt;Key,T,Compare,Allocator&gt;::contains

```cpp
bool contains( const Key& key ) const;  // (1) (desde C++20)
template< class K >
bool contains( const K& x ) const;  // (2) (desde C++20)
```

  
1) Verifica se existe um elemento com chave equivalente a `key` no container.

2) Verifica se existe um elemento com chave que se compara como _equivalente_ ao valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da chave do elemento a ser procurado   
---|---|---
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave   
  
### Valor de retorno

`true` se tal elemento existir, caso contrário `false`. 

### Complexidade

Logarítmica no tamanho do container. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <map>
     
    int main()
    {
        std::map<int, char> example{{1, 'a'}, {2, 'b'}};
     
        for (int x : {2, 5})
            if (example.contains(x))
                std::cout << x << ": Found\n";
            else
                std::cout << x << ": Not found\n";
    }
```

Saída: 
```
    2: Found
    5: Not found
```

### Veja também

[ find](<#/doc/container/map/find>) | encontra elemento com chave específica   
(função membro pública)  
[ count](<#/doc/container/map/count>) | retorna o número de elementos que correspondem a uma chave específica   
(função membro pública)  
[ equal_range](<#/doc/container/map/equal_range>) | retorna um range de elementos que correspondem a uma chave específica   
(função membro pública)