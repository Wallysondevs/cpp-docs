# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::find

```cpp
iterator find( const Key& key );  // (1) (desde C++11)
const_iterator find( const Key& key ) const;  // (2) (desde C++11)
template< class K >
iterator find( const K& x );  // (3) (desde C++20)
template< class K >
const_iterator find( const K& x ) const;  // (4) (desde C++20)
```

  
1,2) Encontra um elemento com chave equivalente a `key`. Se houver vários elementos com a chave solicitada no container, qualquer um deles pode ser retornado.

3,4) Encontra um elemento com chave que se compara como _equivalente_ ao valor `x`. Esta sobrecarga participa da resolução de sobrecarga somente se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da chave do elemento a ser procurado   
---|---|---
x  |  \-  |  um valor de qualquer tipo que pode ser comparado de forma transparente com uma chave   
  
### Valor de retorno

Um iterator para o elemento solicitado. Se nenhum elemento for encontrado, um iterator past-the-end (veja [end()](<#/doc/container/unordered_multimap/end>)) é retornado. 

### Complexidade

Constante em média, no pior caso linear no tamanho do container. 

### Notas

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_generic_unordered_lookup`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | Busca de comparação heterogênea em [unordered associative containers](<#/doc/container>); sobrecargas ([3,4](<#/doc/container/unordered_multimap/find>))  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <unordered_map>
     
    int main()
    {
        // Simple comparison demo.
        std::unordered_multimap<int, char> example{{1, 'a'}, {2, 'b'}};
     
        if (auto search = example.find(2); search != example.end())
            std::cout << "Found " << search->first << ' ' << search->second << '\n';
        else
            std::cout << "Not found\n";
    }
```

Saída: 
```
    Found 2 b
```

### Veja também

[ count](<#/doc/container/unordered_multimap/count>) |  retorna o número de elementos que correspondem a uma chave específica   
(função membro pública)  
[ equal_range](<#/doc/container/unordered_multimap/equal_range>) |  retorna um range de elementos que correspondem a uma chave específica   
(função membro pública)