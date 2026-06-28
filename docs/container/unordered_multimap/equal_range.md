# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::equal_range

```cpp
std::pair<iterator, iterator> equal_range( const Key& key );  // (1) (desde C++11)
std::pair<const_iterator, const_iterator> equal_range( const Key& key ) const;  // (2) (desde C++11)
template< class K >
std::pair<iterator, iterator> equal_range( const K& x );  // (3) (desde C++20)
template< class K >
std::pair<const_iterator, const_iterator> equal_range( const K& x ) const;  // (4) (desde C++20)
```

1,2) Retorna um range contendo todos os elementos com a chave `key` no container. O range é definido por dois iterators, o primeiro apontando para o primeiro elemento do range desejado e o segundo apontando após o último elemento do range.

3,4) Retorna um range contendo todos os elementos no container com chave equivalente a `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

- **key** — valor da chave para comparar os elementos
- **x** — um valor de qualquer tipo que pode ser comparado de forma transparente com uma chave

### Valor de retorno

[std::pair](<#/doc/utility/pair>) contendo um par de iterators que definem o range desejado. Se não houver tais elementos, iterators *past-the-end* (veja [end()](<#/doc/container/unordered_multimap/end>)) são retornados como ambos os elementos do par.

### Complexidade

Caso médio linear no número de elementos com a chave `key`, pior caso linear no tamanho do container.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_generic_unordered_lookup`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | Pesquisa de comparação heterogênea em [containers associativos não ordenados](<#/doc/container>), sobrecargas (3,4)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <unordered_map>
    
    int main()
    {
        std::unordered_multimap<int,char> map = {{1, 'a'},{1, 'b'},{1, 'd'},{2, 'b'}};
        auto range = map.equal_range(1);
        for (auto it = range.first; it != range.second; ++it)
            std::cout << it->first << ' ' << it->second << '\n';
    }
```

Saída:
```
    1 a
    1 b
    1 d
```

### Veja também

[ find](<#/doc/container/unordered_multimap/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/unordered_multimap/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ count](<#/doc/container/unordered_multimap/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ equal_range](<#/doc/algorithm/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(modelo de função)