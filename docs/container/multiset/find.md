# std::multiset&lt;Key,Compare,Allocator&gt;::find

```cpp
iterator find( const Key& key );  // (1)
const_iterator find( const Key& key ) const;  // (2)
template< class K >
iterator find( const K& x );  // (3) (desde C++14)
template< class K >
const_iterator find( const K& x ) const;  // (4) (desde C++14)
```

1,2) Encontra um elemento com chave equivalente a key. Se houver vários elementos com a chave solicitada no container, qualquer um deles pode ser retornado.

3,4) Encontra um elemento com chave que se compara como _equivalente_ ao valor x. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id Compare::is_transparent for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

- **key** — valor da chave do elemento a ser buscado
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave

### Valor de retorno

Um iterator para o elemento solicitado. Se nenhum elemento for encontrado, um iterator past-the-end (veja [end()](<#/doc/container/multiset/end>)) é retornado.

### Complexidade

Logarítmica no tamanho do container.

### Observações

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_generic_associative_lookup`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Busca de comparação heterogênea em [containers associativos](<#/doc/container>); sobrecargas ([3,4](<#/doc/container/multiset/find>))

### Exemplo

Execute este código
```
    #include <iostream>
    #include <set>
    
    struct LightKey
    {
        int x;
    };
    
    struct FatKey
    {
        int x;
        int data[1000]; // um blob pesado
    };
    
    // Conforme detalhado acima, o container deve usar std::less<> (ou outro
    // Comparator transparente) para acessar estas sobrecargas. Isso inclui
    // sobrecargas padrão, como a comparação entre std::string e std::string_view.
    bool operator<(const FatKey& fk, const LightKey& lk) { return fk.x < lk.x; }
    bool operator<(const LightKey& lk, const FatKey& fk) { return lk.x < fk.x; }
    bool operator<(const FatKey& fk1, const FatKey& fk2) { return fk1.x < fk2.x; }
    
    int main()
    {
        // Demonstração de comparação simples.
        std::multiset<int> example{1, 2, 3, 4};
    
        if (auto search = example.find(2); search != example.end())
            std::cout << "Found " << (*search) << '\n';
        else
            std::cout << "Not found\n";
    
        // Demonstração de comparação transparente.
        std::multiset<FatKey, std::less<>> example2{{1, {}}, {2, {}}, {3, {}}, {4, {}}};
    
        LightKey lk = {2};
        if (auto search = example2.find(lk); search != example2.end())
            std::cout << "Found " << search->x << '\n';
        else
            std::cout << "Not found\n";
    }
```

Saída:
```
    Found 2
    Found 2
```

### Veja também

[ count](<#/doc/container/multiset/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ equal_range](<#/doc/container/multiset/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)