# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::find

```cpp
iterator find( const Key& key );  // (1) (desde C++11)
const_iterator find( const Key& key ) const;  // (2) (desde C++11)
template< class K >
iterator find( const K& x );  // (3) (desde C++20)
template< class K >
const_iterator find( const K& x ) const;  // (4) (desde C++20)
```

1,2) Encontra um elemento com chave equivalente a key. Se houver vários elementos com a chave solicitada no container, qualquer um deles pode ser retornado.

3,4) Encontra um elemento com chave que se compara _equivalente_ ao valor x. Esta sobrecarga participa da resolução de sobrecarga apenas se Hash::is_transparent e KeyEqual::is_transparent forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

- **key** — valor da chave do elemento a ser procurado
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave

### Valor de retorno

Um iterator para o elemento solicitado. Se nenhum elemento for encontrado, um iterator past-the-end (veja [end()](<#/doc/container/unordered_multiset/end>)) é retornado.

### Complexidade

Constante em média, no pior caso linear no tamanho do container.

### Notas

[Feature-test](<#/doc/utility/feature_test>) macro | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_generic_unordered_lookup`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | Pesquisa de comparação heterogênea em [unordered associative containers](<#/doc/container>); sobrecargas ([3,4](<#/doc/container/unordered_multiset/find>))

### Exemplo

Execute este código
```
    #include <iostream>
    #include <unordered_set>
     
    int main()
    {
        // Demonstração de comparação simples.
        std::unordered_multiset<int> example{1, 2, 3, 4};
     
        if (auto search = example.find(2); search != example.end())
            std::cout << "Encontrado " << (*search) << '\n';
        else
            std::cout << "Não encontrado\n";
    }
```

Saída:
```
    Encontrado 2
```

### Veja também

[ count](<#/doc/container/unordered_multiset/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ equal_range](<#/doc/container/unordered_multiset/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)