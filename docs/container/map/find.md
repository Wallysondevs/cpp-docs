# std::map&lt;Key,T,Compare,Allocator&gt;::find

```cpp
iterator find( const Key& key );  // (1)
const_iterator find( const Key& key ) const;  // (2)
template< class K >
iterator find( const K& x );  // (3) (desde C++14)
template< class K >
const_iterator find( const K& x ) const;  // (4) (desde C++14)
```

  
1,2) Encontra um elemento com chave equivalente a key.

3,4) Encontra um elemento com chave que compara _equivalente_ ao valor x. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id Compare::is_transparent for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da chave do elemento a ser procurado   
---|---|---
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave   
  
### Valor de retorno

Um iterator para o elemento solicitado. Se nenhum elemento for encontrado, um iterator past-the-end (veja [end()](<#/doc/container/map/end>)) é retornado.

### Complexidade

Logarítmica no tamanho do container.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_generic_associative_lookup`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Pesquisa de comparação heterogênea em [containers associativos](<#/doc/container>); sobrecargas ([3,4](<#/doc/container/map/find>))  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <map>
     
    struct LightKey
    {
        int x;
    };
     
    struct FatKey
    {
        int x;
        int data[1000]; // a heavy blob
    };
     
    // As detailed above, the container must use std::less<> (or other transparent
    // Comparator) to access these overloads. This includes standard overloads,
    // such as comparison between std::string and std::string_view.
    bool operator<(const FatKey& fk, const LightKey& lk) { return fk.x < lk.x; }
    bool operator<(const LightKey& lk, const FatKey& fk) { return lk.x < fk.x; }
    bool operator<(const FatKey& fk1, const FatKey& fk2) { return fk1.x < fk2.x; }
     
    int main()
    {
        // Simple comparison demo.
        std::map<int, char> example{{1, 'a'}, {2, 'b'}};
     
        if (auto search = example.find(2); search != example.end())
            std::cout << "Found " << search->first << ' ' << search->second << '\n';
        else
            std::cout << "Not found\n";
     
        // Transparent comparison demo.
        std::map<FatKey, char, std::less<>> example2{{{1, {}}, 'a'}, {{2, {}}, 'b'}};
     
        LightKey lk = {2};
        if (auto search = example2.find(lk); search != example2.end())
            std::cout << "Found " << search->first.x << ' ' << search->second << '\n';
        else
            std::cout << "Not found\n";
     
        // Obtaining const iterators.
        // Compiler decides whether to return iterator of (non) const type by way of
        // accessing map; to prevent intentional modification, one of the simplest
        // options is to access the map via a constant reference.
        const auto& example2ref = example2;
        if (auto search = example2ref.find(lk); search != example2.end())
        {
            std::cout << "Found " << search->first.x << ' ' << search->second << '\n';
        //  search->second = 'c'; // error: assignment of member
                                  // 'std::pair<const FatKey, char>::second'
                                  // in read-only object
        }
    }
```

Saída: 
```
    Found 2 b
    Found 2 b
    Found 2 b
```

### Veja também

[ at](<#/doc/container/map/at>) | acessa o elemento especificado com verificação de limites   
(função membro pública)  
[ operator[]](<#/doc/container/map/operator_at>) | acessa ou insere o elemento especificado   
(função membro pública)  
[ count](<#/doc/container/map/count>) | retorna o número de elementos que correspondem a uma chave específica   
(função membro pública)  
[ equal_range](<#/doc/container/map/equal_range>) | retorna um range de elementos que correspondem a uma chave específica   
(função membro pública)