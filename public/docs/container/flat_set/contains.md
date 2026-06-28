# std::flat_set&lt;Key,Compare,KeyContainer&gt;::contains

```cpp
bool contains( const Key& key ) const;  // (1) (desde C++23)
template< class K >
bool contains( const K& x ) const;  // (2) (desde C++23)
```

  
1) Verifica se existe um elemento com chave equivalente a `key` no container.

2) Verifica se existe um elemento com chave que se compara como _equivalente_ ao valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da chave do elemento a ser procurado   
---|---|---
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave   
  
### Valor de retorno

`true` se houver tal elemento, caso contrário `false`. 

### Complexidade

Logarítmica no tamanho do container. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <flat_set>
     
    int main()
    {
        std::flat_set<int> example{1, 2, 3, 4};
     
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

[ find](<#/doc/container/flat_set/find>) |  encontra elemento com chave específica   
(função membro pública)  
[ count](<#/doc/container/flat_set/count>) |  retorna o número de elementos que correspondem a uma chave específica   
(função membro pública)  
[ equal_range](<#/doc/container/flat_set/equal_range>) |  retorna um range de elementos que correspondem a uma chave específica   
(função membro pública)