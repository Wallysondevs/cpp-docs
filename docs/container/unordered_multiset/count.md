# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::count

```cpp
size_type count( const Key& key ) const;  // (1) (desde C++11)
template< class K >
size_type count( const K& x ) const;  // (2) (desde C++20)
```

1) Retorna o número de elementos com chave que se compara como igual ao argumento `key` especificado.

2) Retorna o número de elementos com chave que se compara como equivalente ao argumento `x` especificado. Esta sobrecarga participa da resolução de sobrecarga somente se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

- **key** — valor da chave dos elementos a serem contados
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave

### Valor de retorno

1) Número de elementos com a chave `key`.

2) Número de elementos com chave que se compara como equivalente a `x`.

### Complexidade

linear no número de elementos com a chave `key` em média, no pior caso linear no tamanho do container.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_generic_unordered_lookup`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | Pesquisa de comparação heterogênea em [containers associativos não ordenados](<#/doc/container>), sobrecarga (2)

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <unordered_set>
    
    int main()
    {
        std::unordered_multiset set{2, 7, 1, 8, 2, 8, 1, 8, 2, 8};
    
        std::cout << "The set is:\n";
        for (int e : set)
            std::cout << e << ' ';
    
        const auto [min, max] = std::ranges::minmax(set);
    
        std::cout << "\nNumbers [" << min << ".." << max << "] frequency:\n";
    
        for (int i{min}; i <= max; ++i)
            std::cout << i << ':' << set.count(i) << "; ";
        std::cout << '\n';
    }
```

Saída possível:
```
    The set is:
    8 8 8 8 1 1 7 2 2 2
    Numbers [1..8] frequency:
    1:2; 2:3; 3:0; 4:0; 5:0; 6:0; 7:1; 8:4;
```

### Veja também

[ find](<#/doc/container/unordered_multiset/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/unordered_multiset/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ equal_range](<#/doc/container/unordered_multiset/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)