# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::contains

```cpp
bool contains( const Key& key ) const;  // (1) (desde C++20)
template< class K >
bool contains( const K& x ) const;  // (2) (desde C++20)
```

1) Verifica se existe um elemento com chave equivalente a `key` no container.

2) Verifica se existe um elemento com chave que se compara como _equivalente_ ao valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

- **key** — valor da chave do elemento a ser procurado
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave

### Valor de retorno

`true` se houver tal elemento, caso contrário `false`.

### Complexidade

Constante em média, no pior caso linear no tamanho do container.

### Exemplo

Run this code
```
    #include <iostream>
    #include <unordered_set>
    
    int main()
    {
        std::unordered_set<int> example{1, 2, 3, 4};
    
        for (int x : {2, 5})
            if (example.contains(x))
                std::cout << x << ": Found\n";
            else
                std::cout << x << ": Not found\n";
    }
```

Output:
```
    2: Found
    5: Not found
```

### Veja também

[ find](<#/doc/container/unordered_set/find>) | encontra elemento com chave específica
(public member function)
[ count](<#/doc/container/unordered_set/count>) | retorna o número de elementos que correspondem a uma chave específica
(public member function)
[ equal_range](<#/doc/container/unordered_set/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(public member function)